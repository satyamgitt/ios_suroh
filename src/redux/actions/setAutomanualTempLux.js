/* eslint-disable prettier/prettier */
import { SET_AUTOMANUALTEMP, SUCCESS, FAIL } from '../action-types';

export const setAutomanulTempLux = (send) => dispatch => 



dispatch({

    
    type: SET_AUTOMANUALTEMP,
    payload: {
        request: {
            // url: `http://52.66.113.96/i-switch/automation/update_temp_lumn_threshold.php`,
            url: `http://${send[0]['ip']}/i-switch/automation/update_temp_lumn_threshold.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${SET_AUTOMANUALTEMP}_${SUCCESS}`,
                        payload: [data],
                    });
                    return Promise.resolve([data]);
                }
                dispatch({
                    type: `${SET_AUTOMANUALTEMP}_${SUCCESS}`,
                    payload: [data],
                });
                return Promise.reject({ response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${SET_AUTOMANUALTEMP}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${SET_AUTOMANUALTEMP}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})