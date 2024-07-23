/* eslint-disable prettier/prettier */
import { GET_HARDMANUAL, SUCCESS, FAIL } from '../action-types';

export const enab_disHardManual = (send) => dispatch => 


dispatch({
    type: GET_HARDMANUAL,
    payload: {
        request: {
            url: `http://${send[0]['ip_Add']}/i-switch/automation/hard_manual.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${GET_HARDMANUAL}_${SUCCESS}`,
                        payload: data,
                    });
                    // console.log(s 
                    return Promise.resolve(data);
                }
                dispatch({
                    type: `${GET_HARDMANUAL}_${SUCCESS}`,
                    payload: data,
                });
                return Promise.reject({ response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${GET_HARDMANUAL}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${GET_HARDMANUAL}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})