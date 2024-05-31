import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Image, FlatList, RefreshControl, ToastAndroid, ScrollView } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { DATABASE } from '../../FirebaseConfig';
import { get, ref, remove, set } from "@firebase/database";
import Loading from 'react-native-loading-spinner-overlay';
import IconAnt from 'react-native-vector-icons/AntDesign'
import Ionicon from 'react-native-vector-icons/Ionicons'
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons'

const Favourite_Screen = () => {
  const [Favorite, setFavorite] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setrefreshing] = useState(false);
  const dataFavorite = ref(DATABASE, 'Favorite');
  const getData = async () => {
    try {
      const favoriteSnapshot = await get(dataFavorite);
      if (favoriteSnapshot.exists()) {
        const favoriteData = favoriteSnapshot.val();
        setFavorite(Object.values(favoriteData));
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log('ERROR: ', error);
      setIsLoading(false);
    }
  }
  const onRefresh = useCallback(() => {
    setrefreshing(true);
    setTimeout(() => {
      getData();
      setrefreshing(false);
    }, 2000);
  }, []);
  const handleDeleteItem = async (item) => {
    try {
      const itemRef = ref(DATABASE, `Favorite/${item.favId}`);
      await remove(itemRef);
      console.log(itemRef);
      setFavorite((prevState) => prevState.filter((favItem) => favItem.favId !== item.favId));
      ToastAndroid.show('Đã xoá khỏi yêu thích', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const ItemFavorite = ({ item }) => (
    <View style={{ height: 575, width: '100%', borderRadius: 20, marginBottom: 10, backgroundColor: '#262B33' }}>
      <ImageBackground source={{ uri: item.image_fav }} style={{ flex: 3, borderTopLeftRadius: 20, borderTopRightRadius: 20, }}>
        <View style={{ flex: 2, borderRadius: 20, }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 30, marginTop: 10 }}>
            <View>
            </View>
            <TouchableOpacity style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#21262E', borderRadius: 10 }}
              onPress={() => handleDeleteItem(item)}>
              <IconAnt name='heart' size={22} color={'#DC3535'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
          flex: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#00000080',
          padding: 20
        }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: '600' }}> {item.nameFav} </Text>
              <Text style={{ color: '#AEAEAE', fontSize: 12, marginTop: 5 }}> {item.description} </Text>
            </View>
            <View style={{ flexDirection: 'row', width: 100, justifyContent: 'space-between' }}>
              <TouchableOpacity style={{ backgroundColor: '#141921', width: 45, height: 45, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/icons/icon_cf_bean.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: '#141921', width: 45, height: 45, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
              <IconMC name='water' size={40} color={'#D17842'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <IconAnt name='star' size={24} color={'#D17842'}/>
              <Text style={{ color: '#FFFFFF', fontWeight: 600, fontSize: 16 }}> {item.rate} </Text>
            </View>
            <TouchableOpacity style={{ width: 100, height: 45, backgroundColor: '#141921', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#AEAEAE', fontSize: 10, fontWeight: 500 }}>Medium Roasted</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={{ flex: 1, }}>
        <View style={{ flex: 1, padding: 20, }}>
          <Text style={{ color: '#AEAEAE', fontWeight: 600, fontSize: 14, }}>Description</Text>
          <Text style={{ color: '#fff', fontWeight: 400, fontSize: 14, marginTop: 10 }}> {item.description} </Text>
        </View>
      </View>
    </View>
  )
  return (
    <View style={{ flex: 1, backgroundColor: '#0C0F14', }}>
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{
          fontWeight: 'bold',
          color: '#fff',
          fontSize: 20,
          marginTop: 20,
          textAlign: 'center',
          height: 30
        }}>Favorite</Text>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          {isLoading ? <Loading visible={true} /> : null}
          {
            Favorite.length == 0 ?
              <Text style={{ flex: 1, textAlign: 'center', color: '#52555a', fontWeight: '600', fontSize: 16, marginTop: 280 }}>Yêu thích của bạn đang trống</Text>
              :
              <View style={{ marginTop: 20 }}>
                <FlatList
                  data={Favorite}
                  renderItem={({ item }) => {
                    return <ItemFavorite item={item} />
                  }}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item.favId}
                />
              </View>
          }
        </ScrollView>
      </View>
    </View>
  )
}

export default Favourite_Screen
