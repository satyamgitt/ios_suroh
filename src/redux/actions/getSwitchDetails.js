/* eslint-disable prettier/prettier */
import { GET_SWITCHDETAILS, SUCCESS, FAIL } from '../action-types';

export const getSwitchdetails = (send) => dispatch => dispatch({
    type: GET_SWITCHDETAILS,
    payload: {
        request: {
            url: `http://52.66.113.96/i-switch/automation/mode_get_switches.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${GET_SWITCHDETAILS}_${SUCCESS}`,
                        payload: [...data],
                    });
                    console.log(send, 'redux send parameters getSwitchdetails');
                    //console.log(response.data, 'action');
                    return Promise.resolve(data);
                }
                dispatch({
                    type: `${GET_SWITCHDETAILS}_${error}`,
                    payload: data,
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${GET_SWITCHDETAILS}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${GET_SWITCHDETAILS}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})