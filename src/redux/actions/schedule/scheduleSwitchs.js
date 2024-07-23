/* eslint-disable prettier/prettier */
import { SCHEDULE_LOCATION_SWITCHS, SUCCESS, FAIL } from '../../action-types';

export const scheduleSwitchs = (send) => dispatch => dispatch({
    type: SCHEDULE_LOCATION_SWITCHS,
    payload: {
        request: {
            url: `http://52.66.113.96/i-switch/automation/switch_schedule_configuration.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${SCHEDULE_LOCATION_SWITCHS}_${SUCCESS}`,
                        payload: data,
                    });
                    // console.log("SCHEDULE_LOCATION" , JSON.stringify(data));
                    return Promise.resolve(data);
                }
                dispatch({
                    type: `${SCHEDULE_LOCATION_SWITCHS}_${SUCCESS}`,
                    payload: data,
                });
                return Promise.reject({ response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${SCHEDULE_LOCATION_SWITCHS}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${SCHEDULE_LOCATION_SWITCHS}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})