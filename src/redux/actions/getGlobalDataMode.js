
/* eslint-disable prettier/prettier */
import {GET_GLOBAL_MODE, SUCCESS, FAIL } from '../action-types';

export const getGlobalDataMode = (send) => dispatch => 



dispatch({


    type: GET_GLOBAL_MODE,
    payload: {
        request: {
            url: `http://52.66.113.96/i-switch/automation/mode/global_mode.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${GET_GLOBAL_MODE}_${SUCCESS}`,
                        payload: [...data],
                    });
                    console.log(send, 'Global mode payload');
                    console.log(response.data, 'Global mode response');
                    return Promise.resolve([...data]);
                }
                dispatch({
                    type: `${GET_GLOBAL_MODE}_${SUCCESS}`,
                    payload: [...data],
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                // console.log("33" , response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${GET_GLOBAL_MODE}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${GET_GLOBAL_MODE}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})






