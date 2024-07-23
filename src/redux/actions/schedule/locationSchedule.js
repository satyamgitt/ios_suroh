/* eslint-disable prettier/prettier */
import { SCHEDULE_LOCATION_LIST, SUCCESS, FAIL } from '../../action-types';

export const locationSchedule = (send) => dispatch => dispatch({
    type: SCHEDULE_LOCATION_LIST,
    payload: {
        request: {
            url: `http://52.66.113.96/i-switch/automation/switch_scheduled_dashboard.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
 
            onSuccess({ response }) {
                const { data, error, status } = response;
                // console.log("Scheduled Pade Response" , data);
                if (response) {
                    dispatch({
                        type: `${SCHEDULE_LOCATION_LIST}_${SUCCESS}`,
                        payload: [...data],
                    });
                    console.log(send, 'payload');
                    console.log("aAnand");
                    console.log(response.data, 'action');
                    return Promise.resolve([...data]);
                }
                dispatch({
                    type: `${SCHEDULE_LOCATION_LIST}_${SUCCESS}`,
                    payload: [...data],
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${SCHEDULE_LOCATION_LIST}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${SCHEDULE_LOCATION_LIST}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})