/* eslint-disable prettier/prettier */
import { GET_DETAILS, SUCCESS, FAIL } from '../action-types';
import { getipAddr } from '../../screens/AsyncStorage';
import NetInfo from "@react-native-community/netinfo";
import { getSlno, wificonfig } from '../../screens/AsyncStorage';


var ip_Add;


const getIpAddr = async () => {
    // const x = await getwifi();
    // console.log("reduxautogetwif", x);
    // ip_Add = x;
    const e = await wificonfig();
    ip_Add = e;
    // console.log("reduxautogetwif", e);
}
const getIpAddr2 = async () => {
    const x = await getIpAddr();
}

getIpAddr2();

export const flatDetails = (send) => dispatch => dispatch({
    type: GET_DETAILS,
    payload: {
        request: {
            url: `http://52.66.113.96/i-switch/automation/Flat_details.php`,


            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${GET_DETAILS}_${SUCCESS}`,
                        payload: [...data],
                    });
                    // console.log(send, 'lacation details contains in redux send');
                    // console.log(ip_Add, 'ip addr in redux flat details');
                    // console.log(response.data, 'action');

                    return Promise.resolve([...data]);
                }
                dispatch({
                    type: `${GET_DETAILS}_${SUCCESS}`,
                    payload: [...data],
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${GET_DETAILS}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${GET_DETAILS}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})