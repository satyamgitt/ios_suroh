/////////////////////////DELETE THIS PAGE/////////////////


// /* eslint-disable prettier/prettier */
// import { GET_API, SUCCESS, FAIL } from '../action-types';

// export const getApi = () => dispatch => dispatch({
//     type: GET_API,
//     payload: {
//         request: {
//             url: `https://jsonplaceholder.typicode.com/users`,
//             method: 'GET',
//         },
//         options: {
//             onSuccess({ response }) {
//                 const { data, error, status } = response;
//                 if (response) {
//                     dispatch({
//                         type: `${GET_API}_${SUCCESS}`,
//                         payload: data,
//                     });
//                     console.log(send, 'redux');
//                     console.log(response.data, 'action');
//                     return Promise.resolve(data);
//                 }
//                 dispatch({
//                     type: `${GET_API}_${SUCCESS}`,
//                     payload: data,
//                 });
//                 return Promise.reject({ response });

//             },
//             onError(exception) {
//                 // console.log(response, onError);
//                 if (exception.error.isAxiosError) {
//                     const { response: { data: dataError }, } = exception.error;
//                     dispatch({
//                         type: `${GET_API}_${FAIL}`,
//                         payload: { dataError }
//                     });
//                     return Promise.reject(dataError);
//                 }
//                 dispatch({
//                     type: `${GET_API}_${FAIL}`,
//                     payload: {}
//                 });
//                 return Promise.reject();
//             },
//         },

//     },
// })

/* eslint-disable prettier/prettier */
import { GET_API, SUCCESS, FAIL } from '../action-types';

export const getApi = () => dispatch => dispatch({
    type: GET_API,
    payload: {
        request: {
            url: 'https://jsonplaceholder.typicode.com/users',
            //url: `http://192.168.100.13/i-switch/flat_details.php`,

            method: 'GET',

        },
        options: {
            onSuccess({ response }) {
                const { data, error, status } = response;
                if (response) {
                    dispatch({
                        type: `${GET_API}_${SUCCESS}`,
                        payload: [...data],
                    });
                    // console.log(send, 'getApi_redux');
                    // console.log(response.data, 'getApi_action');
                    return Promise.resolve([...data]);
                }
                dispatch({
                    type: `${GET_API}_${SUCCESS}`,
                    payload: [...data],
                });
                return Promise.reject({ ...response });

            },
            onError(exception) {
                // console.log(response, onError);
                if (exception.error.isAxiosError) {
                    const { response: { data: dataError }, } = exception.error;
                    dispatch({
                        type: `${GET_API}_${FAIL}`,
                        payload: { dataError }
                    });
                    return Promise.reject(dataError);
                }
                dispatch({
                    type: `${GET_API}_${FAIL}`,
                    payload: {}
                });
                return Promise.reject();
            },
        },

    },
})