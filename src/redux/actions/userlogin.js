/* eslint-disable prettier/prettier */
import { GET_TOKEN, SUCCESS, FAIL } from '../action-types';

export const userLogin = (send) => 

// console.log("data need to send on backend for checking user" , send);

dispatch => dispatch({

   
    
    type: GET_TOKEN,

    payload: {

        request: {
            url: `http://52.66.113.96/i-switch/automation/loginFromApp.php`,
            method: 'POST',
            data: [...send],
        },

        
        options: {
            onSuccess({ response }) {
                
                const { data, error, status } = response;
                // console.log("20" , data)
                if (response) {
                    dispatch({
                        type: `${GET_TOKEN}_${SUCCESS}`,
                        payload: [...data],
                    });
                    // console.log(send, 'REDUX  SEND DATA OF USERLOGIN TO BACKEND THROUGH API');
                    // console.log(response.data, 'THIS IS USERLOGIN RESPONSE WE ARE GETTING AFTERAPI HEAT AND THIS DATA WILL GO TO REDUCER');
                    return Promise.resolve({ ...data });
                }
                dispatch({
                    type: `${GET_TOKEN}_${SUCCESS}`,
                    payload: { ...data },
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                console.log("abc" , response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${GET_TOKEN}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                
                dispatch({
                    type: `${GET_TOKEN}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})


