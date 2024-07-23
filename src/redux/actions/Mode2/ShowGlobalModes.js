/* eslint-disable prettier/prettier */

import { GET_G_MODEDELAILS , SUCCESS , FAIL } from '../../action-types';

export const ShowGlobalModes = (send) => dispatch => dispatch({
    type: GET_G_MODEDELAILS,
    payload: {
        request: {
            url: `http://${send[0]['ip_Add']}/i-switch/automation/mode/mode_get.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${GET_G_MODEDELAILS}_${SUCCESS}`,
                        payload: [...data],
                    });
                    // console.log(send, 'pyload Sent for getting Modes');
                    // console.log(response.data, 'All Saved Modes');
                    return Promise.resolve([...data]);
                }
                dispatch({
                    type: `${GET_G_MODEDELAILS}_${SUCCESS}`,
                    payload: data,
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${GET_G_MODEDELAILS}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${GET_G_MODEDELAILS}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})