/* eslint-disable prettier/prettier */
import { LOCK_USER, SUCCESS, FAIL } from '../action-types';

export const lock_User = (send) => dispatch => dispatch({
    type: LOCK_USER,
    payload: {
        request: {
            url: `http://52.66.113.96/i-switch/automation/user_status.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${LOCK_USER}_${SUCCESS}`,
                        payload: data,
                    });
                    // console.log(send, 'lock_User redux');
                    // console.log(response.data, 'lock_User action');
                    return Promise.resolve(data);
                }
                dispatch({
                    type: `${LOCK_USER}_${SUCCESS}`,
                    payload: data,
                });
                return Promise.reject({ response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${LOCK_USER}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${LOCK_USER}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})