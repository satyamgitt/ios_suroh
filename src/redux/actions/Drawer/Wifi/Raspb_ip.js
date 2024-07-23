/* eslint-disable prettier/prettier */
import { RASPBER_PI, SUCCESS, FAIL } from '../../../action-types';

// action for the action type
export const Raspb_ip = (send) => dispatch => dispatch({
    type: RASPBER_PI,
    payload: {
        request: {
            url: `http://52.66.113.96/i-switch/automation/dashboardAllRoomInfo.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${RASPBER_PI}_${SUCCESS}`,
                        payload: [...data],
                    });
                    console.log(send, 'redux');
                    console.log(response.data, 'action');
                    return Promise.resolve([...data]);
                }
                dispatch({
                    type: `${RASPBER_PI}_${SUCCESS}`,
                    payload: [...data],
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${RASPBER_PI}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${RASPBER_PI}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})