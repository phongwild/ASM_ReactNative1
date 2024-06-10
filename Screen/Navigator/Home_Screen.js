import { FlatList, Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { DATABASE } from '../../FirebaseConfig';
import { get, ref, set } from "@firebase/database";
import Loading from 'react-native-loading-spinner-overlay';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { RefreshControl } from 'react-native-gesture-handler';


const Home_Screen = ({ navigation }) => {
  const [Data, setdata] = useState([]);
  const [type, settype] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
  const [inActive, setinActive] = useState(null);
  const p_type = ref(DATABASE, 'Product_type');
  const refd = ref(DATABASE, 'Product');
  const [isLoading, setIsLoading] = useState(true);
  const onRefresh = useCallback(() => {
    setrefreshing(true);
    setTimeout(() => {
      getDs();
      setrefreshing(false);
    }, 2000);
  }, []);
  const getDs = async () => {
    try {
      const productSnapshot = await get(refd);
      const typeSnapshot = await get(p_type);

      if (productSnapshot.exists() && typeSnapshot.exists()) {
        const productData = productSnapshot.val();
        const typeData = typeSnapshot.val();
        setdata(Object.values(productData));
        settype(Object.values(typeData));
        setIsLoading(false);
      }
    } catch (error) {
      console.error('ERROR:', error);
      setIsLoading(false);
    }
  };
  const search = (txt) => {
    if (!txt) {
      setdata(Object.values(Data));
    } else {
      const filteredData = Data.filter((item) =>
        item.namePd.toLowerCase().includes(txt.toLowerCase())
      );
      setdata(filteredData);
    }
  }
  useEffect(() => {
    console.log("useEffect triggered in Home_Screen");
    getDs();
    return () => {
      console.log("useEffect cleanup in Home_Screen");
    };
  }, []);
  const Item_Product = ({ item }) => (
    <LinearGradient colors={['#252a32', '#262b33', "#000000"]} style={styles.st_item}>
      <TouchableOpacity onPress={() => navigation.navigate('DetailProduct', { item })}>
        <Image source={{ uri: item.image_pd }} style={{
          width: '100%',
          height: 160,
          resizeMode: 'cover',
          borderRadius: 16
        }} />
      </TouchableOpacity>
      <Text style={{ color: '#fff', marginTop: 10, flexDirection: 'column' }} >
        <Text style={{ fontSize: 15 }} >{item.namePd}</Text>
      </Text>
      <Text style={{ color: '#ffffff', fontSize: 11, marginTop: 5 }} >{item.description}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }} >
        <Text style={{ fontSize: 19, fontWeight: 'bold' }} >
          <Text style={{ color: '#d17842' }}>$</Text>
          <Text style={{ color: '#fff' }} >{item.price}</Text>
        </Text>
        <TouchableOpacity style={{ alignSelf: 'center', justifyContent: 'center', backgroundColor: '#d17842', padding: 5, borderRadius: 10, }}
          onPress={() => {
            const autoId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
            set(ref(DATABASE, 'Cart/' + `c${autoId.toString()}`), {
              cardId: `c${autoId.toString()}`,
              count: 1,
              description: item.description,
              image_pd: item.image_pd,
              namePd: item.namePd,
              pdt: item.pdt,
              price: item.price,
              size: 2
            });
            ToastAndroid.show('Thêm vào giỏ hàng thành công', ToastAndroid.SHORT);
          }}>
          <Entypo name='plus' size={24} color={'#fff'} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
  const Item_type = ({ item }) => {
    const isSelected = item.pdt === inActive;
    return (
      <TouchableOpacity style={{ height: 40, marginBottom: 35, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        onPress={() => {
          setinActive(item.pdt);
          if (!item.pdt) {
            setdata(Object.values(Data));
          } else {
            const filteredData = Data.filter(() =>
              item.pdt.toLowerCase().includes(item.pdt.toLowerCase())
            );
            setdata(filteredData);
          }
        }}>
        <Text style={{ color: isSelected ? '#D17842' : '#52555a', fontWeight: 'bold', fontSize: 16, paddingHorizontal: 10, paddingTop: 10, borderColor: '#D17842', marginLeft: 10 }}>{item.pdt_name}</Text>
        <View style={{ backgroundColor: isSelected ? '#D17842' : '#52555a', width: 10, height: 10, borderRadius: 50, opacity: isSelected ? 1 : 0, marginTop: 5, marginLeft:10}}></View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        <Pressable style={styles.header} onPress={() => navigation.navigate('Settting')} >
          <Image source={require('../../assets/icons/icon_more.png')} style={{ width: 20, height: 20 }} />
        </Pressable>
        <Image source={require('../../assets/icons/icon_aaa.png')} style={{ width: 30, height: 30 }} />
      </View>
      <Text style={{
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 28,
        width: 195,
        marginTop: 30
      }}>Find the best coffee for you</Text>
      <View style={{
        marginTop: 30
      }}>
        <TextInput style={{
          color: '#52555a',
          backgroundColor: '#141921',
          height: 50,
          padding: 15,
          borderRadius: 15,

        }} placeholder='Find your coffee ...' placeholderTextColor='#52555a' onChangeText={(txt) => search(txt)} />
      </View>
      <FlatList
        data={type}
        renderItem={({ item }) => {
          return <Item_type item={item} />
        }}
        keyExtractor={(item) => item.pdt}
        horizontal={true}
        style={{ marginTop: 5, marginBottom: 20 }}
        showsHorizontalScrollIndicator={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}
      >
        {isLoading ? <Loading visible={true} /> : null}
        <FlatList
          data={Data}
          renderItem={({ item }) => {
            return <Item_Product item={item} />
          }}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      </ScrollView>
    </View>
  )
}

export default Home_Screen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#0c0f14',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  header: {
    height: 30,
    backgroundColor: '#21262E',
    width: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  st_item: {
    borderRadius: 16,
    backgroundColor: '#22262e',
    width: 180,
    height: 250,
    flexDirection: 'column',
    padding: 10,
    marginRight: 10,
    marginBottom: 40
  }
})