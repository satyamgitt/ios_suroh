// /* eslint-disable prettier/prettier */
// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// const TrackScreen = () => {
//     return (
//         <View style={styles.container}>
//             <Text>Track Screen</Text>
//             <Button
//                 title="Click Here"
//                 onPress={() => alert('This is Tack Screen!')}
//             />
//         </View>
//     );
// };

// export default TrackScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
// });


// // import React, { useState } from 'react';
// // import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView, SafeAreaView, TouchableOpacity, Button } from "react-native";
// // import MultiSlider from '@ptomasroos/react-native-multi-slider';
// // import * as Animatable from 'react-native-animatable';
// // import Slider from '@react-native-community/slider';
// // const GeneralSetting = ({ navigation }) => {
// //     const initialValue = [
// //         {
// //             "temp": "23",
// //             "lux": "88",
// //             "modes": ["Night"],
// //             "location": "Hall",
// //             "sublocb": "Bathroom",
// //             "sublocc": "Balcony",
// //             "boards": [
// //                 {
// //                     "switchBoardId": "Board 1",
// //                     "switches": [
// //                         { "id": "Arth_A_3_4_Entrance_11", "sw": "F", "status": "0" }
// //                     ]
// //                 },
// //                 {
// //                     "switchBoardId": "Board 2",
// //                     "switches": [
// //                         { "id": "Arth_A_3_4_Entrance_01", "sw": "F", "status": "1" }
// //                     ]
// //                 },
// //                 {
// //                     "switchBoardId": "Board 3",
// //                     "switches": [
// //                         { "id": "Arth_A_3_4_Entrance_01", "sw": "F", "status": "0" }
// //                     ]
// //                 }]
// //         }]
// //     const [enable, setenable] = useState();
// //     const [disable, setdisable] = useState();
// //     const [location, setlocation] = useState(initialValue);
// //     const [multiSliderValue, setMultiSliderValue] = useState([0])
// //     const multiSliderValuesChange = (values) => setMultiSliderValue(values)

// //     return (

// //         <View style={styles.centeredView} >
// //             <SafeAreaView>
// //                 <ScrollView style={styles.scrollView}>
// //                     <Animatable.View animation="fadeInRight" duration={4000}>
// //                         <Text style={styles.footer}>schedule</Text>
// //                     </Animatable.View>
// //                     <Text></Text>
// //                     <Animatable.View animation="fadeInRight" duration={4000}>
// //                         <Text style={styles.footer}>Modes</Text>
// //                     </Animatable.View>
// //                     <Text></Text>
// //                     {location.map(loc =>
// //                         <View>
// //                             <Text style={styles.title}>{loc.location}</Text>
// //                             <View style={styles.card}>
// //                                 {loc.boards.map(b =>
// //                                     <>
// //                                         <View style={styles.cardboard}>
// //                                             <View style={{ flexDirection: 'row' }}>
// //                                                 {b.switches.map((s, i) => (
// //                                                     <>
// //                                                         <TouchableOpacity onPress={() => { console.log(s['id']), console.log(s['status']) }}>
// //                                                             {s['status'] != 1 ?
// //                                                                 <View style={styles.cardthemOn}>
// //                                                                     <View style={styles.textArea}>
// //                                                                         <Text style={styles.titleButtonOn}>{s['sw']}</Text>
// //                                                                     </View>
// //                                                                     {/* <MultiSlider
// //                                                                     onValuesChangeStart={enable}
// //                                                                     onValuesChangeFinish={disable}
// //                                                                 /> */}
// //                                                                     {console.log('1')}
// //                                                                 </View> :
// //                                                                 <View style={styles.cardthemOff}>
// //                                                                     <View style={styles.textArea}>
// //                                                                         <Text style={styles.titleButtonOff}>{s['sw']}</Text>
// //                                                                     </View>
// //                                                                     {console.log('0')}
// //                                                                 </View>
// //                                                             }
// //                                                         </TouchableOpacity>
// //                                                         <Slider
// //                                                             style={{ width: 200, height: 40, paddingTop: 30 }}
// //                                                             minimumValue={0}
// //                                                             maximumValue={1}
// //                                                             minimumTrackTintColor="#FFFFFF"
// //                                                             maximumTrackTintColor="#000000"
// //                                                         />
// //                                                         {/* <MultiSlider
// //                                                         values={multiSliderValue[0]}
// //                                                         sliderLength={280}
// //                                                         onValuesChange={multiSliderValuesChange}
// //                                                         min={0}
// //                                                         max={100}
// //                                                         allowOverlap={false}
// //                                                         minMarkerOverlapDistance={10}
// //                                                     /> */}
// //                                                     </>
// //                                                 ))}
// //                                                 <Text style={styles.boardtitle}>{b.switchBoardId}</Text>
// //                                             </View>
// //                                         </View>
// //                                     </>
// //                                 )}
// //                             </View>
// //                         </View>
// //                     )}
// //                 </ScrollView >
// //             </SafeAreaView >
// //         </View >
// //     );
// // };

// // function App(navigation) {
// //     return (
// //         <NavigationContainer>
// //             <Stack.Navigator>
// //                 <Stack.Screen name="Home" component={Home} />
// //                 <Stack.Screen name="Profile" component={Profile} />
// //                 <Stack.Screen name="Settings" component={Settings} />
// //             </Stack.Navigator>
// //         </NavigationContainer>
// //     );
// // }

// // export default GeneralSetting;

