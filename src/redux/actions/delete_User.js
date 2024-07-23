/* eslint-disable prettier/prettier */
import { DELETE_USER, SUCCESS, FAIL } from '../action-types';

export const delete_User = (send) => dispatch => dispatch({
    type: DELETE_USER,
    payload: {
        request: {
            url: `http://52.66.113.96/i-switch/automation/delete_user.php?`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${DELETE_USER}_${SUCCESS}`,
                        payload: data,
                    });
                    // console.log(s 
                    return Promise.resolve(data);
                }
                dispatch({
                    type: `${DELETE_USER}_${SUCCESS}`,
                    payload: data,
                });
                return Promise.reject({ response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${DELETE_USER}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${DELETE_USER}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})