/* eslint-disable prettier/prettier */
import { GET_STATUS, SUCCESS, FAIL } from '../action-types';


//api response sending to GET_STATUS action creating homeStatus component
//'send' contains only 'sl_no:34' information
export const homeStatus = (send) => dispatch => dispatch({

    //if called GET_STATUS now it will be sending
    type: GET_STATUS,
    payload: {
        request: {
            url: `http://${send[0]['ip']}/i-switch/automation/dashboardAllRoomInfo.php`,
            //url: `http://192.168.100.13/i-switch/dashboardAllRoomInfo.php`,
            method: 'POST',
            data: [send[0]]
            //in this api we are reciving homeStatus data by posting user 'sl_no' via send argument
        },
        options: {
            onSuccess({ response }) {

                const { data, error, status } = response;
                if (response) {
                    dispatch({

                        type: `${GET_STATUS}_${SUCCESS}`,
                        payload: [...data],
                    });
                    // console.log('hi', `${send[0]['ip']}`, 'home_Status send data');
                    // console.log(response.data, 'action homeStatus');
                    return Promise.resolve([...data]);
                }
                dispatch({
                    type: `${GET_STATUS}_${SUCCESS}`,
                    payload: [...data],
                });
                // console.log('hi3');
                return Promise.reject({ ...response });

            },
            onError(exception) {
                console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${GET_STATUS}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${GET_STATUS}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})