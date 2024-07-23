/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { View, StatusBar, Text, StyleSheet, Dimensions, ScrollView, SafeAreaView, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Ico from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes, { array } from 'prop-types';

// import AsyncStorage from '@react-native-community/async-storage';

import { homeStatus } from '../../../redux/actions/homeStatus';
import { amps_watts } from '../../../redux/actions/amps_watts';
import { getipAddr, setipAddr, getSlno, getApms } from '../../AsyncStorage';
import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';
import { useTheme } from '@react-navigation/native';
// import { color } from 'react-native-elements/dist/helpers';
// import { colors } from 'react-native-elements';
// import { Raspb_ip } from '../../../redux/actions/Raspb_ip';

const { width, height } = Dimensions.get('screen');
const diognal = height / width;
const size = diognal * 6.65;

var sl_no;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

let currentNetwork;

NetInfo.fetch().then((state) => {
    currentNetwork = state.type;
});
const HomeScreen = ({ navigation, getStatus, getApms }) => {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [status, setStatus] = useState([]);
    const [amps, setAmps] = useState('');
    const [watts, setWatts] = useState('');
    const [ipnum, setIpno] = useState('52.66.113.96');


    const [netInfo, setNetInfo] = useState(currentNetwork);

    const theme = useTheme();
    const styles = useStyles(theme);
    const { colors } = { ...theme };

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Alert.alert('Refreshed');
            getData(sl_no);
        });
        return unsubscribe;
    }, [navigation]);

    const onRefresh = () => {
        setLoading(false);
        getData(sl_no);
        setRefreshing(true);
        // unsubscribe();
        // wait(2000).then(() => setRefreshing(false));
    };


    useEffect(async () => {
        sl_no = await getSlno();
        const unsubscribe = NetInfo.addEventListener((state) => {
            // console.log("Connection type", state.type);
            if (state.type == "wifi") {
                // console.log('hi 1')
                const params = [{ sl_no: sl_no }]
                axios({
                    method: "POST",
                    url: "http://192.168.1.42/i-switch/automation/pingAPI.php",
                    data: params,
                    timeout: 2000
                })
                    .then(res => {
                        if (res.data == "1") {
                            setIpno('192.168.1.42');
                            // setipAddr(ipnum);

                            //getStatus(send)
                        }
                        else if (res.data == "0") {
                            setIpno('52.66.113.96');
                            // setipAddr(ipnum);

                        }
                    })
                    .catch(err => {
                        // console.log("error in request", err);
                        setIpno('52.66.113.96');
                        // setipAddr(ipnum);

                    });

            } else if (state.type == 'cellular') {
                // console.log('hi 7')
                // getData(sl_no);
                setIpno('52.66.113.96');

            }
            // else if (state.type == 'none' || state.type == 'unknown') {
            //     // console.log('hi 2')
            //     // alert('No internet');
            // }
            console.log('ip addres', ipnum);
            setipAddr(ipnum);
            setNetInfo(state.type);

        });

        return () => unsubscribe();
    }, [ipnum]);

    useEffect(() => {
        console.log('change in network');
        if (netInfo != 'none' || netInfo != 'unknow') {
            setTimeout(async () => {
                console.log('useeffect()');
                sl_no = await getSlno();

                setLoading(true);
                getData(sl_no);
            }, 1000);
            // const ip = async () => {
            //     let ip_Add = await getipAddr();
            //     console.log('async ip addr retrive', ip_Add);
            // }
            // ip();
        }

    }, [netInfo]);


    const getData = (sl_no) => {
        const send = [];
        const no = { sl_no: sl_no, ip: ipnum };
        send.push(no);
        send.push();
        getStatus(send)
            .then(response => {
                setRefreshing(false);
                setStatus(response);
                //console.log(JSON.stringify(response));
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
        // getApms(send)
        //     .then(response => {
        //         console.log('amps details');
        //         //console.log(response, 'dtfsud');
        //         // eslint-disable-next-line no-lone-blocks
        //         {
        //             response.map(s => (
        //                 setAmps(s.amps),
        //                 setWatts(s.watts)));
        //             AsyncStorage.setItem('amps', amps);
        //             //console.log('1234');
        //             AsyncStorage.setItem('watts', watts);
        //         }
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });

    };

    return (
        <View style={styles.container}>
            {/* <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
            <StatusBar backgroundColor={theme.dark ? "#0d0d0d" : "#ffffff"} /> */}
            <StatusBar barStyle={theme.dark ? "dark-content" : "light-content"} />
            <StatusBar backgroundColor={theme.dark ? "#DAE2DF" : "#117C6F"} />
            <SafeAreaView>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <Text />
                    {loading ? (
                        <View style={{ paddingTop: 300 }}>
                            <ActivityIndicator size="large" color="#ffffff" /></View>
                    ) : (
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }}>
                            {status.map(s => (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('other', { location: s.location })}>
                                    <View style={styles.card}>
                                        <Text style={styles.cardTitle}>{s.location}</Text>
                                        <View style={{ flexDirection: 'row', marginTop: diognal * 1.74 }}>
                                            <Icon style={styles.icon} name="thermometer" size={size} />
                                            <Text style={styles.cardText}>{s.temp.slice(0, 4)}&deg;c </Text>
                                            <Ico style={styles.icon} name="brightness-6" size={size} />
                                            <Text style={styles.cardText}>{s.lux.slice(0, 4)}%</Text>
                                        </View>
                                        <View style={styles.text_color}>
                                            <Text style={styles.modecolor}>Mode:{s.modes == null ? <Text style={{ color: colors.text }}> General</Text> : <Text style={{ color: colors.text }}> {s.modes.slice(0, 4)}</Text>}<Text> </Text>
                                                <Icon style={[styles.icon, { alignContent: "flex-end" }]} name="edit" size={15} />
                                            </Text>
                                        </View>



                                        {/* {s.modes != null ? (
                                            <View style={{ flexDirection: 'row', marginTop: diognal * 4.74 }}>
                                                <Icon style={styles.icon} name={s.modes === 'Study' ? 'book-open' : s.modes === 'Night' ? 'moon' : s.modes === 'Noon' ? 'sun' : null} size={size} />
                                                <Text style={{ marginLeft: 2, fontSize: 12 }}>{s.modes} Mode</Text>
                                            </View>
                                        ) : <View style={{ flexDirection: 'row', marginTop: diognal * 4.74 }}>
                                            <I style={styles.icon} name="auto-fix-normal" size={size} />
                                            <Text style={{ marginLeft: 2, fontSize: 12 }}>General Mode</Text>
                                        </View>} */}
                                        <View style={{ flexDirection: 'row', marginTop: diognal * 3.8 }}>
                                            <Ico name="lightbulb-outline" size={20} />
                                            <Text style={[styles.cardText, { marginTop: diognal * 3.58, marginRight: diognal * 5.69 }]}>x{s.light}</Text>
                                            <Ico name="fan" size={20} />
                                            <Text style={[styles.cardText, { marginTop: diognal * 3.58, marginRight: diognal * 5.69 }]}>x{s.fan}</Text>
                                            <Ico name="power-plug-outline" size={20} />
                                            <Text style={[styles.cardText, { marginTop: diognal * 3.58 }]}>+{s.socket}</Text>

                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>)}
                </ScrollView>
            </SafeAreaView>
        </View >
    );
};

