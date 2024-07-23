/* eslint-disable prettier/prettier */
import { SET_PREESET, SUCCESS, FAIL } from '../action-types';

export const setPreeset = (send) => dispatch => dispatch({
    type: SET_PREESET,
    payload: {
        request: {
            url: `http://52.66.113.96/i-switch/automation/presets_adding.php`,
            // url: `http://52.66.113.96/i-switch/automation/update_socketname.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${SET_PREESET}_${SUCCESS}`,
                        payload: [...data],
                    });
                    // console.log(send, 'setPreeset _redux');
                    // console.log(response.data, 'setPreeset_action');
                    return Promise.resolve(data);
                }
                dispatch({
                    type: `${SET_PREESET}_${SUCCESS}`,
                    payload: [...data],
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${SET_PREESET}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${SET_PREESET}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})