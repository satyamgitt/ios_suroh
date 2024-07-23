/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Platform,
    Alert,
    Modal,
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    RefreshControl,
    Button,
    TextInput,
    ActivityIndicator,
    Image,
    Switch,
    Dimensions,
} from 'react-native';
import PropTypes, { array } from 'prop-types';
import Toast from 'react-native-simple-toast';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ico from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import { getSlno } from '../../../AsyncStorage';
// import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from '@react-native-community/checkbox';
import { Value } from 'react-native-reanimated';
import { mode_Set } from '../../../../redux/actions/Mode/mode_Set';
import { addMode_ } from '../../../../redux/actions/Mode/addMode_';
import { mode_Details } from '../../../../redux/actions/Mode/mode_Details';
import { modeDelete } from '../../../../redux/actions/Mode/modeDelete';
import { modeSwitch } from '../../../../redux/actions/Mode/modeSwitch';
import { scheduleAdd } from '../../../../redux/actions/schedule/scheduleAdd';
import DatePicker from 'react-native-date-picker'
import { getSwitchdetails } from "../../../../redux/actions/getSwitchDetails";
import LinearGradient from 'react-native-linear-gradient';
import { switchStatusUpdate } from '../../../../redux/actions/switchStatusUpdate';
import { BlurView } from "@react-native-community/blur"

// Creating Responsive
const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const scale = size => (width / guidelineBaseWidth) * size;
// console.log("size", size);
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
    size + (scale(size) - size) * factor;



const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};
var sl_no;
var modes;

