/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Modal,
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Platform,
    RefreshControl,
    ActivityIndicator,
    Switch,
    Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import Ico from 'react-native-vector-icons/MaterialCommunityIcons';
import { getSlno } from '../../AsyncStorage';
import { scheduleTime } from '../../../redux/actions/schedule/scheduleTime';
import { scheduleChange } from '../../../redux/actions/schedule/scheduleChange';
import { scheduleDelete } from '../../../redux/actions/schedule/scheduleDelete';
import Toast from 'react-native-simple-toast';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
import CheckBox from '@react-native-community/checkbox';
import { modifySchedule } from '../../../redux/actions/schedule/modifySchedule';

const { width, height } = Dimensions.get('screen');
const diognal = height / width;
const size = diognal * 6.65;

const options = [
    {

        day: "Sunday",
        status: false
    }, {

        day: "Monday",
        status: false
    }, {

        day: "Tuesday",
        status: false
    }, {

        day: "Wednesday",
        status: false
    }, {

        day: "Thursday",
        status: false
    }, {

        day: "Friday",
        status: false
    }, {

        day: "Saturday",
        status: false
    },
];


var sl_no;
var modes;



const SwitchScheduleList = ({ navigation, route, getDetails, scheduleChanges, Delete_schedule, setTimer }) => {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [timeData, settimeData] = useState([]);

    const [days, setdays] = useState([]);
    const [date, setDate] = useState(new Date());
    const [modeFrom, setModeFrom] = useState('date');
    const [modeTo, setModeTo] = useState('date');
    // const [showFrom, setShowFrom] = useState(false);
    // const [showTo, setShowTo] = useState(false);
    // const [fromTime, setfromTime] = useState('00:00:00');
    // const [toTime, settoTime] = useState('00:00:00');
    // const [dispFrom, setDispFrom] = useState('00:00 am');
    // const [dispTo, setDispTo] = useState('00:00 pm');
    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    //showing datepicker modal
    const [modalVisible, setModalVisible] = useState(false);
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

    const [dateF, setdateF] = useState(new Date());
    const [dateT, setdateT] = useState(new Date());

    //Add Schedule Module open
    const [addmodalVisible, setaddModalVisible] = useState(false);


    console.log("params data in schedule list", route.params)

    const onRefresh = () => {
        setLoading(false);
        init(slno);
        setRefreshing(true);
    };

    useEffect(() => {
        setTimeout(async () => {
            slno = await getSlno();
            sl_no = await getSlno();
            setLoading(true);
            console.log('slno: ', slno);
            init();
        }, 1000);
        console.log("useeffect called");
        return () => { };
    }, []);


    const init = () => {
        const send = [];
        const data = { 'sl_no': slno, 'id': route.params.id };
        //const data = { 'sl_no': slno, 'id': "Ajna_A_12_2__11" };
        send.push(data);
        console.log("send data", send);
        console.log('details');
        getDetails(send).then(response => {
            console.log("SwitchScheduleListresponse", JSON.stringify(response));
            settimeData(response);
            setLoading(false);
            setRefreshing(false)

        });
        console.log("Data from Api's");
    };

    const toggleSwitch = (index, item) => {
        let temptime = [...timeData];
        temptime[index - 1].is_activated = item;
        console.log(temptime);
        settimeData(temptime);
        console.log(temptime);
        const send = [];
        const data = { 'sl_no': slno, 'id': route.params.id, 'on_time': temptime[index - 1].on_time, 'off_time': temptime[index - 1].off_time, 'is_activated': item, 'days': temptime[index - 1].days };
        // const data = { 'sl_no': slno, 'id': "Ajna_A_12_2__11", 'on_time': temptime[index - 1].on_time, 'off_time': temptime[index - 1].off_time, 'is_activated': item, 'days': temptime[index - 1].days };
        send.push(data);
        console.log(JSON.stringify(send));
        console.log(send, "final Data");
        scheduleChanges(send).then(response => {
            console.log(response);
            init();
            if (response) {
                Toast.show(response, Toast.LONG, Toast.TOP);
            }

        });
    }

    const delete_schedule = (index) => {
        let temptime = [...timeData];
        const send = [];
        console.log(temptime);
        const data = { 'sl_no': slno, 'id': route.params.id, 'on_time': temptime[index - 1].on_time, 'off_time': temptime[index - 1].off_time, 'days': temptime[index - 1].days };
        send.push(data);
        console.log("finalData", JSON.stringify(send));
        Delete_schedule(send).then(response => {
            console.log(response);
            init();
            if (response) {
                console.log("del", response);
                Toast.show(response, Toast.LONG, Toast.TOP);
            }
            console.log("deleteresponse", response);

        });
    };

    const convertTimeFrom = (index, ontime) => {
        let data = ontime.split(':')
        console.log("split", data);
        let hour = data[0];
        console.log("splithour", data[0]);
        let mins = data[1];
        console.log("splitmin", data[1]);

        // let minutes;
        // if (mins <= 9) {
        //     minutes = '0' + mins;
        // } else {
        //     minutes = mins
        // }
        const suffix = hour >= 12 ? "PM" : "AM";
        const hours = (hour % 12) || 12
        // console.log(time);
        // console.log(minutes);
        console.log(hours + ':' + mins + ':' + suffix);
        return (
            <Text>{hours}:{mins} {suffix}</Text>
        );

        // console.log("rfg", paramsd);
        // let hou = new Date(paramsd);
        // let d = hou.getHours();
        // console.log('hou', d);

        // const liveData1 = [...timeData];
        // const currentDate1 = liveData1[index - 1].on_time;
        // const time1 = new Date('1970-01-01T' + currentDate1 + '.000+05:30');
        // console.log("ctime", time1);
        // const hour1 = time1.getHours();
        // console.log("hour", hour1);
        // const mins1 = time1.getMinutes();
        // let minutes1;
        // if (mins1 <= 9) {
        //     minutes1 = '0' + mins1;
        // } else {
        //     minutes1 = mins1
        // }
        // const suffix1 = hour1 >= 12 ? "PM" : "AM";
        // const hours1 = (hour1 % 12) || 12
        // console.log(time1);
        // // console.log(minutes);
        // console.log(hours1 + ':' + minutes1 + ':' + suffix1);
        // return (
        //     <Text>{hours1}:{minutes1} {suffix1}</Text>
        // );

        //new type 
        // let currentDate = [...timeData];
        // let time = currentDate[index - 1].on_time;
        // let times = time;
        // var res;
        // if (times <= 9) {
        //     res = '0' + times;
        // } else {
        //     res = times;
        // }
        // console.log('res', res);
        // // const tempDate = new Date('1970-01-01T' + times + '.000+05:30');
        // const tempDate = new Date('1970-01-01T' + times + '.000+05:30');
        // let hour = tempDate.getHours();
        // let hours;
        // // if (hour <= 9) {
        // //     hours = '0' + hour;
        // // } else {
        // //     hours = hour;
        // // }
        // // console.log('AddinghourFrom', hours);
        // let suffix = hours >= 12 ? 'PM' : 'AM';
        // hours = (hours % 12) || 12;
        // var mins = tempDate.getMinutes();
        // var minutes;
        // if (mins <= 9) {
        //     minutes = '0' + mins;
        // } else {
        //     minutes = mins;
        // }

        // return (
        //     <Text>{hours}:{minutes} {suffix}</Text>
        // );
    };

    const convertTimeTo = (index, offtime) => {

        let data = offtime.split(':')
        console.log("split", data);
        let hour = data[0];
        console.log("splithour", data[0]);
        let mins = data[1];
        console.log("splitmin", data[1]);

        // let minutes;
        // if (mins <= 9) {
        //     minutes = '0' + mins;
        // } else {
        //     minutes = mins
        // }
        const suffix = hour >= 12 ? "PM" : "AM";
        const hours = (hour % 12) || 12
        // console.log(time);
        // console.log(minutes);
        console.log(hours + ':' + mins + ':' + suffix);
        return (
            <Text>{hours}:{mins} {suffix}</Text>
        );

        // const liveData = [...timeData];
        // const currentDate = liveData[index - 1].off_time;
        // console.log("tDate", currentDate);
        // const time = new Date('1970-01-01T' + currentDate + '.000+05:30');
        // const hour = time.getHours();
        // console.log("thour", hour);
        // const mins = time.getMinutes();
        // console.log('tmin', mins);
        // let minutes;
        // if (mins <= 9) {
        //     minutes = '0' + mins;
        // } else {
        //     minutes = mins
        // }
        // const suffix = hour >= 12 ? "PM" : "AM";
        // const hours = (hour % 12) || 12
        // console.log(time);
        // // console.log(minutes);
        // console.log(hours + ':' + minutes + ':' + suffix);
        // return (
        //     <Text>{hours}:{minutes} {suffix}</Text>
        // );
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
        // let finalTime = hours + ":" + minutes + " " + AmOrPm;

        var finalTime = hours + ":" + minutes + " " + AmOrPm;
        let fTime = tempDate.getHours() + ' : ' + tempDate.getMinutes() + ':' + '00'
        // setDispFrom(finalTime);
        // setfromTime(fTime);

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
        // console.log("payloadFromAddSchedule", payloadFrom);
        // console.log("payloadToAddSchedule", payloadTo);

        if (payloadFrom == null || payloadTo == null) {

            Toast.show("please select Timings", Toast.LONG, Toast.TOP);

        } else {
            // const data = { sl_no: sl_no, mode: modes, location: route.params.location, on_time: payloadFrom, off_time: payloadTo, days: days };
            const data = { sl_no: sl_no, id: route.params.id, on_time: payloadFrom, off_time: payloadTo, days: days };
            send.push(data);
            console.log("payloadapi", JSON.stringify(send));
            setTimer(send).then(response => {
                console.log(JSON.stringify(response));
                if (response === 'Switch scheduled!!') {
                    Toast.show(response, Toast.LONG, Toast.TOP);
                    init(slno);
                    setaddModalVisible(false);
                }
                else {
                    Toast.show(response, Toast.LONG, Toast.TOP);
                    setaddModalVisible(false);
                }
            });
        };
    };

    const apiCall2 = () => {

        // const data = { sl_no: slno, on_time: payloadFrom, off_time: payloadTo, days: days, id: route.params.id };
        const send = [];
        const data = { sl_no: sl_no, id: route.params.id, on_time: payloadFrom, off_time: payloadTo, days: days };
        send.push(data);
        // console.log("", JSON.stringify(send));

        setTimer(send).then(response => {
            console.log("add timer component response", response); //need to set another api
            // setlocation(...response);

            console.log(JSON.stringify(response));
            if (response === 'Switch scheduled!!') {
                Toast.show(response, Toast.LONG, Toast.TOP);
                setModalVisible(false);
                init(slno);
            }
            else {
                Toast.show(response, Toast.LONG, Toast.TOP);
                setModalVisible(false);
            }
        });
    };




    const onChangeFrom = (selectedDate) => {

        const currentDate = selectedDate || dateT;
        setOpenTo(Platform.OS === 'ios');
        setdateF(currentDate);
        let tempDateF = new Date(currentDate);
        var minsF = tempDateF.getMinutes();
        var minutesF;
        if (tempDateF.getMinutes() <= 9) {
            minutesF = '0' + minsF;
            console.log("1", minutesF);
        } else {
            minutesF = minsF;
            console.log("2", minutesF);
        }
        var finalTimeF = tempDateF.getHours() + ":" + minutesF + ":00"
        console.log("final time", finalTimeF);
        setPayloadForm(finalTimeF);

        var hours = tempDateF.getHours();
        var AmOrPm = hours >= 12 ? 'pm' : 'am';
        hours = (hours % 12) || 12;
        var finalTime = hours + ":" + minutesF + " " + AmOrPm;
        // let fTime = tempDateF.getHours() + ' : ' + tempDateF.getMinutes() + ':' + '00';
        setDispFrom(finalTime);
        // setfromTime(fTime);

        // console.log("SELECTDATE", selectedDate);
        // const currentDate = selectedDate || dateF;
        // setOpen(Platform.OS === 'ios');
        // setdateF(currentDate);

        // // Process the date values
        // let tempDate = new Date(currentDate);

        // console.log("Tempdate", tempDate);


        // var hours = tempDate.getHours();

        // var AmOrPm = hours >= 12 ? 'pm' : 'am';
        // hours = (hours % 12) || 12;
        // var mins = tempDate.getMinutes();
        // var minutes;
        // if (mins <= 9) {
        //     minutes = '0' + mins;
        //     // console.log("1", minutes);
        // } else {
        //     minutes = mins;
        //     // console.log("2", minutes);
        // }
        // // console.log("NEW", minutes);
        // const str = tempDate.getHours() + ':' + minutes + ':' + '00';
        // console.log("date", str)
        // setPayloadForm(str);


        // var finalTime = hours + ":" + minutes + " " + AmOrPm;
        // let fTime = tempDate.getHours() + ' : ' + tempDate.getMinutes() + ':' + '00';
        // console.log("finaltime", finalTime);
        // console.log("fTime", fTime);
        // setDispFrom(finalTime);
        // setfromTime(fTime);
        // //need to set AM/PM values
        // setPayloadForm(fTime);

    };


    const onChangeTo = (selectedDate) => {

        const currentDate = selectedDate || dateT;
        setOpenTo(Platform.OS === 'ios');
        setdateT(currentDate);
        let tempDate = new Date(currentDate);
        var mins = tempDate.getMinutes();
        var minutes;
        if (tempDate.getMinutes() <= 9) {
            minutes = '0' + mins;
            // console.log("1", minutes);
        } else {
            minutes = mins;
            // console.log("2", minutes);
        }
        var finalTime = tempDate.getHours() + ":" + minutes + ":00"
        // console.log('amar curent date selected', finalTime)
        setPayloadTo(finalTime);

        var hoursz = tempDate.getHours();
        var AmOrPmz = hoursz >= 12 ? 'pm' : 'am';
        hoursz = (hoursz % 12) || 12;
        var finalTimez = hoursz + ":" + minutes + " " + AmOrPmz;
        // let fTime = tempDateF.getHours() + ' : ' + tempDateF.getMinutes() + ':' + '00';
        setDispTo(finalTimez);

        // const currentDate = selectedDate || dateT;
        // setOpenTo(Platform.OS === 'ios');
        // setdateT(currentDate);

        // // Process the date values
        // let tempDate = new Date(currentDate);

        // var hours = tempDate.getHours();


        // const str = tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + '00';
        // console.log("Hi Amar2");
        // console.log("date", str);
        // setPayloadTo(str);
        // var AmOrPm = hours >= 12 ? 'pm' : 'am';
        // hours = (hours % 12) || 12;
        // var mins = tempDate.getMinutes();
        // var minutes;
        // if (mins <= 9) {
        //     minutes = '0' + mins;
        //     console.log("1", minutes);
        // } else {
        //     minutes = mins;
        //     console.log("2", minutes);
        // }
        // console.log("NEW", minutes);

        // var finalTime = hours + ":" + minutes + " " + AmOrPm;
        // let fTime = tempDate.getHours() + ' : ' + tempDate.getMinutes() + ':' + '00'
        // setDispTo(finalTime);
        // settoTime(fTime);
        // setPayloadTo(finalTime);

    };


    const showModeFrom = (currentMode) => {
        setOpen(true);
        console.log("modal exicuting");
        setModeFrom(currentMode);
        // console.log("setmodefrom exicuting");
    };


    const showModeTo = (currentMode) => {
        setOpenTo(true);
        setModeTo(currentMode);
    };


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
                            {timeData == [] || timeData == 0 ?
                                (<View>
                                    <Text style={[styles.textStyle, { alignContent: 'center' }]}>No More Modes To Shown</Text>
                                </View>
                                ) : (<>
                                    {timeData.map((loc, index) => {
                                        const key = index + 1;
                                        return (
                                            <>{loc.on_time == null || loc.off_time == null ?
                                                <View>
                                                    <Text style={[styles.textStyle, { alignContent: 'center' }]}>No More Modes To Shown</Text>
                                                </View> :
                                                <View style={styles.card} key={key}>

                                                    <>
                                                        {/* <TouchableOpacity onPress={() => navigation.navigate('Change Schedule', { from: convertTimeFrom(key), to: convertTimeTo(key), frompayload: loc.on_time, topayload: loc.off_time, days: loc.days, id: route.params.id, sl_no: slno })}> */}
                                                        <View style={{ flexDirection: "column" }}>
                                                            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                                                <Text style={styles.titleButton}>
                                                                    {convertTimeFrom(key, loc.on_time)} To {convertTimeTo(key, loc.off_time)}
                                                                </Text>
                                                                <Switch
                                                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                                                    thumbColor={loc.is_activated ? "#f5dd4b" : "#f4f3f4"}
                                                                    ios_backgroundColor="#3e3e3e"
                                                                    onValueChange={() => toggleSwitch(key, !loc.is_activated, loc.id, loc.on_time, loc.off_time, loc.days)}
                                                                    value={loc.is_activated}
                                                                />

                                                            </View>
                                                            <View style={{ flexDirection: "row" }}>
                                                                {loc.days.map((s, i) => (
                                                                    <>
                                                                        {s.status ?
                                                                            <Text style={styles.titleText}>
                                                                                {s.day.substring(0, 3)}
                                                                            </Text> : null
                                                                        }

                                                                    </>

                                                                ))}
                                                            </View>
                                                            <View style={{ flexDirection: "row", justifyContent: 'flex-start' }}>
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        // navigation.navigate('Change Schedule', { from: convertTimeFrom(key), to: convertTimeTo(key), frompayload: loc.on_time, topayload: loc.off_time, days: loc.days, id: route.params.id, sl_no: slno });
                                                                        setdays(loc.days);
                                                                        setaddModalVisible(true);
                                                                    }}>

                                                                    <Ionicons style={styles.icon} name="ios-add-circle-outline" size={20} />

                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                    onPress={() => delete_schedule(key)}>
                                                                    <Ico style={styles.icon} name="delete-outline" size={20} />
                                                                </TouchableOpacity>
                                                                <Text></Text>
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        setdays(loc.days)
                                                                        setModalVisible(true)
                                                                        // navigation.navigate('Change Schedule', { from: convertTimeFrom(key), to: convertTimeTo(key), frompayload: loc.on_time, topayload: loc.off_time, days: loc.days, id: route.params.id, sl_no: slno });
                                                                    }}>
                                                                    <Feather style={styles.icon} name="edit" size={20} />
                                                                </TouchableOpacity>
                                                            </View>


                                                        </View>
                                                        {/* </TouchableOpacity> */}
                                                    </>
                                                </View>
                                            }
                                            </>
                                        )
                                    }
                                    )}
                                </>
                                )}

                            <View style={styles.buttonsubmit}>
                                <TouchableOpacity
                                    style={styles.submit}
                                    // onPress={() => navigation.navigate('schedule time', route.params)}
                                    onPress={() => {
                                        setdays(options);
                                        setaddModalVisible(true);
                                    }
                                    }
                                >
                                    <LinearGradient
                                        colors={['#08d4c4', '#01ab9d']}
                                        style={styles.submit}
                                    >
                                        <Text style={[styles.textSign, {
                                            color: '#fff'
                                        }]}>Add Schedule</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                    <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                //Alert.alert("Modal has been closed.");
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Welcome To Edit TimeScedule</Text>
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
                                            <TouchableOpacity onPress={() => apiCall2()}>
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
                        </Modal>

                    </View>

                    <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={addmodalVisible}
                            onRequestClose={() => {
                                //Alert.alert("Modal has been closed.");
                                setaddModalVisible(!addmodalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Welcome To Add Schedule</Text>
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
                        </Modal>

                    </View>


                </ScrollView>
            </SafeAreaView>
        </View >

    );
}
SwitchScheduleList.propTypes = {
    getDetails: PropTypes.func,
    schedule_loc_time: PropTypes.instanceOf(Array),
    scheduleChanges: PropTypes.func,
    schedule_change: PropTypes.instanceOf(Array),
    Delete_schedule: PropTypes.func,
    delete_schedule_loc: PropTypes.instanceOf(Array),

    setTimer: PropTypes.func,
    modify_schedule_time: PropTypes.instanceOf(Array),
};

SwitchScheduleList.defaultProps = {
    getDetails: () => { },
    schedule_loc_time: [],
    scheduleChanges: () => { },
    schedule_change: [],
    Delete_schedule: () => { },
    delete_schedule_loc: [],

    setTimer: () => { },
    modify_schedule_time: [],
};

const mapStateToProps = ({ getLocationScheduleTime: { schedule_loc_time }, getLocationScheduleChange: { schedule_change }, locationScheduleDelete: { delete_schedule_loc } }) => ({ schedule_loc_time, schedule_change, delete_schedule_loc });
const mapDispatchToProps = { getDetails: send => scheduleTime(send), setTimer: send => modifySchedule(send), scheduleChanges: send => scheduleChange(send), Delete_schedule: send => scheduleDelete(send) };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SwitchScheduleList);

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // marginTop: 22
    },
    textStyle: {
        color: 'white',
        // color: "#2f353d",
        fontWeight: 'bold',
        textAlign: 'center',
    },
    FloatingActionButtonStyle: {
        position: 'absolute',
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 120,
        bottom: 20,
        backgroundColor: '#009387',
        borderRadius: 200 / 2
    },
    FloatingActionButtonStyleSwitch: {
        position: 'absolute',
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: '#009387',
        borderRadius: 5
    },
    icon: {
        padding: 10,
        margin: 5
    },
    card: {
        // padding: 10,
        // marginBottom: 5,
        // marginHorizontal: 10,
        // borderRadius: 5,
        // height: 100,
        // width: 340,
        // backgroundColor: '#3d3c3c',
        // borderBottomWidth: 0.15,

        // marginTop: 10,
        // borderColor: '#696969',
        // backgroundColor: '#ccc',
        // borderBottomColor: '#ccc',
        // zIndex: 2,

        flex: 1,
        height: height / 7.5,
        width: width / 1.09,
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 10.5,
        backgroundColor: '#3d3c3c',
    },
    titleButton: {
        marginTop: 7,
        marginLeft: 3,
        fontSize: 18,
        // color: "#2f353d",
        color: '#949191',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titleText: {
        marginTop: 7,
        marginLeft: 3,
        fontSize: 15,
        // color: "#2f353d",
        color: '#949191',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    submit: {
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    buttonsubmit: {
        alignItems: 'center',
        marginTop: 20,
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
    cardthemOn: {
        flexDirection: 'row',
        height: 35,
        width: 60,
        justifyContent: 'center',
        textAlign: 'center',
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 8,
        // backgroundColor: '#606060',
        backgroundColor: '#4d4b4b',
        // zIndex: 1,
        borderColor: '#949191',
        borderWidth: 1,
    },
    cardthemOff: {
        height: 35,
        width: 60,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 8,
        backgroundColor: '#3d3c3c',
        // backgroundColor: '#4d4b4b',
        // zIndex: 1,
        borderColor: '#0f0d0d',
        borderWidth: 1,
    },
    titleButtonOffT: {
        // paddingTop: 5,
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
    titlesave: {
        fontSize: 16,
        // color: "#2f353d",
        color: '#949191',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textArea: {
        // textAlign: 'center'
        // justifyContent: 'center'
        paddingTop: 5,
        // paddingHorizontal: 10,
        // paddingVertical: 5,
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
});
