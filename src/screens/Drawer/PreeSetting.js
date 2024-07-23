
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
    Platform,
    Alert,
    Modal,
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    SafeAreaView,
    Pressable,
    TouchableOpacity,
    TouchableHighlight,
    Switch,
    RefreshControl
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import Slider from '@react-native-community/slider';
import Ico from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import Fether from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { autoManualDetails } from '../../redux/actions/autoManualDetails';
import { connect } from "react-redux";
import PropTypes, { array } from "prop-types";
import { getSlno } from '../AsyncStorage';
import { setPreeset } from '../../redux/actions/setPreeset';
import { socketUpdate } from '../../redux/actions/socketUpdate'
// import DropdownMenu from 'react-native-dropdown-menu';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTheme } from '@react-navigation/native';






var res = [];
// var data = [["Light", "Fan", "Socket"]];
var sock = [];

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

var sl_no;

const PreeSetting = ({ getDetails, getStatus, getUpdate }) => {

    const [location, setlocation] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [arrays, setArrays] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modaldata, setmodalData] = useState('');
    const [switchId, setSwitchId] = useState('');

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([]);
    const [items, setItems] = useState([
        // { label: 'Select an item', value:' ' },
        { label: 'Wifi', value: 'wifi' },
        { label: 'Fridge', value: 'fridge' },
        { label: 'Oven ', value: 'oven ' },
        { label: 'Fish Tank', value: 'fishtank' },
        { label: 'UPS', value: 'ups' },
        { label: 'Socket-1', value: 'socket-1' },
        { label: 'Socket-2', value: 'socket-2' },
        { label: 'Socket-3', value: 'socket-3' },
        { label: 'Other  ', value: 'other' },
    ]);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(async () => {
            sl_no = await getSlno();
            setLoading(false);
            setRefreshing(false)
            // init(sl_no);
        }, 10);

    };

    //Theme setting
    const theme = useTheme();
    const styles = useStyles(theme);
    const { colors } = { ...theme };


    //only testing purpose we writed


    const updateSwitch = (sl_no) => {
        setModalVisible(!modalVisible);
        // console.log("switchid", switchId);
        // console.log("switch type", value);
        const send = [];
        const updateSwitchPayload = { sl_no: sl_no, switches: [{ id: switchId, switch_type: value }] }
        send.push(updateSwitchPayload);
        console.log("Payload", JSON.stringify(send));
        getUpdate(send).then(response => {
            console.log("responserecived", response);
        })
        setValue('Select an item');

    }




    useEffect(() => {
        setTimeout(async () => {
            sl_no = await getSlno();
            console.log("Use Effect called", sl_no);
            setLoading(true);
            init(sl_no);
        }, 1000);
        console.log("use Effect");
        return () => { };
    }, []);


    const init = (sl_no) => {
        const send = [];
        const no = { "sl_no": sl_no };
        send.push(no);
        getDetails(send)
            .then((response) => {
                setlocation(response);

            })
    };

    //calling submit button 
    const call = (sl_no) => {
        console.log("res data", arrays);
        const send = [];
        const data = { no: "switches", sl_no: sl_no, switches: arrays }
        send.push(data);
        console.log("submitpayload", send);
        getStatus(send).then(response => {
            console.log("responserecived", response);
        })
        // getStatus(location).then(response => {
        //     Toast.show(response, Toast.LONG, Toast.TOP);
        // });
    }



    function arrayRemove(arr, value) {
        console.log("amar")
        return res = arr.filter(function (geeks) {
            return geeks != value;
        });

    }


    //changing the Switch Status
    const change_status = async (id, status) => {
        console.log("Change switch called", arrays);

        // setArrays.push(id)
        //console.log("id sattus", id, status);
        //const sl_no = await getSlno();
        //const payload = { "sl_no": sl_no, "location": route.params.location, "mode": "work", 'status': status };
        //const send = [];
        // const payload = { 'sl_no': sl_no, 'id': id, 'status': status }
        // send.push(payload);
        // console.log("status recinvig from switch press", send);
        // console.log(send, "Change Switch Status Payload setting");
        // getStatus(send).then(response => {
        //     init(sl_no);
        //     if (response[0].error) {
        //         Toast.show(response[0].error, Toast.LONG, Toast.TOP);
        //     }
        // })
    }

    function onLongPressButton(id) {
        //alert('You long-pressed the button!')
        setSwitchId(id);
        setModalVisible(true)
    }


    return (
        <View style={styles.centeredView}>
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
                    {location.map((loc) => {
                        return (
                            <View>
                                <Text style={styles.locationtext}>{loc.location}</Text>
                                <View style={styles.locationcard}>
                                    {loc.boards.map((board) => {
                                        return (
                                            <>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        {board.switches.map((s, index) => {
                                                            return (
                                                                <>
                                                                    {s.status != 0 ? (
                                                                        <TouchableHighlight
                                                                            onPress={() => {
                                                                                arrayRemove(arrays, s['id']);
                                                                                setArrays(res);
                                                                                console.log("poped array value", res);
                                                                                s['status'] = '0';
                                                                                onRefresh();

                                                                            }}
                                                                            onLongPress={() => {
                                                                                setSwitchId(s['id']);
                                                                                setModalVisible(true);
                                                                            }}
                                                                        >
                                                                            <View style={styles.cardthemOn}>
                                                                                <View style={styles.textArea}>
                                                                                    <Text style={styles.titleButtonOn}>
                                                                                        {s['sw'][0]}
                                                                                    </Text>
                                                                                </View>
                                                                            </View>
                                                                        </TouchableHighlight>
                                                                    ) : (
                                                                        <TouchableHighlight
                                                                            onPress={() => {
                                                                                res.push(s['id']);
                                                                                setArrays(res);
                                                                                console.log("pushed array value", res);
                                                                                s['status'] = '1';
                                                                                onRefresh();
                                                                            }}
                                                                            onLongPress={() => { onLongPressButton(s['id']) }}
                                                                        >

                                                                            <View style={styles.cardthemOff}>
                                                                                <View style={styles.textArea}>
                                                                                    <Text style={styles.titleButtonOff}>
                                                                                        {s['sw'][0]}
                                                                                    </Text>
                                                                                </View>
                                                                            </View>
                                                                        </TouchableHighlight>
                                                                    )}

                                                                </>
                                                            )
                                                        })}

                                                    </View>
                                                    <View style={{ position: 'absolute', marginRight: 0, marginHorizontal: 272 }}>
                                                        <Text style={styles.boardtitle}>{board.switchBoardId}</Text>
                                                    </View>
                                                </View>
                                            </>

                                        )
                                    })
                                    }
                                    {loc.BathroomB != null ? <Text style={styles.baseTextH}>   {loc.BathroomB}</Text> : null}
                                    {loc.Bathroom != null ? loc.Bathroom.map(b =>
                                        <>
                                            {/* <View style={styles.cardboard}> */}
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    {b.switches.map((s, i) => (
                                                        <>
                                                            {s['status'] != 0 ? (
                                                                <TouchableHighlight
                                                                    onPress={() => {
                                                                        arrayRemove(arrays, s['id']);
                                                                        setArrays(res);
                                                                        console.log("poped array value", res);
                                                                        s['status'] = '0';
                                                                        onRefresh();
                                                                    }}
                                                                    onLongPress={() => { onLongPressButton() }}>
                                                                    <View style={styles.cardthemOn}>
                                                                        <View style={styles.textArea}>
                                                                            <Text style={styles.titleButtonOn}>
                                                                                {s['sw'][0]}
                                                                            </Text>
                                                                        </View>
                                                                    </View>
                                                                </TouchableHighlight>
                                                            ) : (
                                                                <TouchableHighlight
                                                                    onPress={() => {
                                                                        res.push(s['id']);
                                                                        setArrays(res);
                                                                        console.log("pushed array value", res);
                                                                        s['status'] = '1';
                                                                        onRefresh();

                                                                    }}
                                                                    onLongPress={() => { onLongPressButton() }}
                                                                >
                                                                    <View style={styles.cardthemOff}>
                                                                        <View style={styles.textArea}>
                                                                            <Text style={styles.titleButtonOff}>
                                                                                {s['sw'][0]}
                                                                            </Text>
                                                                        </View>
                                                                    </View>
                                                                </TouchableHighlight>
                                                            )}

                                                        </>
                                                    ))}
                                                </View>
                                                <View style={{ position: 'absolute', marginRight: 0, marginHorizontal: 272 }}>
                                                    <Text style={styles.boardtitle}>{b.switchBoardId}</Text>
                                                </View>
                                            </View>
                                            {/* </View> */}
                                        </>
                                    ) : null}

                                    {loc.BalconyB != null ? <Text style={styles.baseTextH}>   {loc.BalconyB}</Text> : null}
                                    {loc.Balcony != null ? loc.Balcony.map(b =>
                                        <>
                                            <View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        {b.switches.map((s, i) => (
                                                            <>
                                                                {s['status'] != 0 ? (
                                                                    <TouchableHighlight
                                                                        onPress={() => {
                                                                            arrayRemove(arrays, s['id']);
                                                                            setArrays(res);
                                                                            console.log("poped array value", res);
                                                                            s['status'] = '0';
                                                                            onRefresh();

                                                                        }}
                                                                        onLongPress={() => { onLongPressButton() }}
                                                                    >
                                                                        <View style={styles.cardthemOn}>
                                                                            <View style={styles.textArea}>
                                                                                <Text style={styles.titleButtonOn}>
                                                                                    {s['sw'][0]}
                                                                                </Text>
                                                                            </View>
                                                                        </View>
                                                                    </TouchableHighlight>
                                                                ) : (
                                                                    <TouchableHighlight
                                                                        onPress={() => {
                                                                            res.push(s['id']);
                                                                            setArrays(res);
                                                                            console.log("pushed array value", res);
                                                                            s['status'] = '1';
                                                                            onRefresh();
                                                                        }}
                                                                        onLongPress={() => { onLongPressButton(s['id']) }}
                                                                    >
                                                                        <View style={styles.cardthemOff}>
                                                                            <View style={styles.textArea}>
                                                                                <Text style={styles.titleButtonOff}>
                                                                                    {s['sw'][0]}
                                                                                </Text>
                                                                            </View>
                                                                        </View>
                                                                    </TouchableHighlight>
                                                                )}

                                                            </>
                                                        ))}

                                                    </View>
                                                    <View style={{ position: 'absolute', marginRight: 0, marginHorizontal: 272 }}>
                                                        <Text style={styles.boardtitle}>{b.switchBoardId}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </>
                                    ) : null}
                                </View>

                            </View>

                        )
                    })}
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.submit}
                            onPress={() => { call(sl_no) }}
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
                    <View style={styles.centeredView}>
                        <Modal
                            propagateSwipe={true}
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                                // Alert.alert("Modal has been closed.");

                            }}
                        >

                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={styles.container}>
                                        <DropDownPicker
                                            placeholder="Select an item"
                                            defaultIndex={0}
                                            containerStyle={{
                                                height: 90,
                                            }}
                                            dropDownStyle={{
                                                marginTop: 11,
                                                borderBottomLeftRadius: 10,
                                                borderBottomRightRadius: 10,
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                            }}
                                            dropDownMaxHeight={200}
                                            itemStyle={{ justifyContent: 'flex-start', marginTop: 10, borderBottomWidth: 0.5, fontSize: 50 }}

                                            style={{
                                                borderBottomColor: '#4C84FF',
                                                borderBottomWidth: 1,
                                                zIndex: 5000,
                                                backgroundColor: '#eeeeee',
                                                borderBottomLeftRadius: 0,
                                                borderBottomRightRadius: 0,
                                                borderBottomStartRadius: 3,
                                                borderBottomEndRadius: 3,
                                                borderColor: '#eeeeee'
                                            }}

                                            listMode="SCROLLVIEW"
                                            searchable={true}
                                            // multiple={true}
                                            // min={0}
                                            // max={2}
                                            open={open}
                                            value={value}
                                            items={items}
                                            setOpen={setOpen}
                                            setValue={setValue}
                                            setItems={setItems}
                                        />
                                    </View>
                                    <Pressable
                                        style={[styles.buttonmodal, styles.buttonClose]}
                                        onPress={() => {
                                            // setModalVisible(!modalVisible);
                                            updateSwitch(sl_no);

                                        }}
                                    >
                                        <Text style={styles.textStyle}>Save</Text>
                                    </Pressable>
                                </View>

                            </View>

                        </Modal>
                        {/* <Pressable
                            style={[styles.button, styles.buttonOpen]}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={styles.textStyle}>Show Modal</Text>
                        </Pressable> */}
                    </View>

                </ScrollView >
            </SafeAreaView>
        </View >
    )
}

