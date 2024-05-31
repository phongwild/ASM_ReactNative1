import { FlatList, Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DATABASE } from '../../FirebaseConfig';
import { get, ref, set } from "@firebase/database";
import Loading from 'react-native-loading-spinner-overlay';
import Entypo from 'react-native-vector-icons/Entypo';


const Home_Screen = ({ navigation }) => {
  const [Data, setdata] = useState([]);
  const [type, settype] = useState([]);
  const [inputSearch, setinputSearch] = useState('');
  const [inActive, setinActive] = useState(null);
  const p_type = ref(DATABASE, 'Product_type');
  const refd = ref(DATABASE, 'Product');
  const [isLoading, setIsLoading] = useState(true);
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

  }
  useEffect(() => {
    console.log("useEffect triggered in Home_Screen");
    getDs();
    return () => {
      console.log("useEffect cleanup in Home_Screen");
    };
  }, []);
  const Item_Product = ({ item }) => (
    <View style={styles.st_item}>
      <TouchableOpacity onPress={() => navigation.navigate('DetailProduct', { item })}>
        <Image source={{ uri: item.image_pd }} style={{
          width: '100%',
          height: 130,
          resizeMode: 'cover',
          borderRadius: 10
        }} />
      </TouchableOpacity>
      <Text style={{ color: '#fff', marginTop: 10, flexDirection: 'column' }} >
        <Text style={{ fontSize: 14 }} >{item.namePd}</Text>
      </Text>
      <Text style={{ color: '#ffffff', fontSize: 10, marginTop: 5 }} >{item.description}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }} >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }} >
          <Text style={{ color: '#d17842' }}>$</Text>
          <Text style={{ color: '#fff' }} >{item.price}</Text>
        </Text>
        <TouchableOpacity style={{ alignSelf: 'center', justifyContent: 'center', backgroundColor: '#d17842', padding: 5, borderRadius: 10, }}
          onPress={() => {
            const itemm = item.id;
            const autoId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
            set(ref(DATABASE, 'Cart/' + `c${autoId.toString()}`), {
              cardId: `c${autoId.toString()}`,
              count: 1,
              description: itemm.description,
              image_pd: itemm.image_pd,
              namePd: itemm.namePd,
              pdt: itemm.pdt,
              price: itemm.price
            });
            ToastAndroid.show('Thêm vào giỏ hàng thành công', ToastAndroid.SHORT);
          }}>
          <Entypo name='plus' size={24} color={'#fff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
  const Item_type = ({ item }) => {
    const isSelected = item.pdt === inActive;
    return (
      <TouchableOpacity style={{ height: 40, marginBottom: 10, flexDirection: 'column' }}
        onPress={() => {
          setinActive(item.pdt);
        }}>
        <Text style={{ color: isSelected ? '#D17842' : '#52555a', fontWeight: 'bold', fontSize: 16, padding: 10, borderBottomWidth: isSelected ? 3 : 0, borderColor: '#D17842', marginLeft: 10 }}>{item.pdt_name}</Text>
        <View style={{ width: 10, height: 10, backgroundColor: isSelected ? '#D17842' : '#52555a' }}></View>
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

        }} placeholder='Find your coffee ...' placeholderTextColor='#52555a' onChangeText={(txt) => setinputSearch(txt)} />
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

      <ScrollView showsVerticalScrollIndicator={false}>
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
    borderRadius: 10,
    backgroundColor: '#22262e',
    width: 180,
    height: 250,
    flexDirection: 'column',
    padding: 10,
    marginRight: 10,
    marginBottom: 10
  }
})