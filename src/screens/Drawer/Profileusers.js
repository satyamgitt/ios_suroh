/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import PropTypes, { array } from "prop-types";
import { connect } from "react-redux";
import {
    Share,
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
    ActivityIndicator,
    Pressable,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-simple-toast';
import Slider from '@react-native-community/slider';
import Ico from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import { getSlno } from '../AsyncStorage';
import { add_User } from '../../redux/actions/add_User';
import { searchUser } from '../../redux/actions/searchUser';
import { Users } from '../../redux/actions/Users';
import { delete_User } from '../../redux/actions/delete_User';
import { lock_User } from '../../redux/actions/lock_User';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

var sl_no;

const ProfileusersScreen = ({ Add_User, getStatus, getDetails, delete_User, lock_User }) => {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [show, setShow] = useState(false);
    const [person, setperson] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [text, onChangeText] = React.useState("Useless Text");
    const [data, setData] = React.useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        check_textInputChange: false,
        check_textInputChangel: false,
        check_textInputChangeid: false,
        check_textInputChangemail: false,
        textInputChangemail: false,
        secureTextEntry: true,
        isValidUserl: true,
        isValidUsermail: true,
        isValidUserid: true,
        isValidUser: true,
        isValidPassword: true,
        isValidUseridsearch: true,
    });

    const onRefresh = () => {
        // setLoading(false)
        setRefreshing(true);
        setTimeout(async () => {
            sl_no = await getSlno();
            init(sl_no);
        }, 1000);
        // wait(2000).then(() => setRefreshing(false));
    };

    useEffect(() => {
        setTimeout(async () => {
            sl_no = await getSlno();
            setLoading(true);
            init(sl_no);
        }, 1000);
        console.log("useeffect called");
        return () => { };
    }, []);

    const init = (sl_no) => {
        // setLoading(true)
        const sl_no_v = sl_no
        const send = [];
        const no = { "sl_no": sl_no_v };
        send.push(no);
        console.log(send);
        console.log('log menu api');
        getDetails(send).then(response => {
            setperson(response);
            console.log(response);
            setLoading(false);
            setRefreshing(false)

            console.log('fuck me');
        });
        console.log("Data from Api's");
    };


    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                first_name: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                first_name: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }
    const textInputChangeid = (val) => {
        if (val.trim().length >= 6) {
            setData({
                ...data,
                username: val,
                check_textInputChangeid: true,
                isValidUserid: true,
                // isValidUseridsearch: true,
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChangeid: false,
                isValidUserid: false,
                // isValidUseridsearch: false,
            });
        }
    }
    const textInputChangemail = (val) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        re.test(String(val).toLowerCase());
        if (re.test(String(val).toLowerCase())) {
            // if (val.trim().length >= 4) {
            setData({
                ...data,
                email: val,
                check_textInputChangemail: true,
                isValidUsermail: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChangemail: false,
                isValidUsermail: false
            });
        }
    }
    const textInputChangel = (val) => {
        if (val.trim().length >= 1) {
            setData({
                ...data,
                last_name: val,
                check_textInputChangel: true,
                isValidUserl: true
            });
        } else {
            setData({
                ...data,
                last_name: val,
                check_textInputChangel: false,
                isValidUserl: false
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
    const handleValidUserl = (val) => {
        if (val.trim().length >= 1) {
            setData({
                ...data,
                isValidUserl: true
            });
        } else {
            setData({
                ...data,
                isValidUserl: false
            });
        }
    }
    const handleValidUserid = (val) => {
        const send = [];
        const payload = { 'username': val }
        send.push(payload);
        console.log(send, "  data payload");
        getStatus(send)
            .then(response => {
                console.log(response);
                if (response != '1')
                    setData({
                        ...data,
                        isValidUserlid: false,
                        isValidUseridsearch: false
                    });
                else
                    setData({
                        ...data,
                        isValidUserlid: true,
                        isValidUseridsearch: true
                    });
                console.log("ghdfg");
                console.log(response, "fttyasd");
                console.log('pressed details');
            })
    }
    const handleValidUsermail = (val) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        re.test(String(val).toLowerCase());
        if (re.test(String(val).toLowerCase())) {
            setData({
                ...data,
                isValidUserlmail: true
            });
        } else {
            setData({
                ...data,
                isValidUserlmail: false
            });
        }
    }


    const handlePasswordChange = (val) => {
        if (val.trim().length >= 6) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }
    const onShare = async (username, password) => {
        try {
            const result = await Share.share({
                message:
                    `UserName:${username}Password:${password}`
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }
    const addUser = async (first_name, last_name, email, username, password) => {
        setModalVisible(!modalVisible)
        console.log(first_name, last_name, email, username, password);
        if (first_name.length === 0 || last_name.length === 0 || email.length === 0 || username.length === 0 || password.length === 0) {
            Alert.alert('Wrong Input!', "All field's are mandatory", [
                { text: 'Okay' }
            ]);
            return;
        }
        sl_no = await getSlno();
        const payload = { 'sl_no': sl_no, 'first_name': first_name, 'last_name': last_name, 'email': email, 'username': username, 'password': password }
        let send = [];
        console.log("log details");
        send.push(payload);
        console.log(send);
        setLoading(true);
        Add_User(send)
            .then((response) => {
                if (response == '1') {
                    Toast.show("User Added Successfully", Toast.LONG, Toast.TOP);
                    init(sl_no);
                }
                else {
                    Toast.show("Something Went Wrong", Toast.LONG, Toast.TOP);
                }
                console.log(response, 'data');
            })
        console.log("log details api");
    }
    const DeleteUser = (user_name) => {
        let send = [];
        console.log("log details");
        const payload = { 'username': user_name }
        send.push(payload);
        console.log(send);
        delete_User(send)
            .then((response) => {
                Toast.show(response, Toast.LONG, Toast.TOP);
                // setModalVisible(!modalVisible) 
                init(sl_no);
                console.log(response, 'data');
            })
        console.log("log details api");
    }

    const LockUser = (user_name, val) => {
        let send = [];
        console.log("log details");
        const payload = { 'username': user_name, 'status': val }
        send.push(payload);
        console.log(send);
        lock_User(send)
            .then((response) => {
                Toast.show(response, Toast.LONG, Toast.TOP);
                // setModalVisible(!modalVisible) 
                init(sl_no);
                console.log(response, 'data');
            })
        console.log("log details api");
    }


    const searchuser = (val) => {
        const send = [];
        // const payload = { 'sl_no': sl_no, 'id': id, 'status': status }
        send.push();
        console.log(send, "  data payload");
        // Toast.show('This is a toast of first see this.', Toast.LONG, Toast.TOP);
        getStatus(send).then(response => {
            console.log("ghdfg");
            console.log(response, "fttyasd");
            console.log(response, "dfdf");
            // if (response[0].error) {
            //     Toast.show(response[0].error, Toast.LONG, Toast.TOP);
            // }
            console.log('pressed details');
        })
    }

    return (
        <View style={styles.centeredView}>
            <ScrollView style={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {/* <Text></Text> */}
                <Text style={styles.textStyle}>User Details</Text>
                {loading ? (
                    <View style={{ paddingTop: 300 }}>
                        <ActivityIndicator size='large' color="#ffffff" /></View>
                ) : (
                    <>{person === null ? (<View><Text style={[styles.textStyle, { alignContent: 'center' }]}>No More Users To Shown</Text></View>) : (<>
                        {
                            person.map(p => (
                                <View style={styles.card}>
                                    <View style={styles.rowicon}>
                                        <View style={{ flexDirection: 'column', marginRight: 'auto' }}>
                                            <Text style={styles.titleButton}>{p.first_name} {p.last_name}</Text>
                                            <Text style={styles.title2}>{p.username}</Text>
                                        </View>
                                        {/* {p['user_status'] != null ? ( */}
                                        {p.user_status != null ? (<View style={{ flexDirection: 'column', marginRight: 5 }}>
                                            <TouchableOpacity
                                                onPress={() => LockUser(p.username, 'No')}>
                                                <Ico style={[styles.icon, { marginLeft: 3 }]} name="lock-outline" size={25} />
                                            </TouchableOpacity>
                                            <Text style={styles.title2}>Locked</Text>
                                        </View>

                                        ) : (
                                            <View style={{ flexDirection: 'column', marginRight: 5 }}>
                                                <TouchableOpacity
                                                    onPress={() => LockUser(p.username, 'Yes')}>
                                                    <Ico style={[styles.icon, { marginLeft: 10 }]} name="lock-open-variant-outline" size={25} />
                                                </TouchableOpacity>
                                                <Text style={styles.title2}>Unlocked</Text>
                                            </View>
                                        )}
                                        <View style={{ flexDirection: 'column', marginRight: 5 }}>
                                            <TouchableOpacity
                                                onPress={() => DeleteUser(p.username)}>
                                                <Ico style={[styles.icon, { marginLeft: 6 }]} name="delete-outline" size={25} />
                                            </TouchableOpacity>
                                            <Text style={styles.title2}>Delete</Text>
                                        </View>

                                        <View style={{ flexDirection: 'column', marginRight: 5 }}>
                                            <TouchableOpacity
                                                onPress={() => { onShare(p.first_name, p.last_name, p.username, p.password) }}>
                                                <Ico style={[styles.icon, { marginLeft: 6 }]} name="share-variant" size={25} />
                                            </TouchableOpacity>
                                            <Text style={styles.title2}>Share</Text>
                                        </View>
                                    </View>

                                </View>
                            ))
                        }
                    </>
                    )}
                    </>
                )}
            </ScrollView>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setModalVisible(true)}
                style={styles.FloatingActionButtonStyle}>

                <Ico style={styles.icon} name="account-plus" size={30} />
                {/* <Image
                    source={{ uri: 'https://www.techup.co.in/wp-content/uploads/2020/03/ic_cart_image.png' }}
                    style={styles.FloatingActionButtonImageStyle}
                /> */}
            </TouchableOpacity>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert("User Added successfully");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <SafeAreaView>
                        <ScrollView style={styles.scrollView}>

                            {/* <Text style={[styles.text_footer]}>First Name</Text> */}
                            <View style={styles.action}>
                                <FontAwesome
                                    name="user-o"
                                    color="green"
                                    size={20}
                                />
                                <TextInput
                                    placeholder="First Name"
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
                                    <Text style={styles.errorMsg}>First Name atleast 4 characters long.</Text>
                                </Animatable.View>
                            }

                            {/* <Text style={[styles.text_footer]}>Last Name</Text> */}
                            <View style={styles.action}>
                                <FontAwesome
                                    name="user-o"
                                    color="green"
                                    size={20}
                                />
                                <TextInput
                                    placeholder="Last Name"
                                    placeholderTextColor="#666666"
                                    style={[styles.textInput]}
                                    autoCapitalize="none"
                                    onChangeText={(val) => textInputChangel(val)}
                                    onEndEditing={(e) => handleValidUserl(e.nativeEvent.text)}
                                />
                                {data.check_textInputChangel ?
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
                            {data.isValidUserl ? null :
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>LastName atleast 1 characters long.</Text>
                                </Animatable.View>
                            }

                            <View style={styles.action}>
                                <Feather
                                    name="mail"
                                    color="green"
                                    size={20}
                                />
                                <TextInput
                                    placeholder="E-mail"
                                    placeholderTextColor="#666666"
                                    style={[styles.textInput]}
                                    autoCapitalize="none"
                                    onChangeText={(val) => textInputChangemail(val)}
                                    onEndEditing={(e) => handleValidUsermail(e.nativeEvent.text)}
                                />
                                {data.check_textInputChangemail ?
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
                            {data.isValidUsermail ? null :
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>Wrong E-mail ID.</Text>
                                </Animatable.View>
                            }

                            {/* <Text style={[styles.text_footer]}>Username</Text> */}
                            <View style={styles.action}>
                                <FontAwesome
                                    name="user-circle-o"
                                    color="green"
                                    size={20}
                                />
                                <TextInput
                                    placeholder="User ID"
                                    placeholderTextColor="#666666"
                                    style={[styles.textInput]}
                                    autoCapitalize="none"
                                    onChangeText={(val) => textInputChangeid(val)}
                                    onEndEditing={(e) => handleValidUserid(e.nativeEvent.text)}
                                />
                                {data.check_textInputChangeid ?
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
                            {data.isValidUserid ? null :
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>User ID must be 6 characters long.</Text>
                                </Animatable.View>
                            }
                            {data.isValidUseridsearch ? null :
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>User ID already taken please try again!!</Text>
                                </Animatable.View>
                            }
                            {/* <Text style={[styles.text_footer, {marginTop: 10}]}>Password</Text> */}
                            <View style={styles.action}>
                                <Feather
                                    name="lock"
                                    color="green"
                                    size={20}
                                />
                                <TextInput
                                    placeholder="Set Password"
                                    placeholderTextColor="#666666"
                                    secureTextEntry={data.secureTextEntry ? true : false}
                                    style={[styles.textInput]}
                                    autoCapitalize="none"
                                    onChangeText={(val) => handlePasswordChange(val)}
                                />

                            </View>
                            {data.isValidPassword ? null :
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>Password must be 6 characters long.</Text>
                                </Animatable.View>
                            }
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    addUser(data.first_name,
                                        data.last_name,
                                        data.email,
                                        data.username,
                                        data.password)
                                }}
                            >
                                <Text style={styles.textStyle}>Add</Text>

                            </TouchableOpacity>


                            {/* style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}

                            >
                                <Text style={styles.textStyle} >SAVE</Text> */}

                        </ScrollView>
                    </SafeAreaView>
                </View>
            </Modal>
        </View>
    );
};
ProfileusersScreen.propTypes = {
    Add_User: PropTypes.func,
    _adduser: PropTypes.instanceOf(Array),

    getStatus: PropTypes.func,
    search_user: PropTypes.instanceOf(Array),

    getDetails: PropTypes.func,
    users: PropTypes.instanceOf(Array),

    delete_User: PropTypes.func,
    deleteuser: PropTypes.instanceOf(Array),

    lock_User: PropTypes.func,
    lockuser: PropTypes.instanceOf(Array),
};

ProfileusersScreen.defaultProps = {
    Add_User: () => { },
    _adduser: [],

    getStatus: () => { },
    search_user: [],

    getDetails: () => { },
    users: [],
    delete_User: () => { },
    deleteuser: [],
    lock_User: () => { },
    lockuser: [],
};

const mapStateToProps = ({ setUser: { _adduser }, getSearchUser: { search_user }, getUser: { users }, deleteUser: { deleteuser }, lockUser: { lockuser } }) => ({ _adduser, search_user, users, deleteuser, lockuser });
const mapDispatchToProps = { Add_User: (send) => add_User(send), getStatus: (send) => searchUser(send), getDetails: (send) => Users(send), delete_User: (send) => delete_User(send), lock_User: (send) => lock_User(send) };
export default connect(mapStateToProps, mapDispatchToProps)(ProfileusersScreen);

const styles = StyleSheet.create({
    spaces: {
        margin: 20,
    },
    centeredView: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // marginTop: 22
    },
    baseText: {
        // fontWeight: 'bold',
        fontSize: 14,
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
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
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
        borderRadius: 10,
        alignContent: 'space-around',
        justifyContent: 'space-around',
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
        // text-Align: 'right',
        textAlign: 'right',
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
        fontSize: 16,
        // color: "#2f353d",
        color: '#282929',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textArea: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 18,
        paddingLeft: 18,
        // flexDirection: "row"
    },
    icon: {
        // padding: 10
        // paddingLeft: 5,
        // paddingBottom: 5,
        // margin: 5
    },
    rowicon: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
    },
    footer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // flexWrap: "wrap",
        // flex: 1,
        // alignContent: "flex-end",
        alignItems: 'flex-start',
        // float: "right",
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        borderWidth: 2,
        height: 35,
        width: 80,

        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    titleButton: {
        marginTop: 2,
        marginLeft: 3,
        fontSize: 18,
        // color: "#2f353d",
        color: '#949191',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    title2: {
        marginTop: 1,
        marginLeft: 3,
        fontSize: 12,
        // color: "#2f353d",
        color: '#949191',
        fontWeight: 'bold',
        // textAlign: 'center',
    },

    FloatingActionButtonStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: '#009387',
        // borderColor: '#000000',
        borderRadius: 200 / 2
    },

    FloatingActionButtonImageStyle: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        tintColor: '#FFFFFF'
    },
    input: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    text_footer: {
        color: '#05375a',
        fontSize: 15
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
});
