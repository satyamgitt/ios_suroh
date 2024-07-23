/* eslint-disable react-hooks/exhaustive-deps */
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
    Switch,
    Platform,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import PropTypes, { array } from 'prop-types';
import Ico from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-simple-toast';
import { getSlno } from '../../../AsyncStorage';
import { mode_Schedule } from '../../../../redux/actions/Mode/mode_Schedule';

import { mode_ScheduleSwitchs } from '../../../../redux/actions/Mode/mode_ScheduleSwitchs';

import { mode_ScheduleDelete } from '../../../../redux/actions/Mode/mode_ScheduleDelete';
import { setMode_ScheduleStatus } from '../../../../redux/actions/Mode/setMode_ScheduleStatus';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/Feather';
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
const data =
    [
        {
            "on_time": "17:43:00",
            "off_time": "17:35:00",
            "is_activated": true,
            "days": [
                {
                    "day": "Monday",
                    "status": true
                },
                {
                    "day": "Tuesday",
                    "status": true
                },
                {
                    "day": "Wednesday",
                    "status": true
                },
                {
                    "day": "Thursday",
                    "status": true
                },
                {
                    "day": "Friday",
                    "status": true
                },
                {
                    "day": "Saturday",
                    "status": false
                },
                {
                    "day": "Sunday",
                    "status": true
                }
            ]
        },
        {
            "on_time": "17:55:00",
            "off_time": "17:30:00",
            "is_activated": true,
            "days": [
                {
                    "day": "Monday",
                    "status": true
                },
                {
                    "day": "Tuesday",
                    "status": true
                },
                {
                    "day": "Wednesday",
                    "status": false
                },
                {
                    "day": "Thursday",
                    "status": true
                },
                {
                    "day": "Friday",
                    "status": true
                },
                {
                    "day": "Saturday",
                    "status": false
                },
                {
                    "day": "Sunday",
                    "status": false
                }
            ]
        }
    ];
var slno;



