/* eslint-disable prettier/prettier */
import { SCHEDULE_LOCATION_CHANGE, SUCCESS, FAIL } from '../../action-types';

export const scheduleChange = (send) => dispatch => dispatch({
    type: SCHEDULE_LOCATION_CHANGE,
    payload: {
        request: {
            url: `http://52.66.113.96/i-switch/automation/switch_schedule_activate_or_deactivate.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${SCHEDULE_LOCATION_CHANGE}_${SUCCESS}`,
                        payload: data,
                    });
                    console.log(send, 'redux');
                    console.log(response.data, 'action');
                    return Promise.resolve(data);
                }
                dispatch({
                    type: `${SCHEDULE_LOCATION_CHANGE}_${SUCCESS}`,
                    payload: data,
                });
                return Promise.reject({ response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${SCHEDULE_LOCATION_CHANGE}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${SCHEDULE_LOCATION_CHANGE}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})