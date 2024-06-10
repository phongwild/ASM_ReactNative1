import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Modal, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { DATABASE } from '../FirebaseConfig';
import { ref, set } from "@firebase/database";
import IconAnt from 'react-native-vector-icons/AntDesign'
import Ionicon from 'react-native-vector-icons/Ionicons'
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons'
const Detail_Product = ({ route, navigation }) => {
    const [borderSize, setborderSize] = useState(null);
    const [showModal, setshowModal] = useState(false);
    const [showModalFav, setshowModalFav] = useState(false);
    const item = route.params.item;
    const order = () => {
        const autoId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        if (borderSize == null) {
            ToastAndroid.show('Bạn chưa chọn size', ToastAndroid.SHORT);
        }else{
            set(ref(DATABASE, 'Cart/' + `c${autoId.toString()}`), {
                cardId: `c${autoId.toString()}`,
                count: 1,
                description: item.description,
                image_pd: item.image_pd,
                namePd: item.namePd,
                pdt: item.pdt,
                price: item.price,
                size: borderSize
            });
            setshowModal(true)
        }
    }
    const addToFavorite = () => {
        const autoId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        set(ref(DATABASE, 'Favorite/' + `fav${autoId.toString()}`), {
            favId: `fav${autoId.toString()}`,
            description: item.description,
            image_fav: item.image_pd,
            nameFav: item.namePd,
            pdt: item.pdt,
            price: item.price,
            rate: item.rate
        });
        ToastAndroid.show('Đã thêm vào yêu thích', ToastAndroid.SHORT);
    }
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <ImageBackground
                source={{ uri: item.image_pd }}
                style={{ flex: 3, backgroundColor: 'yellow' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 30, marginTop: 10 }}>
                    <TouchableOpacity style={{ backgroundColor: '#21262E', width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                        onPress={() => navigation.navigate('Main')}>
                        <Ionicon name='chevron-back' size={28} color={'#383A3E'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#21262E', borderRadius: 10 }}
                        onPress={() => addToFavorite()}>
                        <IconAnt name='heart' size={22} color={'#fff'} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', backgroundColor: '#00000080', position: 'absolute', bottom: 0, height: 150, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '600' }}>{item.namePd}</Text>
                            <Text style={{ color: '#AEAEAE', fontSize: 12, marginTop: 5 }}>{item.description}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: 100, justifyContent: 'space-between' }}>
                            <TouchableOpacity style={{ backgroundColor: '#141921', width: 45, height: 45, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../assets/icons/icon_cf_bean.png')} />
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
            <View style={{ flex: 2, backgroundColor: '#0C0F14', }}>
                <View style={{ flex: 1, padding: 20, }}>
                    <Text style={{ color: '#AEAEAE', fontWeight: 600, fontSize: 16, }}>Description</Text>
                    <Text style={{ color: '#fff', fontWeight: 400, fontSize: 16, marginTop: 10 }}>{item.description} </Text>
                </View>
                <View style={{ flex: 1, padding: 20 }}>
                    <Text style={{ color: '#AEAEAE', fontWeight: 600, fontSize: 16 }}>Size</Text>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 10 }}>
                        <TouchableOpacity style={{ backgroundColor: '#141921', width: 100, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: borderSize === 1 ? 2 : 0, borderColor: '#D17842' }}
                            onPress={() => setborderSize(1)}>
                            <Text style={{ color: '#D17842', fontWeight: 500, fontSize: 16 }}>S</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: '#141921', width: 100, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: borderSize === 2 ? 2 : 0, borderColor: '#D17842' }}
                            onPress={() => setborderSize(2)}>
                            <Text style={{ color: '#D17842', fontWeight: 500, fontSize: 16 }}>M</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: '#141921', width: 100, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: borderSize === 3 ? 2 : 0, borderColor: '#D17842' }}
                            onPress={() => setborderSize(3)}>
                            <Text style={{ color: '#D17842', fontWeight: 500, fontSize: 16 }}>L</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', padding: 20 }}>
                    <View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 50 }}>
                            <Text style={{ color: '#AEAEAE', fontWeight: 600, fontSize: 16 }}>Price</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 53 }}>
                                <Text style={{ color: '#D17842', fontSize: 20, fontWeight: 600 }}>$</Text>
                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 600 }}>{item.price}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={{ backgroundColor: '#D17842', width: 240, height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => order()}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>Thêm vào giỏ hàng thành công</Text>
                        <TouchableOpacity style={{ width: '100%', justifyContent: 'center', alignItems: 'center', width: 100, height: 40, marginTop: 10, backgroundColor: '#d17842', borderRadius: 10 }}
                            onPress={() => {
                                setshowModal(false)
                                navigation.navigate('Cart');
                            }}
                        >
                            <Text style={{ color: '#fff', fontSize: 14 }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Detail_Product

const styles = StyleSheet.create({})