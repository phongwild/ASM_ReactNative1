import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const Splash_Screen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('LoginScreen')
    }, 3000);
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', backgroundColor: '#0C0F14' }}>
      <StatusBar backgroundColor={'#0c0f14'}/>
      <Image source={require('../assets/logo_app.png')} style={{width:198, height:189}} />
    </View>
  )
}

export default Splash_Screen

const styles = StyleSheet.create({})