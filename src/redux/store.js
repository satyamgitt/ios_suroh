// THIS IS STORE 
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
// "LOGGER" middleware from the redux-logger library. This middleware logs Redux actions and state changes to the console.
// import logger from 'redux-logger';

// "AXIOSMIDDLEWARE" middleware from the redux-axios-middleware library. This middleware integrates with the axios library to make HTTP requests from within Redux actions
import axiosMiddleware from 'redux-axios-middleware';


// ALL COMBINED REDUCERS COMMING FROM "rootReducer"
import rootReducer from './reducers'

const client = axios.create({
    responseType: 'json',
});


// "COMPOSEENHANCERS()". This function is used to combine the middlewares into a single function that can be passed to the "CREATESTORE()" function.

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// line defines an array called "MIDDLEWARES". This array contains the middlewares that will be used by the "REDUX STORE". The first middleware in the array is "THUNK". The second middleware in the array is "AXIOSMIDDLEWARE".
let middlewares = [thunk, axiosMiddleware(client)];


// The  line checks the value of the [process.env.NODE_ENV variable]. If the value of the variable is production, then the logger middleware is added to the middlewares array. This is done because the logger middleware can be noisy in production environments.
// if (process.env.NODE_EN === 'production') middlewares = [...middlewares,logger];
if (process.env.NODE_EN === 'production') middlewares = [...middlewares];

// "CREATESTORE()" function to create the Redux store. The createStore() function takes three arguments:
//  the reducer, the middleware, and the initial state. The reducer is the function that is used to update the state of the Redux store. The middleware is the function that is used to intercept actions before they are dispatched to the reducer. THE INITIAL STATE IS THE INITIAL STATE OF THE REDUX STORE.


// REDUX STORE WHICH TAKES ARGUMENT  (REDUCERS , MIDILEWARE ,STATE)
export default createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));