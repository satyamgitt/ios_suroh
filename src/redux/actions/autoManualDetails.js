/* eslint-disable prettier/prettier */
import { GET_AUTOMANUALSTATUS, SUCCESS, FAIL } from '../action-types';
import NetInfo from "@react-native-community/netinfo";
import { getSlno, wificonfig } from '../../screens/AsyncStorage';
// import getwifi from "../../config/ip_address"

export const autoManualDetails = (send) => dispatch =>



 dispatch({

    type: GET_AUTOMANUALSTATUS,
    payload: {
        request: {
            // url: `http://52.66.113.96/i-switch/automation/Flat_details.php`,
            // url: `http://192.168.1.22/i-switch/automation/Flat_details.php `,
            url: `http://${send[0]['ip_Add']}/i-switch/automation/Flat_details.php`,
            // url: `http://${send[0]['192.168.17.234']}/i-switch/automation/Flat_details.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                // console.log("automanualDetail response Mahesh Dalleey" , response);
                const { data, error, status } = response;
                
                if (response) {
                    // USING "DISPATCH" WE ARE SENDING DATA TO REDUCERS AS A "PAYLOAD"
                    dispatch({
                        type: `${GET_AUTOMANUALSTATUS}_${SUCCESS}`,
                        payload: [...data],
                        
                    });
                    // console.log(send, 'redux', ip_Add);
                    // console.log( 'Flat details' , JSON.stringify(response.data));
                    return Promise.resolve([...data]);
                }
                dispatch({
                    type: `${GET_AUTOMANUALSTATUS}_${SUCCESS}`,
                    payload: [...data],
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                // console.log(response, onError);
                // console.log("exception" , exception)
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${GET_AUTOMANUALSTATUS}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${GET_AUTOMANUALSTATUS}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})
















// var ip_Add;
// ip_Add = require("../../config/ip_address")


// const getwifi = async () => {
//     const e = await wificonfig();

//     ip_Add = e;
//     NetInfo.addEventListener(state => {
//         console.log("Connection type in flat details page this is from ip address", state.type);
//         console.log("Is connected?", state.isConnected);
//         if (state.type == 'wifi' && e != "") {
//             ip_Add = e;
//         } else {
//             ip_Add = '52.66.113.96';
//         }
//     });
// }



// const getIpAddr = async () => {
//     // const x = await getwifi();
//     // console.log("reduxautogetwif", x);
//     // ip_Add = x;
//     const e = await wificonfig();
//     ip_Add = e;
//     console.log("reduxautogetwif", e);
// }
// const getIpAddr2 = async () => {
//     const x = await getIpAddr();
// }

// getIpAddr2();

// [{"sl_no":40,"ip_add":"52.66.113.96"}]
// send =[{"sl_no":40,"ip_Add":"192.168.1.43"}]




