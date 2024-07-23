/* eslint-disable prettier/prettier */
import { GET_USER, SUCCESS, FAIL } from '../action-types';

export const Users = (send) => dispatch => dispatch({
    type: GET_USER,
    payload: {
        request: {
            url: `http://52.66.113.96/i-switch/automation/users_of_flat.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${GET_USER}_${SUCCESS}`,
                        payload: data,
                    });
                    // console.log(send, 'Users _ redux');
                    // console.log(response.data, 'Users _action');
                    return Promise.resolve(data);
                }
                dispatch({
                    type: `${GET_USER}_${SUCCESS}`,
                    payload: data,
                });
                return Promise.reject({ response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${GET_USER}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${GET_USER}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})