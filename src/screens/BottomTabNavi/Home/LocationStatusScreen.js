
import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';
import PropTypes, { array } from 'prop-types';
// import AsyncStorage from '@react-native-community/async-storage';

import Ico from 'react-native-vector-icons/MaterialCommunityIcons';
import I from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Feather';

import Slider from '@react-native-community/slider';
import { flatDetails } from '../../../redux/actions/flatDetails';
// import { homeStatus } from '../../../redux/actions/homeStatus';
import { changeStatus } from '../../../redux/actions/changeStatus';
// import { value } from '../../AsyncStorage';
import { getSlno } from '../../AsyncStorage';
// import {  } from '../../screens/AsyncStorage';

import Toast from 'react-native-simple-toast';
import { useTheme } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');
const diognal = height / width;
const boxsize = diognal * 6.65;

var val;
var sl_no;


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};
var sl_no;
var noise;

const LocationStatusScreen = ({ route, navigation, getDetails, getStatus }) => {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    const [location, setlocation] = useState([]);

    const [status, setstatus] = useState();

    const [multiSliderValue, setMultiSliderValue] = useState([0]);

    const theme = useTheme();
    const styles = useStyles(theme);
    const { colors } = { ...theme };


    const onRefresh = () => {
        // setLoading(false)
        setRefreshing(true);
        setTimeout(async () => {
            sl_no = await getSlno();
            init(sl_no);
        }, 1000);
        // wait(2000).then(() => setRefreshing(false));
    };


    useEffect(() => {

        setTimeout(async () => {
            // console.log(" amar checking location in other screen", route, params.location);
            sl_no = await getSlno();
            setLoading(true);

            init(sl_no);
        }, 1000);
        return () => { };
    }, []);





    const change_status = async (id, status) => {
        sl_no = await getSlno();
        const send = [];
        const payload = { 'sl_no': sl_no, 'id': id, 'status': status }
        send.push(payload);
        console.log("changestatuspayload", send);
        // Toast.show('This is a toast of first see this.', Toast.LONG, Toast.TOP);
        getStatus(send).then(response => {
            init(sl_no);
            console.log('changestatusresp', response);
            // console.log(response[0].error);
            if (response[0].error) {
                Toast.show(response[0].error, Toast.LONG, Toast.TOP);
            }
        })
    }


    const init = (sl_no) => {
        // setLoading(true)
        const send = [];
        const no = { "sl_no": sl_no, "location": route.params.location };
        send.push(no);
        console.log("initpayload", send);
        getDetails(send).then(response => {
            console.log("initresponse", JSON.stringify(response));
            setlocation(response);
            // console.log('resp from location status ', response);
            setLoading(false);
            setRefreshing(false)
        });
    };

    // Temprorly terminated
    useEffect(() => {
        const interval = setInterval(async () => {
            sl_no = await getSlno();
            init(sl_no)
            // setTime(time + 1);
            console.log(`api refreshing every 5 minits${time}`)
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, [location]);

    return (
        <View style={styles.centeredView}>
            <SafeAreaView>
                <ScrollView style={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View>
                    </View>
                    {/* <Text>{route.params.name}</Text> */}
                    <Text />
                    {loading ? (
                        <View style={{ paddingTop: 300 }}>
                            <ActivityIndicator size='large' color="#ffffff" /></View>
                    ) : (<>
                        {location.map(loc => (
                            <View>
                                <View style={[styles.rowicon, { marginLeft: 25 }]}>
                                    <View style={styles.card}>
                                        <Icon style={styles.icon} name="thermometer" size={20} />
                                        <Text style={styles.baseText}>{loc.temp.slice(0, 4)}&deg;c</Text>
                                        <Ico style={styles.icon} name="brightness-6" size={20} />
                                        <Text style={styles.baseText}>{loc.lux} lux </Text>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('modes', { location: route.params.location })}>
                                            <Icon style={styles.icon} name="edit" size={20} />
                                            {/* <Text style={styles.baseText}>AddSchedule</Text> */}
                                        </TouchableOpacity>

                                        {/* {loc.modes != '0' ? (
                                            <View style={{ flexDirection: 'row', marginTop: diognal * 3.74 }}>
                                                <Icon style={styles.icon} name={loc.modes === 'Study Mode' ? 'book-open' : loc.modes === 'Night Mode' ? 'moon' : loc.modes === 'Noon Mode' ? 'sun' : null} size={25} />
                                                <Text style={{ marginLeft: 2, fontSize: 12 }}>{loc.modes}</Text>
                                            </View>
                                        ) : <View style={{ flexDirection: 'row', marginLeft: 80 }}>
                                            <I name="auto-fix-normal" size={20} />
                                            <Text style={{ marginLeft: 2, fontSize: 12, marginTop: 5 }}>General Mode</Text>
                                        </View>} */}


                                    </View>
                                </View>
                                {loc.boards.map(b => (
                                    <>
                                        <View style={styles.cardboard}>
                                            <View style={{ flexDirection: 'row' }}>
                                                {b.switches.map((s, i) => (
                                                    <>
                                                        {s.status != 0 ? (
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    change_status(s['id'], s['status'] = '0')
                                                                }}>
                                                                <View style={styles.cardthemOn}>
                                                                    <View style={styles.textArea}>
                                                                        <Text style={styles.titleButtonOn}>
                                                                            {s['sw']}
                                                                        </Text>

                                                                        {/* <View style={{ alignItems: 'center' }}>
                                                                            <Image
                                                                                style={styles.tinyLogo}
                                                                                source={require('../../../assets/light.png')}
                                                                            /></View> */}

                                                                        {/* <View style={{ alignItems: 'center' }}>
                                                                            {s.sw == 'L' || s.sw == 'l' ?
                                                                                <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/light.png')}
                                                                                /> : s.sw == "F" || s.sw == 'f' ? <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/fan.png')}
                                                                                /> : s.sw == 'S' || s.sw == 's' ? <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/socket.png')}
                                                                                /> : s.sw == 'W' || s.sw == 'w' ? <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/wifi.png')}
                                                                                /> : null}</View> */}

                                                                    </View>
                                                                </View>
                                                            </TouchableOpacity>
                                                        ) : (
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    change_status(s['id'], s['status'] = '1')
                                                                }}>
                                                                <View style={styles.cardthemOff}>
                                                                    <View style={styles.textArea}>
                                                                        <Text style={styles.titleButtonOff}>
                                                                            {s['sw']}
                                                                        </Text>
                                                                        {/* <View style={{ alignItems: 'center' }}>
                                                                            {s.sw == 'L' || s.sw == 'l' ?
                                                                                <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/lightoff.png')}
                                                                                /> : s.sw == "F" || s.sw == 'f' ? <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/fan.png')}
                                                                                /> : s.sw == 'S' || s.sw == 's' ? <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/socket.png')}
                                                                                /> : s.sw == 'W' || s.sw == 'w' ? <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/wifi.png')}
                                                                                /> : null}</View> */}
                                                                    </View>
                                                                </View>
                                                            </TouchableOpacity>
                                                        )}
                                                    </>
                                                ))}
                                                <Text style={styles.boardtitle}>{b.switchBoardId}</Text>
                                            </View>
                                            {b.switches.map((s, i) => (
                                                <>
                                                    {s.sw != 'F' ? null : (<View style={{ flexDirection: 'column' }}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Ico style={[styles.icon, { marginLeft: 10 }]} name="fan" size={25} />
                                                            <Slider
                                                                style={{ width: 200, height: 40, marginBottom: 5 }}
                                                                minimumValue={0}
                                                                maximumValue={5}
                                                                step={1}
                                                                minimumTrackTintColor="#FFFFFF"
                                                                maximumTrackTintColor="#000000"
                                                                value={parseInt(s.status)}
                                                                onValueChange={(value) => change_status(s['id'], s['status'] = value.toString())}
                                                            />
                                                            <Text style={[styles.titleButtonOff, { marginTop: 8 }]}>
                                                                {s['status']}
                                                            </Text>
                                                        </View>
                                                    </View>)}
                                                </>))}
                                        </View>
                                    </>
                                ))}
                                {loc.BathroomB != null ? <Text style={styles.baseTextH}>   {loc.BathroomB}</Text> : null}
                                {loc.Bathroom != null ? loc.Bathroom.map(b =>
                                    <>
                                        <View style={styles.cardboard}>
                                            <View style={{ flexDirection: 'row' }}>
                                                {b.switches.map((s, i) => (
                                                    <>
                                                        {s['status'] != 0 ? (
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    change_status(s['id'], s['status'] = '0')
                                                                    // console.log(s['id']),
                                                                    // console.log(s['status']);
                                                                }}>
                                                                <View style={styles.cardthemOn}>
                                                                    <View style={styles.textArea}>
                                                                        <Text style={styles.titleButtonOn}>
                                                                            {s['sw']}
                                                                        </Text>

                                                                        {/* <View style={{ alignItems: 'center' }}>
                                                                            {s.sw == 'L' ?
                                                                                <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/light.png')}
                                                                                /> : s.sw == "F" ? <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/fan.png')}
                                                                                /> : s.sw == 'S' ? <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/socket.png')}
                                                                                /> : s.sw == 'W' ? <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/wifi.png')}
                                                                                /> : null}</View> */}

                                                                    </View>
                                                                </View>
                                                            </TouchableOpacity>
                                                        ) : (
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    change_status(s['id'], s['status'] = '1')
                                                                    // console.log(s['id']),
                                                                    // console.log(s['status']);
                                                                }}>
                                                                <View style={styles.cardthemOff}>
                                                                    <View style={styles.textArea}>
                                                                        <Text style={styles.titleButtonOff}>
                                                                            {s['sw']}
                                                                        </Text>


                                                                        {/* <View style={{ alignItems: 'center' }}>
                                                                            {s.sw == 'L' || s.sw == 'l' ?
                                                                                <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/lightoff.png')}
                                                                                /> : s.sw == "F" || s.sw == 'f' ? <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/fan.png')}
                                                                                /> : s.sw == 'S' || s.sw == 's' ? <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/socket.png')}
                                                                                /> : s.sw == 'W' || s.sw == 'w' ? <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/wifi.png')}
                                                                                /> : null}</View> */}
                                                                    </View>
                                                                </View>
                                                            </TouchableOpacity>
                                                        )}

                                                    </>
                                                ))}
                                                <Text style={styles.boardtitle}>{b.switchBoardId}</Text>
                                            </View>
                                            {b.switches.map((s, i) => (
                                                <>
                                                    {s.sw != 'F' ? null : (<View style={{ flexDirection: 'column' }}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Ico style={[styles.icon, { marginLeft: 10 }]} name="fan" size={25} />
                                                            <Slider
                                                                style={{ width: 200, height: 40, marginBottom: 5 }}
                                                                minimumValue={0}
                                                                maximumValue={5}
                                                                step={1}
                                                                minimumTrackTintColor="#FFFFFF"
                                                                maximumTrackTintColor="#000000"
                                                                value={parseInt(s.status)}
                                                                onValueChange={(value) => change_status(s['id'], s['status'] = value.toString())}
                                                            />
                                                            <Text style={[styles.titleButtonOff, { marginTop: 8 }]}>
                                                                {s['status']}
                                                            </Text>
                                                        </View>
                                                    </View>)}
                                                </>))}
                                        </View>
                                    </>
                                ) : null}

                                {loc.BalconyB != null ? <Text style={styles.baseTextH}>   {loc.BalconyB}</Text> : null}
                                {/* {loc.sublocc != null ? <Text style={styles.baseText}>{loc.sublocc}</Text> : null} */}
                                {loc.Balcony != null ? loc.Balcony.map(b =>
                                    <>
                                        <View style={styles.cardboard}>
                                            <View style={{ flexDirection: 'row' }}>
                                                {b.switches.map((s, i) => (
                                                    <>
                                                        {s['status'] != 0 ? (
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    change_status(s['id'], s['status'] = '0')
                                                                    // console.log(s['id']),
                                                                    // console.log(s['status']);
                                                                }}>
                                                                <View style={styles.cardthemOn}>
                                                                    <View style={styles.textArea}>
                                                                        <Text style={styles.titleButtonOn}>
                                                                            {s['sw']}
                                                                        </Text>

                                                                        {/* <View style={{ alignItems: 'center' }}>
                                                                            {s.sw == 'L' ?
                                                                                <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/light.png')}
                                                                                /> : s.sw == "F" ? <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/fan.png')}
                                                                                /> : s.sw == 'S' ? <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/socket.png')}
                                                                                /> : s.sw == 'W' ? <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/wifi.png')}
                                                                                /> : null}</View> */}
                                                                    </View>
                                                                </View>
                                                            </TouchableOpacity>
                                                        ) : (
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    change_status(s['id'], s['status'] = '1')
                                                                    // console.log(s['id']),
                                                                    // console.log(s['status']);
                                                                }}>
                                                                <View style={styles.cardthemOff}>
                                                                    <View style={styles.textArea}>
                                                                        <Text style={styles.titleButtonOff}>
                                                                            {s['sw']}
                                                                        </Text>

                                                                        {/* <View style={{ alignItems: 'center' }}>
                                                                            {s.sw == 'L' || s.sw == 'l' ?
                                                                                <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/lightoff.png')}
                                                                                /> : s.sw == "F" || s.sw == 'f' ? <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/fan.png')}
                                                                                /> : s.sw == 'S' || s.sw == 's' ? <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/socket.png')}
                                                                                /> : s.sw == 'W' || s.sw == 'w' ? <Image
                                                                                    style={styles.tinyLogo}
                                                                                    source={require('../../../assets/wifi.png')}
                                                                                /> : null}</View> */}
                                                                    </View>
                                                                </View>
                                                            </TouchableOpacity>
                                                        )}

                                                    </>
                                                ))}
                                                <Text style={styles.boardtitle}>{b.switchBoardId}</Text>
                                            </View>
                                            {b.switches.map((s, i) => (
                                                <>
                                                    {s.sw != 'F' ? null : (<View style={{ flexDirection: 'column' }}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Ico style={[styles.icon, { marginLeft: 10 }]} name="fan" size={25} />
                                                            <Slider
                                                                style={{ width: 200, height: 40, marginBottom: 5 }}
                                                                minimumValue={0}
                                                                maximumValue={5}
                                                                step={1}
                                                                minimumTrackTintColor="#FFFFFF"
                                                                maximumTrackTintColor="#000000"
                                                                value={parseInt(s.status)}
                                                                onValueChange={(value) => change_status(s['id'], s['status'] = value.toString())}
                                                            />
                                                            <Text style={[styles.titleButtonOff, { marginTop: 8 }]}>
                                                                {s['status']}
                                                            </Text>
                                                        </View>
                                                    </View>)}
                                                </>))}
                                        </View>
                                    </>
                                ) : null}
                                {/* </View> */}
                            </View>

                        ))}
                    </>
                    )}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};
