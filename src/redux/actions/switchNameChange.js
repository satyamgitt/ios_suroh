/* eslint-disable prettier/prettier */
import { SUCCESS, FAIL, CHANGE_SWITCHNAME } from '../action-types';

export const switchNameChange = (send) => dispatch => dispatch({
    type: CHANGE_SWITCHNAME,
    payload: {
        request: {
            // url: `http://52.66.113.96/i-switch/automation/mode_scheduling_v2.php`,
            url: `http://52.66.113.96/i-switch/automation/name_changing.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${CHANGE_SWITCHNAME}_${SUCCESS}`,
                        payload: [data],
                    });
                    // console.log("switch status redux", data);
                    // console.log("send data in redux", JSON.stringify(send));
                    return Promise.resolve(data);
                }
                dispatch({
                    type: `${CHANGE_SWITCHNAME}_${SUCCESS}`,
                    payload: [data],
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${CHANGE_SWITCHNAME}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${CHANGE_SWITCHNAME}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})