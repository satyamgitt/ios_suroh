
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl, ActivityIndicator, Button, Switch } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

import PropTypes, { array } from "prop-types";
import { autoManualDetails } from "../../../redux/actions/autoManualDetails";
import { getSwitchdetails } from "../../../redux/actions/getSwitchDetails";
import { getSwitchStatus } from "../../../redux/reducers";
import { changeAutomanualStatus } from "../../../redux/actions/changeAutomanualStatus";
import { getpirStatus } from "../../../redux/actions/getpirStatus";
import { setpirStatus } from "../../../redux/actions/setpirStatus";
import { setAutomanulTempLux } from "../../../redux/actions/setAutomanualTempLux";
import { getSlno } from '../../AsyncStorage';
import Toast from 'react-native-simple-toast';
import { switchStatusUpdate } from '../../../redux/actions/switchStatusUpdate';



const bharath = [
    {
        "sl_no": "34",
        "mode": "Night",
        "location": "Hall",
        "boards": [
            {
                "switchBoardId": "1",
                "switches": [
                    {
                        "id": "Ajna_A_12_2__11",
                        "sw": "Fan",
                        "status": true
                    },
                    {
                        "id": "Ajna_A_12_2__12",
                        "sw": "Light",
                        "status": true
                    },
                    {
                        "id": "Ajna_A_12_2__13",
                        "sw": "Light",
                        "status": false
                    },
                    {
                        "id": "Ajna_A_12_2__14",
                        "sw": "Light",
                        "status": false
                    }
                ]
            },
            {
                "switchBoardId": "2",
                "switches": [
                    {
                        "id": "Ajna_A_12_2__21",
                        "sw": "Fan",
                        "status": false
                    }
                ]
            }
        ],
        "Balcony": [
            {
                "switchBoardId": "1",
                "switches": [
                    {
                        "id": "Ajna_A_12_2__Bal_11",
                        "sw": "Light",
                        "status": false
                    },
                    {
                        "id": "Ajna_A_12_2__Bal_12",
                        "sw": "Light",
                        "status": false
                    },
                    {
                        "id": "Ajna_A_12_2__Bal_15",
                        "sw": "Light",
                        "status": false
                    }
                ]
            }
        ],
        "BalconyB": "Balcony"
    }
];

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};


