/* eslint-disable prettier/prettier */
import { GET_AUTOMATIONDASHBOARD, SUCCESS, FAIL } from '../../action-types';


export const autoMationDashboard = (send) => dispatch =>



 dispatch({

    type: GET_AUTOMATIONDASHBOARD,
    payload: {
        request: {
            // url: `http://52.66.113.96/i-switch/automation/switches_automation_dashboard.php`,
            
            url: `http://${send[0]['ip_Add']}/i-switch/automation/switches_automation_dashboard.php`,
            method: 'POST',
            data: [...send],
        },
        options: {
            onSuccess({ response }) {
                // console.log("automanualDetail response Mahesh Dalleey" , response);
                const { data, error, status } = response;
                
                 console.log(data.location);
                if (response) {
                    // USING "DISPATCH" WE ARE SENDING DATA TO REDUCERS AS A "PAYLOAD"
                    dispatch({
                        type: `${GET_AUTOMATIONDASHBOARD}_${SUCCESS}`,
                        payload: [...data],
                        
                    });
                    // console.log(send, 'payload', ip_Add);
                    // console.log( 'GET_AUTOMATIONDASHBOARD Data' , JSON.stringify(response.data));
                    return Promise.resolve([...data]);
                }
                dispatch({
                    type: `${GET_AUTOMATIONDASHBOARD}_${SUCCESS}`,
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
                        type: `${GET_AUTOMATIONDASHBOARD}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${GET_AUTOMATIONDASHBOARD}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})