const ModeScreen = ({ navigation, getDetails, getSchedule, route, dummy, _addmode, delete_Mode, _changeSwitch, switchDetails, updateSwitch }) => {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [location, setLocation] = useState([]);
    const [modeVal, setModeVal] = useState([]);
    const [isEnabled, setIsEnabled] = useState(true);
    const updateSecureTextEntry = () => setIsEnabled(previousState => !previousState);
    const [modalVisiblename, setModalVisiblename] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    //Add Scedule Data
    const [days, setdays] = useState([]);
    const [dateF, setdateF] = useState(new Date());
    const [dateT, setdateT] = useState(new Date());
    const [modeFrom, setModeFrom] = useState('date');
    const [modeTo, setModeTo] = useState('date');
    //showing datepicker modal
    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);

    const [open, setOpen] = useState(false);
    const [openTo, setOpenTo] = useState(false);

    const [fromTime, setfromTime] = useState('00:00:00');
    const [toTime, settoTime] = useState('00:00:00');
    const [dispFrom, setDispFrom] = useState();
    const [dispTo, setDispTo] = useState();
    const [payloadFrom, setPayloadForm] = useState(null);
    const [payloadTo, setPayloadTo] = useState(null);

    //Selecting Switches Details
    const [switchVisible, setswitchVisible] = useState(false);
    const [sloading, setsLoading] = useState(false);
    const [slocation, setslocation] = useState([]);


    // const [temparature, settemparature] = useState(0);
    // const [luminosity, setluminosity] = useState(0);
    // const [tempval, settempval] = useState(0);
    // const [templum, settemlum] = useState(0);
    // const [area, setarea] = useState();

    // const [slocation, ssetlocation] = useState([]);
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

    //we are spreading the data
    const [data, setData] = React.useState({
        mode: '',
        check_textInputChange: false,
        isValidUser: true,
    });


    // React.useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         // Alert.alert('Refreshed');
    //         init(sl_no);
    //     });
    //     return unsubscribe;
    // }, [navigation]);



    const toggleSwitch = (index, item, mode) => {
        console.log('index,item,mode', index, item, mode);
        console.log(index, item);
        let templocation = [...location];
        templocation[index - 1].mode_active_status = item;
        // console.log(templocation);
        setLocation(templocation);
        console.log(location);
        modeSwitchsData(item, mode);
    }

    const onRefresh = () => {
        // setLoading(false)
        setRefreshing(true);
        setTimeout(async () => {
            sl_no = await getSlno();
            init(sl_no);
        }, 1000);
    };
    console.log("amar", route.params);
    useEffect(() => {
        setTimeout(async () => {
            sl_no = await getSlno();
            setLoading(true);
            console.log('slno: ', sl_no);
            setLoading(false);
            setRefreshing(false);
            console.log("cheking data");
            init(sl_no);
            setLoading(true);
            modeSwitchsData();
        }, 1000);
        console.log("useeffect called");
        return () => { };
    }, []);

    const init = () => {
        const send = [];
        const no = { "sl_no": sl_no, 'location': route.params.location };
        send.push(no);
        console.log("modeinit", send);
        setLoading(false);
        setRefreshing(false);
        getDetails(send).then(response => {
            setLocation(response);
            console.log("moderesponserecived", JSON.stringify(response));
            setLoading(false);
            setRefreshing(false);
        });
    };

    const gethook = () => {

        setModalVisiblename(true)
    };

    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                mode: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                mode: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }
    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const modeSwitchsData = (data, mode) => {
        const send = [];
        const payload = { 'sl_no': sl_no, 'location': route.params.location, 'mode': mode, 'status': data }
        send.push(payload);
        console.log(send, 'pushing Data');
        _changeSwitch(send).then(response => {
            // Toast.show(response, Toast.LONG, Toast.TOP);
            console.log(response, "change_switch_response");
            init(sl_no);
        })
    };

    const DeleteMode = (mode) => {
        console.log("deletecalled");
        let send = [];
        const payload = { 'sl_no': sl_no, 'location': route.params.location, 'mode': mode }
        send.push(payload);
        console.log(send);
        delete_Mode(send)
            .then((response) => {
                Toast.show(response, Toast.LONG, Toast.TOP);
                init(sl_no);
                console.log(response, 'data');
            })
        console.log("log details api");
    };


    const checkMode = (modename) => {
        console.log("newmodeName", modename);
        if (modename.trim().length >= 4) {
            addNewMode(modename);
            setModalVisiblename(!modalVisiblename)
        } else {
            Alert.alert('Wrong Input!', "Mode field should be 4 character", [
                { text: 'Okay' }
            ]);
            return;
        }

        console.log("modename", modename);
    };

    const addNewMode = (modename) => {
        // const data = modeVal
        const send = [];
        const no = { "sl_no": sl_no, 'location': route.params.location, 'mode': modename };
        send.push(no);
        console.log("addnewmode", send);
        dummy(send).then(response => {
            console.log(response, 'recived data from gethook');
            //setModeVal(response);
            setLoading(false);
            setRefreshing(false);
            console.log(modeVal, 'modeVal');
        }
        )
        setLoading(true);
        _addmode(modeVal).then(response => {
            console.log("MODEDETAILS", response);
            Toast.show(response, Toast.LONG, Toast.TOP);
            init(sl_no);
            console.log(response, '_addmode');
        })
    };
    //Add_Timer Coder
    useEffect(() => {
        /////////////////////////////////////////////////////////////
        //Time and Date reading from API

        // let hoursOn = route.params.on_time;
        // let AmOrPmOn = hoursOn >= 12 ? 'pm' : 'am';
        // console.log("params on time", hoursOn)
        // console.log("AmorPmon", AmOrPmOn)
        // hoursOn = (hoursOn % 12) || 12;
        // let minutesOn = hoursOn.getMinutes();
        // console.log("minutes on", minutesOn);
        // let finalTimeOn = hoursOn + ":" + minutesOn + " " + AmOrPmOn;


        // let hoursOff = route.params.off_time;
        // let AmOrPmOff = hoursOff >= 12 ? 'pm' : 'am';
        // console.log("params off time", hoursOff)
        // console.log("AmorPmoff", AmOrPmOff)
        // hoursOff = (hoursOff % 12) || 12;
        // let minutesOff = hoursOff.getMinutes();
        // let finalTimeOff = hoursOff + ":" + minutesOff + " " + AmOrPmOff;
        //////////////////////////////////////////////////////////////////////

        //reciving date from system current
        let tempDate = new Date();
        let hours = tempDate.getHours()
        let AmOrPm = hours >= 12 ? 'pm' : 'am';
        hours = (hours % 12) || 12;
        var mins = tempDate.getMinutes();
        var minutes;
        if (mins <= 9) {
            minutes = '0' + mins;
        } else {
            minutes = mins;
        }
        console.log("NEW", minutes);
        let finalTime = hours + ":" + minutes + " " + AmOrPm;
        setDispFrom(finalTime);
        setDispTo(finalTime);
        // setTimeout(async () => {
        //     slno = await getSlno();
        //     // console.log('hea value is passed', route.params);
        //     setdays(route.params.days)
        // }, 1000);
        return () => {
        }
    }, []);

    const toggle = (index) => {
        const newData = [...days];
        // console.log(newData);
        newData.splice(index, 1, {
            day: days[index].day,
            status: !days[index].status
        });
        setdays(newData);
    };


    const apiCall = () => {
        const send = [];
        console.log("payloadFrom", payloadFrom);
        console.log("payloadTo", payloadTo);
        if (payloadFrom == null || payloadTo == null) {

            Toast.show("please select Timings", Toast.LONG, Toast.TOP);

        } else {
            const data = { sl_no: sl_no, mode: modes, location: route.params.location, on_time: payloadFrom, off_time: payloadTo, days: days };
            send.push(data);
            console.log("payload", JSON.stringify(send));
            getSchedule(send).then(response => {
                console.log(JSON.stringify(response));
                if (response == "Time added succesfully") {
                    Toast.show(response, Toast.LONG, Toast.TOP);
                    console.log('exicute2');
                    setModalVisible(false);
                    init(sl_no);
                    // navigation.navigate('modes');

                }
                else {
                    Toast.show(response, Toast.LONG, Toast.TOP);
                }
            });
        };
    };



    const onChangeFrom = (selectedDate) => {
        console.log("date", selectedDate)
        const currentDate = selectedDate || dateF;
        setOpen(Platform.OS === 'ios');
        setdateF(currentDate);

        // Process the date values
        let tempDate = new Date(currentDate);
        var hours = tempDate.getHours();
        const str = tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + '00';
        setPayloadForm(str);
        var AmOrPm = hours >= 12 ? 'pm' : 'am';
        hours = (hours % 12) || 12;
        var mins = tempDate.getMinutes();
        var minutes;
        if (mins <= 9) {
            minutes = '0' + mins;
            console.log("1", minutes);
        } else {
            minutes = mins;
            console.log("2", minutes);
        }
        console.log("NEW", minutes);
        var finalTime = hours + ":" + minutes + " " + AmOrPm;
        let fTime = tempDate.getHours() + ' : ' + tempDate.getMinutes() + ':' + '00'
        setDispFrom(finalTime);
        setfromTime(fTime);
        //need to set AM/PM values
        setPayloadForm(finalTime);

    };

    const onChangeTo = (selectedDate) => {
        const currentDate = selectedDate || dateT;
        setOpenTo(Platform.OS === 'ios');
        setdateT(currentDate);

        // Process the date values
        let tempDate = new Date(currentDate);
        var hours = tempDate.getHours();
        const str = tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + '00';
        setPayloadTo(str);
        var AmOrPm = hours >= 12 ? 'pm' : 'am';
        hours = (hours % 12) || 12;
        var mins = tempDate.getMinutes();
        var minutes;
        if (mins <= 9) {
            minutes = '0' + mins;
            console.log("1", minutes);
        } else {
            minutes = mins;
            console.log("2", minutes);
        }
        console.log("NEW", minutes);

        var finalTime = hours + ":" + minutes + " " + AmOrPm;
        let fTime = tempDate.getHours() + ' : ' + tempDate.getMinutes() + ':' + '00'
        setDispTo(finalTime);
        settoTime(fTime);
        setPayloadTo(finalTime);

    };


    const showModeFrom = (currentMode) => {
        setOpen(true);
        console.log("modal exicuting");
        setModeFrom(currentMode);
        console.log("setmodefrom exicuting");
    };
    const showModeTo = (currentMode) => {
        setOpenTo(true);
        setModeTo(currentMode);
    };

    //Applaying Selecting Switches in Modal
    //Status data updating based on recently changed sw status
    const call = (slocation) => {
        console.log("sendingpayload", JSON.stringify(slocation));
        updateSwitch(slocation).then(response => {
            console.log('responseredux', response);
            Toast.show(response, Toast.LONG, Toast.TOP);

        });
    }

    // useEffect(() => {
    //     setTimeout(async () => {
    //         const sl_no = await getSlno();
    //         setLoading(true);
    //         //sinit(sl_no);
    //         setLoading(false);
    //         setRefreshing(false)
    //     }, 1000);
    //     return () => { };
    // }, []);
    // useEffect(() => {
    //     console.log('hea i am called');
    // }, [slocation]);


    const sinit = (mode) => {
        const send = [];
        const no = { "sl_no": sl_no, "location": route.params.location, "mode": mode };
        console.log("switch no details", no);
        // const no = { "sl_no": "34", "location": "Hall", "mode": "night" }
        send.push(no);
        console.log("sendingdetailssinit", send);
        switchDetails(send).then(response => {
            console.log('sinit', JSON.stringify(response));
            setslocation(response);
            setLoading(false);
            setRefreshing(false)

        });
    };

    //changing the Switch Status
    const change_status = async () => {
        console.log("Change switch called");
        const sl_no = await getSlno();
        const payload = { "sl_no": sl_no, "location": route.params.location, "mode": "work", 'status': status };
        const send = [];
        send.push(payload);
        console.log("status recinvig from switch press", send);
    }


    return (
        <View style={styles.centeredView}>
            <SafeAreaView>
                <ScrollView
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
                    ) : (
                        <>
                            {location == [] || location === null ?
                                (<View>
                                    <Text style={[styles.textStyle, { alignContent: 'center' }]}>No More Modes To Shown</Text>
                                </View>) : (
                                    <>
                                        {location.map((loc, index) => {
                                            const key = index + 1;
                                            return (
                                                <>
                                                    {loc.mode_details.map((mode) => {
                                                        return (
                                                            <View style={styles.card}>

                                                                <>
                                                                    <View style={{ flexDirection: "column" }}>
                                                                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                                                            <Text style={styles.modenametext}>
                                                                                {mode['mode']}
                                                                            </Text>
                                                                            {mode['on_time'] == null ? (
                                                                                <Switch
                                                                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                                                                    thumbColor={mode.mode_active_status ? "#f5dd4b" : "#f4f3f4"}
                                                                                    ios_backgroundColor="#3e3e3e"
                                                                                    onValueChange={() => Toast.show("Set Timings", Toast.LONG, Toast.TOP)}
                                                                                    value={false}
                                                                                />
                                                                            ) : (
                                                                                <Switch
                                                                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                                                                    thumbColor={mode.mode_active_status ? "#f5dd4b" : "#f4f3f4"}
                                                                                    ios_backgroundColor="#3e3e3e"
                                                                                    onValueChange={() => toggleSwitch(key, !mode.mode_active_status, mode.mode)}
                                                                                    value={mode['mode_active_status']}
                                                                                />
                                                                            )}
                                                                        </View>
                                                                        <Text></Text>

                                                                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>

                                                                            <View style={{ flexDirection: "row", justifyContent: 'flex-start' }}>
                                                                                {/* <TouchableOpacity
                                                                                onPress={() => navigation.navigate('modesettings', { modename: mode.mode, location: route.params.location, })}>
                                                                                <Icon style={styles.icon} name="edit" size={20} />
                                                                            </TouchableOpacity> */}

                                                                                <TouchableOpacity
                                                                                    onPress={() => {
                                                                                        sinit(mode['mode'])
                                                                                        setswitchVisible(true);
                                                                                        // navigation.navigate('Select Switch', { modename: mode['mode'], location: route.params.location });
                                                                                        // console.log("insideofnavigation", mode['mode'], route.params.location);
                                                                                    }}>

                                                                                    <Icon style={styles.icon} name="edit" size={20} />

                                                                                </TouchableOpacity>
                                                                                <Text></Text>
                                                                                <TouchableOpacity
                                                                                    onPress={() => DeleteMode(mode['mode'])}>
                                                                                    <Ico style={[styles.icon, { marginLeft: 8 }]} name="delete-outline" size={20} />
                                                                                </TouchableOpacity>
                                                                                <Text>   </Text>
                                                                                <TouchableOpacity
                                                                                    activeOpacity={0.7}
                                                                                    // onPress={() => navigation.navigate('Add Schedule', { 'location': loc.location, 'mode': mode.mode, 'days': mode.days, 'on_time': mode['on_time'], 'off_time': mode.off_time })}
                                                                                    onPress={() => {
                                                                                        setdays(mode.days);
                                                                                        modes = mode.mode;
                                                                                        console.log("modech", modes);
                                                                                        setModalVisible(true)
                                                                                        console.log("Daysdetails", days);
                                                                                    }
                                                                                    }
                                                                                    style={styles.FloatingActionButtonStyle}>
                                                                                    <MaterialCommunityIcons style={styles.icon} name="timer-outline" size={20} />
                                                                                </TouchableOpacity>

                                                                            </View>
                                                                            {mode['on_time'] == null ? <Text style={{ color: '#949191' }}>Please Select Time</Text> : (
                                                                                <Text style={styles.textDisp}>
                                                                                    {mode['on_time'] == null ? null : mode['on_time'].slice(0, 5)} {''}TO{'  '}
                                                                                    {mode['off_time'] == null ? null : mode['off_time'].slice(0, 5)}<Text>{'  '}</Text>
                                                                                </Text>
                                                                            )}
                                                                        </View>
                                                                    </View>
                                                                </>
                                                            </View>
                                                        )
                                                    })}
                                                </>
                                            )
                                        }
                                        )}
                                    </>
                                )}
                        </>
                    )}

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                        <TouchableOpacity onPress={() => gethook()}>
                            {/* <View style={{ padding: 10, height: 100, margin: 10, borderWidth: 1, borderStyle: 'dashed', borderColor: 'white', borderTopColor: 'white', borderRadius: 20, alignItems: 'center' }}>
                            <View style={{ alignItems: 'center', borderWidth: 1, borderTopColor: 'white', borderWidth: 5, borderRadius: 50 }}>
                                <Image
                                    style={styles.tinyLogo}
                                    source={require('../../../../assets/squreadd.png')}
                                /></View> */}

                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.submit}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#ffffff', fontWeight: "bold"
                                }]}>Add Mode</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisiblename}
                        onRequestClose={() => {
                            // Alert.alert("Modal has been closed.");
                            setModalVisiblename(false);
                        }}
                    >
                        <View style={styles.modalView}>
                            <SafeAreaView>
                                <ScrollView style={styles.scrollView}>
                                    <View style={styles.action}>
                                        <FontAwesome
                                            name="user-o"
                                            color="green"
                                            size={20}
                                        />
                                        <TextInput
                                            placeholder="Enter Mode Name"
                                            placeholderTextColor="#666666"
                                            style={[styles.textInput]}
                                            autoCapitalize="none"
                                            onChangeText={(val) => textInputChange(val)}
                                            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                                        />
                                        {data.check_textInputChange ?
                                            <Animatable.View
                                                animation="bounceIn"
                                            >
                                                <Feather
                                                    name="check-circle"
                                                    color="green"
                                                    size={20}
                                                />
                                            </Animatable.View>
                                            : null}
                                    </View>
                                    {data.isValidUser ? null :
                                        <Animatable.View animation="fadeInLeft" duration={500}>
                                            <Text style={styles.errorMsg}>Mode Name atleast 4 characters long.</Text>
                                        </Animatable.View>
                                    }

                                    <TouchableOpacity
                                        style={[styles.Modalbutton, styles.buttonClose]}
                                        onPress={() => { checkMode(data.mode) }}
                                    >
                                        <Text style={styles.textStyle}>Add</Text>
                                    </TouchableOpacity>
                                    <Text>                 </Text>
                                    <TouchableOpacity
                                        style={[styles.Modalbutton, styles.buttonClose]}
                                        onPress={() => setModalVisiblename(!modalVisiblename)}
                                    >
                                        <Text style={styles.textStyle}>Cancel</Text>
                                    </TouchableOpacity>
                                </ScrollView>
                            </SafeAreaView>
                        </View>
                    </Modal>
                    <View style={styles.centeredView}>
                        <Modal
                            animationType='fade'
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                //Alert.alert("Modal has been closed.");
                                setModalVisible(!modalVisible);
                            }}
                        >
                            {/* <BlurView
                                blurType='light'
                                style={styles.contentWrap}> */}
                            <BlurView
                                style={styles.blurView}
                                blurType="light"  // Values = dark, light, xlight .
                                blurAmount={10}
                                // viewRef={this.state.viewRef}
                                reducedTransparencyFallbackColor="white"
                            />
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Welcome To Time Schedule</Text>
                                    {days != 0 ? (
                                        <>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text></Text>
                                                <TouchableOpacity onPress={() => showModeFrom('time')}>
                                                    <View style={styles.cardthemOff}>
                                                        <View style={styles.textArea}>
                                                            <Text style={styles.titleButtonOffT}>{dispFrom}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                                <Text style={styles.titleButtonOnT}>To</Text>
                                                <TouchableOpacity onPress={() => showModeTo('time')}>
                                                    <View style={styles.cardthemOff}>
                                                        <View style={styles.textArea}>
                                                            <Text style={styles.titleButtonOffT}>{dispTo}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={styles.cardboardT}>
                                                    <DatePicker
                                                        modal
                                                        open={open}
                                                        mode='time'
                                                        date={dateF}
                                                        onConfirm={(date) => {
                                                            setOpen(false);
                                                            onChangeFrom(date);
                                                        }}
                                                        onCancel={() => {
                                                            setOpen(false)
                                                        }}
                                                    />

                                                    <DatePicker
                                                        modal
                                                        open={openTo}
                                                        mode='time'
                                                        date={dateT}
                                                        onConfirm={(date) => {
                                                            setOpenTo(false);
                                                            onChangeTo(date);
                                                        }}
                                                        onCancel={() => {
                                                            setOpenTo(false)
                                                        }}
                                                    />

                                                </View>
                                            </View>
                                            {days.map((item, index) => (
                                                <View style={{ flexDirection: 'row' }}>
                                                    <CheckBox
                                                        key={item.id}
                                                        // title={item.label}
                                                        disabled={false}
                                                        // checked={item.checked}
                                                        value={item.status}
                                                        onValueChange={() => toggle(index)}
                                                    />
                                                    <Text style={styles.titleButtonOffT}>{item.day}</Text>
                                                </View>
                                            ))}
                                            <TouchableOpacity onPress={() => apiCall()}>
                                                <View style={styles.Buttonsave} >
                                                    <View style={styles.textAreasave}>
                                                        <Text style={styles.titlesave}>Save</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </>
                                    ) : (
                                        <>
                                            <View style={{ alignItems: 'center', marginTop: 50, }}>
                                                <Text style={{ fontFamily: "Cochin", fontSize: 10, color: 'red' }}>...!Nothing TO Show Please Add Schedule...</Text>
                                            </View></>
                                    )}

                                </View>
                            </View>
                            {/* </BlurView> */}
                        </Modal>

                    </View>
                    <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={switchVisible}
                            onRequestClose={() => {
                                //Alert.alert("Modal has been closed.");
                                setswitchVisible(!switchVisible);
                            }}
                        >
                            <View style={styles.switchmodalView}>
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
                                            {slocation.map(data => {
                                                return (
                                                    <View>
                                                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Mode: {data.mode}</Text>
                                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{data.location}</Text>

                                                        {data.boards.map(board => {
                                                            return (
                                                                <View style={styles.switchcard}>
                                                                    <View style={{ flexDirection: 'row' }}>
                                                                        {board.switches.map(swi => {
                                                                            return (
                                                                                <>
                                                                                    {/* <View style={{ flexDirection: 'row' }}><Text>{swi.sw}</Text></View> */}
                                                                                    {swi['status'] != 0 ? (
                                                                                        <TouchableOpacity
                                                                                            onPress={() => {
                                                                                                swi['status'] = false;
                                                                                                console.log(JSON.stringify(location));
                                                                                                onRefresh();
                                                                                            }}>
                                                                                            <View style={styles.cardthemOn}>
                                                                                                <View style={styles.textArea}>
                                                                                                    <Text style={styles.titleButtonOn}>
                                                                                                        {swi['sw'][0]}
                                                                                                    </Text>
                                                                                                </View>
                                                                                            </View>
                                                                                        </TouchableOpacity>
                                                                                    ) : (
                                                                                        <TouchableOpacity
                                                                                            onPress={() => {
                                                                                                swi['status'] = true;
                                                                                                onRefresh();
                                                                                            }}>
                                                                                            <View style={styles.cardthemOff}>
                                                                                                <View style={styles.textArea}>
                                                                                                    <Text style={styles.titleButtonOff}>
                                                                                                        {swi['sw'][0]}
                                                                                                    </Text>
                                                                                                </View>
                                                                                            </View>
                                                                                        </TouchableOpacity>
                                                                                    )
                                                                                    }
                                                                                </>
                                                                            )
                                                                        })}
                                                                        {/* <Text style={styles.switchboardtitle}>{board.switchBoardId}</Text> */}
                                                                    </View>
                                                                    <View style={{ position: 'absolute', right: 0, marginRight: 10 }}>
                                                                        <Text style={styles.switchboardtitle}>{board.switchBoardId}</Text>
                                                                    </View>
                                                                </View>
                                                            )
                                                        })}
                                                        {data.BathroomB != null ? <Text style={{ fontSize: 15, fontWeight: "bold" }}>{data.BathroomB}</Text> : null}
                                                        {data.Bathroom != null ? data.Bathroom.map(b => {
                                                            return (
                                                                <>
                                                                    <View style={styles.switchcard}>
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
                                                                            {/* <Text style={styles.switchboardtitle}>{b.switchBoardId}</Text> */}
                                                                        </View>
                                                                        <View style={{ position: 'absolute', right: 0, marginRight: 10 }}>
                                                                            <Text style={styles.switchboardtitle}>{b.switchBoardId}</Text>
                                                                        </View>
                                                                    </View>
                                                                </>
                                                            )
                                                        }
                                                        ) : null}

                                                        {data.BalconyB != null ? <Text style={{ fontSize: 15, fontWeight: "bold" }}>{data.BalconyB}</Text> : null}
                                                        {data.Balcony != null ? data.Balcony.map(b => {
                                                            return (
                                                                <>
                                                                    <View style={styles.switchcard}>
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

                                                                        </View>
                                                                        <View style={{ position: 'absolute', right: 0, marginRight: 10 }}>
                                                                            <Text style={styles.switchboardtitle}>{b.switchBoardId}</Text>
                                                                        </View>
                                                                    </View>
                                                                </>
                                                            )
                                                        }
                                                        ) : null}

                                                    </View>
                                                )
                                            })}
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                            <View>
                                                <TouchableOpacity
                                                    // style={styles.submit}
                                                    onPress={() => { call(slocation) }}
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
                                            <View>
                                                <TouchableOpacity
                                                    // style={styles.submit}
                                                    onPress={() => setswitchVisible(!switchVisible)}
                                                >
                                                    <LinearGradient
                                                        colors={['#08d4c4', '#01ab9d']}
                                                        style={styles.submit}
                                                    >
                                                        <Text style={[styles.textSign, {
                                                            color: '#fff'
                                                        }]}>Close</Text>
                                                    </LinearGradient>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </ScrollView >
                                </SafeAreaView >
                            </View>
                        </Modal>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}


