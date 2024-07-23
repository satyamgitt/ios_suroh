/* eslint-disable prettier/prettier */
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MainTabScreen from './MainTabScreen';
import LocationStatusScreen from './BottomTabNavi/Home/LocationStatusScreen';
import ModeScreen from './BottomTabNavi/Home/Mode/Modes';
import TimerScreen from './BottomTabNavi/Home/Mode/TimerPicker';
import ModeSettingsScreen from './BottomTabNavi/Home/Mode/ModeSettings';
import TimerAdd from './BottomTabNavi/Home/Mode/TimerAdd';
import ScheduleLocation from './BottomTabNavi/Schedule/ScheduleLocation';
import SwitchScheduleList from './BottomTabNavi/Schedule/SwitchScheduleList';
import EditTimer from './BottomTabNavi/Schedule/EditTimer';
import AddTimerSettings from './BottomTabNavi/Schedule/AddTimerSettings';
import Select_Switches from './BottomTabNavi/Schedule/SelectingSwitches';
import SwitchSceduleTimer from './BottomTabNavi/Schedule/SwitchScheduleTimer';
import PreeSetting from './Drawer/PreeSetting';
import Scroll from './Drawer/scroll';
import Schedule2 from '../screens/BottomTabNavi/Schedule/Schedule2'
import { useTheme } from '@react-navigation/native';
import TogelScreen from './BottomTabNavi/Auto/TogelScreen';



const RootStack = createStackNavigator();

const getHour = () => {
    var myDate = new Date();
    var hrs = myDate.getHours();
    if (hrs < 12) return 'Hi, Good Morning';
    else if (hrs >= 12 && hrs <= 17) return 'Hi, Good Afternoon';
    else if (hrs >= 17 && hrs <= 24) return 'Hi, Good Evening';


};



const themecolor = () => {
    const theme = useTheme();
    // const styles = useStyles(theme);
    // const { colors } = { ...theme };
    if (theme.dark) {
        return "#1a1f25"
    } else {
        return "#117C6F"
    }
}

const themeText = () => {
    const theme = useTheme();
    if (theme.dark) {
        return "#fbffff"
    } else {
        return "#DAE2DF"
    }
}

const HomeStackNavi = ({ navigation }) => (
    <RootStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387',
            backgroundColor: themecolor(),
            borderRadius: 15,
        },

        headerTintColor: themeText(),
        headerTitleStyle: {
            fontWeight: '250',
            fontStyle: 'serif',
            fontWeight: 'bold',
        },
    }}>




        <RootStack.Screen name='HomeDrawer'
            options={{
                title: getHour(),

                headerRight: () => (
                    <Image
                        style={{ marginTop: 30, marginRight: 20, marginBottom: 30, width: 40, height: 40, }}
                        source={require('../assets/logo.png')} tintColor={themeText()}
                    />
                ),
                headerLeft: () => (
                    <Icon.Button
                        name="ios-menu"
                        color={themeText()}
                        size={25}
                        backgroundColor={themecolor()}
                        onPress={() => navigation.openDrawer()}
                    />
                ),
            }}
            component={MainTabScreen} />

        <RootStack.Screen name='ChangeTheme' component={TogelScreen}
            // options={({ route }) => (route.params)}
            options={{
                title: getHour(),

                headerRight: () => (
                    <Image
                        style={{ marginTop: 30, marginRight: 20, marginBottom: 30, width: 40, height: 40, }}
                        source={require('../assets/logo.png')} tintColor={themeText()}
                    />
                ),
                headerLeft: () => (
                    <Icon.Button
                        name="ios-menu"
                        color={themeText()}
                        size={25}
                        backgroundColor={themecolor()}
                        onPress={() => navigation.openDrawer()}
                    />
                ),
            }}
            
            />

        <RootStack.Screen name='other' component={LocationStatusScreen}
            options={({ route }) => ({ title: route.params.location })} />
        <RootStack.Screen name='modes' component={ModeScreen} />
        <RootStack.Screen name='modesettings' component={ModeSettingsScreen}
            options={({ route }) => ({ title: route.params.modename })} />
        <RootStack.Screen name='timer' component={TimerScreen} />
        <RootStack.Screen name="Add New Schedule" component={TimerAdd} />

        <RootStack.Screen name='schedule location' component={ScheduleLocation} />
        <RootStack.Screen name='Scheduled list' component={SwitchScheduleList} />
        <RootStack.Screen name='Change Schedule' component={EditTimer} />
        <RootStack.Screen name='Add Schedule' component={AddTimerSettings}
            options={({ route }) => (route.params)} />
        <RootStack.Screen name='Select Switch' component={Select_Switches}
            options={({ route }) => (route.params)} />

        <RootStack.Screen name='Schedule' component={Schedule2}
            options={({ route }) => (route.params)} />
        <RootStack.Screen name='SwitchScheduletime' component={SwitchSceduleTimer}
            options={({ route }) => (route.params)} />

        <RootStack.Screen name='schedule time' component={SwitchSceduleTimer} />

        <RootStack.Screen name='scrolling' component={Scroll} />

        <RootStack.Screen name='PreesetSwitches' component={PreeSetting}
            options={({ route }) => (route.params)} />






    </RootStack.Navigator>
);

export default HomeStackNavi;


