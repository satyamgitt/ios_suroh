/* eslint-disable prettier/prettier */
import { SET_AUTOMANUALSTATUS, SUCCESS, FAIL } from '../action-types';

// The function changeAutomanualStatus(send) is an action creator. This function is dispatched in your component whenever you want to change the automatic manual status. This function takes "send" as a parameter which is the data that you want to post to the server to update the status.

// When changeAutomanualStatus(send) is called, it returns a function because of the Redux Thunk middleware. This function takes dispatch as a parameter. dispatch is a function that allows us to send actions to the Redux store to update the state.

//The changeAutomanualStatus function takes an argument send and returns another function that takes dispatch as its argument. This is a common pattern for Redux middleware like redux-thunk or redux-promise-middleware.
export const changeAutomanualStatus = (send) => dispatch => dispatch({
    


    type: SET_AUTOMANUALSTATUS,
    
    payload: {


        request: {
            url: `http://52.66.113.96/i-switch/automation/set_automode_switches_v2.php`,
            method: 'POST',
            
            data: [...send],
        },


        //The "options" object contains two functions: onSuccess and onError. These functions are called based on whether the API request is successful or not.
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;

                //If the response object exists, it dispatches another action with the type ${SET_AUTOMANUALSTATUS}_${SUCCESS} and the payload set to the data received in the response.and returns a resolved Promise with the response data.
                if (response) {
                    dispatch({
                        type: `${SET_AUTOMANUALSTATUS}_${SUCCESS}`,
                        payload: [...data],
                    });
                    // console.log(send, 'redux');
                    // console.log(response.data, 'switch status change');
                    return Promise.resolve([...data]);
                }
                dispatch({
                    type: `${SET_AUTOMANUALSTATUS}_${SUCCESS}`,
                    payload: [...data],
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${SET_AUTOMANUALSTATUS}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${SET_AUTOMANUALSTATUS}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})










//In summary, this action creator sends a POST request to an API endpoint and dispatches different actions based on whether the request was successful or not. The onSuccess and onError functions handle the response and error cases, respectively, and dispatch appropriate actions accordingly.