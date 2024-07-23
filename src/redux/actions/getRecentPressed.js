/* eslint-disable prettier/prettier */
import { GET_RECENTSWITCHS, SUCCESS, FAIL } from '../action-types';

export const getRecentPressed = (send) => dispatch => dispatch({
    type: GET_RECENTSWITCHS,
    payload: {
        request: {
            url: `http://52.66.113.96/i-switch/automation/recently_operated_switches.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${GET_RECENTSWITCHS}_${SUCCESS}`,
                        payload: [...data],
                    });
                    // console.log(send, 'getRecentPressed_redux');
                    // console.log(response.data, 'getRecentPressed_action');
                    return Promise.resolve([...data]);
                }
                dispatch({
                    type: `${GET_RECENTSWITCHS}_${SUCCESS}`,
                    payload: [...data],
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${GET_RECENTSWITCHS}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${GET_RECENTSWITCHS}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})