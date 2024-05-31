import { Alert, Button, Image, Modal, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DATABASE, FIREBASE_AUTH, FIREBASE_APP } from '../FirebaseConfig';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { get, ref, } from "@firebase/database";
import IonIcon from 'react-native-vector-icons/Ionicons'


const Login_Screen = ({ navigation }) => {
  // const [Data, setData] = useState([ ]);
  const [EntryText, setEntryText] = useState(true);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showModal, setshowModal] = useState(false);
  const [succ, setsucc] = useState(false);
  const [er, seter] = useState(false);
  const Login = () => {
    const refd = ref(DATABASE, 'users');
    if (email.length == '' || pass.length == '') {
      setshowModal(true);
    } else {
      get(refd).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const users = Object.values(data);
          const user = users.find((user) => user.email === email && user.pass === pass);
          if (user) {
            ToastAndroid.show(`Hello ${user.name}`, ToastAndroid.SHORT);
            navigation.navigate('Main');
          } else seter(true)
        }
      });
    }
  }
  useEffect(() => {
    const refd = ref(DATABASE, 'users');
    get(refd).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
      }
      else console.log('K có dữ liệu');
    });
    FIREBASE_APP;
  }, []);


  return (
    <View style={styles.backGround}>
      <StatusBar backgroundColor={'#0c0f14'}/>
      <Image source={require('../assets/logo_app.png')} style={{ width: 142, height: 142, marginTop: 100 }} />
      <Text style={{ textAlign: 'center', marginTop: 20, }}>
        <Text style={styles.welcome}>Welcome to Lungo !!</Text>
      </Text>
      <Text style={{ color: '#52555a', textAlign: 'center', marginTop: 20, fontSize: 16, marginBottom: 20 }}>
        Login to Continue
      </Text>
      <TextInput style={styles.input} placeholder='Email' inputMode='email' placeholderTextColor='#52555a' onChangeText={(txt) => setEmail(txt)} />
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TextInput style={{
          borderWidth: 1,
          width: '100%',
          height: 50,
          borderColor: '#252A32',
          borderRadius: 10,
          marginTop: 10,
          padding: 10,
          color: '#52555a',
        }} placeholder='Password' placeholderTextColor='#52555a' secureTextEntry={EntryText} onChangeText={(txt) => setPass(txt)} />
        <TouchableOpacity style={{ position: 'absolute', right: 10, height: 20, top: 25 }} onPress={() => setEntryText(!EntryText)}>
          {EntryText ? <IonIcon name='eye-off-outline' size={25} color={'#252A32'} /> : <IonIcon name='eye-outline' size={25} color={'#252A32'} />}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btn_login} onPress={() => Login()}>
        <Text style={{ color: 'white', fontSize: 18, padding: 18, fontWeight: 'bold' }} >Sign In</Text>
      </TouchableOpacity>
        <TouchableOpacity style={{
          width: '100%',
          backgroundColor: '#fff',
          marginTop: 10,
          borderRadius: 20,
          alignItems: 'center',
          height:60,
          justifyContent:'center',
          flexDirection:'row',
          paddingLeft:20
        }}>
          <View style={{flex:1}}>
          <Image source={require('../assets/icons/ic_google.png')} style={{width:20, height:20}}/>
          </View>
          <Text style={{ color: '#000', fontSize: 18, padding: 18, fontWeight: 'bold', flex:3 }} >Sign in with Google</Text>
          <View style={{flex:1}} ></View>
        </TouchableOpacity>  

      <TouchableOpacity style={styles.textRegister}>
        <Text style={{ color: '#52555a', fontWeight: 'bold' }}>Don't have account?</Text>
        <Text style={{ fontWeight: 'bold', color: '#d17842', fontWeight: 'bold' }} onPress={() => navigation.navigate('RegisterScreen')}> Register</Text>
      </TouchableOpacity>
      <Modal
        animationType='fade'
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setshowModal(false);
        }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
          <View style={{ width: 250, height: 100, backgroundColor: '#52555a', alignItems: 'center', justifyContent: 'center', borderRadius: 10, padding: 5 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>Vui lòng nhập đầy đủ thông tin</Text>
            <TouchableOpacity style={{ width: '100%', justifyContent: 'center', alignItems: 'center', width: 100, height: 40, marginTop: 10, backgroundColor: '#d17842', borderRadius: 10 }}
              onPress={() => setshowModal(false)}
            >
              <Text style={{ color: '#fff', fontSize: 14 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType='fade'
        transparent={true}
        visible={er}
        onRequestClose={() => {
          seter(false);
        }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
          <View style={{ width: 250, height: 100, backgroundColor: '#52555a', alignItems: 'center', justifyContent: 'center', borderRadius: 10, padding: 5 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>Sai Email hoặc Password</Text>
            <TouchableOpacity style={{ width: '100%', justifyContent: 'center', alignItems: 'center', width: 100, height: 40, marginTop: 10, backgroundColor: '#d17842', borderRadius: 10 }}
              onPress={() => seter(false)}
            >
              <Text style={{ color: '#fff', fontSize: 14 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}


export default Login_Screen

const styles = StyleSheet.create({
  backGround: {
    backgroundColor: '#0c0f14',
    height: '100%',
    alignItems: 'center',
    padding: 20,

  },
  welcome: {
    color: 'white',
    textAlign: 'center',
    fontSize: 28,
    marginTop: 300,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    width: '100%',
    height: 50,
    borderColor: '#252A32',
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    color: '#52555a',
    fontWeight: '700'
  },
  btn_login: {
    width: '100%',
    backgroundColor: '#d17842',
    marginTop: 30,
    borderRadius: 20,
    alignItems: 'center'
  },
  textRegister: {
    color: 'white',
    fontSize: 16,
    marginTop: 20,
    flexDirection: 'row'
  }
})