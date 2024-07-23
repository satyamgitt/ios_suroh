/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
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
import Toast from 'react-native-simple-toast';
import { getSlno } from '../../AsyncStorage';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import { scheduleAdd } from '../../../redux/actions/schedule/scheduleAdd';
import DatePicker from 'react-native-date-picker'

const options = [
    {
        id: 1,
        day: "Sunday",
        status: false
    }, {
        id: 2,
        day: "Monday",
        status: false
    }, {
        id: 3,
        day: "Tuesday",
        status: false
    }, {
        id: 4,
        day: "Wednesday",
        status: false
    }, {
        id: 5,
        day: "Thursday",
        status: false
    }, {
        id: 6,
        day: "Friday",
        status: false
    }, {
        id: 7,
        day: "Saturday",
        status: false
    },
];
var slno;
const AddTimerSettings = ({ navigation, route, getDetails }) => {

    const [days, setdays] = useState([]);
    const [dateF, setdateF] = useState(new Date());
    const [dateT, setdateT] = useState(new Date());

    const [open, setOpen] = useState(false);
    const [openTo, setOpenTo] = useState(false);

    const [dispFrom, setDispFrom] = useState();
    const [dispTo, setDispTo] = useState();
    const [payloadFrom, setPayloadForm] = useState(null);
    const [payloadTo, setPayloadTo] = useState(null);


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
        setTimeout(async () => {
            slno = await getSlno();
            // console.log('hea value is passed', route.params);
            setdays(route.params.days)
        }, 1000);
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
        if (payloadFrom == null || payloadTo == null) {

            Toast.show("please select Timings", Toast.LONG, Toast.TOP);

        } else {
            const data = { sl_no: slno, mode: route.params.mode, location: route.params.location, on_time: payloadFrom, off_time: payloadTo, days: days };
            send.push(data);
            console.log("payload", data);
            getDetails(send).then(response => {
                console.log(JSON.stringify(response));
                if (response === 'Switch scheduled!!') {
                    Toast.show(response, Toast.LONG, Toast.TOP);
                }
                else {
                    Toast.show(response, Toast.LONG, Toast.TOP);
                    navigation.navigate('modes')
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
AddTimerSettings.propTypes = {
    getDetails: PropTypes.func,
    add_schedule_loc: PropTypes.instanceOf(Array),
};

AddTimerSettings.defaultProps = {
    getDetails: () => { },
    add_schedule_loc: [],
};

const mapStateToProps = ({ addLocationSchedule: { add_schedule_loc } }) => ({ add_schedule_loc });
const mapDispatchToProps = { getDetails: send => scheduleAdd(send) };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddTimerSettings);

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
