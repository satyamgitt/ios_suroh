/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl, ActivityIndicator } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes, { array } from "prop-types";
import { changeStatus } from '../../../redux/actions/changeStatus';
import { getRecentPressed } from "../../../redux/actions/getRecentPressed";

import { getSlno } from '../../AsyncStorage';
import Toast from 'react-native-simple-toast';


const initialValue = [
    {
        "location": "Hall",
        "boards": [
            {
                "switchBoardId": "1",
                "switches": [
                    {
                        "id": "Ajna_A_12_2__11",
                        "sw": "F",
                        "status": "0"
                    },
                    {
                        "id": "Ajna_A_12_2__12",
                        "sw": "L",
                        "status": "0"
                    }
                ]
            },
            {
                "switchBoardId": "2",
                "switches": [
                    {
                        "id": "Ajna_A_12_2__21",
                        "sw": "F",
                        "status": "0"
                    },
                    {
                        "id": "Ajna_A_12_2__22",
                        "sw": "W",
                        "status": "0"
                    }
                ]
            }
        ],
        "temp": "15",
        "lux": "30",
        "Balcony": [
            {
                "switchBoardId": "1",
                "switches": [
                    {
                        "id": "Ajna_A_12_2__Bal_11",
                        "sw": "L",
                        "status": "0"
                    },
                    {
                        "id": "Ajna_A_12_2__Bal_12",
                        "sw": "L",
                        "status": "0"
                    }
                ]
            }
        ],
        "BalconyB": "Balcony"
    }
]

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

const RecentScreen = ({ navigation, getDetails, getStatus }) => {
    const [location, setlocation] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = useState(false);


    const [data, setData] = useState(initialValue);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);

    const [res, setres] = useState([
        { titl: "Board1", key: "b" }]);

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
            init(sl_no);
        }, 1000);
        // wait(2000).then(() => setRefreshing(false));
    };
    useEffect(() => {
        setTimeout(async () => {
            const sl_no = await getSlno();
            setLoading(true);
            init(sl_no);
        }, 1000);
        console.log("useeffect called");
        return () => { };
    }, [setlocation]);

    const init = (sl_no) => {
        const send = [];
        const no = { "sl_no": sl_no };
        send.push(no);
        console.log(send);
        console.log('log menu api');
        getDetails(send).then(response => {
            setlocation(response);
            setLoading(false);
            setRefreshing(false)
            console.log(response);

        });
        console.log("Data from Api's");
    };

    const change_status = async (id, status) => {
        const sl_no = await getSlno();
        const send = [];
        const payload = { 'sl_no': sl_no, 'id': id, 'status': status }
        send.push(payload);
        console.log(send, "  data payload");
        // Toast.show('This is a toast of first see this.', Toast.LONG, Toast.TOP);
        getStatus(send).then(response => {
            // setstatus(response);
            init(sl_no);
            console.log(response[0].error);
            if (response[0].error) {
                Toast.show(response[0].error, Toast.LONG, Toast.TOP);
            }
            console.log('pressed details');
        })
    }

    return (
        <View style={styles.centeredView} >
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
                            <View style={styles.card}>
                                <Text style={styles.title}>{loc.location}</Text>
                                {loc.boards.map(b =>
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
                                                                }}>
                                                                <View style={styles.cardthemOn}>
                                                                    <View style={styles.textArea}>
                                                                        <Text style={styles.titleButtonOn}>
                                                                            {s['sw']}
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
                                                                }}>
                                                                <View style={styles.cardthemOff}>
                                                                    <View style={styles.textArea}>
                                                                        <Text style={styles.titleButtonOff}>
                                                                            {s['sw']}
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
                                                                }}>
                                                                <View style={styles.cardthemOn}>
                                                                    <View style={styles.textArea}>
                                                                        <Text style={styles.titleButtonOn}>
                                                                            {s['sw']}
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
                                                                }}>
                                                                <View style={styles.cardthemOff}>
                                                                    <View style={styles.textArea}>
                                                                        <Text style={styles.titleButtonOff}>
                                                                            {s['sw']}
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
                                                                    console.log(s['id']),
                                                                        console.log(s['status']);
                                                                }}>
                                                                <View style={styles.cardthemOn}>
                                                                    <View style={styles.textArea}>
                                                                        <Text style={styles.titleButtonOn}>
                                                                            {s['sw']}
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
                                                                }}>
                                                                <View style={styles.cardthemOff}>
                                                                    <View style={styles.textArea}>
                                                                        <Text style={styles.titleButtonOff}>
                                                                            {s['sw']}
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
                        )}</>
                    )}

                </ScrollView >
            </SafeAreaView >
        </View >
    );
};
RecentScreen.propTypes = {
    getDetails: PropTypes.func,
    recentswitchs: PropTypes.instanceOf(Array),
    getStatus: PropTypes.func,
    changestatus: PropTypes.instanceOf(Array),
};

RecentScreen.defaultProps = {
    getDetails: () => { },
    recentswitchs: [],
    getStatus: () => { },
    changestatus: [],

};


const mapStateToProps = ({ getRecentSwitchs: { recentswitchs }, changeStatus: { changestatus } }) => ({ recentswitchs, changestatus });
const mapDispatchToProps = { getDetails: (send) => getRecentPressed(send), getStatus: send => changeStatus(send) };

export default connect(mapStateToProps, mapDispatchToProps)(RecentScreen);

const styles = StyleSheet.create({
    centeredView: {
        // flex: 1,
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
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
        // backgroundColor: '#606060',
        backgroundColor: '#4d4b4b',
        zIndex: 1,
        borderColor: '#949191',
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
    rowicon: {
        flexDirection: "row"
    }
});