ModeScreen.propTypes = {
    getDetails: PropTypes.func,
    detailsmode: PropTypes.instanceOf(Array),
    getSchedule: PropTypes.func,
    add_schedule_loc: PropTypes.instanceOf(Array),
    switchDetails: PropTypes.func,
    getSwitchStatus: PropTypes.instanceOf(Array),
    updateSwitch: PropTypes.instanceOf(Array),

    dummy: PropTypes.func,
    modeset: PropTypes.instanceOf(Array),

    _addmode: PropTypes.func,
    modename: PropTypes.instanceOf(Array),

    delete_Mode: PropTypes.func,
    delete_mode: PropTypes.instanceOf(Array),

    _changeSwitch: PropTypes.func,
    switch_mode: PropTypes.instanceOf(Array),
};

ModeScreen.defaultProps = {
    getDetails: () => { },
    detailsmode: [],

    switchDetails: () => { },
    getSwitchstatus: [],

    updateSwitch: () => { },
    switchstatus: [],

    getSchedule: () => { },
    add_schedule_loc: [],

    dummy: () => { },
    modeset: [],

    _addmode: () => { },
    modename: [],

    delete_Mode: () => { },
    delete_mode: [],

    _changeSwitch: () => { },
    switch_mode: [],
};

const mapStateToProps = ({ getModeDetails: { detailsmode }, getSetMode: { modeset }, addMode: { modename }, setModeDelete: { delete_mode }, setModeSwitch: { switch_mode } }) => ({ modeset, modename, detailsmode, delete_mode, switch_mode });
const mapDispatchToProps = { getDetails: send => mode_Details(send), updateSwitch: send => switchStatusUpdate(send), switchDetails: send => getSwitchdetails(send), getSchedule: send => scheduleAdd(send), dummy: send => mode_Set(send), _addmode: data => addMode_(data), delete_Mode: (send) => modeDelete(send), _changeSwitch: (send) => modeSwitch(send) };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ModeScreen);

