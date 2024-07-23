/* eslint-disable prettier/prettier */
import { SET_SWITCHSTATUS, SUCCESS, FAIL } from '../action-types';

export const switchStatusUpdate = (send) => dispatch => dispatch({
    type: SET_SWITCHSTATUS,
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
                        type: `${SET_SWITCHSTATUS}_${SUCCESS}`,
                        payload: [data],
                    });
                    // console.log("switch status redux", data);
                    // console.log("send data in redux", JSON.stringify(send));
                    return Promise.resolve(data);
                }
                dispatch({
                    type: `${SET_SWITCHSTATUS}_${SUCCESS}`,
                    payload: [data],
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${SET_SWITCHSTATUS}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${SET_SWITCHSTATUS}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})