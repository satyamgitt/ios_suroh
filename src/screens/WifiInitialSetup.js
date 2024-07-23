// /* eslint-disable prettier/prettier */
// import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import PropTypes, { array } from 'prop-types';
// import { View, Text, Button, StyleSheet, Dimensions, ScrollView, SafeAreaView, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native'; import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { NetworkInfo } from "react-native-network-info";
// import { homeStatus } from '../redux/actions/homeStatus';
// import { getSlno } from './AsyncStorage';


// const { width, height } = Dimensions.get('screen');
// const diognal = height / width;
// const size = diognal * 6.65




// var sl_no;
// const wait = (timeout) => {
//     return new Promise(resolve => setTimeout(resolve, timeout));
// }

// const WifiInitialScreen = ({ navigation, getStatus }) => {
//     const [loading, setLoading] = useState(false);
//     const [refreshing, setRefreshing] = React.useState(false);


//     const onRefresh = () => {
//         getData(sl_no)
//         setRefreshing(true);
//         setLoading(false)
//         wait(2000).then(() => setRefreshing(false));
//     };

//     useEffect(() => {
//         setTimeout(async () => {
//             setLoading(true);
//             sl_no = await getSlno();
//             getData(sl_no);
//         }, 1000);
//         return () => { };
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     const getData = (sl_no) => {
//         setLoading(true)
//         const send = [];
//         const no = { sl_no: sl_no };
//         send.push(no);
//         console.log(send);
//         console.log('log menu api');
//         getStatus(send)
//             .then(response => {
//                 setRefreshing(false);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     };

//     // Get Local IP
//     NetworkInfo.getIPAddress().then(ipAddress => {
//         console.log("ipaddress", ipAddress);
//     });

//     // Get IPv4 IP (priority: WiFi first, cellular second)
//     NetworkInfo.getIPV4Address().then(ipv4Address => {
//         console.log("ipv4addres", ipv4Address);
//     });

//     // Get Broadcast
//     NetworkInfo.getBroadcast().then(broadcast => {
//         console.log("broadcast", broadcast);
//     });

//     // Get SSID
//     NetworkInfo.getSSID().then(ssid => {
//         console.log("ssid", ssid);
//     });

//     // Get BSSID
//     NetworkInfo.getBSSID().then(bssid => {
//         console.log("bssid", bssid);
//     });

//     // Get Subnet
//     NetworkInfo.getSubnet().then(subnet => {
//         console.log("subnet", subnet);
//     });

//     // Get Default Gateway IP
//     NetworkInfo.getGatewayIPAddress().then(defaultGateway => {
//         console.log("default gateway", defaultGateway);
//     });

//     // Get frequency (supported only for Android)
//     NetworkInfo.getFrequency().then(frequency => {
//         console.log("frequency", frequency);
//     });


//     return (
//         <View><Text>gfuguifgewiuf</Text></View>
//     );
// };

// WifiInitialScreen.propTypes = {
//     getStatus: PropTypes.func,
//     live: PropTypes.instanceOf(Array)
// };

// WifiInitialScreen.defaultProps = {
//     getStatus: () => { },
//     live: []
// };

// const mapStateToProps = ({ getStatus: { live } }) => ({ live });
// const mapDispatchToProps = { getStatus: send => homeStatus(send) };

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
// )(WifiInitialScreen);

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingLeft: 9
//     },
// });


