/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/dist/FontAwesome';
import Ico from 'react-native-vector-icons/MaterialCommunityIcons';
import Fether from 'react-native-vector-icons/Feather';

import { AuthContext } from '../../components/context';
import { getUsername, getLastname, getFirstname, getAmps, getWatts } from '../AsyncStorage';
import { color, Value } from 'react-native-reanimated';

export function DrawerContent(props) {
    const [fName, setFname] = useState('');
    const [lName, setlName] = useState('');
    const [userName, setuserName] = useState('');

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    const [amps, setamps] = useState('');
    const [watt, setwatt] = useState('');
    const init = async () => {
        setFname(await getFirstname());
        setlName(await getLastname());
        setuserName(await getUsername());
        setamps(await getAmps());
        setwatt(await getWatts());
        // return (fName, lName, userName);

    };

    useEffect(() => {
        init();
        return () => { }
    }, []);

    console.log(fName, 'drawer');
    console.log(amps, watt, 'drawer');

    const paperTheme = useTheme();
    const { colors } = useTheme();

    const { signOut, toggleTheme } = React.useContext(AuthContext);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };


    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{
                                    // uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                    uri: 'https://reactjs.org/logo-og.png'
                                }}
                                size={50}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>{fName} {lName}</Title>
                                <Caption style={styles.caption}>@{userName}</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>{amps}</Paragraph>
                                <Caption style={styles.caption}>Amps</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>{watt}</Paragraph>
                                <Caption style={styles.caption}>Watts</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => { props.navigation.navigate('Home') }}
                        />
                        {/* <DrawerItem
                            icon={({ color, size }) => (
                                <Fether
                                    name="users"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Users"
                            onPress={() => { props.navigation.navigate('Users') }}
                        /> */}
                        {/* <DrawerItem
                            icon={({ color, size }) => (
                                <Ico
                                    name="lock-reset"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="TogelScreenchange"
                            onPress={() => { props.navigation.navigate('TogelScreenchange') }}
                        /> */}


                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icons
                                    name="bar-chart"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Preset"
                            onPress={() => { props.navigation.navigate('PreeSetingScreen') }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Fether
                                    name="settings"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => { props.navigation.navigate('Settings') }}
                        />
                    </Drawer.Section>

                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => { toggleTheme() }}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark} />
                                </View>
                            </View>
                        </TouchableRipple>

                        <TouchableRipple onPress={() => { props.navigation.navigate('ChangeTheme') }}>
                            <View style={styles.preference}>
                                <Text>Simple Theme</Text>
                                <View pointerEvents="none">
                                    {/* <Switch value={paperTheme.dark} /> */}
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>


                    <Drawer.Section title="Wifi-Setup">
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Fether
                                    name="settings"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Wifi"
                            onPress={() => { props.navigation.navigate('wifiregister') }}
                        />
                    </Drawer.Section>


                    <DrawerItem
                        icon={({ color, size }) => (
                            <Ico
                                name="router-wireless-settings"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Change-IP"
                        onPress={() => { props.navigation.navigate('Changeip') }}
                    />


                    <DrawerItem
                        icon={({ color, size }) => (
                            <Ico
                                name="router-wireless-settings"
                                color={color}
                                size={size}
                            />
                        )}
                        label="HomeS"
                        onPress={() => { props.navigation.navigate('HomeS') }}
                    />

                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="exit-to-app"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Sign Out"
                        onPress={() => { signOut() }}
                    />
                </View>
            </DrawerContentScrollView>
            {/* <DrawerItem
                icon={({ color, size }) => (
                    <Icon
                        name="exit-to-app"
                        color={color}
                        size={size}
                    />
                )}
                label="Sign Out"
                onPress={() => { signOut() }}
            /> */}
            <Drawer.Section style={styles.bottomDrawerSection}>
                <Title style={styles.titlecom}>Pyrox I-City Pvt.Ltd</Title>
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    titlecom: {
        fontSize: 16,
        marginTop: 3,
        marginHorizontal: 65,
        fontWeight: 'bold',
    },
});
