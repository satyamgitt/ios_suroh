/* eslint-disable prettier/prettier */
// THESE ARE ACTION TYPES IMPORTED FROM CONSTANT FILE
import { ADD_USER, SUCCESS, FAIL } from '../action-types';


// THIS "send" IS COMMING FROM MAIN SCREEN AS A PARAMETER.
// IN API CALLING WE HAVE TO return "dispatch()" COMMING DATA
export const add_User = (send) => dispatch => dispatch({
    type: ADD_USER,
    // HERE WE ARE SENDING(DISPATCHING) DATA TO THE REDUCR IN PAYLOAD
    // WHATEVER DATA YOU WANT TO SEND FROM UI , LIKE IF THERE IS A CARD  AND YOU WANT TO ADD CARD DATA IN SHOPING CART THEN WHOLE CARD DATA WILL BE SEND FROM HERE.EXP{PRICE , COLOR , QUANTITY...}.THAT WILL STORE IN REDUX
    payload: {
        request: { 
            url: `http://52.66.113.96/i-switch/automation/add_user_V2.php`,
             method: 'POST',
              data: [...send] },


        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    // AFTER GETTING RESPONSE SUCCESSFULLY WE HAVE TO AGAIN DISPATCH "data" TO "payload"
                    dispatch({
                        type: `${ADD_USER}_${SUCCESS}`,
                        payload: data,
                    });
                    // console.log(send, 'redux');
                    // console.log(response.data, 'Add User action');
                    return Promise.resolve(data);
                }
                dispatch({
                    type: `${ADD_USER}_${SUCCESS}`,
                    payload: data,
                });
                return Promise.reject({ response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${ADD_USER}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${ADD_USER}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})