PreeSetting.propTypes = {
    getDetails: PropTypes.func,
    getUpdate: PropTypes.func,
    automanualstatus: PropTypes.instanceOf(Array),
    preesetSet: PropTypes.instanceOf(Array),
    // getStatus: PropTypes.func,
    // changeautomanualstatus: PropTypes.instanceOf(Array),
    // getActiveStatus: PropTypes.func,
    // pirstatus: PropTypes.instanceOf(Array),
    // pirData: PropTypes.func,
    // setpirstatus: PropTypes.instanceOf(Array),
    // setTempLux: PropTypes.func,
    // automanualtemp: PropTypes.instanceOf(Array),
};

PreeSetting.defaultProps = {
    getDetails: () => { },
    getUpdate: () => { },
    automanualstatus: [],
    preesetSet: [],
    socketUpdating: [],
    // getStatus: () => { },
    // changeautomanualstatus: [],
    // getActiveStatus: () => { },
    // pirstatus: [],
    // pirData: () => { },
    // setpirstatus: [],
    // setTempLux: () => { },
    // automanualtemp: [],
};

const mapStateToProps = ({ getautomanualstatus: { automanualstatus }, setautomanualstatus: { changeautomanualstatus }, getPirStatus: { pirstatus }, setPirStatus: { setpirstatus }, setAutomanualTemp: { automanualtemp } }) => ({ automanualstatus, changeautomanualstatus });
const mapDispatchToProps = { getDetails: send => autoManualDetails(send), getStatus: send => setPreeset(send), getUpdate: send => socketUpdate(send) };


