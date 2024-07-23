/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Button,
    Platform,
} from 'react-native';
import PropTypes, { array } from 'prop-types';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ico from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import ButtonCard from '../../../../components/Buttoncard';
import GeneralSetting from './GeneralSetting';
import { flatDetails } from '../../../../redux/actions/flatDetails';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';

const options = [
    {
        label: "Sunday",
        value: "sun"
    }, {
        label: "Monday",
        value: "Mon"
    }, {
        label: "Tuesday",
        value: "Tue"
    }, {
        label: "Wednesday",
        value: "Wed"
    }, {
        label: "Thursday",
        value: "Thu"
    }, {
        label: "Friday",
        value: "Fri"
    }, {
        label: "Saturday",
        value: "Sat"
    },
];
const ScheduleSwitchs = ({ navigation, route, getDetails }) => {

    const [days, setdays] = useState(options);
    const [date, setDate] = useState(new Date());
    const [dateF, setdateF] = useState(new Date());
    const [dateT, setdateT] = useState(new Date());
    const [modeFrom, setModeFrom] = useState('date');
    const [modeTo, setModeTo] = useState('date');
    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);
    const [fromTime, setfromTime] = useState('00:00:00');
    const [toTime, settoTime] = useState('00:00:00');
    const [dispFrom, setDispFrom] = useState(route.params.from);
    const [dispTo, setDispTo] = useState(route.params.to);
    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    const toggle = (index) => {
        const newData = [...days];
        newData.splice(index, 1, {
            label: days[index].label,
            checked: !days[index].checked
        });
        setdays(newData);
        // onChange(newData.filter(x => x.checked));
    };



    const getlogin = () => {
        const send = [];
        const data = { sl_no: '28' };
        send.push(data);
        console.log(send);
        console.log('log menu api');
        getDetails(send).then(response => {
            // setlocation(...response);
            console.log(response);
            console.log('fuck me');
        });
        console.log("Data from Api's");
    };



    const onChangeFrom = (event, selectedDate) => {
        const currentDate = selectedDate || dateF;
        setShowFrom(Platform.OS === 'ios');
        setdateF(currentDate);

        // Process the date values
        let tempDate = new Date(currentDate);
        var hours = tempDate.getHours()
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
        var hours = tempDate.getHours()
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
                                disabled={false}
                                value={toggleCheckBox}
                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                            // onClick={() => toggle(index)}
                            // onValueChange={() => toggle(index)}
                            />
                            <Text style={styles.titleButtonOff}>{item.label}</Text>
                        </View>
                    ))}

                    <View style={styles.Buttonsave} >
                        <View style={styles.textAreasave}>
                            <Text style={styles.titlesave}>Save</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
ScheduleSwitchs.propTypes = {
    getDetails: PropTypes.func,
    token: PropTypes.instanceOf(Array),
};

ScheduleSwitchs.defaultProps = {
    getDetails: () => { },
    details: [],
};

const mapStateToProps = ({ getDetails: { details } }) => ({ details });
const mapDispatchToProps = { getDetails: send => flatDetails(send) };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScheduleSwitchs);

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
