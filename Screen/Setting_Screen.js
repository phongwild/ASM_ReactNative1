import { Image, StyleSheet, Text, TouchableOpacity, View, Modal, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import IonIcon from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Setting_Screen = ({ navigation }) => {
    const [showModal, setshowModal] = React.useState(false);
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop:10 }}>
                <TouchableOpacity style={{ borderColor: '#fff', padding: 10, flex: 1 }} onPress={() => navigation.navigate('Main')}>
                    <IonIcon name='chevron-back' size={25} color={'#fff'} />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, textAlign: 'center', flex: 1, marginRight:17 }}>
                    Setting
                </Text>
                <View style={{ flex: 1 }}></View>
            </View>
            <View style={styles.menu}>
                <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', height: 60 }}
                    onPress={() => navigation.navigate('His')}>
                    <View style={{
                        width:30,
                        height:30,
                        borderRadius:100,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'#34241d'
                    }}>
                        <FontAwesome5 name='history' size={12} color={'#D17842'}/>
                    </View>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>History</Text>
                    <Image source={require('../assets/icons/icon_arrow.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', height: 60 }} onPress={() => navigation.navigate('Personal')}>
                <View style={{
                        width:30,
                        height:30,
                        borderRadius:100,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'#34241d'
                    }}>
                        <FontAwesome6 name='user-large' size={12} color={'#D17842'}/>
                    </View>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Personal Details </Text>
                    <Image source={require('../assets/icons/icon_arrow.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', height: 60 }}>
                <View style={{
                        width:30,
                        height:30,
                        borderRadius:100,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'#34241d'
                    }}>
                        <FontAwesome6 name='location-dot' size={12} color={'#D17842'}/>
                    </View>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Address</Text>
                    <Image source={require('../assets/icons/icon_arrow.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', height: 60 }}>
                <View style={{
                        width:30,
                        height:30,
                        borderRadius:100,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'#34241d'
                    }}>
                        <MaterialIcons name='payment' size={17} color={'#D17842'}/>
                    </View>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Payment method</Text>
                    <Image source={require('../assets/icons/icon_arrow.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', height: 60 }}>
                <View style={{
                        width:30,
                        height:30,
                        borderRadius:100,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'#34241d'
                    }}>
                        <Feather name='help-circle' size={17} color={'#D17842'}/>
                    </View>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Help</Text>
                    <Image source={require('../assets/icons/icon_arrow.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', height: 60 }} onPress={() => setshowModal(true)}>
                <View style={{
                        width:30,
                        height:30,
                        borderRadius:100,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'#34241d'
                    }}>
                        <MaterialCommunityIcons name='logout' size={15} color={'#D17842'}/>
                    </View>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Logout</Text>
                    <Image source={require('../assets/icons/icon_arrow.png')} />
                </TouchableOpacity>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={showModal}
                    onRequestClose={() => {
                        setshowModal(false);
                    }}

                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
                        <View style={{ width: 250, height: 100, backgroundColor: '#52555a', alignItems: 'center', justifyContent: 'center', borderRadius: 10, padding: 5 }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>Bạn có muốn logout không ?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                                <TouchableOpacity style={{ width: '100%', justifyContent: 'center', alignItems: 'center', width: 100, height: 40, marginTop: 10, backgroundColor: '#d17842', borderRadius: 10 }}
                                    onPress={() => {
                                        setshowModal(false)
                                    }}
                                >
                                    <Text style={{ color: '#fff', fontSize: 14 }}>No</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: '100%', justifyContent: 'center', alignItems: 'center', width: 100, height: 40, marginTop: 10, backgroundColor: '#d17842', borderRadius: 10 }}
                                    onPress={() => {
                                        setshowModal(false)
                                        navigation.navigate('LoginScreen');
                                    }}
                                >
                                    <Text style={{ color: '#fff', fontSize: 14 }}>Yes</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

export default Setting_Screen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0c0f14',
        flex: 1
    },
    menu: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
    }
})