/* eslint-disable prettier/prettier */
import { GET_MODESWITCHS, SUCCESS, FAIL } from '../../action-types';

export const modeswitchs = (send) => dispatch => dispatch({
    type: GET_MODESWITCHS,
    payload: {
        request: {
            url: `http://52.66.113.96/i-switch/automation/configure_mode.php`,
            method: 'POST',
            data: [...send],

        },

        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${GET_MODESWITCHS}_${SUCCESS}`,
                        payload: [...data],
                    });
                    console.log(send, 'redux');
                    console.log(response.data, 'action');
                    return Promise.resolve([...data]);
                }
                dispatch({
                    type: `${GET_MODESWITCHS}_${SUCCESS}`,
                    payload: [...data],
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${GET_MODESWITCHS}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${GET_MODESWITCHS}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})