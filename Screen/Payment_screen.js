import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons'

const Payment_screen = (props) => {
    let {navigation, route} = props;
    return (
        <View style={{ backgroundColor: '#0C0F14', flex: 1, }}>
            <View style={{ flexDirection: 'row', width: '100%' }}>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <TouchableOpacity style={{ borderColor: '#fff', padding: 10, flex: 1 }} onPress={() => navigation.navigate('main')}>
                        <IonIcon name='chevron-back' size={25} color={'#fff'} />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, textAlign: 'center', flex: 1, marginRight: 17 }}>
                        Payment
                    </Text>
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>
            <View style={{width:'100%', height:241, borderRadius:25, borderWidth:2, borderColor:'#D17842', flexDirection:'column', padding:10}}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Image source={require('../assets/icons/chip.png')} style={{width:31, height:24}}/>
                    <Image source={require('../assets/icons/visa.png')} style={{width:50, height:17}}/>
                </View>
            </View>
        </View>
    )
}

export default Payment_screen

const styles = StyleSheet.create({})