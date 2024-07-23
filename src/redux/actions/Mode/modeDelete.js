/* eslint-disable prettier/prettier */
import { DELETE_MODE, SUCCESS, FAIL } from '../../action-types';

export const modeDelete = (send) => dispatch => dispatch({
    type: DELETE_MODE,
    payload: {
        request: {
            url: `http://52.66.113.96/i-switch/automation/delete_mode.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${DELETE_MODE}_${SUCCESS}`,
                        payload: data,
                    });
                    console.log(send, 'redux');
                    console.log(response.data, 'action');
                    return Promise.resolve(data);
                }
                dispatch({
                    type: `${DELETE_MODE}_${SUCCESS}`,
                    payload: data,
                });
                return Promise.reject({ response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${DELETE_MODE}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${DELETE_MODE}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})