/* eslint-disable prettier/prettier */
import { SCHEDULE_LOCATION_TIME, SUCCESS, FAIL } from '../../action-types';

export const scheduleTime = (send) => dispatch => dispatch(

    {
        type: SCHEDULE_LOCATION_TIME,
        payload: {
            request: {
                url: `http://52.66.113.96/i-switch/automation/switch_scheduling_status.php`,
                method: 'POST',
                data: [...send],
            },
            options: {
                onSuccess({ response }) {
                    const { data, error, status } = response;
                    // console.log("17" , data);
                    if (response) {
                        dispatch({
                            type: `${SCHEDULE_LOCATION_TIME}_${SUCCESS}`,
                            payload: data,
                        });
                        // console.log(send, 'redux');
                        // console.log(JSON.stringify(response.data), 'action');
                        return Promise.resolve(data);
                    }
                    dispatch({
                        type: `${SCHEDULE_LOCATION_TIME}_${SUCCESS}`,
                        payload: data,
                    });
                    return Promise.reject({ response });

                },
                onError(exception) {
                    // console.log(response, onError);
                    if (exception.error.isAxiosError) {
                        const { response: { data: dataError }, } = exception.error;
                        dispatch({
                            type: `${SCHEDULE_LOCATION_TIME}_${FAIL}`,
                            payload: { dataError }
                        });
                        return Promise.reject(dataError);
                    }
                    dispatch({
                        type: `${SCHEDULE_LOCATION_TIME}_${FAIL}`,
                        payload: {}
                    });
                    return Promise.reject();
                },
            },

        },
    }

)