HomeScreen.propTypes = {
    getStatus: PropTypes.func,
    live: PropTypes.instanceOf(Array),
    getApms: PropTypes.func,
    ampswatts: PropTypes.instanceOf(Array)
};

HomeScreen.defaultProps = {
    getStatus: () => { },
    live: [],
    getApms: () => { },
    ampswatts: []
};

const mapStateToProps = ({ getStatus: { live }, getAmWa: { ampswatts } }) => ({ live, ampswatts });
const mapDispatchToProps = { getStatus: send => homeStatus(send), getApms: send => amps_watts(send) };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeScreen);


var ipadd;

const wifi = () => {
    const payload = sl_no;
    axios({
        method: "POST",
        url: "http://192.168.62.55/i-switch/automation/pingAPI.php",
        data: payload,
        timeout: 2000
    })
        .then(res => {
            console.log("response", res.data);
            console.log("response", res.status);
            if (res.status == '200') {
                // console.log("pingpayload", sl_no);
                ipadd = res.data;
                console.log("pingapiresponse", res.data);
                // axios({
                //     method: "POST",
                //     url: "http://192.168.62.55/i-switch/automation/pingAPI.php",
                //     data: sl_no,
                //     timeout: 4000
                // })
                //     .then(response => {
                //         console.log("pingresp", response.data);
                //     }).catch(err => {
                //         console.log("catcherro", err);
                //     })
            }

        })
        .catch(err => {
            console.log("Error", err);
        })

    return ipadd;
    console.log("wifiip", ipadd);
}

export { wifi }


const useStyles = theme => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 9,
    },
    cardTitle: {
        fontSize: diognal * 8.53,
        fontWeight: '700',
        marginLeft: diognal * 2.37,
        marginBottom: diognal * 13.25,
        color: theme.colors.text,
    },
    cardText: {
        fontSize: diognal * 5.69,
        color: theme.colors.text,
    },
    icon: {
        marginRight: diognal * 1.37,
        color: theme.colors.iconcolor,
    },
    card: {
        // flexDirection: 'row',
        padding: diognal * 4.74,
        height: height / 5,
        width: width / 2.4,
        marginVertical: diognal * 3.8,
        marginHorizontal: diognal * 4.74,
        borderRadius: diognal * 9.48,
        backgroundColor: theme.colors.card,
        // borderBottomColor: '#ccc',
        // borderBottomWidth: 0.15,
        // borderWidth: 0.15,
        // zIndex: 2,
    },
    text_color: {
        color: theme.colors.text,
        flexDirection: 'row',
        marginTop: diognal * 1.74
    },
    scrollView: {
        flex: 1,
        backgroundColor: theme.colors.text,
        alignItems: 'center',
        justifyContent: 'center',
    },

    modecolor: {
        fontSize: 11,
        color: theme.dark ? "#3bde04" : "#a36336",
        fontWeight: 'bold',
    }

});


console.disableYellowBox = true;