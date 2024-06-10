import { FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Loading from 'react-native-loading-spinner-overlay';
import { DATABASE } from '../../FirebaseConfig';
import { get, ref, set, remove, update } from "@firebase/database";
import moment from 'moment';
import IconEntypo from 'react-native-vector-icons/Entypo'


const Cart_Screen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [Cart, setCart] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
  const [totalPrice, settotalPrice] = useState(0);
  const cartItem = ref(DATABASE, 'Cart');
  const onRefresh = useCallback(() => {
    setrefreshing(true);
    setTimeout(() => {
      getData();
      setrefreshing(false);
    }, 2000);
  }, []);
  const getData = async () => {
    try {
      const cartSnapshot = await get(cartItem);
      if (cartSnapshot.exists()) {
        const cartData = await cartSnapshot.val();
        setCart(Object.values(cartData));
        let total = 0;
        for (const item in cartData) {
          const priceWithCount = cartData[item].price * (cartData[item].count || 1);
          total += priceWithCount;
          //console.log(`Item ${item} price with count: ${priceWithCount}`);
        }
        console.log(total);
        settotalPrice(total)
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log('ERROR: ', error);
      setIsLoading(false);
    }
  }
  const delAllItemCart = async () => {
    try {
      const itemRef = ref(DATABASE, `Cart`);
      await remove(itemRef);
      setCart([]);
      getData();
      settotalPrice(0);
    } catch (error) {
      console.error('Error deleting cart:', error);
    }
  }
  const pay = async () => {
    const snapShotCart = await get(cartItem);
    const autoId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    try {
      if (snapShotCart.exists()) {
        const historyData = snapShotCart.val();
        const momentt = moment();
        const time = momentt.format('HH:mm:ss');
        const date = new Date().toLocaleDateString();
        set(ref(DATABASE, 'History/' + `Htr${autoId}`), {
          idHtr: `Htr${autoId}`,
          historyData,
          timeOrder: time,
          dateOrder: date,
          total: totalPrice
        });
        delAllItemCart();
        ToastAndroid.show('Đặt hàng thành công', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Giỏ hàng của bạn đang trống', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }
  const handleDeleteItem = async (item) => {
    try {
      const itemRef = ref(DATABASE, `Cart/${item.cardId}`);
      await remove(itemRef);
      setCart((prevState) => prevState.filter((cartItem) => cartItem.cardId !== item.cardId));
      ToastAndroid.show(`Đã xoá khỏi giỏ hàng`, ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error deleting cart:', error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const ItemCart = ({ item }) => {
    const [Count, setCount] = useState(item.count || 1);
    const price = Count * item.price;
    const getSize = () => {
      if (item.size === 1) {
        return 'S'
      } else if (item.size === 2) {
        return 'M'
      } else if (item.size === 3) {
        return 'L'
      }
    }
    const updateCartItemCount = async (itemId, newCount) => {
      if (isNaN(newCount) || newCount < 1) {
        console.error('Invalid count value:', newCount);
        return;
      }
      try {
        const itemRef = ref(DATABASE, `Cart/${item.cardId}`);
        await update(itemRef, {
          count: newCount,
        });
        setCart((prevState) =>
          prevState.map((item) =>
            item.cardId === itemId ? { ...item, count: newCount } : item
          )
        );
      } catch (error) {
        console.error('Error updating cart item count:', error);
      }
    };
    return (
      <View style={{ marginTop: 20, backgroundColor: '#262B33', width: '100%', height: 154, borderRadius: 20, padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Image source={{ uri: item.image_pd }} style={{ backgroundColor: 'blue', width: 130, height: 130, borderRadius: 20, resizeMode: 'cover' }} />
        <View style={{ flexDirection: 'column', width: '55%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontWeight: 400, fontSize: 16, color: '#fff' }}>{item.namePd}</Text>
              <Text style={{ fontWeight: 400, fontSize: 10, color: '#fff', marginTop: 5 }}> {item.description} </Text>
            </View>
            <View style={{ alignItems: 'center', width: 30 }}>
              <TouchableOpacity style={{ width: '100%' }}
                onPress={() => { }}>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 40 }}>
            <View style={{ width: 72, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0C0F14', borderRadius: 10, marginTop: 5 }}>
              <Text style={{ textAlign: 'center', color: '#fff', fontSize: 16, fontWeight: '500' }}>
                {getSize()}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={{ color: '#D17842', fontWeight: 600, fontSize: 20 }}>$</Text>
              <Text style={{ color: '#fff', fontWeight: 600, fontSize: 20 }}> {price.toFixed(2)} </Text>
            </View>
          </View>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
            <TouchableOpacity style={{ backgroundColor: '#D17842', width: 30, height: 30, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => {
                if (Count > 1) {
                  setCount(Count - 1);
                  updateCartItemCount(item.cardId, Count - 1);
                  getData();
                } else {
                  handleDeleteItem(item);
                }
              }}>
              <IconEntypo name='minus' size={22} color={'#fff'} />
            </TouchableOpacity>
            <View style={{ width: 55, height: 30, backgroundColor: '#0C0F14', borderRadius: 10, textAlign: 'center', borderWidth: 1, borderColor: '#D17842', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>{String(Count)}</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#D17842', width: 30, height: 30, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => {
                setCount(Count + 1);
                updateCartItemCount(item.cardId, Count + 1); 
                getData()
              }} >
              <IconEntypo name='plus' size={22} color={'#fff'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  return (
    <View style={{ backgroundColor: '#0C0F14', flex: 1, }}>
      <Text style={{
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 28,
        marginTop: 30,
        textAlign: 'center',
        height: 30
      }}>Cart</Text>
      <View style={{ flex: 13, padding: 20 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {isLoading ? <Loading visible={true} /> : null}
          <View style={{ flex: 1 }}>
            {Cart.length === 0 ?
              <Text style={{ flex: 1, textAlign: 'center', color: '#52555a', fontWeight: '600', fontSize: 16, marginTop: 280 }}>
                Giỏ hàng của bạn đang trống
              </Text>
              :
              <FlatList
                data={Cart}
                renderItem={({ item }) => {
                  return <ItemCart item={item} />
                }}
                keyExtractor={(item) => item.cartId}
                showsVerticalScrollIndicator={false}
              />
            }
          </View>
        </ScrollView>
      </View>
      <View style={{ flex: 2, justifyContent: 'space-between', flexDirection: 'row' }}>
        <View style={{ flexDirection: 'column', padding: 20, justifyContent: 'center', alignItems: 'center', width: 110 }}>
          <Text style={{ color: '#AEAEAE', fontWeight: 500, fontSize: 14 }}>Total Price</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 65 }}>
            <Text style={{ color: '#D17842', fontWeight: 600, fontSize: 20 }}>$</Text>
            <Text style={{ color: '#fff', fontWeight: 600, fontSize: 20 }}> {totalPrice.toFixed(2)}  </Text>
          </View>
        </View>
        <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <TouchableOpacity style={{ height: 60, width: 240, backgroundColor: '#D17842', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => { pay() }}>
            <Text style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Cart_Screen