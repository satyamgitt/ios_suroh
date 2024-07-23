/* eslint-disable prettier/prettier */
import { ADD_SCHEDULE_LOCATION, SUCCESS, FAIL } from '../../action-types';

export const scheduleAdd = (send) => dispatch => dispatch({
    type: ADD_SCHEDULE_LOCATION,
    payload: {
        request: {
            url: `http://52.66.113.96/i-switch/automation/mode_set_time.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                console.log("add scedule redux send data", send);
                console.log("add scedule redux response data", data);
                if (response) {
                    dispatch({
                        type: `${ADD_SCHEDULE_LOCATION}_${SUCCESS}`,
                        payload: data,
                    });
                    console.log(send, 'redux');
                    console.log(response.data, 'action');
                    return Promise.resolve(data);
                }
                dispatch({
                    type: `${ADD_SCHEDULE_LOCATION}_${SUCCESS}`,
                    payload: data,
                });
                return Promise.reject({ response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${ADD_SCHEDULE_LOCATION}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${ADD_SCHEDULE_LOCATION}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})