export default connect(mapStateToProps, mapDispatchToProps)(PreeSetting);

const useStyles = theme => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
    },
    centeredView: {
        // justifyContent: "center",
        // alignItems: "center",
        // marginTop: 22
    },
    locationtext: {
        color: theme.colors.locationtext,
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 6
    },
    baseText: {
        // fontWeight: 'bold',
        fontSize: 12
    },
    baseTextH: theme.dark ? {
        fontWeight: 'bold',
        paddingBottom: 3,
        fontSize: 14,
        color: theme.colors.modaltitletext,
    } : {
        fontWeight: 'bold',
        paddingBottom: 3,
        fontSize: 14,
        color: theme.colors.modaltitletext,
    },
    // modalView: {
    //     margin: 8,
    //     backgroundColor: "white",
    //     borderRadius: 20,
    //     paddingVertical: 35,
    //     paddingHorizontal: 15,
    //     alignItems: "center",
    //     shadowColor: "#000",
    //     shadowOffset: {
    //         width: 2,
    //         height: 2
    //     },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 4,
    //     elevation: 5
    // },
    // button: {
    //     borderRadius: 20,
    //     height: 50,
    //     width: 100,
    //     padding: 10,
    //     elevation: 2,
    //     // marginRight: 10,
    //     marginLeft: 10
    // },
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
    // card: {
    //     padding: 10,
    //     marginBottom: 10,
    //     marginHorizontal: 10,
    //     borderRadius: 20,

    //     // borderColor: '#696969',
    //     // backgroundColor: '#ccc',
    //     backgroundColor: '#3d3c3c',
    //     // borderBottomColor: '#ccc',
    //     borderBottomWidth: 0.15,
    // },
    locationcard: theme.dark ? {
        padding: 15,
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 20,
        // borderWidth: 1,
        // borderColor: '#323F4B',
        backgroundColor: theme.colors.locationcard,
    } : {
        padding: 15,
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 20,
        // backgroundColor: theme.colors.locationcard,
        // borderBottomWidth: 0.15,
        // zIndex: 2,
        borderColor: '#117C6F',
        borderWidth: 1,
    },
    cardboard: {
        // marginBottom: 2,
        // borderRadius: 20,
        // backgroundColor: '#4d4b4b',
        // // paddingLeft: 10,
        // // alignItems: 'center',
        // alignItems: 'center',
        // width: 300,
        marginBottom: 2,
        borderRadius: 20,
        backgroundColor: '#4d4b4b',
        width: 295,
    },
    cardthemOn: theme.dark ?
        {
            flexDirection: 'row',
            marginLeft: 10,
            marginBottom: 10,
            marginTop: 10,
            borderRadius: 8,
            backgroundColor: '#fbffff',
            zIndex: 1,
            // borderColor: '#3D5C64',
            // borderWidth: 1,

        } : {
            flexDirection: 'row',
            marginLeft: 10,
            marginBottom: 10,
            marginTop: 10,
            borderRadius: 8,
            backgroundColor: '#117C6F',
            zIndex: 1,
            // borderColor: '#3D5C64',
            // borderWidth: 1,
        },
    cardthemOff: theme.dark ?
        {
            flexDirection: 'row',
            marginLeft: 10,
            marginBottom: 10,
            marginTop: 10,
            borderRadius: 8,
            backgroundColor: '#22272d',
            zIndex: 1,
            // borderColor: '#abb0b3',
            // borderWidth: 1,
        } : {
            flexDirection: 'row',
            marginLeft: 10,
            marginBottom: 10,
            marginTop: 10,
            borderRadius: 8,
            // backgroundColor: '#DAE2DF',
            zIndex: 1,
            borderColor: '#117C6F',
            borderWidth: 1,
        },
    boardtitle: {
        // paddingStart: 60,
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        // paddingLeft: 40,
        // marginLeft: 15,
        // fontSize: 12,
        // transform: [{ rotate: '270deg' }],
        // color: '#252626',
        marginTop: 20,
        marginLeft: 10,
        fontSize: 15,
        alignItems: "center",
        color: theme.colors.modaltitletext,
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
        justifyContent: 'center',
    },
    icon: {
        paddingLeft: 5,
        paddingBottom: 5
        // margin: 5
    },
    titleButtonOn: theme.dark ? {
        fontSize: 14,
        color: '#22272d',
        fontWeight: 'bold',
        textAlign: 'center',
    } : {
        fontSize: 14,
        color: '#DAE2DF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titleButtonOff: theme.dark ? {
        fontSize: 14,
        color: '#abb0b3',
        fontWeight: 'bold',
        textAlign: 'center',
    } : {
        fontSize: 14,
        color: '#282929',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        alignItems: 'center',
        marginBottom: 80,
        paddingTop: 20

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

    //modal properties adding
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 50,
        marginBottom: 170,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonmodal: {
        borderRadius: 20,
        // marginTop: 120,
        padding: 15,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }

});