const ModeSettingsScreen = ({ navigation, route, getDetails, scheduleChanges, Delete_schedule }) => {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [timeData, settimeData] = useState([]);

 console.log("143 timeData" , timeData);

    //const [timeData, settimeData] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [data1, setData1] = useState('')

    const [days, setdays] = useState(options);
    const [date, setDate] = useState(new Date());
    const [modeFrom, setModeFrom] = useState('date');
    const [modeTo, setModeTo] = useState('date');
    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);
    const [fromTime, setfromTime] = useState('00:00:00');
    const [toTime, settoTime] = useState('00:00:00');
    const [dispFrom, setDispFrom] = useState('00:00 am');
    const [dispTo, setDispTo] = useState('00:00 pm');
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    var sl_no;

    const onRefresh = () => {
        // setLoading(false)
        setRefreshing(true);
        setTimeout(async () => {
            sl_no = await getSlno();
            init(sl_no);
        }, 1000);
    };

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
        console.log('called');
    }, [timeData]);

    // useEffect(() => {
    //     setTimeout(async () => {
    //         slno = await getSlno();
    //         setLoading(true);
    //         console.log('slno: ', slno);
    //         init();
    //     }, 1000);
    //     console.log("useeffect called");
    //     return () => { };
    // }, []);

    // useEffect(() => {
    //     const init = () => {
    //         const send = [];

    //         const x = { 'sl_no': sl_no, 'location': route.params.location, 'mode': route.params.modename };
    //         console.log('data contains of data', x);
    //         console.log('amar ', route.params);
    //         send.push(x);
    //         console.log(send);
    //         console.log('details');
    //         getDetails(send).then(response => {
    //             console.log("response from api", { response });
    //             settimeData(response);
    //             setLoading(false);
    //             console.log(response);
    //             setRefreshing(false);
    //         });
    //     };
    // }, [timeData])




    const init = (sl_no) => {
        const send = [];
        const no = { "sl_no": sl_no, "location": route.params.location, "mode": route.params.modename };
        send.push(no);
        console.log("sending details", send);
        getDetails(send).then(response => {
            console.log(' from getDetailresponses', response);
            settimeData(response);
            console.log("timeData", JSON.stringify(timeData));
            setLoading(false);
            setRefreshing(false)

        });
    };


    // useEffect(() => {
    //     const Switch_Select = (index) => {
    //         const data = { 'sl_no': slno, 'location': route.params.modename.location, 'modename': route.params.modename }
    //         console.log('switch index', data);

    //         setData1(data)
    //     }
    // }, [data1])


    const toggleSwitch = (index, item) => {
        let temptime = [...timeData];
        temptime[index - 1].is_activated = item;
        console.log(temptime);
        settimeData(temptime);
        console.log(temptime);
        const send = [];
        const data = { 'sl_no': slno, 'location': route.params.modename, 'modename': route.params.modename, 'on_time': temptime[index - 1].on_time, 'off_time': temptime[index - 1].off_time, 'is_activated': item, 'days': temptime[index - 1].days };
        console.log("togleswitch data", data);
        send.push(data);
        console.log(send, "final Data");
        scheduleChanges(send).then(response => {
            console.log(response);
            init();
            if (response.error) {
                Toast.show(response[0].error, Toast.LONG, Toast.TOP);
            }
        });
    }

    const delete_schedule = (index) => {
        let temptime = [...timeData];
        const send = [];
        console.log(temptime);
        const data = { 'sl_no': slno, 'location': route.params.modename, 'modename': route.params.modename, 'on_time': temptime[index - 1].on_time, 'off_time': temptime[index - 1].off_time, 'days': temptime[index - 1].days };
        send.push(data);
        console.log(send, "final Data");
        Delete_schedule(send).then(response => {
            console.log(response);
            init();
            if (response) {
                Toast.show(response, Toast.LONG, Toast.TOP);
            }
            console.log(response);
        });
        console.log("Data from Api's");
    };
    const convertTimeTo = (index) => {
        const liveData = [...timeData];
        const currentDate = liveData[index - 1].off_time
        var time = new Date('1970-01-01T' + currentDate + '.000+05:30');
        const hour = time.getHours();
        const minutes = time.getMinutes();
        const suffix = hour >= 12 ? "PM" : "AM";
        const hours = (hour % 12) || 12
        console.log(time);
        // console.log(minutes);
        console.log(hours + ':' + minutes + ':' + suffix);
        return (
            <Text>{hours}:{minutes} {suffix}</Text>
        );
    };

    const convertTimeFrom = (index) => {
        const liveData = [...timeData];
        const currentDate = liveData[index - 1].on_time
        var time = new Date('1970-01-01T' + currentDate + '.000+05:30');
        const hour = time.getHours();
        const minutes = time.getMinutes();
        const suffix = hour >= 12 ? "PM" : "AM";
        const hours = (hour % 12) || 12
        console.log(time);
        // console.log(minutes);
        console.log(hours + ':' + minutes + ':' + suffix);
        return (
            <Text>{hours}:{minutes} {suffix}</Text>
        );
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
                            {timeData == null ? (
                                <View>
                                    <Text style={[styles.textStyle, { alignContent: 'center' }]}>No More Schdule In This Modes</Text>
                                    <View style={{ marginTop: 100 }}>
                                        {/* <TouchableOpacity
                                            activeOpacity={0.7}
                                            onPress={() => navigation.navigate('Add New Schedule', { 'sl_no': slno, 'location': route.params.modename, 'modename': route.params.modename, })}
                                            style={styles.FloatingActionButtonStyle}>
                                            <Text>Add Schdule</Text>
                                            <Ico style={styles.icon} name="plus" size={20} />
                                        </TouchableOpacity> */}
                                    </View>
                                </View>
                            ) : 
                            
                            (
                            
                            <>
                                {/* {timeData.map((loc, index) => {
                                    console.log("map data", loc);
                                    const key = index + 1;
                                    return (
                                        <>
                                            <View style={styles.card} key={key}>

                                                <>
                                                    <TouchableOpacity onPress={() => navigation.navigate('Change Schedule', { from: convertTimeFrom(key), to: convertTimeTo(key), days: loc.days, id: route.params.id })}>
                                                        <View style={{ flexDirection: "column" }}>
                                                            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                                                <Text style={styles.titleButton}>
                                                                    {convertTimeFrom(key)} To  {convertTimeTo(key)}
                                                                </Text>
                                                                <Switch
                                                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                                                    thumbColor={loc.is_activated ? "#f5dd4b" : "#f4f3f4"}
                                                                    ios_backgroundColor="#3e3e3e"
                                                                    onValueChange={() => toggleSwitch(key, !loc.is_activated, loc.id, loc.on_time, loc.off_time, loc.days)}
                                                                    value={loc.is_activated}
                                                                />
                                                            </View>

                                                            <View style={{ flexDirection: 'row', marginRight: 25 }}>

                                                                <TouchableOpacity
                                                                    onPress={() => navigation.navigate('Select Switch', route.params)}>
                                                                    <Icon style={styles.icon} name="edit" size={20} />
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                    onPress={() => delete_schedule(key)}>
                                                                    <Ico style={[styles.icon, { marginLeft: 8 }]} name="delete-outline" size={20} />
                                                                </TouchableOpacity>
                                                            </View>

                                                            <View style={{ flexDirection: "row" }}>
                                                                {loc.mode_details.map((details) => {

                                                                    details.days.map(d => {
                                                                        console.log("days details", d.day, d.status);
                                                                        <>
                                                                            {d.status ?
                                                                                <Text style={styles.titleButton}>
                                                                                    {d.day.substring(0, 3)}
                                                                                </Text> : null
                                                                            }

                                                                        </>


                                                                    })


                                                                })}


                                                                <TouchableOpacity
                                                                    onPress={() => delete_schedule(key)}>
                                                                    <Ico style={[styles.icon, { marginLeft: 8 }]} name="delete-outline" size={20} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                </>
                                            </View>
                                        </>
                                    )
                                }
                                )} */}
                            </>


                            )}
                            <View style={styles.card}>
                                <Text style={{ marginTop: 20, color: 'white' }}>SELECT SWITCHES</Text>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => navigation.navigate('Select Switch', route.params)}
                                    style={styles.FloatingActionButtonStyle}>
                                    <Ico style={styles.icon} name="plus" size={20} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.card}>
                                <Text style={{ marginTop: 20, color: 'white' }}>ADD SCHEDULE</Text>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => navigation.navigate('Add Schedule', route.params)}
                                    style={styles.FloatingActionButtonStyle}>
                                    <Ico style={styles.icon} name="plus" size={20} />
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </ScrollView>
            </SafeAreaView>
        </View>

    );
};