const styles = StyleSheet.create({
    centeredView: {
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // marginTop: 22
    },
    title2: {
        // marginTop: 1,
        marginLeft: 6,
        fontSize: 10,
        // color: "#2f353d",
        // color: '#949191',
        fontWeight: 'bold',
        // textAlign: 'center',
    },
    baseText: {
        // fontWeight: 'bold',
        fontSize: 12,
    },
    baseTextH: {
        // fontWeight: 'bold',
        paddingBottom: 3,
        fontSize: 15,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'stretch',
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    switchmodalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        height: 'auto',
        padding: 10,
        alignItems: 'stretch',
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 4,
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
    // submitbutton: {
    //     borderRadius: 20,
    //     height: 50,
    //     width: 100,
    //     padding: 10,
    //     elevation: 2,
    //     // marginRight: 10,
    //     marginLeft: 10
    // },
    submit: {
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderColor: '#f1f5b5',
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
        // flex: 1,
        // // marginTop: 10,
        // padding: 10,
        // // marginBottom: 10,
        // // marginHorizontal: 10,
        // margin: 20,
        // borderRadius: 20,
        // height: '20%',
        // width: '90%',
        // // borderColor: '#696969',
        // // backgroundColor: '#ccc',
        // backgroundColor: '#3d3c3c',
        // // borderBottomColor: '#ccc',
        // borderBottomWidth: 0.15,
        // // zIndex: 2,
        flex: 1,
        height: height / 7.5,
        width: width / 1.09,
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 10.9,
        backgroundColor: '#3d3c3c',
    },
    switchcard: {
        marginBottom: 2,
        borderRadius: 20,
        backgroundColor: '#4d4b4b',
        padding: 10,
        // padding: 10,
        // marginBottom: 10,
        // marginHorizontal: 10,
        // borderRadius: 20,
        // backgroundColor: '#3d3c3c',
        // borderBottomWidth: 0.15,


        // marginTop: 10,
        // borderColor: '#696969',
        // backgroundColor: '#ccc',
        // borderBottomColor: '#ccc',
        // zIndex: 2,
    },
    cardboard: {
        flex: 6,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 2,
        borderRadius: 20,
        // padding: 10,
        // backgroundColor: '#2b2b2b',
        backgroundColor: '#4d4b4b',
    },
    cardthemOn: {
        flexDirection: 'row',
        height: 35,
        width: 50,
        justifyContent: 'center',
        // textAlign: 'center',
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 8,
        // backgroundColor: '#606060',
        backgroundColor: '#4d4b4b',
        // zIndex: 1,
        borderColor: '#a8eb98',
        borderWidth: 1,
    },
    cardthemOff: {
        height: 35,
        width: 50,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 8,
        backgroundColor: '#3d3c3c',
        // backgroundColor: '#4d4b4b',
        // zIndex: 1,
        borderColor: '#0f0d0d',
        borderWidth: 1,
    },
    cardthemOfftime: {
        height: 45,
        width: 200,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 8,
        backgroundColor: '#3d3c3c',
        // backgroundColor: '#4d4b4b',
        // zIndex: 1,
        borderColor: '#0f0d0d',
        borderWidth: 1,
    },
    boardtitle: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // paddingStart: 60,
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        // paddingLeft: 40,
        marginLeft: 15,
        fontSize: 12,
        // transform: [{rotate: '270deg' }],
        color: '#252626',
    },
    switchboardtitle: {
        // paddingStart: 60,
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        // paddingLeft: 40,
        marginTop: 20,
        marginLeft: 10,
        fontSize: 15,
        alignItems: "center",
        color: '#252626',
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
    titleButton: {
        marginTop: 7,
        marginLeft: 3,
        fontSize: 20,
        // color: "#2f353d",
        color: '#949191',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modenametext: {
        marginTop: 7,
        marginLeft: 8,
        fontSize: 20,
        // color: "#2f353d",
        color: '#949191',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textDisp: {

        fontSize: 15,
        fontWeight: "bold",
        fontFamily: 'sans-serif',
        textAlign: 'center',
        color: '#949191',
        // marginTop: 9,
        marginLeft: 5,

    },
    titleButtonOn: {
        fontSize: 16,
        // color: "#2f353d",
        // color: '#949191',
        // fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
    },
    titleButtonOff: {
        fontSize: 16,
        // color: "#2f353d",
        color: '#282929',
        // fontWeight: 'bold',
        textAlign: 'center',
    },
    titleButtonOntime: {
        fontSize: 16,
        // color: "#2f353d",
        color: '#949191',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    ButtonTimer: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingStart: 50,
        fontSize: 16,
        height: 40,
        width: 200,
        // color: "#2f353d",
        color: '#282929',
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: 8,
        // backgroundColor: '#3d3c3c',
        backgroundColor: '#4d4b4b',
        zIndex: 1,
        borderColor: '#0f0d0d',
        borderWidth: 1,
    },
    textArea: {
        // textAlign: 'center'
        // justifyContent: 'center'
        paddingTop: 5,
        // paddingHorizontal: 10,
        // paddingVertical: 5,
    },
    timerArea: {
        paddingHorizontal: 18,
        paddingVertical: 10,
    },
    icon: {
        // paddingTop: 5,
        paddingLeft: 5,
        // paddingBottom: 5,
        // margin: 5
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
    },
    tinyLogo: {
        width: 80,
        height: 80,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
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
        marginLeft: 150,
    },
    Buttonsave: {
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 8,
        height: 40,
        width: 100,
        // backgroundColor: '#3d3c3c',
        backgroundColor: '#4d4b4b',
        zIndex: 1,
        borderColor: '#0f0d0d',
        borderWidth: 1,
    },
    titlesave: {
        fontSize: 16,
        // color: "#2f353d",
        color: '#949191',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textAreasave: {
        paddingHorizontal: 6,
        paddingVertical: 6,

    },
    titleButtonOffT: {
        // paddingTop: 5,
        fontSize: 16,
        // color: "#2f353d",
        color: '#949191',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // contentWrap: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    blurView: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});