const Select_Switches = ({ navigation, route, getDetails, getStatus, getActiveStatus, setTempLux, pirData, }) => {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [loadingPir, setloadingPir] = useState(false);

    const [isEnabled, setIsEnabled] = useState(true);
    const [pir_time, setPir] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [temparature, settemparature] = useState(0);
    const [luminosity, setluminosity] = useState(0);
    const [tempval, settempval] = useState(0);
    const [templum, settemlum] = useState(0);
    const [area, setarea] = useState();

    const [location, setlocation] = useState([]);
    const [res, setres] = useState([
        { title: "Board1", key: "b" }]);
    const [masterroom, setmasterroom] = useState([
        { title: "Board1", key: "c" },
        { title: "Board1", key: "d" }
    ])
    const [status, setstatus] = useState('light');
    const [room, setroom] = useState([
        { title: "Board1", key: "e" }
    ])

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(async () => {
            const sl_no = await getSlno();
            setLoading(false);
            setRefreshing(false)
            // init(sl_no);
        }, 10);

    };

    //Status data updating based on recently changed sw status
    const call = (location) => {
        console.log("sending data to payload", location);
        getStatus(location).then(response => {
            console.log('response from redux', response);
            Toast.show(response, Toast.LONG, Toast.TOP);

            // setlocation(response);
            // setLoading(false);
            //setRefreshing(false)

        });
    }

    useEffect(() => {
        setTimeout(async () => {
            const sl_no = await getSlno();
            setLoading(true);
            init(sl_no);
            setLoading(false);
            setRefreshing(false)
        }, 1000);
        return () => { };
    }, []);
    useEffect(() => {
        console.log('hea i am called');
    }, [location]);


    const init = (sl_no) => {
        const send = [];
        const no = { "sl_no": sl_no, "location": route.params.location, "mode": route.params.modename };
        console.log("switch no details", no);
        //const no = { "sl_no": "34", "location": "Hall", "mode": "Night" }
        send.push(no);
        console.log("sending details", send);
        // setlocation(bharath);
        getDetails(send).then(response => {
            console.log(' from getDetailresponses', response);
            setlocation(response);
            setLoading(false);
            setRefreshing(false)

        });
    };

    // const selectsw = (key, swstatus, mode) => {
    //     console.log("data reciving from toggle", key, swstatus, mode);
    //     console.log("key presed", key);
    //     console.log("status details", status);

    //     let templocation = [...location];
    //     templocation[key - 1].status = swstatus;
    //     console.log(templocation);
    //     setlocation(templocation);

    // }
    // const selectsw = (key, swstatus, mode) => {
    //     console.log("data reciving from toggle", key, swstatus, mode);
    //     console.log("key presed", key);
    //     let temLocation = [...location];
    //     // console.log(JSON.stringify(temLocation));
    //     console.log(JSON.stringify(temLocation[key - 1]));
    //     temLocation[key - 1].status = swstatus;
    //     setlocation(temLocation);
    //     // console.log(temLocation);
    //     // console.log(JSON.stringify(location));

    // }


    //changing the Switch Status
    const change_status = async () => {
        console.log("Change switch called");
        const sl_no = await getSlno();
        const payload = { "sl_no": sl_no, "location": route.params.location, "mode": "work", 'status': status };
        const send = [];
        // const payload = { 'sl_no': sl_no, 'id': id, 'status': status }
        send.push(payload);
        console.log("status recinvig from switch press", send);
        // console.log(send, "Change Switch Status Payload setting");
        // getStatus(send).then(response => {
        //     init(sl_no);
        //     if (response[0].error) {
        //         Toast.show(response[0].error, Toast.LONG, Toast.TOP);
        //     }
        // })
    }


    return (
        <View style={styles.centeredView} >
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

                    <Text></Text>
                    {loading ? (
                        <View style={{ paddingTop: 300 }}>
                            <ActivityIndicator size='large' color="#ffffff" /></View>
                    ) : (<>
                        {/* there need to change switch settings */}
                        {location.map(loc =>
                            <View pointerEvents={isEnabled ? 'auto' : 'none'}>
                                <Text style={styles.title}>{loc.location}</Text>
                                <View style={styles.card}>
                                    {loc.boards.map(b =>
                                        <>
                                            <View style={styles.cardboard}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    {b.switches.map((s, index) => {
                                                        return (
                                                            <>
                                                                {s['status'] != 0 ? (
                                                                    <TouchableOpacity
                                                                        onPress={() => {

                                                                            // selectsw(index, !s['status'], loc.mode);
                                                                            //change_status(s['id'], s['status'] = '0')
                                                                            // let templocation = [...location];
                                                                            // templocation[index - 1].mode_active_status = item;
                                                                            // updateScreen();
                                                                            s['status'] = false;
                                                                            console.log(JSON.stringify(location));
                                                                            onRefresh();
                                                                            //console.log('amar2', JSON.stringify(location));

                                                                        }}>
                                                                        <View style={styles.cardthemOn}>
                                                                            <View style={styles.textArea}>
                                                                                <Text style={styles.titleButtonOn}>
                                                                                    {s['sw'][0]}
                                                                                </Text>
                                                                            </View>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                ) : (
                                                                    <TouchableOpacity
                                                                        onPress={() => {

                                                                            // selectsw(index, !s['status'], loc.mode);
                                                                            // change_status(s['id'], s['status'] = '1')
                                                                            // console.log(s['id']),
                                                                            // console.log("showing S status ", s['status']);
                                                                            s['status'] = true;
                                                                            // setlocation(location);
                                                                            // updateScreen();
                                                                            onRefresh();
                                                                            // setRefreshing(true);
                                                                            // setRefreshing(false);
                                                                            //console.log('amar1', JSON.stringify(location));
                                                                        }}>
                                                                        <View style={styles.cardthemOff}>
                                                                            <View style={styles.textArea}>
                                                                                <Text style={styles.titleButtonOff}>
                                                                                    {s['sw'][0]}
                                                                                </Text>
                                                                            </View>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                )
                                                                }

                                                            </>
                                                        )
                                                    }
                                                    )
                                                    }
                                                    <Text style={styles.boardtitle}>{b.switchBoardId}</Text>
                                                </View>

                                            </View>

                                        </>
                                    )}
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
                                                                        console.log(s['id']),
                                                                            console.log(s['status']);
                                                                        onRefresh();
                                                                    }}>
                                                                    <View style={styles.cardthemOn}>
                                                                        <View style={styles.textArea}>
                                                                            <Text style={styles.titleButtonOn}>
                                                                                {s['sw'][0]}
                                                                            </Text>
                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            ) : (
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        change_status(s['id'], s['status'] = '1')
                                                                        console.log(s['id']),
                                                                            console.log(s['status']);
                                                                        onRefresh();
                                                                    }}>
                                                                    <View style={styles.cardthemOff}>
                                                                        <View style={styles.textArea}>
                                                                            <Text style={styles.titleButtonOff}>
                                                                                {s['sw'][0]}
                                                                            </Text>
                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            )}

                                                        </>
                                                    ))}
                                                    <Text style={styles.boardtitle}>{b.switchBoardId}</Text>
                                                </View>
                                            </View>
                                        </>
                                    ) : null}

                                    {loc.BalconyB != null ? <Text style={styles.baseTextH}>   {loc.BalconyB}</Text> : null}
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
                                                                        onRefresh();
                                                                        console.log(s['id']),
                                                                            console.log(s['status']);
                                                                    }}>
                                                                    <View style={styles.cardthemOn}>
                                                                        <View style={styles.textArea}>
                                                                            <Text style={styles.titleButtonOn}>
                                                                                {s['sw'][0]}
                                                                            </Text>
                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            ) : (
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        change_status(s['id'], s['status'] = '1')
                                                                        onRefresh();
                                                                        console.log(s['id']),
                                                                            console.log(s['status']);
                                                                    }}>
                                                                    <View style={styles.cardthemOff}>
                                                                        <View style={styles.textArea}>
                                                                            <Text style={styles.titleButtonOff}>
                                                                                {s['sw'][0]}
                                                                            </Text>
                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            )}

                                                        </>
                                                    ))}
                                                    <Text style={styles.boardtitle}>{b.switchBoardId}</Text>
                                                </View>
                                            </View>
                                        </>
                                    ) : null}
                                </View>

                                <View style={styles.button}>
                                    <TouchableOpacity
                                        style={styles.submit}
                                        onPress={() => { call(location) }}
                                    >
                                        <LinearGradient
                                            colors={['#08d4c4', '#01ab9d']}
                                            style={styles.submit}
                                        >
                                            <Text style={[styles.textSign, {
                                                color: '#fff'
                                            }]}>Submit</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}</>
                    )}

                </ScrollView >
            </SafeAreaView >
        </View >
    );
};
Select_Switches.propTypes = {
    getDetails: PropTypes.func,
    getSwitchStatus: PropTypes.instanceOf(Array),
    getStatus: PropTypes.func,
    changeautomanualstatus: PropTypes.instanceOf(Array),
    getActiveStatus: PropTypes.func,
    pirstatus: PropTypes.instanceOf(Array),
    pirData: PropTypes.func,
    setpirstatus: PropTypes.instanceOf(Array),
    setTempLux: PropTypes.func,
    automanualtemp: PropTypes.instanceOf(Array),

    switchstatus: PropTypes.instanceOf(Array),
};

