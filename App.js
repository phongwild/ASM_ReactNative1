import Login_Screen from './Screen/Login_Screen';
import Register_Screen from './Screen/Register_Screen';
import Main_Container from './Screen/Main_Container';
import Setting_Screen from './Screen/Setting_Screen';
import PersonalDetail from './Screen/Setting/PersonalDetail';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Detail_Product from './Screen/Detail_Product';
import History from './Screen/Setting/History';
import Splash_Screen from './Screen/Splash_Screen';
import { StatusBar } from 'react-native';



export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#0c0f14'} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Splash' component={Splash_Screen} options={{ headerShown: false }} />
        <Stack.Screen name='LoginScreen' component={Login_Screen} options={{ headerShown: false }} />
        <Stack.Screen name='RegisterScreen' component={Register_Screen} options={{ headerShown: false }} />
        <Stack.Screen name='Main' component={Main_Container} options={{ headerShown: false }} />
        <Stack.Screen name='Settting' component={Setting_Screen} options={{ headerShown: false }} />
        <Stack.Screen name='Personal' component={PersonalDetail} options={{ headerShown: false }} />
        <Stack.Screen name='DetailProduct' component={Detail_Product} options={{ headerShown: false }} />
        <Stack.Screen name='His' component={History} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
