/* eslint-disable prettier/prettier */
import {  SUCCESS, FAIL, ENABEL_AUTOMATION } from '../../action-types';


export const EnableDisanlePirD = (send) => dispatch =>



 dispatch({

    type: ENABEL_AUTOMATION,
    payload: {
        request: {
            // url: `http://52.66.113.96/i-switch/automation/automode_onoff.php`,
            url: `http://${send[0]['ip_Add']}/i-switch/automation/automode_onoff.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                // console.log("automanualDetail response Mahesh Dalleey" , response);
                const { data, error, status } = response;
                
                //  console.log(data.location);
                if (response) {
                    // USING "DISPATCH" WE ARE SENDING DATA TO REDUCERS AS A "PAYLOAD"
                    dispatch({
                        type: `${ENABEL_AUTOMATION}_${SUCCESS}`,
                        payload: [...data],
                        
                    });
                    // console.log(send, 'payload', ip_Add);
                    // console.log( 'GET_AUTOMATIONDASHBOARD Data' , JSON.stringify(response.data));
                    return Promise.resolve([...data]);
                }
                dispatch({
                    type: `${ENABEL_AUTOMATION}_${SUCCESS}`,
                    payload: [...data],
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                // console.log(response, onError);
                // console.log("exception" , exception)
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${ENABEL_AUTOMATION}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${ENABEL_AUTOMATION}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})




