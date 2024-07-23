/* eslint-disable prettier/prettier */
import { GET_SWITCHSTATUS, SUCCESS, FAIL } from '../action-types';

export const changeAutomanualStatus = (send) => dispatch => dispatch({
    type: GET_SWITCHSTATUS,
    payload: {
        request: {
            url: `http://52.66.113.96/i-switch/automation/mode_scheduling_v2.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${GET_SWITCHSTATUS}_${SUCCESS}`,
                        payload: [...data],
                    });
                    console.log(send, 'redux _ changeAutomanualStatus');
                    console.log(response.data, 'action _ changeAutomanualStatus');
                    return Promise.resolve([...data]);
                }
                dispatch({
                    type: `${GET_SWITCHSTATUS}_${SUCCESS}`,
                    payload: [...data],
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${GET_SWITCHSTATUS}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${GET_SWITCHSTATUS}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})