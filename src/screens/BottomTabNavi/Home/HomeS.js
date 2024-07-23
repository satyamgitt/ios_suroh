/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Alert, StatusBar, Modal, ImageBackground, StyleSheet, Text, Pressable, View, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl, ActivityIndicator, Button, Switch, Image, Dimensions } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome';
// import InputSpinner from "react-native-input-spinner";
import PropTypes, { array } from "prop-types";
import Ico from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
// import ButtonCard from "../../../components/Buttoncard";
// import { autoManualDetails } from "../../../redux/actions/autoManualDetails";
// import { changeAutomanualStatus } from "../../../redux/actions/changeAutomanualStatus";
import { getpirStatus } from "../../../redux/actions/getpirStatus";
import { setpirStatus } from "../../../redux/actions/setpirStatus";
import { setAutomanulTempLux } from "../../../redux/actions/setAutomanualTempLux";
import { getSlno } from '../../AsyncStorage';
import Toast from 'react-native-simple-toast';
import { changeStatus } from '../../../redux/actions/changeStatus';
import { scheduleMode } from "../../../redux/actions/schedule/scheduleMode2";
import Slider from '@react-native-community/slider';
import { useTheme } from '@react-navigation/native';
import { color } from "react-native-reanimated";
import { colors } from "react-native-elements";



const { width, height } = Dimensions.get('screen');
const diognal = height / width;
const size = diognal * 6.65;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

// var temparature;
// var luminosity;
// var pir_time;
var sl_no;

