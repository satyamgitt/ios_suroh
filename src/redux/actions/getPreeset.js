/* eslint-disable prettier/prettier */
import { GET_PREESET, SUCCESS, FAIL } from '../action-types';

export const getPreeset = (send) => dispatch => dispatch({
    type: GET_PREESET,
    payload: {
        request: {
            url: `http://52.66.113.96/i-switch/automation/automode_Flat_details.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${GET_PREESET}_${SUCCESS}`,
                        payload: [...data],
                    });
                    // console.log(send, 'getPreeset_redux');
                    // console.log(response.data, 'getPreeset_action');
                    return Promise.resolve([...data]);
                }
                dispatch({
                    type: `${GET_PREESET}_${SUCCESS}`,
                    payload: [...data],
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${GET_PREESET}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${GET_PREESET}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})