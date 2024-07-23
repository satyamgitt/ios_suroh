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
    Dimensions,
    Button,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import Ico from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import { scheduleSwitchs } from '../../../redux/actions/schedule/scheduleSwitchs';
import { getSlno } from '../../AsyncStorage';
import { useTheme } from '@react-navigation/native';
import { colors } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';



const { width, height } = Dimensions.get('screen');
const diognal = height / width;
const size = diognal * 6.65



var slno;

const ScheduleLocation = ({ navigation, getDetails, route }) => {

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [location, setlocation] = useState([]);

    const [isEnabled, setIsEnabled] = useState(false);
    const updateSecureTextEntry = () => setIsEnabled(previousState => !previousState);
    const [modalVisible, setModalVisible] = useState(false);

    const theme = useTheme();
    const styles = useStyles(theme);
    const { colors } = { ...theme };

    



    const onRefresh = () => {
        setLoading(false)
        getData(slno)
        setRefreshing(true);
    };

    const getData = (slno) => {
        const send = [];
        const data = { 'sl_no': slno, 'location': route.params.location };
        // console.log(data)
        send.push(data);
 
        getDetails(send).then(response => {
            console.log("ScheduleLocationresponse", JSON.stringify(response));
            setlocation(response);
            setLoading(false)

        })
        .catch((error) => {
          console.error(error);
        });;
    };

    // The "useEffect" hook is used to fetch location data when the component mounts. It calls the getData function, which in turn dispatches the getDetails action with the appropriate data.

    useEffect(() => {
        setTimeout(async () => {
            // getting serial number from async astorage
            slno = await getSlno();
            setLoading(true)
            getData(sl_no);
        }, 1000);
        return () => { };
    }, []);

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
                    ) : (<>
                        {location.map(loc => (
                            <View>

                                {loc.boards.map(b => (
                                    <>
                
                                        <View style={styles.cardboard}>


                                            <View >
                                                {b.switches.map((s, i) => (
                                                    <>
                                                        <TouchableOpacity
                                                            onPress={() => navigation.navigate('Scheduled list', { id: s.id, })}>
                                                            <View style={styles.card}>
                                                                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                                                    <Ico style={styles.icon} name={s.sw === 'Light' ? 'lightbulb-on' : s.sw === 'Fan' ? 'fan' : s.sw === 'Socket' ? 'power-socket-eu' : null} size={30} />
                                                                    <Text style={{ color: colors.text }}>{s.sw}</Text>
                                                                    {s.status ?
                                                                        <Ico
                                                                            style={styles.icon}
                                                                            name="timer-outline"
                                                                            color="grey"
                                                                            size={30}
                                                                        />
                                                                        :
                                                                        <Ico
                                                                            style={styles.icon}
                                                                            name="timer-off-outline"
                                                                            color="grey"
                                                                            size={30}
                                                                        />
                                                                    }
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </>
                                                ))}
                                            </View>
                                        </View>
                                    </>
                                ))}
                                {loc.sublocb != null ? (
                                    <Text style={styles.baseTextH}> {loc.sublocb}</Text>
                                ) : null}
                                {loc.bathroom != null
                                    ? loc.bathroom.map(b => (
                                        <>
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }} >
                                                <Text>Board {b.switchBoardId}</Text>
                                            </View>
                                            <View style={styles.cardboard}>
                                                <View >
                                                    {b.switches.map((s, i) => (
                                                        <>
                                                            <TouchableOpacity
                                                                onPress={() => navigation.navigate('timer')}>
                                                                <View style={styles.card}>
                                                                    <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                                                        <Ico style={styles.icon} name={s.sw === 'Light' ? 'lightbulb-on' : s.sw === 'Fan' ? 'fan' : s.sw === 'Socket' ? 'power-socket-eu' : null} size={30} />
                                                                        <Text style={styles.title}>{s.sw}</Text>
                                                                        {s.status ?
                                                                            <Ico
                                                                                style={styles.icon}
                                                                                name="timer-outline"
                                                                                color="grey"
                                                                                size={30}
                                                                            />
                                                                            :
                                                                            <Ico
                                                                                style={styles.icon}
                                                                                name="timer-off-outline"
                                                                                color="grey"
                                                                                size={30}
                                                                            />
                                                                        }
                                                                    </View>
                                                                </View>
                                                            </TouchableOpacity>
                                                        </>
                                                    ))}
                                                </View>
                                            </View>
                                        </>
                                    ))
                                    : null}

                                {loc.sublocc != null ? (
                                    <Text style={styles.baseTextH}> {loc.sublocc}</Text>
                                ) : null}
                                {loc.balcony != null
                                    ? loc.balcony.map(b => (
                                        <>
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }} >
                                                <Text>Board {b.switchBoardId}</Text>
                                            </View>
                                            <View style={styles.cardboard}>
                                                <View >
                                                    {b.switches.map((s, i) => (
                                                        <>
                                                            <TouchableOpacity
                                                                onPress={() => navigation.navigate('timer', { id: s.id })}>
                                                                <View style={styles.card}>
                                                                    <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                                                        <Ico style={styles.icon} name={s.sw === 'Light' ? 'lightbulb-on' : s.sw === 'Fan' ? 'fan' : s.sw === 'Socket' ? 'power-socket-eu' : null} size={30} />
                                                                        <Text style={styles.title}>{s.sw}</Text>
                                                                        {s.status ?
                                                                            <Ico
                                                                                style={styles.icon}
                                                                                name="timer-outline"
                                                                                color="grey"
                                                                                size={30}
                                                                            />
                                                                            :
                                                                            <Ico
                                                                                style={styles.icon}
                                                                                name="timer-off-outline"
                                                                                color="grey"
                                                                                size={30}
                                                                            />
                                                                        }
                                                                    </View>
                                                                </View>
                                                            </TouchableOpacity>
                                                        </>
                                                    ))}
                                                </View>
                                            </View>
                                        </>
                                    ))
                                    : null}
                            </View>
                        ))}</>
                    )}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}


