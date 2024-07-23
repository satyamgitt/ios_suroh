/* eslint-disable prettier/prettier */
import { GET_PIRSTATUS, SUCCESS, FAIL } from '../action-types';

export const getpirStatus = (send) => dispatch => dispatch({
    type: GET_PIRSTATUS,
    payload: {
        request: {
            // url: `http://52.66.113.96/i-switch/automation/mode/get_automode_status.php`,
            url: `http://${send[0]['ip']}/i-switch/automation/mode/get_automode_status.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${GET_PIRSTATUS}_${SUCCESS}`,
                        payload: [...data],
                    });
                    // console.log(send, 'getpirStatus_redux');
                    // console.log(response.data, 'get_automode_statusPIR');
                    return Promise.resolve([...data]);
                }
                dispatch({
                    type: `${GET_PIRSTATUS}_${SUCCESS}`,
                    payload: [...data],
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${GET_PIRSTATUS}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${GET_PIRSTATUS}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})