// import React from "react";
// import { StyleSheet, Text, View, StatusBar, Dimensions } from "react-native";
// import Header from "./Header";


// const Changeip = () => {
//     return (
//         <View style={styles.container}>
//             <Header label="HOME DEVICES" />
//             {/* <Header label="Pet Central" />
//             <Header label="Car Central" />
//             <Header label="Fish Central" /> */}
//             <Text style={{ color: 'black' }}>Hello World</Text>
//             <StatusBar barStyle="dark-content" />

//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         // justifyContent: 'center'
//     }
// })

// export default Changeip;

//card with bottom label
// import React from 'react';
// import { Text, View, Image } from "react-native";


// const Changeip = () => {


//     return (
//         <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//             <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
//                 <View>
//                     <Image
//                         source={require("../../assets/h4.jpg")}
//                         style={{
//                             height: 135,
//                             width: 155
//                         }}
//                     />

//                 </View>
//                 <View style={{ padding: 10, width: 155 }}>
//                     <Text>Title</Text>
//                     <Text style={{ color: "#777", paddingTop: 5 }}>
//                         Description of the image
//                     </Text>
//                 </View>
//             </View>
//         </View>
//     );

// }

// export default Changeip;

import React from 'react';
import { Text, View, Image, ImageBackground, StyleSheet, Dimensions, TouchableHighlight, ScrollView, SafeAreaView, RefreshControl, } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';


const { width, height } = Dimensions.get('screen');
const diognal = height / width;
const size = diognal * 6.65;

var data = [
    {
        "temp": "27",
        "lux": "125",
        "modes": null,
        "light": "1",
        "fan": "0",
        "socket": "0",
        "location": "Entrance"
    },
    {
        "temp": "25",
        "lux": "98",
        "modes": null,
        "light": "0",
        "fan": "0",
        "socket": "0",
        "location": "Hall"
    },
    {
        "temp": "27",
        "lux": "88",
        "modes": null,
        "light": "0",
        "fan": "0",
        "socket": "0",
        "location": "Room1"
    },
    {
        "temp": "26",
        "lux": "78",
        "modes": null,
        "light": "0",
        "fan": "0",
        "socket": "0",
        "location": "Room2"
    },
    {
        "temp": "28",
        "lux": "68",
        "modes": null,
        "light": "0",
        "fan": "0",
        "socket": "0",
        "location": "Kitchen"
    },
    {
        "temp": "25",
        "lux": "78",
        "modes": null,
        "light": "0",
        "fan": "0",
        "socket": "1",
        "location": "Others"
    }
]

var img = 'h4.jpg';
var img2;

