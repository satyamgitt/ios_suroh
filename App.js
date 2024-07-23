
//  "PROVIDER WHICH WILL CONNECT OUR REDUX STORE TO THE REACT APP"
import { Provider } from 'react-redux';
//  store of redux
import store from './src/redux/store';

import React, { useEffect } from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';


import { DrawerContent } from './src/screens/Drawer/DrawerContent';
import MainTabScreen from './src/screens/MainTabScreen';
import HomeStackScreen from './src/screens/MainTabScreen';
import ProfileusersScreen from './src/screens/Drawer/Profileusers';
// import TogelScreen from './src/screens/Drawer/TogelScreen.jsx';
import PreeSetting from './src/screens/Drawer/PreeSetting';
import PresetSelect from './src/screens/Drawer/PresetSelect';
//  TrackScreen from './src/screens/Drawer/TrackScreen';

import SettingScreen from './src/screens/Drawer/SettingsScreen';
import HomeStackNavi from './src/screens/HomeStackNavi';

import { AuthContext } from './src/components/context';

import RootStackScreen from './src/screens/SignIn/RootStackScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';



import GeneralSetting from './src/screens/BottomTabNavi/Schedule/scheduling';
import WifiInitialScreen from './src/screens/WifiInitialSetup';
import Changeip from './src/screens/Drawer/Change-ip';
import { useTheme } from 'react-native-paper';
import HomeS from './src/screens/BottomTabNavi/Home/HomeS';
import WifiRegister from './src/screens/Drawer/WifiRegister'
// import SplashScreen from 'react-native-splash-screen';
import getwifi from './src/config/ip_address'
import TogelScreen from './src/screens/BottomTabNavi/Auto/TogelScreen';


const { width, height } = Dimensions.get('screen');


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null); 

  const [isDarkTheme, setIsDarkTheme] = React.useState(true);




  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#DAE2DF',
      text: '#ffffff',
      locationtext: '#0A171A',
      cardtext: '#0A171A',
      iconcolor: '#0A171A',
      logintext: '#0d0d0d',
      card: '#177C6F',
      locationcard: '#A0BBBF',
      // cardboard: '#4d4b4b',
      modalcolor: '#DAE2DF',
      modaltext: '#0A171A',
      modaltitletext: '#0A171A',
      modalbuttons: '#117C6F',

    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#1a1f25',
      text: '#fbffff',
      cardtext: "#abb0b3",
      logintext: '#0d0d0d',
      iconcolor: '#abb0b3',
      card: '#323F4B',
      locationcard: '#262D35',
      locationtext: '#fbffff',
      // cardboard: '#4d4b4b',
      modalcolor: '#1a1f25',
      modaltext: '#abb0b3',
      modaltitletext: '#fbffff',
      modalbuttons: '#262D35',

    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (foundUser) => {
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;
      const _firstName = foundUser[0].firstName;
      const _lastName = foundUser[0].lastName;
      const slno = String(foundUser[0].id);
      const userType = foundUser[0].usertype;
      const _email = foundUser[0].email;

      try {
        await AsyncStorage.setItem('email', _email);
      } catch (e) {
        console.log(e);
      }
      try {
        await AsyncStorage.setItem('username', userName);
      } catch (e) {
        console.log(e);
      }
      try {
        await AsyncStorage.setItem('firstName', _firstName);
      } catch (e) {
        console.log(e);
      }
      try {
        await AsyncStorage.setItem('lastName', _lastName);
      } catch (e) {
        console.log(e);
      }
      try {
        await AsyncStorage.setItem('id', slno);
      } catch (e) {
        console.log(e);
      }

      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.log(e);
      }

      try {
        await AsyncStorage.setItem('usertype', userType);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: slno, token: userToken, username: userName });
    },
    signOut: async () => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('email');
      } catch (e) {
        console.log(e);
      }
      try {
        await AsyncStorage.removeItem('username');
      } catch (e) {
        console.log(e);
      }
      try {
        await AsyncStorage.removeItem('firstName');
      } catch (e) {
        console.log(e);
      }
      try {
        await AsyncStorage.removeItem('lastName');
      } catch (e) {
        console.log(e);
      }
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      try {
        await AsyncStorage.removeItem('id');
      } catch (e) {
        console.log(e);
      }
      try {
        await AsyncStorage.removeItem('usertype');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    }
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
    getwifi()
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer theme={theme}>
            {loginState.userToken !== null ? 
            (
              <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={props => <DrawerContent {...props} />}>
                <Drawer.Screen name="Home" component={HomeStackNavi} />
                {/* <Drawer.Screen name="HomeDrawer" component={MainTabScreen} /> */}
                {/* <Drawer.Screen name="HomeDrawer" component={HomeStackScreen} /> */}
                <Drawer.Screen name="Users" component={ProfileusersScreen} />
                {/* <Drawer.Screen name="TogelScreenchange" component={TogelScreen} /> */}
                <Drawer.Screen name="PreeSetingScreen" component={PresetSelect} />
                <Drawer.Screen name="ChangeTheme" component={TogelScreen} />

                {/* <Drawer.Screen name="Track" component={TrackScreen} /> */}
                <Drawer.Screen name="Changeip" component={Changeip} />

                <Drawer.Screen name="HomeS" component={HomeS} />

                <Drawer.Screen name="wifiregister" component={WifiRegister} />

                <Drawer.Screen name="Settings" component={SettingScreen} />
                {/* <Drawer.Screen name="WiFiInitial" component={WifiInitialScreen} /> */}
              </Drawer.Navigator>
            )
              :
              <RootStackScreen />
            }
          </NavigationContainer>
        </AuthContext.Provider>
      </PaperProvider>
    </Provider>
  );
}

export default App;