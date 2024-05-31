import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Alert, Pressable, Modal, StatusBar } from 'react-native'
import React, {useState} from 'react'
// import { firebase } from '@react-native-firebase/auth';
import { DATABASE, FIREBASE_AUTH } from '../FirebaseConfig';
import { ref, set  } from "@firebase/database";
import { createUserWithEmailAndPassword } from '@firebase/auth';

const Register_Screen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [rePass, setrePass] = useState('');
  const [hiddenPass, sethiddenPass] = useState(true);
  const [entry, setentry] = useState(true);
  const [showModal, setshowModal] = useState(false);
  const [showModalPass, setshowModalPass] = useState(false);
  const [showModalSuccess, setshowModalSuccess] = useState(false)
  const register_component = async () => {
    const autoId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    if (name.length == '' || email.length == '' || pass.length == '' || rePass.length == '') {
      setshowModal(true);
    }else if (rePass != pass) {
      setshowModalPass(true);
    }else{
        set(ref(DATABASE, 'users/' + `user${autoId}` ), {
          name: name,
          email: email,
          pass: pass
        });
        await createUserWithEmailAndPassword(FIREBASE_AUTH, email, pass);
      setshowModalSuccess(true);
      navigation.navigate('LoginScreen')
    }
  }
  

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#0c0f14'}/>
      <Image source={require('../assets/logo_app.png')} style={{width:142, height:142, marginTop: 100}} />
      <Text style={styles.welcome}>
        <Text>Welcome to Coffee Store !!</Text>
      </Text>
      <Text style={{color:'#52555a', fontSize:16, marginTop: 10, fontWeight:'bold'}}>Register to Continue</Text>
      <TextInput style={styles.input} placeholder='Name' placeholderTextColor='#52555a' onChangeText={(name) => setName(name)}/>
      <TextInput style={styles.input} placeholder='Email' placeholderTextColor='#52555a' inputMode='email' onChangeText={(email) => setEmail(email)}/>
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
        }} placeholder='Password' placeholderTextColor='#52555a' secureTextEntry={hiddenPass} onChangeText={(pass) => setPass(pass)}/>
        <TouchableOpacity style={{position:'absolute',right:10,height:20,top:25}} onPress={() => sethiddenPass(!hiddenPass)}>
        {hiddenPass ? <Image source={require('../assets/icons/ic_eye_hide.png')} style={{width:24, height:24}}/> : <Image source={require('../assets/icons/ic_eye_view.png')} style={{width:24, height:24}} />}
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
        }} placeholder='Re-type password' placeholderTextColor='#52555a' secureTextEntry={entry} onChangeText={(rePass) => setrePass(rePass)}/>
        <TouchableOpacity style={{position:'absolute',right:10,height:20,top:25}} onPress={() => setentry(!entry)}>
        {hiddenPass ? <Image source={require('../assets/icons/ic_eye_hide.png')} style={{width:24, height:24}}/> : <Image source={require('../assets/icons/ic_eye_view.png')} style={{width:24, height:24}} />}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btn_register} onPress={() => {register_component()}}>
        <Text style={{color: 'white', fontSize: 18, padding: 18, fontWeight:'bold'}}>Register</Text>
      </TouchableOpacity>  
      <Text style={{ fontSize:16, fontWeight:'bold', marginTop:10}}>
        <Text style={{color:'#52555a'}}>You have an account? </Text>
        <Text style={{color:'#d17842'}} onPress={() => navigation.navigate('LoginScreen')} >Sign in</Text>
      </Text>
      <Modal
        animationType='fade'
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setshowModal(false);
        }}
        
      >
        <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'transparent'}}>
          <View style={{width:250, height:100, backgroundColor:'#52555a', alignItems:'center', justifyContent:'center', borderRadius:10, padding: 5}}>
            <Text style={{color:'#fff', fontWeight:'bold',fontSize:14}}>Vui lòng nhập đầy đủ thông tin</Text>
            <TouchableOpacity style={{width:'100%', justifyContent:'center', alignItems:'center', width:100, height:40, marginTop:10, backgroundColor:'#d17842', borderRadius:10}}
              onPress={() => setshowModal(false)}
            >
              <Text style={{color:'#fff',fontSize:14}}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType='fade'
        transparent={true}
        visible={showModalPass}
        onRequestClose={() => {
          setshowModal(false);
        }}
        
      >
        <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'transparent'}}>
          <View style={{width:250, height:100, backgroundColor:'#52555a', alignItems:'center', justifyContent:'center', borderRadius:10, padding: 5}}>
            <Text style={{color:'#fff', fontWeight:'bold',fontSize:14}}>Re-type password không trùng khớp</Text>
            <TouchableOpacity style={{width:'100%', justifyContent:'center', alignItems:'center', width:100, height:40, marginTop:10, backgroundColor:'#d17842', borderRadius:10}}
              onPress={() => setshowModalPass(false)}
            >
              <Text style={{color:'#fff',fontSize:14}}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType='fade'
        transparent={true}
        visible={showModalSuccess}
        onRequestClose={() => {
          setshowModal(false);
        }}
        
      >
        <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'transparent'}}>
          <View style={{width:250, height:100, backgroundColor:'#52555a', alignItems:'center', justifyContent:'center', borderRadius:10, padding: 5}}>
            <Text style={{color:'#fff', fontWeight:'bold',fontSize:14}}>Tạo tài khoản thành công</Text>
            <TouchableOpacity style={{width:'100%', justifyContent:'center', alignItems:'center', width:100, height:40, marginTop:10, backgroundColor:'#d17842', borderRadius:10}}
              onPress={() => setshowModalSuccess(false)}
            >
              <Text style={{color:'#fff',fontSize:14}}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
  
}

export default Register_Screen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0c0f14',
        height: '100%',
        alignItems:'center',
        padding: 20,
    },
    input: {
        borderWidth:1,
        width: '100%',
        height: 50,
        borderColor: '#252A32',
        borderRadius: 10,
        marginTop: 10,
        padding: 10,
        color: '#52555a',
    },
    welcome: {
        color: 'white',
        textAlign: 'center',
        fontSize: 26,
        fontWeight: 'bold'
    },
    btn_register: {
        width: '100%',
        backgroundColor: '#d17842',
        marginTop: 30,
        borderRadius: 20,
        alignItems: 'center'
    },

})