Select_Switches.defaultProps = {
    getDetails: () => { },
    getSwitchstatus: [],
    getStatus: () => { },
    changeautomanualstatus: [],
    getActiveStatus: () => { },
    pirstatus: [],
    pirData: () => { },
    setpirstatus: [],
    setTempLux: () => { },
    automanualtemp: [],
    switchstatus: [],

};

const mapStateToProps = ({ getautomanualstatus: { automanualstatus }, setautomanualstatus: { changeautomanualstatus }, getPirStatus: { pirstatus }, setPirStatus: { setpirstatus }, setAutomanualTemp: { automanualtemp } }) => ({ automanualstatus, changeautomanualstatus, pirstatus, setpirstatus, automanualtemp });
const mapDispatchToProps = { getDetails: send => getSwitchdetails(send), getStatus: send => switchStatusUpdate(send), getActiveStatus: send => setpirStatus(send), pirData: send => getpirStatus(send), setTempLux: send => setAutomanulTempLux(send) };
export default connect(mapStateToProps, mapDispatchToProps)(Select_Switches);

const styles = StyleSheet.create({
    centeredView: {
        // justifyContent: "center",
        // alignItems: "center",
        // marginTop: 22
    },
    baseText: {
        // fontWeight: 'bold',
        fontSize: 12
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
        backgroundColor: '#3d3c3c',
        // borderBottomColor: '#ccc',
        borderBottomWidth: 0.15,
        // zIndex: 2,
    },
    cardboard: {
        marginBottom: 2,
        borderRadius: 20,
        backgroundColor: '#4d4b4b',
    },
    cardthemOn: {
        flexDirection: 'row',
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 8,
        // backgroundColor: '#009387',
        backgroundColor: '#4d4b4b',
        zIndex: 1,
        borderColor: '#949191',
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
        backgroundColor: '#4d4b4b',
        zIndex: 1,
        borderColor: '#0f0d0d',
        borderWidth: 1,
    },
    boardtitle: {
        // paddingStart: 60,
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        // paddingLeft: 40,
        marginLeft: 15,
        fontSize: 12,
        transform: [{ rotate: '270deg' }],
        color: '#252626',
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
        color: '#000000',
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
        paddingBottom: 5
        // margin: 5
    },
    titleButtonOn: {
        fontSize: 16,
        // color: "#2f353d",
        color: '#949191',
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
    button: {
        alignItems: 'center',
        marginTop: 50,

    },
    rowicon: {
        flexDirection: "row"
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
    submit: {
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },

});






//temprarly writing code for switches updating


// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl, ActivityIndicator, Button, Switch } from "react-native";
// // import Icon from 'react-native-vector-icons/FontAwesome';
// import PropTypes, { array } from "prop-types";
// import { autoManualDetails } from "../../../redux/actions/autoManualDetails";
// import { getSwitchdetails } from "../../../redux/actions/getSwitchDetails";
// import { getSwitchStatus } from "../../../redux/reducers";
// import { changeAutomanualStatus } from "../../../redux/actions/changeAutomanualStatus";
// import { getpirStatus } from "../../../redux/actions/getpirStatus";
// import { setpirStatus } from "../../../redux/actions/setpirStatus";
// import { setAutomanulTempLux } from "../../../redux/actions/setAutomanualTempLux";
// import { getSlno } from '../../AsyncStorage';
// import Toast from 'react-native-simple-toast';



// const bharath = [
//     {
//         "sl_no": "34",
//         "mode": "Night",
//         "location": "Hall",
//         "boards": [
//             {
//                 "switchBoardId": "1",
//                 "switches": [
//                     {
//                         "id": "Ajna_A_12_2__11",
//                         "sw": "Fan",
//                         "status": false
//                     },
//                     {
//                         "id": "Ajna_A_12_2__12",
//                         "sw": "Light",
//                         "status": false
//                     },
//                     {
//                         "id": "Ajna_A_12_2__13",
//                         "sw": "Light",
//                         "status": true
//                     },
//                     {
//                         "id": "Ajna_A_12_2__14",
//                         "sw": "Light",
//                         "status": true
//                     }
//                 ]
//             },
//             {
//                 "switchBoardId": "2",
//                 "switches": [
//                     {
//                         "id": "Ajna_A_12_2__21",
//                         "sw": "Fan",
//                         "status": false
//                     }
//                 ]
//             }
//         ],
//         "Balcony": [
//             {
//                 "switchBoardId": "1",
//                 "switches": [
//                     {
//                         "id": "Ajna_A_12_2__Bal_11",
//                         "sw": "Light",
//                         "status": false
//                     },
//                     {
//                         "id": "Ajna_A_12_2__Bal_12",
//                         "sw": "Light",
//                         "status": false
//                     },
//                     {
//                         "id": "Ajna_A_12_2__Bal_15",
//                         "sw": "Light",
//                         "status": false
//                     }
//                 ]
//             }
//         ],
//         "BalconyB": "Balcony"
//     }
// ];

// const wait = (timeout) => {
//     return new Promise(resolve => setTimeout(resolve, timeout));
// };



// const Select_Switches = ({ navigation, route, getDetails, getStatus, getActiveStatus, setTempLux, pirData, }) => {
//     const [loading, setLoading] = useState(false);
//     const [refreshing, setRefreshing] = React.useState(false);
//     const [loadingPir, setloadingPir] = useState(false);

//     const [isEnabled, setIsEnabled] = useState(true);
//     // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

//     const [pir_time, setPir] = useState('');
//     const [modalVisible, setModalVisible] = useState(false);
//     const [temparature, settemparature] = useState(0);
//     const [luminosity, setluminosity] = useState(0);
//     const [tempval, settempval] = useState(0);
//     const [templum, settemlum] = useState(0);
//     const [area, setarea] = useState();

//     const [location, setlocation] = useState([]);
//     const [res, setres] = useState([
//         { title: "Board1", key: "b" }]);
//     const [masterroom, setmasterroom] = useState([
//         { title: "Board1", key: "c" },
//         { title: "Board1", key: "d" }
//     ])


//     const [status, setStatus] = useState(false);

//     const [room, setroom] = useState([
//         { title: "Board1", key: "e" }
//     ])

//     const onRefresh = () => {
//         setRefreshing(true);
//         setTimeout(async () => {
//             const sl_no = await getSlno();
//             init(sl_no);
//         }, 1000);
//     };

//     useEffect(() => {
//         setTimeout(async () => {
//             const sl_no = await getSlno();
//             setLoading(true);
//             init(sl_no);
//             setLoading(false);
//             setRefreshing(false)
//         }, 1000);
//         return () => { };
//     }, []);

//     const init = (sl_no) => {
//         const send = [];
//         console.log("hea amar ", route.params);
//         const no = { "sl_no": sl_no, "location": route.params.location, "mode": route.params.modename };
//         //const no = { "sl_no": sl_no, "location": route.params.location, "mode": "work" };
//         send.push(no);
//         console.log("sending details", send);
//         // setlocation(bharath);
//         getDetails(send).then(response => {
//             console.log(' from getDetailresponses', response);
//             setlocation(response);
//             setLoading(false);
//             setRefreshing(false)

//         });
//     };
//     //changing the Switch Status
//     const change_status = async (id, status) => {
//         console.log("Change switch called");
//         const sl_no = await getSlno();
//         const payload = { "sl_no": sl_no, "location": route.params.location, "mode": "work", 'status': status };
//         const send = [];
//         // const payload = { 'sl_no': sl_no, 'id': id, 'status': status }
//         send.push(payload);
//         console.log("status recinvig from switch press", send);
//         // console.log(send, "Change Switch Status Payload setting");
//         // getStatus(send).then(response => {
//         //     init(sl_no);
//         //     if (response[0].error) {
//         //         Toast.show(response[0].error, Toast.LONG, Toast.TOP);
//         //     }
//         // })
//         // }
//         const toggleSwitch = (key, swstatus, mode) => {
//             console.log("data reciving from toggle", key, swstatus, mode);
//             console.log("key presed", key);
//             let data = swstatus;
//             setStatus(swstatus);



//             // let status = swstatus;
//             console.log("status details", status);

//             // let templocation = [...location];
//             // templocation[index - 1].mode_active_status = item;
//             // console.log(templocation);
//             // setLocation(templocation);
//             // modeSwitchsData(item, mode);
//         }


//         return (
//             <View style={styles.centeredView} >
//                 <Text>Hello</Text>
//                 <SafeAreaView>
//                     <ScrollView style={styles.scrollView}
//                         refreshControl={
//                             <RefreshControl
//                                 refreshing={refreshing}
//                                 onRefresh={onRefresh}
//                             />
//                         }
//                     >
//                     </ScrollView >
//                     {location.map((loc, index) => {
//                         const key = index + 1;
//                         return (
//                             <>
//                                 <View>
//                                     <Text style={styles.title}>{loc.location}</Text>

//                                     {loc.boards.map(b =>
//                                         <>
//                                             {/* <View><Text>hi</Text></View> */}
//                                             <View style={styles.card} key={key}>
//                                                 {b.switches.map((s, i) =>
//                                                     <>
//                                                         <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
//                                                             <Text style={styles.textStyle}>{s['sw']}</Text>
//                                                             <Switch
//                                                                 trackColor={{ false: "#767577", true: "#81b0ff" }}
//                                                                 thumbColor={status ? "#edb193" : "#e6f0e9"}
//                                                                 ios_backgroundColor="#3e3e3e"
//                                                                 onValueChange={() => toggleSwitch(key, !s['status'], loc.mode)}
//                                                                 value={status}
//                                                             />

//                                                         </View>

//                                                     </>
//                                                 )}
//                                                 {/* <Text>hi</Text> */}
//                                                 <Text style={styles.boardtitle}>{b.switchBoardId}</Text>
//                                             </View>
//                                         </>
//                                     )}
//                                     {loc.BathroomB != null ? <Text style={styles.title}>{loc.BathroomB}</Text> : null}
//                                     {loc.Bathroom != null ? loc.Bathroom.map(b =>
//                                         <>
//                                             <View style={styles.card}>
//                                                 <Text>2</Text>
//                                                 {b.switches.map((s, i) =>
//                                                     <>
//                                                         <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
//                                                             <Text style={styles.textStyle}>{s['sw']}</Text>
//                                                             <Switch
//                                                                 trackColor={{ false: "#767577", true: "#81b0ff" }}
//                                                                 thumbColor={loc.mode_active_status ? "#f5dd4b" : "#f4f3f4"}
//                                                                 ios_backgroundColor="#3e3e3e"
//                                                                 onValueChange={() => toggleSwitch(key, !loc.mode_active_status, loc.mode)}
//                                                                 value={loc['mode_active_status']}
//                                                             />
//                                                         </View>
//                                                     </>
//                                                 )}
//                                                 <Text>{b.switchBoardId}</Text>
//                                             </View>
//                                         </>
//                                     ) : null}
//                                     {loc.BalconyB != null ? <Text style={styles.title}>{loc.BalconyB}</Text> : null}
//                                     {loc.Balcony != null ? loc.Balcony.map(b =>
//                                         <>
//                                             <View style={styles.card}>
//                                                 {b.switches.map((s, i) =>
//                                                     <>
//                                                         <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
//                                                             <Text style={styles.textStyle}>{s['sw']}</Text>
//                                                             <Switch
//                                                                 trackColor={{ false: "#767577", true: "#81b0ff" }}
//                                                                 thumbColor={loc.mode_active_status ? "#f5dd4b" : "#f4f3f4"}
//                                                                 ios_backgroundColor="#3e3e3e"
//                                                                 onValueChange={() => toggleSwitch(key, !loc.mode_active_status, loc.mode)}
//                                                                 value={loc['mode_active_status']}
//                                                             />
//                                                         </View>
//                                                     </>

//                                                 )}
//                                                 <Text style={styles.boardtitle}>{b.switchBoardId}</Text>
//                                             </View>
//                                         </>
//                                     ) : null}
//                                 </View>
//                             </>
//                         )
//                     }
//                     )}
//                 </SafeAreaView>

//             </View>
//         )
//     };
//     Select_Switches.propTypes = {
//         getDetails: PropTypes.func,
//         getSwitchStatus: PropTypes.instanceOf(Array),
//         getStatus: PropTypes.func,
//         changeautomanualstatus: PropTypes.instanceOf(Array),
//         getActiveStatus: PropTypes.func,
//         pirstatus: PropTypes.instanceOf(Array),
//         pirData: PropTypes.func,
//         setpirstatus: PropTypes.instanceOf(Array),
//         setTempLux: PropTypes.func,
//         automanualtemp: PropTypes.instanceOf(Array),
//     };

//     Select_Switches.defaultProps = {
//         getDetails: () => { },
//         getSwitchstatus: [],
//         getStatus: () => { },
//         changeautomanualstatus: [],
//         getActiveStatus: () => { },
//         pirstatus: [],
//         pirData: () => { },
//         setpirstatus: [],
//         setTempLux: () => { },
//         automanualtemp: [],
//     };

//     const mapStateToProps = ({ getautomanualstatus: { automanualstatus }, setautomanualstatus: { changeautomanualstatus }, getPirStatus: { pirstatus }, setPirStatus: { setpirstatus }, setAutomanualTemp: { automanualtemp } }) => ({ automanualstatus, changeautomanualstatus, pirstatus, setpirstatus, automanualtemp });
//     const mapDispatchToProps = { getDetails: send => getSwitchdetails(send), getStatus: send => getSwitchStatus(send), getActiveStatus: send => setpirStatus(send), pirData: send => getpirStatus(send), setTempLux: send => setAutomanulTempLux(send) };
//     export default connect(mapStateToProps, mapDispatchToProps)(Select_Switches);

//     const styles = StyleSheet.create({
//         centeredView: {
//             // justifyContent: "center",
//             // alignItems: "center",
//             // marginTop: 22
//         },
//         baseText: {
//             // fontWeight: 'bold',
//             fontSize: 12
//         },
//         baseTextH: {
//             // fontWeight: 'bold',
//             paddingBottom: 3,
//             fontSize: 15
//         },
//         modalView: {
//             margin: 8,
//             backgroundColor: "white",
//             borderRadius: 20,
//             paddingVertical: 35,
//             paddingHorizontal: 15,
//             alignItems: "center",
//             shadowColor: "#000",
//             shadowOffset: {
//                 width: 2,
//                 height: 2
//             },
//             shadowOpacity: 0.25,
//             shadowRadius: 4,
//             elevation: 5
//         },
//         button: {
//             borderRadius: 20,
//             height: 50,
//             width: 100,
//             padding: 10,
//             elevation: 2,
//             // marginRight: 10,
//             marginLeft: 10
//         },
//         button1: {
//             borderRadius: 20,
//             height: 50,
//             width: 100,
//             padding: 10,
//             elevation: 2,
//             marginBottom: 10,
//             marginLeft: 10
//         },
//         buttonOpen: {
//             backgroundColor: "#009387",
//         },
//         buttonClose: {
//             backgroundColor: "#2196F3",
//         },
//         textStyle: {
//             color: "white",
//             // color: "#2f353d",
//             fontWeight: "bold",
//             textAlign: "center"
//         },
//         modalText: {
//             marginBottom: 15,
//             textAlign: "center"
//         },
//         buttonRow: {
//             // height: 100,
//             flexDirection: "row",
//             marginTop: 50,
//             marginLeft: 27,
//             marginRight: 49
//         },
//         card: {
//             // marginTop: 10,
//             padding: 10,
//             marginBottom: 10,
//             marginHorizontal: 10,
//             borderRadius: 20,
//             // borderColor: '#696969',
//             // backgroundColor: '#ccc',
//             backgroundColor: '#3d3c3c',
//             // borderBottomColor: '#ccc',
//             borderBottomWidth: 0.15,
//             // zIndex: 2,
//         },
//         cardboard: {
//             marginBottom: 2,
//             borderRadius: 20,
//             backgroundColor: '#4d4b4b',
//         },
//         cardthemOn: {
//             flexDirection: 'row',
//             marginLeft: 10,
//             marginBottom: 10,
//             marginTop: 10,
//             borderRadius: 8,
//             // backgroundColor: '#009387',
//             backgroundColor: '#4d4b4b',
//             zIndex: 1,
//             borderColor: '#949191',
//             // borderColor: '#009387',
//             borderWidth: 1,
//         },
//         cardthemOff: {
//             flexDirection: 'row',
//             marginLeft: 10,
//             marginBottom: 10,
//             marginTop: 10,
//             borderRadius: 8,
//             // backgroundColor: '#3d3c3c',
//             backgroundColor: '#4d4b4b',
//             zIndex: 1,
//             borderColor: '#0f0d0d',
//             borderWidth: 1,
//         },
//         boardtitle: {
//             // paddingStart: 60,
//             // paddingHorizontal: 10,
//             // paddingVertical: 10,
//             // paddingLeft: 40,
//             marginLeft: 15,
//             fontSize: 12,
//             transform: [{ rotate: '270deg' }],
//             color: '#252626',
//         },
//         boadbathroom: {
//             // paddingStart: 12,
//             paddingHorizontal: 10,
//             // paddingLeft: 15,
//             fontSize: 15,
//             fontWeight: "bold",
//             // transform: [{rotate: '270deg' }],
//             color: '#2f0736',
//         },
//         title: {
//             paddingLeft: 20,
//             // fontSize: 25,
//             // fontFamily: 'sans-serif',
//             // fontWeight: '700',
//             // color: '#000000',
//             fontSize: 20,
//             color: '#cf7670',
//             fontWeight: "bold",
//             // textAlign: "center"
//         },
//         titleButton: {
//             fontSize: 20,
//             color: "#2f353d",
//             fontWeight: "bold",
//             textAlign: "center"
//         },
//         textArea: {
//             paddingTop: 10,
//             paddingBottom: 10,
//             paddingRight: 18,
//             paddingLeft: 18,
//             // flexDirection: "row"
//         },
//         icon: {
//             paddingLeft: 5,
//             paddingBottom: 5
//             // margin: 5
//         },
//         titleButtonOn: {
//             fontSize: 16,
//             // color: "#2f353d",
//             color: '#949191',
//             fontWeight: 'bold',
//             textAlign: 'center',
//         },
//         titleButtonOff: {
//             fontSize: 16,
//             // color: "#2f353d",
//             color: '#282929',
//             fontWeight: 'bold',
//             textAlign: 'center',
//         },
//         rowicon: {
//             flexDirection: "row"
//         },
//         modelTitle: {
//             fontSize: 18,
//             marginTop: 12,
//             marginRight: 20,
//             fontWeight: 'bold',
//             // margin: 15
//         },
//         Modalbutton: {
//             // justifyContent: 'flex-end',
//             // alignItems: 'flex-end',
//             // alignContent: 'flex-end',
//             borderRadius: 20,
//             height: 40,
//             width: 100,
//             padding: 10,
//             elevation: 2,
//             marginTop: 20,
//             // marginLeft: 150,
//         },

//     });



//bugs if user require means they need to show 'switch-board-id' number
// this page contains two designs same like has 'auto/manual' board and 'toggle' switch mode


