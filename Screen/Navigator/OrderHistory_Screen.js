import { StyleSheet, Text, View, TouchableOpacity, FlatList, onRefresh, RefreshControl, ScrollView } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { set, get, ref } from '@firebase/database';
import { DATABASE } from '../../FirebaseConfig';
const OrderHistory_Screen = ({ navigation }) => {
  const [History, setHistory] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
  const dataHistory = ref(DATABASE, 'History');
  const getData = async () => {
    try {
      const historySnapshot = await get(dataHistory);
      if (historySnapshot.exists()) {
        const historyData = historySnapshot.val();
        setHistory(Object.values(historyData));
      }
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }
  const onRefresh = useCallback(() => {
    setrefreshing(true);
    setTimeout(() => {
      getData();
      setrefreshing(false);
    }, 2000);
  }, []);
  useEffect(() => {
    getData()
  }, []);
  const ItemHistory = ({ item }) => (
    <TouchableOpacity style={{ marginBottom: 10, width: '100%', height: 70, borderRadius: 20, backgroundColor: '#262B33', padding: 10, flexDirection: 'column', alignItems: 'center' }}>
      <Text style={{ color: '#AEAEAE', fontSize: 16, fontWeight: 'bold' }}>ID: {item.idHtr}</Text>
      <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-evenly', width: '100%' }}>
        <Text style={{ color: '#AEAEAE', fontSize: 16, }}>Date: {item.dateOrder} </Text>
        <Text style={{ color: '#AEAEAE', fontSize: 16, }}>Time: {item.timeOrder} </Text>
      </View>
    </TouchableOpacity>
  )
  return (
    <View style={{ flex: 1, backgroundColor: '#0c0f14' }}>
      <View style={{ flexDirection: 'row', height: 70, width: '100%', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
        <View style={{ flex: 1, }}>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, textAlign: 'center' }}>
            History
          </Text>
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
      <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {History.length === 0 ?
            <Text style={{ flex: 1, textAlign: 'center', color: '#52555a', fontWeight: '600', fontSize: 16, marginTop: 280 }}>Bạn chưa đặt món đồ nào</Text>
            :
            <FlatList
            data={History}
            renderItem={({ item }) => {
              return <ItemHistory item={item} />
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.idHtr}
          />
          }
        </ScrollView>
      </View>
    </View>
  )
}

export default OrderHistory_Screen