const HomeS = ({ navigation, getDetails, getStatus, getActiveStatus, setTempLux, pirData, route }) => {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    // const { colors } = useTheme();
    // const color = colors.scard;
    // console.log('colorinhome2', colors.scard)

    //Theme Background changing color
    const theme = useTheme();

    //useStyles is used to set the style in screen both theme and style combined
    const styles = useStyles(theme);
    // console.log("USESTYLES", styles);

    const { colors } = { ...theme }
    // console.log("f1", colors.headercolor);

    // const [loadingPir, setloadingPir] = useState(false);

    // const [isEnabled, setIsEnabled] = useState();
    // const updateSecureTextEntry = () => setIsEnabled(previousState => !previousState);
    // const [modalVisible, setModalVisible] = useState(false);
    // const [temparature, settemparature] = useState(0);
    //const [luminosity, setluminosity] = useState(0);
    // const [pir_time, setPir] = useState('');
    // const [tempval, settempval] = useState(0);
    // const [templum, settemlum] = useState(0);
    // const [area, setarea] = useState();

    const [location, setlocation] = useState([]);
    // const [res, setres] = useState([
    //     { title: "Board1", key: "b" }]);
    // const [masterroom, setmasterroom] = useState([
    //     { title: "Board1", key: "c" },
    //     { title: "Board1", key: "d" }
    // ])
    // const [status, setstatus] = useState('light');
    // const [room, setroom] = useState([
    //     { title: "Board1", key: "e" }
    // ])

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(async () => {
            sl_no = await getSlno();
            init(sl_no);
            // setLoading(false);
            // setRefreshing(false)
        }, 1000);
        // wait(2000).then(() => setRefreshing(false));
    };

    // Temprorly terminated
    // useEffect(() => {
    //     const interval = setInterval(async () => {
    //         sl_no = await getSlno();
    //         init(sl_no)
    //         // setTime(time + 1);
    //         console.log(`api refreshing every 5 minits${time}`)
    //     }, 5000);
    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, [location]);

    // const getlogin = () => {
    //     const send = [];
    //     const data = { sl_no: '28' };
    //     send.push(data);

    //     getDetails(send)
    //         .then((response) => {
    //             console.log(response, "RESPONSE form auto-manuallogin details");

    //         })
    //     console.log("Data from Login API");

    // }

    useEffect(() => {
        setTimeout(async () => {
            sl_no = await getSlno();
            setLoading(true);
            init(sl_no);
            getpirdata(sl_no);
        }, 1000);
        return () => { };
    }, []);

    const init = (sl_no) => {
        const send = [];
        const no = { "sl_no": sl_no };
        send.push(no);
        console.log("initpayload", send);
        getDetails(send).then(response => {
            console.log('initresponse', JSON.stringify(response));
            setlocation(response);
            setLoading(false);
            setRefreshing(false)
        });
    };

    const getpirdata = (sl_no) => {
        const send = [];
        const no = { "sl_no": sl_no };
        send.push(no);

        pirData(send).then(response => {
            console.log("pirresponse", response.data);
            // setIsEnabled(true);
            // setIsEnabled(response[0].automode_status);
        });
    }


    // const setpirstatus = async (value) => {
    //     const send = [];
    //     setloadingPir(true);
    //     const sl_no = await getSlno();
    //     const no = { "sl_no": sl_no, "status": value };
    //     send.push(no);
    //     console.log(send, 'active status pir status');
    //     getActiveStatus(send).then(response => {
    //         getpirdata(sl_no);
    //         setloadingPir(false);
    //         console.log(response, "from getActive State");
    //         if (response[0].error) {
    //             Toast.show(response[0].error, Toast.LONG, Toast.TOP);
    //         }

    //     });
    // }

    const change_status = async (id, status) => {
        sl_no = await getSlno();
        const send = [];
        const payload = { 'sl_no': sl_no, 'id': id, 'status': status }
        send.push(payload);
        console.log("chagestatuspayload", send);
        // Toast.show('This is a toast of first see this.', Toast.LONG, Toast.TOP);
        getStatus(send).then(response => {
            console.log("changestatusresponse", response);
            init(sl_no);
            if (response[0].error) {
                Toast.show(response[0].error, Toast.LONG, Toast.TOP);
            }
        })
    }
    // const set_templux = async () => {
    //     const sl_no = await getSlno();  //getting sl-no from asyncronus data
    //     const send = [];
    //     const payload = { 'sl_no': sl_no, 'location': area, 'temparature': temparature, 'luminosity': luminosity, 'pir_time': pir_time }
    //     send.push(payload);
    //     console.log(send, "temp-lux set data payload");
    //     setModalVisible(!modalVisible)
    //     // Toast.show('This is a toast of first see this.', Toast.LONG, Toast.TOP);
    //     setTempLux(send).then(response => {
    //         init(sl_no);
    //         if (response[0].error) {
    //             Toast.show(response[0].error, Toast.LONG, Toast.TOP);
    //         }
    //     })
    // }


    return (
        <View style={styles.centeredView} >
            {/* <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} /> */}
            <StatusBar barStyle={theme.dark ? "light-content" : "light-content"} />
            <StatusBar backgroundColor={theme.dark ? "#128c63" : "#128c63"} />
            <Text></Text>
            <SafeAreaView>
                <ScrollView style={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >

                    {loading ? (
                        <View style={{ paddingTop: 300 }}>
                            <ActivityIndicator size='large' color="#ffffff" /></View>
                    ) : (<>
                        {location.map(loc =>
                            <View>
                                <Text style={styles.title}>{loc.location}</Text>
                                <View style={styles.card}>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <View style={styles.rowicon}>
                                            {/* <Image style={{ height: '300%', width: "25%" }} source={require('../../../assets/productivity.jpg')} /> */}
                                            <Icon style={styles.icon} name="thermometer" size={15} />
                                            <Text style={styles.baseText}>{loc.temp.slice(0, 4)}&deg;c </Text>
                                            <Ico style={styles.icon} name="brightness-6" size={15} />
                                            <Text style={styles.baseText}> {loc.lux}% lux </Text>
                                            <Ico style={styles.icon} name="motion-sensor" size={15} />
                                            {/* <Text style={styles.baseText}>{loc.pir_time} sec-Pir </Text> */}
                                        </View>
                                        <View style={styles.rowicon}>
                                            <TouchableOpacity onPress={() => navigation.navigate('modes', { location: loc.location })}>
                                                <Text>{loc.modeStatus == 0 || loc.modeStatus == " " ? <Text>General</Text> : <Text> {loc.mode.slice(0, 6)}</Text>}<Text> </Text>
                                                    <Icon style={[styles.icon, { alignContent: "flex-end" }]} name="edit" size={15} />
                                                </Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                    <ImageBackground style={styles.image} imageStyle={{ borderRadius: 6 }} source={require('../../../assets/other.jpeg')}>
                                        <View style={styles.darkness}>
                                            {loc.boards.map(b =>
                                                <>
                                                    <View style={styles.cardboard}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                {b.switches.map((s, i) => (
                                                                    <>
                                                                        {s['status'] != 0 ? (
                                                                            <TouchableOpacity
                                                                                onPress={() => {
                                                                                    change_status(s['id'], s['status'] = '0')
                                                                                    // onRefresh();
                                                                                    // console.log(s['id'], "showing switch pressed id"),
                                                                                    //     console.log(s['status'], "Showing status");
                                                                                }}>
                                                                                <View style={styles.cardthemOn}>
                                                                                    <View style={styles.textArea}>
                                                                                        <Text style={styles.titleButtonOn}>
                                                                                            {s['sw'].toUpperCase()}
                                                                                        </Text>
                                                                                    </View>
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                        ) : (
                                                                            <TouchableOpacity
                                                                                onPress={() => {
                                                                                    change_status(s['id'], s['status'] = '1')
                                                                                    // onRefresh();
                                                                                    // console.log(s['id']),
                                                                                    //     console.log("showing S status ", s['status']);
                                                                                }}>
                                                                                <View style={styles.cardthemOff}>
                                                                                    <View style={styles.textArea}>
                                                                                        <Text style={styles.titleButtonOff}>
                                                                                            {s['sw'] == 'F' ? 'F' : s['sw'].toUpperCase()}
                                                                                        </Text>
                                                                                    </View>
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                        )}

                                                                    </>
                                                                ))}
                                                            </View>
                                                            <View style={{ position: 'absolute', right: 0, marginRight: 10 }}>
                                                                <Text style={styles.boardtitle}>{b.switchBoardId}</Text>
                                                            </View>
                                                        </View>
                                                        {b.switches.map((s, i) => {
                                                            var index = i + 1
                                                            return (
                                                                <>
                                                                    {s.sw != 'F' ? null : (<View style={{ flexDirection: 'column' }}>
                                                                        <View style={{ flexDirection: 'row' }}>
                                                                            {/* <Text style={{ marginLeft: 5, marginTop: 3 }}>{index}</Text> */}
                                                                            <Ico style={[styles.fanicon, { marginLeft: 6 }]} name="fan" size={25} />
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
                                                                </>)
                                                        })}
                                                    </View>
                                                </>
                                            )}
                                            {loc.BathroomB != null ? <Text style={styles.baseTextH}>   {loc.BathroomB}</Text> : null}
                                            {loc.Bathroom != null ? loc.Bathroom.map(b =>
                                                <>
                                                    <View style={styles.cardboard}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                {b.switches.map((s, i) => (
                                                                    <>
                                                                        {s['status'] != 0 ? (
                                                                            <TouchableOpacity
                                                                                onPress={() => {
                                                                                    change_status(s['id'], s['status'] = '0')
                                                                                    // console.log(s['id']),
                                                                                    //     console.log(s['status']);
                                                                                }}>
                                                                                <View style={styles.cardthemOn}>
                                                                                    <View style={styles.textArea}>
                                                                                        <Text style={styles.titleButtonOn}>
                                                                                            {s['sw'].toUpperCase()}
                                                                                        </Text>
                                                                                    </View>
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                        ) : (
                                                                            <TouchableOpacity
                                                                                onPress={() => {
                                                                                    change_status(s['id'], s['status'] = '1')
                                                                                    // console.log(s['id']),
                                                                                    //     console.log(s['status']);
                                                                                }}>
                                                                                <View style={styles.cardthemOff}>
                                                                                    <View style={styles.textArea}>
                                                                                        <Text style={styles.titleButtonOff}>
                                                                                            {s['sw'].toUpperCase()}
                                                                                        </Text>
                                                                                    </View>
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                        )}

                                                                    </>
                                                                ))}
                                                            </View>
                                                            <View style={{ position: 'absolute', right: 0, marginRight: 10 }}>
                                                                <Text style={styles.boardtitle}>{b.switchBoardId}</Text>
                                                            </View>
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
                                                            <View style={{ flexDirection: 'row' }}>
                                                                {b.switches.map((s, i) => (
                                                                    <>
                                                                        {s['status'] != 0 ? (
                                                                            <TouchableOpacity
                                                                                onPress={() => {
                                                                                    change_status(s['id'], s['status'] = '0')
                                                                                    // console.log(s['id']),
                                                                                    //     console.log(s['status']);
                                                                                }}>
                                                                                <View style={styles.cardthemOn}>
                                                                                    <View style={styles.textArea}>
                                                                                        <Text style={styles.titleButtonOn}>
                                                                                            {s['sw'].toUpperCase()}
                                                                                        </Text>
                                                                                    </View>
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                        ) : (
                                                                            <TouchableOpacity
                                                                                onPress={() => {
                                                                                    change_status(s['id'], s['status'] = '1')
                                                                                    // console.log(s['id']),
                                                                                    //     console.log(s['status']);
                                                                                }}>
                                                                                <View style={styles.cardthemOff}>
                                                                                    <View style={styles.textArea}>
                                                                                        <Text style={styles.titleButtonOff}>
                                                                                            {s['sw'].toUpperCase()}
                                                                                        </Text>
                                                                                    </View>
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                        )}

                                                                    </>
                                                                ))}
                                                            </View>
                                                            <View style={{ position: 'absolute', right: 0, marginRight: 10 }}>
                                                                <Text style={styles.boardtitle}>{b.switchBoardId}</Text>
                                                            </View>
                                                        </View>
                                                        {b.switches.map((s, i) => (
                                                            <>
                                                                {s.sw != 'F' ? null : (<View style={{ flexDirection: 'column' }}>
                                                                    <View style={{ flexDirection: 'row' }}>
                                                                        <Ico style={[styles.icon, { marginLeft: 10 }]} name="fan" size={25} />
                                                                        {/* <Slider
                                                                            style={{ width: 200, height: 40, marginBottom: 5 }}
                                                                            minimumValue={0}
                                                                            maximumValue={5}
                                                                            step={1}
                                                                            minimumTrackTintColor="#FFFFFF"
                                                                            maximumTrackTintColor="#000000"
                                                                            value={parseInt(s.status)}
                                                                            onValueChange={(value) => change_status(s['id'], s['status'] = value.toString())}
                                                                        /> */}
                                                                        <Text style={[styles.titleButtonOff, { marginTop: 8 }]}>
                                                                            {s['status']}
                                                                        </Text>
                                                                    </View>
                                                                </View>)}
                                                            </>))}
                                                    </View>
                                                </>
                                            ) : null}
                                        </View>
                                    </ImageBackground>
                                </View>

                            </View>
                        )}</>
                    )}
                    {/* for scrolling purpose we are added this view */}
                    <View style={{ paddingBottom: 50 }}><Text></Text><Text></Text></View>

                </ScrollView >
            </SafeAreaView >
        </View >
    );
};

HomeS.propTypes = {
    getDetails: PropTypes.func,
    automanualstatus: PropTypes.instanceOf(Array),
    getStatus: PropTypes.func,
    changeautomanualstatus: PropTypes.instanceOf(Array),
    getActiveStatus: PropTypes.func,
    pirstatus: PropTypes.instanceOf(Array),
    pirData: PropTypes.func,
    setpirstatus: PropTypes.instanceOf(Array),
    setTempLux: PropTypes.func,
    automanualtemp: PropTypes.instanceOf(Array),

    changestatus: PropTypes.instanceOf(Array),
    scheduleMode2: PropTypes.instanceOf(Array),
};

HomeS.defaultProps = {
    getDetails: () => { },
    automanualstatus: [],
    getStatus: () => { },
    changeautomanualstatus: [],
    getActiveStatus: () => { },
    pirstatus: [],
    pirData: () => { },
    setpirstatus: [],
    setTempLux: () => { },
    automanualtemp: [],
    scheduleMode2: [],

};

const mapStateToProps = ({ getautomanualstatus: { automanualstatus }, setautomanualstatus: { changeautomanualstatus }, getPirStatus: { pirstatus }, setPirStatus: { setpirstatus }, setAutomanualTemp: { automanualtemp } }) => ({ automanualstatus, changeautomanualstatus, pirstatus, setpirstatus, automanualtemp });
const mapDispatchToProps = { getDetails: send => scheduleMode(send), getStatus: send => changeStatus(send), getActiveStatus: send => setpirStatus(send), pirData: send => getpirStatus(send), setTempLux: send => setAutomanulTempLux(send) };

export default connect(mapStateToProps, mapDispatchToProps)(HomeS);

const useStyles = theme => (StyleSheet.create({
    centeredView: {
        // justifyContent: "center",
        // alignItems: "center",
        // marginTop: 22
    },
    baseText: {
        // fontWeight: 'bold',
        fontSize: 9,
        fontWeight: "bold",
        color: "#a8a7a7"
    },
    baseTextH: {
        // fontWeight: 'bold',
        paddingBottom: 3,
        fontSize: 15
    },
    modalView: {
        margin: 8,
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 35,
        paddingHorizontal: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        height: 50,
        width: 100,
        padding: 10,
        elevation: 2,
        // marginRight: 10,
        marginLeft: 10
    },
    button1: {
        borderRadius: 20,
        height: 50,
        width: 100,
        padding: 10,
        elevation: 2,
        marginBottom: 10,
        marginLeft: 10
    },
    buttonOpen: {
        backgroundColor: "#009387",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        // color: "#2f353d",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    buttonRow: {
        // height: 100,
        flexDirection: "row",
        marginTop: 50,
        marginLeft: 27,
        marginRight: 49
    },
    card: {
        // marginTop: 10,
        padding: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 20,

        // borderColor: '#696969',
        // backgroundColor: '#ccc',
        backgroundColor: theme.colors.card,
        // borderBottomColor: '#ccc',
        borderBottomWidth: 0.15,
        // zIndex: 2,
    },
    cardboard: {
        marginBottom: 2,
        borderRadius: 20,
        // backgroundColor: '#4d4b4b',
    },

    cardthemOn: {
        flexDirection: 'row',
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 8,
        // backgroundColor: '#009387',
        // backgroundColor: '#4d4b4b',
        // zIndex: 1,
        borderColor: '#00ff44',
        // borderColor: '#009387',
        borderWidth: 1,
    },
    cardthemOff: {
        flexDirection: 'row',
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 8,
        // backgroundColor: '#3d3c3c',
        // backgroundColor: '#4d4b4b',
        zIndex: 1,
        borderColor: '#0f0d0d',
        borderWidth: 1,
    },
    boardtitle: {
        // paddingStart: 60,
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        // paddingLeft: 40,

        marginTop: 20,
        marginLeft: 10,
        fontSize: 15,
        alignItems: "center",
        color: '#252626',
        // transform: [{ rotate: '270deg' }],

    },
    boadbathroom: {
        // paddingStart: 12,
        paddingHorizontal: 10,
        // paddingLeft: 15,
        fontSize: 15,
        fontWeight: "bold",
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
        color: theme.colors.screentext,
        fontWeight: "bold",
        // textAlign: "center"
    },
    titleButton: {
        fontSize: 20,
        color: "#2f353d",
        fontWeight: "bold",
        textAlign: "center"
    },
    textArea: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 18,
        paddingLeft: 18,
        // flexDirection: "row"
    },
    icon: {
        paddingLeft: 5,
        paddingBottom: 5,
        // color: '#e0902d'
        // margin: 5
    },
    fanicon: {
        paddingLeft: 5,
        paddingBottom: 5,
        color: '#a19c97'
        // margin: 5
    },
    titleButtonOn: {
        fontSize: 16,
        // color: "#2f353d",
        color: '#2a9905',
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
    rowicon: {
        flexDirection: "row",
        // justifyContent: 'space-between'
    },
    modelTitle: {
        fontSize: 18,
        marginTop: 12,
        marginRight: 20,
        fontWeight: 'bold',
        // margin: 15
    },
    Modalbutton: {
        // justifyContent: 'flex-end',
        // alignItems: 'flex-end',
        // alignContent: 'flex-end',
        borderRadius: 20,
        height: 40,
        width: 100,
        padding: 10,
        elevation: 2,
        marginTop: 20,
        // marginLeft: 150,
    },
    image: {
        // width: 335,
        // height: 150,
        borderRadius: 20 / 2,
        // overflow: "hidden",
        borderWidth: 1,
        borderColor: "#777877",
        // marginVertical: diognal * 5.5,
        marginHorizontal: diognal * 0.5,

    },
    darkness: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20 / 2,
        // width: '100%',
        // height: 200,
    },

}));






