/* eslint-disable prettier/prettier */
import { SET_PIRSTATUS, SUCCESS, FAIL } from '../action-types';

export const setpirStatus = (send) => dispatch =>



dispatch({
    type: SET_PIRSTATUS,
    payload: {
        request: {
            // url: `http://52.66.113.96/i-switch/automation/mode/set_auto_mode_status_v3.php`,
            url: `http://${send[0]['ip']}/i-switch/automation/mode/set_auto_mode_status_v3.php`,
            // url: `http://${send[0]['ip']}/i-switch/set_automode_state.php`,
            // url: `http://52.66.113.96/i-switch/automation/set_automode_state.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${SET_PIRSTATUS}_${SUCCESS}`,
                        payload: [...data],
                    });
                    // console.log(send, 'redux');
                    // console.log(response.data, 'set_auto_mode_status_v3');
                    return Promise.resolve([...data]);
                }
                dispatch({
                    type: `${SET_PIRSTATUS}_${SUCCESS}`,
                    payload: [...data],
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${SET_PIRSTATUS}_${FAIL}`,
                        payload: { dataError }
                    });

                    console.log("Error: in location enable/disable" + dataError);
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${SET_PIRSTATUS}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})