const Changeip = ({ navigation }) => {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = () => {
        // setLoading(false)
        setRefreshing(true);

        // wait(2000).then(() => setRefreshing(false));
    };

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <ScrollView style={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {data.map(d => {
                        // console.log('img2', img2);
                        return (
                            <>
                                {d.location == 'Entrance' ?
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('scrolling')}>
                                        <ImageBackground style={styles.image} source={require('../../assets/h4.jpg')}>
                                            <View style={styles.darkness}>
                                                <Text style={{ color: "#ffffff" }}>{d.location}</Text>
                                                {/* <Text>Living Room</Text> */}
                                                {/* <Text style={{ color: "#ffffff" }}>Bathroom</Text> */}
                                                {/* <Text style={{ color: "#ffffff", flex: 1, justifyContent: 'flex-end', marginTop: 80 }}>Bed Room</Text> */}
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Image style={styles.tinyLogo} source={require('../../assets/lightoff.png')} />
                                                    <Text style={{ color: "#ffffff", marginTop: 100, }}>x{d.light}</Text>
                                                    <Image style={styles.tinyLogo1} source={require('../../assets/temp.png')} />
                                                    <Text style={{ color: "#ffffff", marginTop: 100, }}>x{d.temp}</Text>
                                                </View>
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity> : d.location == 'Hall' ?
                                        <TouchableOpacity>
                                            <ImageBackground style={styles.image} source={require('../../assets/hall.jpeg')}>
                                                <View style={styles.darkness}>
                                                    <Text style={{ color: "#ffffff" }}>{d.location}</Text>
                                                    {/* <Text>Living Room</Text> */}
                                                    {/* <Text style={{ color: "#ffffff" }}>Bathroom</Text> */}
                                                    {/* <Text style={{ color: "#ffffff", flex: 1, justifyContent: 'flex-end', marginTop: 80 }}>Bed Room</Text> */}
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Image style={styles.tinyLogo} source={require('../../assets/lightoff.png')} />
                                                        <Text style={{ color: "#ffffff", marginTop: 100, }}>x{d.light}</Text>
                                                        <Image style={styles.tinyLogo1} source={require('../../assets/temp.png')} />
                                                        <Text style={{ color: "#ffffff", marginTop: 100, }}>x{d.temp}</Text>
                                                    </View>
                                                </View>
                                            </ImageBackground>
                                        </TouchableOpacity> : d.location == 'Room1' ?
                                            <TouchableOpacity>
                                                <ImageBackground style={styles.image} source={require('../../assets/room.jpg')}>
                                                    <View style={styles.darkness}>
                                                        <Text style={{ color: "#ffffff" }}>{d.location}</Text>
                                                        {/* <Text>Living Room</Text> */}
                                                        {/* <Text style={{ color: "#ffffff" }}>Bathroom</Text> */}
                                                        {/* <Text style={{ color: "#ffffff", flex: 1, justifyContent: 'flex-end', marginTop: 80 }}>Bed Room</Text> */}
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Image style={styles.tinyLogo} source={require('../../assets/lightoff.png')} />
                                                            <Text style={{ color: "#ffffff", marginTop: 100, }}>x{d.light}</Text>
                                                            <Image style={styles.tinyLogo1} source={require('../../assets/temp.png')} />
                                                            <Text style={{ color: "#ffffff", marginTop: 100, }}>x{d.temp}</Text>
                                                        </View>
                                                    </View>
                                                </ImageBackground>
                                            </TouchableOpacity> : d.location == 'Room2' ?
                                                <TouchableOpacity>
                                                    <ImageBackground style={styles.image} source={require('../../assets/room2.jpg')}>
                                                        <View style={styles.darkness}>
                                                            <Text style={{ color: "#ffffff" }}>{d.location}</Text>
                                                            {/* <Text>Living Room</Text> */}
                                                            {/* <Text style={{ color: "#ffffff" }}>Bathroom</Text> */}
                                                            {/* <Text style={{ color: "#ffffff", flex: 1, justifyContent: 'flex-end', marginTop: 80 }}>Bed Room</Text> */}
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Image style={styles.tinyLogo} source={require('../../assets/lightoff.png')} />
                                                                <Text style={{ color: "#ffffff", marginTop: 100, }}>x{d.light}</Text>
                                                                <Image style={styles.tinyLogo1} source={require('../../assets/temp.png')} />
                                                                <Text style={{ color: "#ffffff", marginTop: 100, }}>x{d.temp}</Text>
                                                            </View>
                                                        </View>
                                                    </ImageBackground>
                                                </TouchableOpacity> : d.location == 'Kitchen' ?
                                                    <TouchableOpacity>
                                                        <ImageBackground style={styles.image} source={require('../../assets/kitchen.jpg')}>
                                                            <View style={styles.darkness}>
                                                                <Text style={{ color: "#ffffff" }}>{d.location}</Text>
                                                                {/* <Text>Living Room</Text> */}
                                                                {/* <Text style={{ color: "#ffffff" }}>Bathroom</Text> */}
                                                                {/* <Text style={{ color: "#ffffff", flex: 1, justifyContent: 'flex-end', marginTop: 80 }}>Bed Room</Text> */}
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <Image style={styles.tinyLogo} source={require('../../assets/lightoff.png')} />
                                                                    <Text style={{ color: "#ffffff", marginTop: 100, }}>x{d.light}</Text>
                                                                    <Image style={styles.tinyLogo1} source={require('../../assets/temp.png')} />
                                                                    <Text style={{ color: "#ffffff", marginTop: 100, }}>x{d.temp}</Text>
                                                                </View>
                                                            </View>
                                                        </ImageBackground>
                                                    </TouchableOpacity> : d.location == 'Others' ?
                                                        <TouchableOpacity>
                                                            <ImageBackground style={styles.image} source={require('../../assets/other.jpeg')}>
                                                                <View style={styles.darkness}>
                                                                    <Text style={{ color: "#ffffff" }}>{d.location}</Text>
                                                                    {/* <Text>Living Room</Text> */}
                                                                    {/* <Text style={{ color: "#ffffff" }}>Bathroom</Text> */}
                                                                    {/* <Text style={{ color: "#ffffff", flex: 1, justifyContent: 'flex-end', marginTop: 80 }}>Bed Room</Text> */}
                                                                    <View style={{ flexDirection: 'row' }}>
                                                                        <Image style={styles.tinyLogo} source={require('../../assets/lightoff.png')} />
                                                                        <Text style={{ color: "#ffffff", marginTop: 100, }}>x{d.light}</Text>
                                                                        <Image style={styles.tinyLogo1} source={require('../../assets/temp.png')} />
                                                                        <Text style={{ color: "#ffffff", marginTop: 100, }}>x{d.temp}</Text>
                                                                    </View>
                                                                </View>
                                                            </ImageBackground>
                                                        </TouchableOpacity> : null}
                            </>
                        )
                    })}
                </ScrollView>
            </SafeAreaView>

        </View>

    );

};

export default Changeip;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: 335,
        height: 150,
        borderRadius: 20 / 2,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#777877",
        marginVertical: diognal * 3.8,
        marginHorizontal: diognal * 4.74,

    },
    text: {
        marginTop: 2,
        marginLeft: 4,
        color: "#072407",
        fontSize: 20,
        lineHeight: 20,
        fontWeight: "bold",
        textAlign: "left",
        // backgroundColor: "#000000c0"
    },
    text2: {
        color: "white",
        fontSize: 10,
        alignContent: 'flex-end',
        textAlignVertical: 'bottom',
        // backgroundColor: "#000000c0"
    },
    card: {
        // flexDirection: 'row',
        padding: diognal * 4.74,
        height: height / 5,
        width: width / 2.4,
        marginVertical: diognal * 3.8,
        marginHorizontal: diognal * 4.74,
        borderRadius: diognal * 9.48,
        backgroundColor: '#3d3c3c',
        // borderBottomColor: '#ccc',
        // borderBottomWidth: 0.15,
        // borderWidth: 0.15,
        // zIndex: 2,
    },
    profileImgContainer: {
        marginLeft: 8,
        height: 80,
        width: 80,
        // borderRadius: 40,
    },
    profileImg: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "red"
    },
    darkness: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: 200,
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    tinyLogo: {
        width: 30,
        height: 40,
        marginTop: 85,
        tintColor: '#a7e034'
    },
    tinyLogo1: {
        width: 30,
        height: 40,
        marginTop: 90,
        alignContent: 'flex-end'
        //tintColor: '#a7e034'
    },
});