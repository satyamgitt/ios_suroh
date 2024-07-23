/* eslint-disable prettier/prettier */
import { GET_AMPWAT, SUCCESS, FAIL } from '../action-types';

export const amps_watts = (send) => dispatch => dispatch({
    type: GET_AMPWAT,
    payload: {
        request: {
            url: `http://52.66.113.96/i-switch/automation/current_sensor_get_watts_amp.php`,
            method: 'POST',
            data: [...send],
        },
        
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${GET_AMPWAT}_${SUCCESS}`,
                        payload: [...data],
                    });
                    // console.log(send, 'redux');
                    // console.log(response.data, 'action amps');
                    return Promise.resolve([...data]);
                }
                dispatch({
                    type: `${GET_AMPWAT}_${SUCCESS}`,
                    payload: [...data],
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${GET_AMPWAT}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${GET_AMPWAT}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})