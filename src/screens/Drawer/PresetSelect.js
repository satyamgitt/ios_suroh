import React, { useEffect, useState } from 'react';
import {

    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    Switch,
} from 'react-native';
import CustomSwitch from './CustomeSwitch';
import Icon from 'react-native-vector-icons/Feather';
import axios from '../../config/axios';
import { getSlno } from '../AsyncStorage';
import { useTheme } from '@react-navigation/native';
import { color } from 'react-native-reanimated';



var sl_no;
const PresetSelect = ({ navigation }) => {
    useEffect(() => {
        setTimeout(async () => {
            sl_no = await getSlno();
        }, 1000);
    }, [])

    const theme = useTheme();
    const styles = useStyles(theme);
    const { colors } = { ...theme };


    const onSelectSwitch = index => {

        if (index == 1) {
            console.log("Off api");
            const send = []
            const data = { sl_no: sl_no }
            send.push(data);
            console.log("presetoffpayload", send);
            // axios.post('/preset_deactivate.php', send)
            axios.post('/automode_Flat_details.php',)
                .then((response) => console.log("Offresponse", response))
        } else {
            console.log("on api");
            const send = []
            const data = { "no": "wifi", "sl_no": sl_no }
            send.push(data);
            console.log("presetonpayload", send);
            axios.post('/preset_deactivate.php', send)
                .then((response) => console.log("Onresponse", response.data))
        }
    };
    const onSelectSwitch2 = index => {

        if (index == 1) {
            console.log("Off api", index);
            const send = []
            const data = { "no": "wifi", "sl_no": sl_no }
            send.push(data);
            console.log("senddata", send);
            axios.post('/preset_deactivate.php', send)
                .then((response) => console.log("resp", response.data))
            //  axios.post('/automode_Flat_details.php',)
        } else {
            console.log("ON api", index);
            const send = []
            const data = { no: "switches", sl_no: sl_no }
            send.push(data);
            console.log("ExceptSelectedSwitchesPayload", send);
            axios.post('/presets_activate.php', send)
                .then((response) => console.log("ExceptSelectedSwitchesResponse", response.data))
        }
    };
    return (
        <View style={styles.card}>
            <View style={styles.cardboard}>
                {/* Buttons Designing part in CustomeSwitch.js */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.baseTextH}>Except WIFI</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('PreesetSwitches');
                        }}>

                        <Icon style={styles.icon} name="edit" size={25} />

                    </TouchableOpacity>
                    <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* CustomSwitch is chaild component for PresetSelect now it able to access all properties of PresetSelect component*/}
                        <CustomSwitch
                            selectionMode={1}
                            roundCorner={true}
                            option1={'Off'}
                            option2={'On'}
                            onSelectSwitch={onSelectSwitch}
                            selectionColor={'#7d7c7c'}
                        />
                    </View>
                </View>
            </View><Text></Text>
            <View style={styles.cardboard}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                    <Text style={styles.baseTextH}>Except Selected</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('PreesetSwitches');
                        }}>

                        <Icon style={styles.icon} name="edit" size={25} />

                    </TouchableOpacity>
                    <View style={{ alignItems: 'center', justifyContent: 'space-between', marginLeft: 22 }}>
                        <CustomSwitch
                            selectionMode={1}
                            roundCorner={true}
                            option1={'Off'}
                            option2={'On'}
                            onSelectSwitch={onSelectSwitch2}
                            selectionColor={'#7d7c7c'}
                        />
                    </View>
                </View>
            </View>
        </View >

    )
}

export default PresetSelect;

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
    baseText: {
        // fontWeight: 'bold',
        fontSize: 12
    },
    baseTextH: {
        // fontWeight: 'bold',
        paddingLeft: 12,
        paddingTop: 5,
        fontSize: 14,
        fontWeight: "bold",
        color: theme.colors.text,

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
        marginTop: 10,
        padding: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 20,
        // borderColor: '#696969',
        // backgroundColor: '#ccc',
        backgroundColor: theme.colors.card,
        // borderBottomColor: '#ccc',
        borderBottomWidth: 0.15,
        // zIndex: 2,
    },
    cardboard: {
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: theme.colors.cardboard,
    },
    cardthemOn: {
        // flexDirection: 'row',
        // marginLeft: 10,
        // marginBottom: 10,
        // marginTop: 10,
        // borderRadius: 8,
        // // backgroundColor: '#009387',
        // backgroundColor: '#4d4b4b',
        // zIndex: 1,
        // borderColor: '#949191',
        // // borderColor: '#009387',
        // borderWidth: 1,

        flexDirection: 'row',
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 8,
        // backgroundColor: '#606060',
        backgroundColor: '#4d4b4b',
        zIndex: 1,
        // borderColor: '#949191',
        borderColor: '#009387',
        borderWidth: 1,
    },
    cardthemOff: {
        // flexDirection: 'row',
        // marginLeft: 10,
        // marginBottom: 10,
        // marginTop: 10,
        // borderRadius: 8,
        // // backgroundColor: '#3d3c3c',
        // backgroundColor: '#4d4b4b',
        // zIndex: 1,
        // borderColor: '#0f0d0d',
        // borderWidth: 1,
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
        paddingLeft: 10,
        paddingBottom: 5
        // margin: 5
    },
    titleButtonOn: {
        fontSize: 16,
        color: "#009387",
        // color: '#949191',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titleButtonOff: {
        fontSize: 16,
        color: "#2f353d",
        //color: '#282929',
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
