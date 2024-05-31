import { StyleSheet, Text, View,TouchableOpacity, Image, SafeAreaView, TextInput } from 'react-native'
import React from 'react'

const PersonalDetail = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center', flexDirection:'row', justifyContent:'space-between', marginLeft: 20, marginTop: 25}}>
        <TouchableOpacity style={{ borderColor:'#fff',padding:10}} onPress={() => navigation.navigate('Settting')}>
            <Image source={require('../../assets/icons/icon_back.png')} style={{}}/>
        </TouchableOpacity>
        <Text style={{fontWeight:'bold', color: 'white', fontSize:20, textAlign:'center'}}>
            Setting
        </Text>
        <View style={{padding:20}}></View>
      </View>
      <View style={{width:"100%", height:'35%', borderColor:'#fff',alignItems:'center',justifyContent:'center'}}>
        <TouchableOpacity>
          <Image source={require('../../assets/img_t.jpg')}style={{borderRadius: 10}} />
        </TouchableOpacity>
      </View>
      <View style={{ borderColor:'#fff',flex:1, padding: 10}}>
        <TextInput style={styles.input} placeholder='Name'placeholderTextColor='#52555a'/>
        <TextInput style={styles.input} placeholder='Email'placeholderTextColor='#52555a'/>
        <View style={{width:'100%', flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <TextInput style={{
          borderWidth:1,
          width: '100%',
          height: 50,
          borderColor: '#252A32',
          borderRadius: 10,
          marginTop: 10,
          padding: 10,
          color: '#52555a'
        }} placeholder='Password' placeholderTextColor='#52555a' secureTextEntry={true}/>
          <TouchableOpacity style={{position:'absolute',right:10,height:20,top:25}}>
          <Image source={require('../../assets/icons/ic_eye_hide.png')} />
        </TouchableOpacity>
        </View>
        <View style={{width:'100%', flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <TextInput style={{
          borderWidth:1,
          width: '100%',
          height: 50,
          borderColor: '#252A32',
          borderRadius: 10,
          marginTop: 10,
          padding: 10,
          color: '#52555a'
        }} placeholder='Re-Type Password' placeholderTextColor='#52555a' secureTextEntry={true}/>
          <TouchableOpacity style={{position:'absolute',right:10,height:20,top:25}}>
          <Image source={require('../../assets/icons/ic_eye_view.png')} />
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn_save} onPress={() => navigation.navigate('Main')}>
        <Text style={{color: 'white', fontSize: 18, padding: 15, fontWeight:'bold'}} >Save</Text>
      </TouchableOpacity> 
      </View>

    </SafeAreaView>
  )
}

export default PersonalDetail

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0c0f14',
    flex:1
  },
  input: {
    borderWidth:1,
    width: '100%',
    height: 50,
    borderColor: '#252A32',
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    color: '#52555a'
  },
  btn_save: {
    width: '100%',
    backgroundColor: '#d17842',
    marginTop: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
})