/* eslint-disable prettier/prettier */
import { SCHEDULE_MODE, SUCCESS, FAIL } from '../../action-types';
import NetInfo from "@react-native-community/netinfo";

var ip_Add;
// NetInfo.addEventListener(state => {
//     console.log("Connection type in status details page", state.type);
//     console.log("Is connected?", state.isConnected);
//     if (state.type == 'wifi') {
//         ip_Add = '192.168.100.31';
//     } else {
//         ip_Add = '52.66.113.96';
//     }
// });
ip_Add = '52.66.113.96';

export const scheduleMode = (send) => dispatch => dispatch({
    type: SCHEDULE_MODE,
    payload: {
        request: {
            url: `http://${ip_Add}/i-switch/automation/Flat_details.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${SCHEDULE_MODE}_${SUCCESS}`,
                        payload: [...data],
                    });
                    console.log(send, 'redux');
                    console.log(response.data, 'action');
                    return Promise.resolve([...data]);
                }
                dispatch({
                    type: `${SCHEDULE_MODE}_${SUCCESS}`,
                    payload: [...data],
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${SCHEDULE_MODE}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${SCHEDULE_MODE}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})