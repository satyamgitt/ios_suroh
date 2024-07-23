/* eslint-disable prettier/prettier */
import { GET_CHANGESTATUS, SUCCESS, FAIL } from '../action-types';
import getwifi from "../../config/ip_address"
import { getSlno, wificonfig } from '../../screens/AsyncStorage';

export const changeStatus = (send) => dispatch => 



dispatch({


    type: GET_CHANGESTATUS,
    payload: {
        request: {
            
            url: `http://${send[0]['ip']}/i-switch/automation/switch_status_v2.php`,
            // url: `http://192.168.1.9/i-switch/automation/switch_status_v2.php`,
            // url: `http://52.66.113.96/i-switch/automation/switch_status_v2.php`,


            method: 'POST',
            data: [...send],
        },
        
        
        options: {
            onSuccess({ response }) {
                // console.log("34 for changing status of switch getting id and status" , response.data , "after change status timestamp" , Date.now())

                const { data, error, status } = response;
               
                if (response) {
                    dispatch({
                        type: `${GET_CHANGESTATUS}_${SUCCESS}`,
                        payload: data,
                    });
                    return Promise.resolve(data);
                } else {
                    dispatch({
                        type: `${GET_CHANGESTATUS}_${FAIL}`,
                        payload: error,
                    });
                    return Promise.reject({ ...response });
                }

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${GET_CHANGESTATUS}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${GET_CHANGESTATUS}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})