LocationStatusScreen.propTypes = {
    getDetails: PropTypes.func,
    token: PropTypes.instanceOf(Array),
    getStatus: PropTypes.func,
    changestatus: PropTypes.instanceOf(Array),
};

LocationStatusScreen.defaultProps = {
    getDetails: () => { },
    details: [],
    getStatus: () => { },
    statusData: [],
};

const mapStateToProps = ({ getDetails: { details }, getStatus: { statusData } }) => ({ details, statusData });
const mapDispatchToProps = { getDetails: send => flatDetails(send), getStatus: send => changeStatus(send) };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LocationStatusScreen);

const useStyles = theme => StyleSheet.create({
    centeredView: {
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // marginTop: 22
    },
    baseText: {
        // fontWeight: 'bold',
        fontSize: 12,
        color: theme.colors.text,
    },
    tinyLogo: {
        width: 25,
        height: 32,
    },
    baseTextH: {
        // fontWeight: 'bold',
        marginHorizontal: 20,
        paddingBottom: 3,
        fontSize: 15,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        height: 50,
        width: 100,
        padding: 10,
        elevation: 2,
        // marginRight: 10,
        marginLeft: 10,
    },
    button1: {
        borderRadius: 20,
        height: 50,
        width: 100,
        padding: 10,
        elevation: 2,
        marginBottom: 10,
        marginLeft: 10,
    },
    buttonOpen: {
        backgroundColor: '#009387',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        // color: "#2f353d",
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    buttonRow: {
        // height: 100,
        flexDirection: 'row',
        marginTop: 50,
        marginLeft: 27,
        marginRight: 49,
    },
    card: {
        flexDirection: 'row',
        height: height / 15.9,
        width: width / 2.5,
        marginVertical: 2,
        marginHorizontal: 1,
        borderRadius: 15.9,
        backgroundColor: theme.colors.card,
    },

    cardboard: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        // alignContent: 'flex-start',
        height: height / 6.9,
        width: width / 1.098,
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 15.9,
        backgroundColor: theme.colors.cardboard,
    },
    //temprorly checking
    // cardthemOn: {
    //     // flex: 2,
    //     justifyContent: 'space-between',
    //     flexDirection: 'row',
    //     marginLeft: 10,
    //     marginBottom: 10,
    //     marginTop: 10,
    //     borderRadius: 8,
    //     // backgroundColor: '#606060',
    //     backgroundColor: '#4d4b4b',
    //     // zIndex: 1,
    //     // borderColor: '#949191',
    //     borderColor: '#009387',
    //     borderWidth: 1,
    // },

    cardthemOn: {
        height: height / 16.9,
        width: width / 7.5,
        marginVertical: diognal * 8.9,
        marginHorizontal: diognal * 1.9,
        // borderRadius: diognal * 8.48,
        backgroundColor: '#4d4b4b',
        borderColor: '#009387',
        borderWidth: 1,
        borderRadius: 9,
    },

    //temprorly checking purpose
    // cardthemOff: {
    //     //flex: 1,
    //     justifyContent: 'space-between',
    //     flexDirection: 'row',
    //     marginLeft: 10,
    //     marginBottom: 10,
    //     marginTop: 10,
    //     borderRadius: 8,
    //     backgroundColor: '#4d4b4b',
    //     borderColor: '#0f0d0d',
    //     borderWidth: 1,
    //     margin: 4,

    // },
    cardthemOff: {
        // padding: diognal * 0.001,
        height: height / 16.9,
        width: width / 7.5,
        marginVertical: diognal * 8.9,
        marginHorizontal: diognal * 1.9,
        //borderRadius: diognal * 2.48,
        backgroundColor: '#4d4b4b',
        borderColor: '#0f0d0d',
        borderWidth: 1,
        borderRadius: 9,


    },
    boardtitle: {
        // paddingStart: 60,
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        // marginLeft: 15,
        // fontSize: 12,
        // transform: [{ rotate: '270deg' }],
        // color: '#252626',

        marginTop: 30,
        marginLeft: 10,
        fontSize: 15,
        alignItems: "center",
        color: theme.colors.text,
    },
    boadbathroom: {
        // paddingStart: 12,
        paddingHorizontal: 10,
        // paddingLeft: 15,
        fontSize: 15,
        fontWeight: 'bold',
        // transform: [{rotate: '270deg' }],
        color: '#2f0736',
    },
    title: {
        paddingLeft: 20,
        // fontSize: 25,
        // fontFamily: 'sans-serif',
        // fontWeight: '700',
        // color: '#000000',
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold',
        // textAlign: "center"
    },
    titleButtonOn: {
        fontSize: 16,
        color: "#009387",
        // color: '#949191',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titleButtonOff: {
        fontSize: 16,
        // color: "#2f353d",
        color: '#282929',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textArea: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 18,
        paddingLeft: 18,
        // flexDirection: "row"
    },
    icon: {
        paddingTop: 5,
        paddingLeft: 5,
        paddingBottom: 5,
        // margin: 5
        color: theme.colors.iconcolor,
    },
    iconr: {
        // paddingTop: 5,
        marginTop: 18,
        // paddingLeft: 5,
        paddingBottom: 5,
        // margin: 5
    },
    rowicon: {
        flexDirection: 'row',
        marginHorizontal: 15,

    },
});
console.disableYellowBox = true;