// // const styles = StyleSheet.create({
// //     spaces: {
// //         margin: 20
// //     },
// //     centeredView: {
// //         // flex: 1,
// //         // justifyContent: "center",
// //         // alignItems: "center",
// //         // marginTop: 22
// //     },
// //     baseText: {
// //         // fontWeight: 'bold',
// //         fontSize: 12
// //     },
// //     baseTextH: {
// //         // fontWeight: 'bold',
// //         paddingBottom: 3,
// //         fontSize: 15
// //     },
// //     modalView: {
// //         margin: 20,
// //         backgroundColor: "white",
// //         borderRadius: 20,
// //         padding: 35,
// //         alignItems: "center",
// //         shadowColor: "#000",
// //         shadowOffset: {
// //             width: 2,
// //             height: 2
// //         },
// //         shadowOpacity: 0.25,
// //         shadowRadius: 4,
// //         elevation: 5
// //     },
// //     button: {
// //         borderRadius: 20,
// //         height: 50,
// //         width: 100,
// //         padding: 10,
// //         elevation: 2,
// //         // marginRight: 10,
// //         marginLeft: 10
// //     },
// //     button1: {
// //         borderRadius: 20,
// //         height: 50,
// //         width: 100,
// //         padding: 10,
// //         elevation: 2,
// //         marginBottom: 10,
// //         marginLeft: 10
// //     },
// //     buttonOpen: {
// //         backgroundColor: "#009387",
// //     },
// //     buttonClose: {
// //         backgroundColor: "#2196F3",
// //     },
// //     textStyle: {
// //         color: "white",
// //         // color: "#2f353d",
// //         fontWeight: "bold",
// //         textAlign: "center"
// //     },
// //     modalText: {
// //         marginBottom: 15,
// //         textAlign: "center"
// //     },
// //     buttonRow: {
// //         // height: 100,
// //         flexDirection: "row",
// //         marginTop: 50,
// //         marginLeft: 27,
// //         marginRight: 49
// //     },
// //     card: {
// //         // marginTop: 10,
// //         padding: 10,
// //         marginBottom: 10,
// //         marginRight: 5,
// //         marginLeft: 5,
// //         borderRadius: 20,
// //         // borderColor: '#696969',
// //         // backgroundColor: '#ccc',
// //         backgroundColor: '#3d3c3c',
// //         // borderBottomColor: '#ccc',
// //         borderBottomWidth: 0.15,
// //         // zIndex: 2,
// //     },
// //     cardboard: {
// //         marginBottom: 2,
// //         borderRadius: 20,
// //         // backgroundColor: '#2b2b2b',
// //         backgroundColor: '#4d4b4b',
// //     },
// //     cardthemOn: {
// //         flexDirection: "row",
// //         marginLeft: 10,
// //         marginBottom: 10,
// //         marginTop: 10,
// //         borderRadius: 8,
// //         // backgroundColor: '#606060',
// //         backgroundColor: '#4d4b4b',
// //         zIndex: 1,
// //         borderColor: '#949191',
// //         borderWidth: 1,
// //     },
// //     cardthemOff: {
// //         flexDirection: "row",
// //         marginLeft: 10,
// //         marginBottom: 10,
// //         marginTop: 10,
// //         borderRadius: 8,
// //         // backgroundColor: '#3d3c3c',
// //         backgroundColor: '#4d4b4b',
// //         zIndex: 1,
// //         borderColor: '#0f0d0d',
// //         borderWidth: 1,
// //     },
// //     boardtitle: {
// //         // paddingStart: 60,
// //         // paddingHorizontal: 10,
// //         // paddingVertical: 10,
// //         // text-Align: 'right',
// //         textAlign: 'right',
// //         marginLeft: 15,
// //         fontSize: 12,
// //         transform: [{ rotate: '270deg' }],
// //         color: '#252626',
// //     },
// //     boadbathroom: {
// //         // paddingStart: 12,
// //         paddingHorizontal: 10,
// //         // paddingLeft: 15,
// //         fontSize: 15,
// //         fontWeight: "bold",
// //         // transform: [{rotate: '270deg' }],
// //         color: '#2f0736',
// //     },
// //     title: {
// //         paddingLeft: 20,
// //         // fontSize: 25,
// //         // fontFamily: 'sans-serif',
// //         // fontWeight: '700',
// //         // color: '#000000',
// //         fontSize: 20,
// //         color: '#000000',
// //         fontWeight: "bold",
// //         // textAlign: "center"
// //     },
// //     titleButtonOn: {
// //         fontSize: 16,
// //         // color: "#2f353d",
// //         color: "#949191",
// //         fontWeight: "bold",
// //         textAlign: "center"
// //     },
// //     titleButtonOff: {
// //         fontSize: 16,
// //         // color: "#2f353d",
// //         color: "#282929",
// //         fontWeight: "bold",
// //         textAlign: "center"
// //     },
// //     textArea: {
// //         paddingTop: 10,
// //         paddingBottom: 10,
// //         paddingRight: 18,
// //         paddingLeft: 18,
// //         // flexDirection: "row"
// //     },
// //     icon: {
// //         paddingLeft: 5,
// //         paddingBottom: 5
// //         // margin: 5
// //     },
// //     rowicon: {
// //         flexDirection: "row"
// //     },
// //     footer: {
// //         flexDirection: "row",
// //         // justifyContent: 'space-between',
// //         // flexWrap: "wrap",
// //         // flex: 1,
// //         // alignContent: "flex-end",
// //         alignItems: "flex-start",
// //         // float: "right",
// //         backgroundColor: '#fff',
// //         borderTopLeftRadius: 30,
// //         borderBottomLeftRadius: 30,
// //         borderWidth: 2,
// //         height: 35,
// //         width: 80,

// //         // borderTopLeftRadius: 30,
// //         // borderTopRightRadius: 30,
// //         paddingHorizontal: 10,
// //         paddingVertical: 5
// //     },
// // });