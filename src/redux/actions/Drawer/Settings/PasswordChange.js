/* eslint-disable prettier/prettier */
// importing action
import { PASSWORDCHANGE, SUCCESS, FAIL } from '../../../action-types';

// action of action type
export const PasswordChange = (send) => dispatch => dispatch({
    type: PASSWORDCHANGE,
    
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
                        type: `${PASSWORDCHANGE}_${SUCCESS}`,
                        payload: [...data],
                    });
                    console.log(send, 'redux');
                    console.log(response.data, 'action');
                    return Promise.resolve(...data);
                }
                dispatch({
                    type: `${PASSWORDCHANGE}_${SUCCESS}`,
                    payload: data,
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${PASSWORDCHANGE}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${PASSWORDCHANGE}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})