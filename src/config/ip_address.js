import NetInfo from "@react-native-community/netinfo";
import { getSlno, wificonfig } from '../screens/AsyncStorage';
import axios from "axios";
// import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from "redux-logger";
// import DeviceInfo from "react-native-device-info";



var ip_Add;
var rspi_ipIncaseOf_noInternet_inWifi;
const getwifi = async () => {
    // console.log("config folder called")
    sl_no = await getSlno();
    NetInfo.fetch().then(state => {
        // console.log("state" , state);
        console.log("Wifi connected " , state.isWifiEnabled);
        // console.log("internet with wifi ", state.isInternetReachable);
        // console.log("Any network Connection is there", state.isConnected);
    });


    NetInfo.fetch().then(state => {
       

        if (state.type == 'wifi' && state.isInternetReachable === true) {

            // console.log("wiffffffiffififif + Internettttttttttttt");

            const no = [{ "sl_no": sl_no }];
          
            axios.post("http://52.66.113.96/i-switch/automation/get_local_ip.php", no)
                .then(res => {
                   
                    const result = res.data[0];
                  
                    const ip = result.ip_address;
              
                    console.log('if wifi with Internet there then IP', ip);
                    if (ip != null) {
                      
                      console.log("madharchod IP" , ip);
                      
                        axios.post(`http://${ip}/i-switch/automation/pingAPI.php`, no)
                            .then(response => {
                                
                                console.log("res ip" , response.data);
                                if (response.data == '1') {
                                    console.log("madharchod 2IP" , ip);
                                    AsyncStorage.setItem('wifiip', ip)
                                    ip_Add = ip;
                                }
                            })
                            .catch(err => {
                                AsyncStorage.setItem('wifiip', '52.66.113.96')
                                // alert("Please Restart Wifi And GateWay Device" )
                                // AsyncStorage.setItem('wifiip', rspi_ipIncaseOf_noInternet_inWifi)
                            })
                    }
                   

                })

        } else if (state.type == 'cellular') {

            console.log("cellurrrrrrrrrrrrrrrrrrrr");
            AsyncStorage.setItem('wifiip', '52.66.113.96')
            ip_Add = '52.66.113.96';

            const no = [{ "sl_no": sl_no }];
            // console.log("ip_addres file , config sl_no", no);
            axios.post("http://52.66.113.96/i-switch/automation/get_local_ip.php", no)
                .then(res => {
                   
                    const result = res.data[0];
                    
              
                    rspi_ipIncaseOf_noInternet_inWifi = result.ip_address;
                    // AsyncStorage.setItem('wifiip', rspi_ipIncaseOf_noInternet_inWifi)
                    // ip_Add = rspi_ipIncaseOf_noInternet_inWifi;
                  
                  console.log("previous Ip OF RASPI in cellular Case" , rspi_ipIncaseOf_noInternet_inWifi);

                })

        } else if(state.type == 'wifi' && state.isInternetReachable !== true){
            console.log("satyam Case" , rspi_ipIncaseOf_noInternet_inWifi)
            // const no = [{ "sl_no": sl_no }];
            AsyncStorage.setItem('wifiip', rspi_ipIncaseOf_noInternet_inWifi)
            ip_Add = rspi_ipIncaseOf_noInternet_inWifi;

            // if (rspi_ipIncaseOf_noInternet_inWifi != null) {
                      
            //     console.log("fffff" , rspi_ipIncaseOf_noInternet_inWifi);
              
            //     axios.post(`http://${rspi_ipIncaseOf_noInternet_inWifi}/i-switch/automation/pingAPI.php`, no)
            //         .then(response => {
                        
            //             // console.log("res ip" , response.data);
            //             if (response.data == '1') {

            //                 AsyncStorage.setItem('wifiip', rspi_ipIncaseOf_noInternet_inWifi)
            //                 ip_Add = rspi_ipIncaseOf_noInternet_inWifi;
            //             }
            //         })
            //         .catch(err => {
            //            alert("Please Connect With Internet Once" )
            //             // AsyncStorage.setItem('wifiip', '52.66.113.96')
            //             // AsyncStorage.setItem('wifiip', rspi_ipIncaseOf_noInternet_inWifi)
            //         })
            // }
        }

    });

    // hid(k);r
    return ip_Add;

    // console.log("main ip" ,ip_Add );
}


export default getwifi;


















































// const getwifi = async ()=>{
// try {
//     const ips = await DeviceInfo.getIpAddress()
//     console.log("fetched Ip Adress" , ips);
// } catch (error) {
//     console.error("error in fetching in ipAdress" , error)
// }
// }

// getwifi()


// axios.post(`http://${ip}/i-switch/automation/pingAPI.php`, no)
//         .then(response => {
//             if (response.data == '1') {
//                 console.log("configpingresponse", response.data);
//                 AsyncStorage.setItem('wifiip', result.ip_address)
//                 ip_Add = ip;
//             }
//         }).catch(err => {
//             console.log("ping");
//             AsyncStorage.setItem('wifiip', '52.66.113.96')
//         })
// const setAsyncstore = async (ip, sl_no) => {
//     try {
//         console.log("set async ip", ip);
//         var x = [{ "sl_no": "40" }];
//         const response = axios.post(`http://${ip}/i-switch/automation/pingAPI.php`, x);

//         if (response.data == '1') {
//             console.log("configpingresponse", response.data);
//             AsyncStorage.setItem('wifiip', result.ip_address)
//             ip_Add = ip;
//         }
//     }
//     catch
//     {
//         console.log("configping error");
//         AsyncStorage.setItem('wifiip', '52.66.113.96')
//     }

//     // }).catch(err => {
//     //     console.log("ping");
//     //     AsyncStorage.setItem('wifiip', '52.66.113.96')
//     // })
// }
// module.export = getwifi;














  // console.log('rspi_ipIncaseOf_noInternet_inWifi', rspi_ipIncaseOf_noInternet_inWifi);
                    // if (res.data != null) {
                    //     // console.log("ip_addres file,configpingpayload_SL_nob", no, "getwayIP = ", ip);
                    //     // setAsyncstore(ip, no);
                    //     axios.post(`http://${ip}/i-switch/automation/pingAPI.php`, no)
                    //         .then(response => {
                    //             // console.log("ip_addres file, config ping response check", response.data);
                    //             if (response.data == '1') {

                    //                 AsyncStorage.setItem('wifiip', result.ip_address)
                    //                 ip_Add = ip;
                    //             }
                    //         })
                    //         .catch(err => {
                    //             // console.log("ping catch error", err);
                    //             AsyncStorage.setItem('wifiip', '52.66.113.96')
                    //         })
                    // }
                    
                    // else {
                    //     // console.log("false in ping");
                    //     AsyncStorage.setItem('wifiip', '52.66.113.96')
                    // }