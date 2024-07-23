/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Button,
    Platform,
} from 'react-native';
import PropTypes, { array } from 'prop-types';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getSlno } from '../../AsyncStorage';
// import GeneralSetting from './Schedule/GeneralSetting';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-simple-toast';
import { modifySchedule } from '../../../redux/actions/schedule/modifySchedule';


var slno;
const EditTimer = ({ navigation, route, getDetails }) => {

    const [days, setdays] = useState([]);
    const [date, setDate] = useState(new Date());
    const [dateF, setdateF] = useState(new Date());
    const [dateT, setdateT] = useState(new Date());
    const [modeFrom, setModeFrom] = useState('date');
    const [modeTo, setModeTo] = useState('date');
    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);
    const [fromTime, setfromTime] = useState('00:00:00');
    const [toTime, settoTime] = useState('00:00:00');
    const [dispFrom, setDispFrom] = useState();
    const [dispTo, setDispTo] = useState();
    const [payloadFrom, setPayloadForm] = useState('');
    const [payloadTo, setPayloadTo] = useState('');


    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    const [fromDisplay, setfromDisplay] = useState(new Date());
    const [toDisplay, settoDisplay] = useState(new Date());




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
        let minutes = tempDate.getMinutes();
        let finalTime = hours + ":" + minutes + " " + AmOrPm;
        setDispFrom(finalTime);
        setDispTo(finalTime);
        setTimeout(async () => {
            slno = await getSlno();
            console.log('hea value is passed', route.params);
            setdays(route.params.days)
        }, 1000);
        return () => {
        }
    }, []);

    const toggle = (index) => {
        const newData = [...days];
        newData.splice(index, 1, {
            day: days[index].day,
            status: !days[index].status
        });
        setdays(newData);
    };


    const apiCall = () => {
        const send = [];

        // const data = { sl_no: slno, on_time: payloadFrom, off_time: payloadTo, days: days, id: route.params.id };
        const data = { sl_no: slno, id: route.params.id, on_time: payloadFrom, off_time: payloadTo, days: days };
        send.push(data);

        getDetails(send).then(response => {
            console.log("add timer component response", response); //need to set another api
            // setlocation(...response);

            console.log(JSON.stringify(response));
            if (response === 'Switch scheduled!!') {
                Toast.show(response, Toast.LONG, Toast.TOP);


                // navigation.push('Scheduled list');

            }
            else {
                Toast.show(response, Toast.LONG, Toast.TOP);

            }
        });
        console.log("Data from Api's");
    };



    const onChangeFrom = (event, selectedDate) => {
        const currentDate = selectedDate || dateF;
        setShowFrom(Platform.OS === 'ios');
        setdateF(currentDate);

        // Process the date values
        let tempDate = new Date(currentDate);
        var hours = tempDate.getHours();
        const str = tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + '00';
        setPayloadForm(str);
        var AmOrPm = hours >= 12 ? 'pm' : 'am';
        hours = (hours % 12) || 12;
        var minutes = tempDate.getMinutes();
        var finalTime = hours + ":" + minutes + " " + AmOrPm;
        let fTime = tempDate.getHours() + ' : ' + tempDate.getMinutes() + ':' + '00'
        setDispFrom(finalTime);
        setfromTime(fTime);

        // Log the Time & Date values
        console.log(fTime)
        console.log(tempDate)
    };

    const onChangeTo = (event, selectedDate) => {
        const currentDate = selectedDate || dateT;
        setShowTo(Platform.OS === 'ios');
        setdateT(currentDate);

        // Process the date values
        let tempDate = new Date(currentDate);
        var hours = tempDate.getHours();
        const str = tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + '00';
        setPayloadTo(str);
        var AmOrPm = hours >= 12 ? 'pm' : 'am';
        hours = (hours % 12) || 12;
        var minutes = tempDate.getMinutes();
        var finalTime = hours + ":" + minutes + " " + AmOrPm;
        let fTime = tempDate.getHours() + ' : ' + tempDate.getMinutes() + ':' + '00'
        setDispTo(finalTime);
        settoTime(fTime);

        // Log the Time & Date values
        console.log(fTime)
        console.log(tempDate)
        console.log("Payload Data", payloadTo);
    };


    const showModeFrom = (currentMode) => {
        console.log((date));
        setShowFrom(true);
        setModeFrom(currentMode);
    };
    const showModeTo = (currentMode) => {
        setShowTo(true);
        setModeTo(currentMode);
    };
    return (
        <View style={styles.centeredView}>
            <SafeAreaView>
                <ScrollView style={styles.scrollView}>
                    {days != 0 ? (
                        <>
                            <View style={{ flexDirection: 'row' }}>
                                <Text></Text>
                                <TouchableOpacity onPress={() => showModeFrom('time')}>
                                    <View style={styles.cardthemOff}>
                                        <View style={styles.textArea}>
                                            <Text style={styles.titleButtonOff}>{dispFrom}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <Text style={styles.titleButtonOn}>To</Text>
                                <TouchableOpacity onPress={() => showModeTo('time')}>
                                    <View style={styles.cardthemOff}>
                                        <View style={styles.textArea}>
                                            <Text style={styles.titleButtonOff}>{dispTo}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.cardboard}>
                                    {showFrom && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={dateF}
                                            mode={modeFrom}
                                            is24Hour={false}
                                            display="default"
                                            onChange={onChangeFrom}
                                        />
                                    )}
                                    {showTo && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={dateT}
                                            mode={modeTo}
                                            is24Hour={false}
                                            display="default"
                                            onChange={onChangeTo}
                                        />
                                    )}
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
                                    <Text style={styles.titleButtonOff}>{item.day}</Text>
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
                </ScrollView>
            </SafeAreaView>
        </View>
    );

}
EditTimer.propTypes = {
    getDetails: PropTypes.func,
    modify_schedule_time: PropTypes.instanceOf(Array),
};

EditTimer.defaultProps = {
    getDetails: () => { },
    modify_schedule_time: [],
};

const mapStateToProps = ({ modifyScheduleLocation: { modify_schedule_time } }) => ({ modify_schedule_time });
const mapDispatchToProps = { getDetails: send => modifySchedule(send) };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditTimer);

const styles = StyleSheet.create({
    centeredView: {
        // flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        // marginTop: 22
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
        // marginBottom: 2,
        flexDirection: "row",
        borderRadius: 20,
        // backgroundColor: '#2b2b2b',
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
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 8,
        height: 60,
        width: 130,
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
        // color: "#2f353d",
        color: '#949191',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titleButtonOff: {
        // paddingTop: 5,
        fontSize: 16,
        // color: "#2f353d",
        color: '#949191',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textArea: {
        paddingHorizontal: 18,
        paddingVertical: 12,
        flexDirection: "column",
    },
    icon: {
        paddingTop: 5,
        paddingLeft: 5,
        paddingBottom: 5,
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
    textAreasave: {
        paddingHorizontal: 6,
        paddingVertical: 6,

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
});