ModeSettingsScreen.propTypes = {
    getDetails: PropTypes.func,
    schedule_mode: PropTypes.instanceOf(Array),

    scheduleChanges: PropTypes.func,
    change_schedule_mode: PropTypes.instanceOf(Array),

    Delete_schedule: PropTypes.func,
    delete_schedule_mode: PropTypes.instanceOf(Array),

    scheduleSwitch: PropTypes.func,
    switchs_schedule_mode: PropTypes.instanceOf(Array),
};

ModeSettingsScreen.defaultProps = {
    getDetails: () => { },
    schedule_mode: [],

    scheduleChanges: () => { },
    change_schedule_mode: [],

    Delete_schedule: () => { },
    delete_schedule_mode: [],

    scheduleSwitch: () => { },
    switchs_schedule_mode: [],
};

const mapStateToProps = ({ getModeSchedule: { schedule_mode }, setModeScheduleChange: { change_schedule_mode }, deleteScheduleMode: { delete_schedule_mode }, setScheduleswitchsMode: { switchs_schedule_mode } }) => ({ schedule_mode, change_schedule_mode, delete_schedule_mode, switchs_schedule_mode });
const mapDispatchToProps = { getDetails: send => mode_Schedule(send), scheduleChanges: send => setMode_ScheduleStatus(send), Delete_schedule: send => mode_ScheduleDelete(send), scheduleSwitch: send => mode_ScheduleSwitchs(send), scheduleTime: send => mode_ScheduleTimer(send) };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ModeSettingsScreen);

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
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 40,
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
        // marginTop: 10,
        padding: 8,
        marginBottom: 5,
        marginHorizontal: 10,
        borderRadius: 5,
        height: 80,
        width: 340,
        // borderColor: '#696969',
        // backgroundColor: '#ccc',
        backgroundColor: '#3d3c3c',
        // borderBottomColor: '#ccc',
        borderBottomWidth: 0.15,
        // zIndex: 2,
    },
    titleButton: {
        // marginTop: 5,
        marginLeft: 3,
        fontSize: 15,
        // color: "#2f353d",
        color: '#949191',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
