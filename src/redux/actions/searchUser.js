/* eslint-disable prettier/prettier */
import { SEARCH_USER, SUCCESS, FAIL } from '../action-types';

export const searchUser = (send) => dispatch => dispatch({
    type: SEARCH_USER,
    payload: {
        request: {
            url: `http://52.66.113.96/i-switch/automation/user_validation.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${SEARCH_USER}_${SUCCESS}`,
                        payload: data,
                    });
                    // console.log(send, 'searchUser_redux');
                    // console.log(response.data, 'searchUser_action');
                    return Promise.resolve(data);
                }
                dispatch({
                    type: `${SEARCH_USER}_${SUCCESS}`,
                    payload: data,
                });
                return Promise.reject({ response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${SEARCH_USER}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${SEARCH_USER}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})