/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";


import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Ico from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import HomeScreen from './BottomTabNavi/Home/HomeScreen';
import RecentScreen from './BottomTabNavi/Recent/RecentScreen';
import AutoManualScreen from './BottomTabNavi/Auto/AutoManualScreen';
import NotificationsScreen from './BottomTabNavi/Notification/NotificationsScreen';
// import scheduleNav from './BottomTabNavi/Schedule/scheduleNav';
//import PreeSetting from './Drawer/PreeSetting';
import PresetSelect from './Drawer/PresetSelect';
// import HomeS from './BottomTabNavi/Home/HomeS';
// import Schedule2 from './BottomTabNavi/Schedule/Schedule2'
import Scheduling from './BottomTabNavi/Schedule/scheduling'
import { useTheme } from '@react-navigation/native';
import TogelScreen from './BottomTabNavi/Auto/TogelScreen';
// import TogelScreen from './BottomTabNavi/Auto/TogelScreen.jsx';


const ScheduleStackNav = createStackNavigator();
const AutoManualStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const PreeSetingStack = createStackNavigator();
const TogelScreenStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// const getHour = () => {
//   var myDate = new Date();
//   var hrs = myDate.getHours();
//   if (hrs < 12) return 'Good Morning';
//   else if (hrs >= 12 && hrs <= 17) return 'Good Afternoon';
//   else if (hrs >= 17 && hrs <= 24) return 'Good Evening';
// };

const themetabcolor = () => {
  const theme = useTheme();
  // const styles = useStyles(theme);
  // const { colors } = { ...theme };
  if (theme.dark) {
    return "#1a1f25"
  } else {
    return "#117C6F"
  }
}


const MainTabScreen = () => (


  <Tab.Navigator initialRouteName="AutoManual" activeColor="#ffff">
    <Tab.Screen
      name="AutoManual"
      component={AutoManualStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: themetabcolor(),
        tabBarIcon: () => <Ico name="developer-board" color="#ffffff" size={26} />

      }}
    />
    <Tab.Screen
      name="Settings"
      component={scheduleStackScreen}
      options={{
        tabBarLabel: 'Schedule',
        // tabBarColor: '#282929',
        tabBarColor: themetabcolor(),
        // tabBarIcon: ({ color }) => (
        //   // <Feather name="sliders" color="#DAE2DF" size={26} />
        //   <Feather name="sliders" color="#3D5C64" size={26} />

        // ),
        tabBarIcon: () => <Feather name="sliders" color="#ffffff" size={26} />

      }}
    />
    <Tab.Screen
      name="Notifications"
      component={NotificationsStackScreen}
      options={{
        tabBarLabel: 'Notifications',
        tabBarColor: themetabcolor(),
        tabBarIcon: () => <Icon name="ios-notifications" color="#ffffff" size={26} />

      }}
    />
    <Tab.Screen
      name="PreeSetingScreen"
      component={PresetSelect}
      options={{
        tabBarLabel: 'PreeSet',
        tabBarColor: themetabcolor(),
        tabBarIcon: () => <Ionicons name="settings-sharp" color="#ffffff" size={26} />
      }}
    />
    {/* <Tab.Screen
      name="ChangeTheme"
      component={TogelScreenStackScreen}
      options={{
        tabBarLabel: 'ChangeTheme',
        tabBarColor: themetabcolor(),
        tabBarIcon: () => <Ionicons name="settings-sharp" color="#ffffff" size={26} />
      }}
    /> */}


  </Tab.Navigator>


)
export default MainTabScreen;



const scheduleStackScreen = ({ navigation, route }) => (


  <ScheduleStackNav.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName='General'>
    <ScheduleStackNav.Screen
      name="schedule"
      // component={scheduleNav}
      component={Scheduling}
    // component={Schedule2}
    />
  </ScheduleStackNav.Navigator>

);



const AutoManualStackScreen = ({ navigation }) => (

  <AutoManualStack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="AutoManual">
    <AutoManualStack.Screen
      name="AutoManual"
      component={AutoManualScreen}
      options={{
        // title: getHour(),
        headerRight: () => (
          <Image
            style={{ marginTop: 30, marginRight: 10, width: 40, height: 40 }}
            source={require('../assets/logo.png')}
          />
        ),
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            color="#949191"
            size={25}
            backgroundColor="#282929"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </AutoManualStack.Navigator>

);


const NotificationsStackScreen = ({ navigation }) => (
  <NotificationsStack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName='Notifications'>
    <NotificationsStack.Screen
      name="Notifications"
      component={NotificationsScreen}
      options={{
        // title: getHour(),
        headerRight: () => (
          <Image
            style={{ marginTop: 30, marginRight: 10, width: 40, height: 40 }}
            source={require('../assets/logo.png')}
          />
        ),

        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            color="#949191"
            size={25}
            backgroundColor="#282929"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </NotificationsStack.Navigator>
);


const TogelScreenStackScreen = ({ navigation }) => (
  <TogelScreenStack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName='ChangeTheme'>
    <TogelScreenStack.Screen
      name="ChangeTheme"
      component={TogelScreen}
      options={{
        // title: getHour(),
        headerRight: () => (
          <Image
            style={{ marginTop: 30, marginRight: 10, width: 40, height: 40 }}
            source={require('../assets/logo.png')}
          />
        ),

        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            color="#949191"
            size={25}
            backgroundColor="#282929"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </TogelScreenStack.Navigator>
);

