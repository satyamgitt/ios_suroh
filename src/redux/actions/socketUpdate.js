/* eslint-disable prettier/prettier */
import { UPDATE_SOCKET, SUCCESS, FAIL } from '../action-types';

export const socketUpdate = (send) => dispatch => dispatch({
    type: UPDATE_SOCKET,
    payload: {
        request: {
            url: `http://52.66.113.96/i-switch/automation/update_socketname.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${UPDATE_SOCKET}_${SUCCESS}`,
                        payload: [...data],
                    });
                    // console.log(send, 'socketUpdate_redux');
                    // console.log(response.data, 'socketUpdate_action');
                    return Promise.resolve(data);
                }
                dispatch({
                    type: `${UPDATE_SOCKET}_${SUCCESS}`,
                    payload: [...data],
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${UPDATE_SOCKET}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${UPDATE_SOCKET}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})