// ScheduleLocation.propTypes is an object that specifies the expected data types for each prop passed to the ScheduleLocation component. It helps catch bugs by validating the types of the props during development. Here, it defines two prop types:
//getDetails: This prop should be a function (specified by PropTypes.func). It is the Redux action creator function that fetches location data and updates the Redux store.
//schedule_switchs: This prop should be an instance of an array (specified by PropTypes.instanceOf(Array)). It represents the fetched location data from the Redux store.


ScheduleLocation.propTypes = {
    getDetails: PropTypes.func,
    schedule_switchs: PropTypes.instanceOf(Array),
};

// ScheduleLocation.defaultProps is an object that defines the default values for the props in case they are not provided by the parent component when the ScheduleLocation component is rendered. Here, it sets default values for the two props:
//getDetails: The default value is an empty function (() => {}). If the parent component does not provide a getDetails prop, the component will use this empty function as a fallback. In this case, calling getDetails() would have no effect.
//schedule_switchs: The default value is an empty array ([]). If the parent component does not provide a schedule_switchs prop, the component will use this empty array as a fallback. In this case, there would be no location data to display.


ScheduleLocation.defaultProps = {
    getDetails: () => { },
    schedule_switchs: [],
};


// "mapStateToProps" is a function that takes the current state of the Redux store as its argument and returns an object that maps the store's state to the props that the connected component will receive. In this case, the function takes the state object and destructures it to extract the schedule_switchs property from the getLocationScheduleSwitchs object. The returned object contains a single property, schedule_switchs, which is the same as the extracted schedule_switchs from the Redux store. This means that the ScheduleLocation component will receive a prop named schedule_switchs with the value from the Redux store.
const mapStateToProps = ({ getLocationScheduleSwitchs: { schedule_switchs } }) => ({ schedule_switchs });

// "mapDispatchToProps" is an object that maps the dispatch of Redux actions to the props that the connected component will receive. In this case, it has a single property, getDetails, which is a function that takes a send parameter and dispatches the scheduleSwitchs(send) action. This means that the ScheduleLocation component will receive a prop named getDetails which, when called with the send parameter, will dispatch the scheduleSwitchs(send) action.
const mapDispatchToProps = { getDetails: send => scheduleSwitchs(send) };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScheduleLocation);


// When the connected ScheduleLocation component is rendered, it will receive the schedule_switchs prop from the Redux store's state, and the getDetails prop that dispatches the scheduleSwitchs(send) action. This allows the component to access the location data from the Redux store and update the store by dispatching the getDetails action.

const useStyles = theme => StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    baseText: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    baseTextH: {
        fontWeight: 'bold',
        color: theme.colors.text,
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
        marginRight: 10,
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
        color: theme.colors.text,
        // color: "#2f353d",
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    buttonRow: {
        height: 100,
        flexDirection: 'row',
        marginTop: 50,
        marginLeft: 27,
        marginRight: 49,
    },
    card: {
        marginTop: 10,
        padding: 10,
        margin: 10,
        borderRadius: 20,
        borderColor: '#696969',
        // backgroundColor: '#ccc',
        backgroundColor: '#3d3c3c',
        // borderBottomColor: '#ccc',
        borderBottomWidth: 0.15,
        // zIndex: 2,
        height: 55,
        width: 320
    },
    cardboard: {
        flexDirection: 'row',
        marginBottom: 2,
        borderRadius: 20,
        // backgroundColor: '#2b2b2b',
        backgroundColor: '#4d4b4b',
        margin: 10,
    },
    cardthemOn: {
        flexDirection: 'row',
        height: 40,
        width: 40,
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
        height: 45,
        width: 200,
        marginHorizontal: 10,
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
        // transform: [{ rotate: '270deg' }],
        color: theme.colors.text,
    },
    boadbathroom: {
        // paddingStart: 12,
        paddingHorizontal: 10,
        // paddingLeft: 15,
        fontSize: 15,
        fontWeight: 'bold',
        // transform: [{rotate: '270deg' }],
        color: theme.colors.text,
    },
    title: {
        // paddingLeft: 20,
        // fontSize: 25,
        // fontFamily: 'sans-serif',
        // fontWeight: '700',
        // color: '#000000',
        marginTop: 5,
        fontSize: 18,
        color: theme.colors.text,
        fontWeight: 'bold',
        // textAlign: "center"
    },
    titleButtonOn: {
        fontSize: 13,
        // color: "#2f353d",
        color: theme.colors.text,
        // fontWeight: 'bold',
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
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    timerArea: {
        paddingHorizontal: 18,
        paddingVertical: 10,
    },
    icon: {
        // paddingTop: 15,
        paddingLeft: 5,
        paddingBottom: 5,
        color: theme.colors.iconcolor,
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
});




{/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ color: 'red', }}>{loc.location}</Text>
                                                <Text>Board {b.switchBoardId}</Text>
                                            </View> */}