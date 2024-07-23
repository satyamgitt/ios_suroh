/* eslint-disable prettier/prettier */
import {SAFTEY_ALERT, SUCCESS, FAIL } from '../action-types';

export const getFireData = (send) => dispatch => dispatch({
    type: SAFTEY_ALERT,
    payload: {
        request: {
            url: `http://52.66.113.96/i-switch/automation/mode/room_mode.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${SAFTEY_ALERT}_${SUCCESS}`,
                        payload: [...data],
                    });
                    console.log(send, 'default mode payload');
                    console.log(response.data, 'default mode response');
                    return Promise.resolve([...data]);
                }
                dispatch({
                    type: `${SAFTEY_ALERT}_${SUCCESS}`,
                    payload: [...data],
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${SAFTEY_ALERT}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${SAFTEY_ALERT}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})


