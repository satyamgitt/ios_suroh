/* eslint-disable prettier/prettier */
import { MODIFY_SCHEDULE_LOCATION, SUCCESS, FAIL } from '../../action-types';

export const modifySchedule = (send) => dispatch => dispatch({
    type: MODIFY_SCHEDULE_LOCATION,
    payload: {
        request: {
            url: `http://52.66.113.96/i-switch/automation/switch_scheduling.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${MODIFY_SCHEDULE_LOCATION}_${SUCCESS}`,
                        payload: data,
                    });
                    // console.log(JSON.stringify(send), 'redux send switch parameters');
                    // console.log(response.data, 'recived redux response'); 
                    return Promise.resolve(data);
                }
                dispatch({
                    type: `${MODIFY_SCHEDULE_LOCATION}_${SUCCESS}`,
                    payload: data,
                });
                return Promise.reject({ response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${MODIFY_SCHEDULE_LOCATION}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${MODIFY_SCHEDULE_LOCATION}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})