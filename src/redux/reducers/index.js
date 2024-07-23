// REDUCER HAS THE POWER TO UPDATE THE STATE AND MAINUPLATE THE STATE
// HERE REDUCER IS MAINTAING THE STATES

import { combineReducers } from 'redux';
// IMPORTING ALL THE TYPES OF ACTION / ACTION CONSTANT SO THAT WE CAN DO SYNC BETWEEN ACTION AND REDUCER AND BASED ON TYPE / CONSTANT , REDUCER WILL DO ALL OPERATIONS AND STORE/SAVE DATA IN REDUX-STORE
import {
  PASSWORDCHANGE,
  RASPBER_PI,
  MODIFY_SCHEDULE_LOCATION,
  ADD_SCHEDULE_LOCATION,
  SCHEDULE_LOCATION_DELETE,
  SCHEDULE_LOCATION_CHANGE,
  SCHEDULE_LOCATION_TIME,
  SCHEDULE_LOCATION_SWITCHS,
  SCHEDULE_LOCATION_LIST,
  // !OLD MODES VARIABLES
  MODE_SCHEDULE,
  MODE_SCHEDULE_CHANGE,
  MODE_SCHEDULE_DELETE,
  MODE_SCHEDULE_ADD,
  MODE_SCHEDULE_SWITCHS,
  MODE_SCHEDULE_TIME,
  MODE_SWITCH_CHANGE,
  DELETE_MODE,
  MODE_DETAILS,
  MODE_NAME,
  SET_MODE,

  // NEW G_MODE IMPLEMENTATION
  GET_G_MODEDELAILS,
  GET_G_CHANGEMODE,
  GET_G_ADDMODE,
  GET_G_DELETEMODE,

  LOCK_USER,
  DELETE_USER,
  GET_USER,
  SEARCH_USER,
  ADD_USER,
  GET_RECENTSWITCHS,
  SET_AUTOMANUALTEMP,
  SET_PIRSTATUS,
  GET_PIRSTATUS,
  SET_AUTOMANUALSTATUS,
  GET_AUTOMANUALSTATUS,
  GET_AUTOMATIONDASHBOARD,
  GET_SWITCHDETAILS,
  GET_SWITCHSTATUS,
  GET_MODESWITCHS,
  GET_CHANGESTATUS,
  GET_CHANGEFANSPEED,
  GET_RASPBERRYPILOCALIP,
  //now calling the GET_STATUS from action_types
  GET_STATUS,
  GET_AMPWAT,
  GET_DETAILS,
  GET_TOKEN,
  LOADING,
  SUCCESS,
  FAIL,
  GET_API,
  SET_SWITCHSTATUS,
  SET_PREESET,
  GET_PREESET,
  UPDATE_SOCKET,
  SCHEDULE_MODE,
  UPDATE_SCHEDULE_LOCATION,
  GET_ALLLOCATION,
  SAFTEY_ALERT,
  ENABEL_AUTOMATION,
  GET_HARDMANUAL,
  CHANGE_SWITCHNAME,
 
} from '../action-types';

// INITIAL STATES OF VARIABLE WHICH WILL BE BY DEFAULT
// ALL INTIAL STATE ARE ARRAY BECAUSE HERE WE WILL STORE COLLECTION OF DATA
const STATE_INT = {
  isLoading: false,
  token: [],
  details: [],
  ampswatts: [],
  live: [],
  changestatus: [],
  fanspeed: [],
  modeswitchs: [],
  automanualstatus: [],
  changeautomanualstatus: [],
  pirstatus: [],
  setpirstatus: [],
  automanualtemp: [],
  automodedashboard: [],
  enabdisAutomation: [],
  change_switch_name: [],
  recentswitchs: [],
  _adduser: [],
  search_user: [],
  users: [],
  deleteuser: [],
  // !OLD MODE IMPLEMENTATION
  lockuser: [],
  modeset: [],
  modename: [],
  detailsmode: [],
  delete_mode: [],
  switch_mode: [],
  schedule_mode: [],
  change_schedule_mode: [],
  delete_schedule_mode: [],
  add_schedule_mode: [],
  switchs_schedule_mode: [],
  time_schedule_mode: [],

  // NEW MODE IMPLEMENTATION
  G_MODEDELAILS: [],
  G_CHANGEMODE: [],
  G_ADDMODE:[],
  G_DELETEMODE:[],

  schedule_location: [],
  schedule_switchs: [],
  schedule_loc_time: [],
  schedule_change: [],
  delete_schedule_loc: [],
  add_schedule_loc: [],
  modify_schedule_time: [],
  localGateWay_ip: [],
  ip_raspb: [],
  allLocation: [],
  pass_change: [],
  apiarray: [],
  SwitchDetails: [],
  switchstatus: [],
  preesetSet: [],
  preesetGet: [],
  socketUpdating: [],
  scheduleMode2: [],
  update_schedule_switch: [],
  GLOBAL_MODE: [],
  DEFAULT_MODE: [],
  SAFTEY_DATA: [],
  Hard_manual: [],
};

// console.log("112 changestatus" , STATE_INT.changestatus);

// REDUCERS WHICH TAKES (INITIAL STATE , ACTION). THESE ARE CALLBACK FUNCTIONS
// AND EXPORTED ALL THE FUNCTIONS(REDUCERS) IN ROOT REDUCERS
// AND HERE WE HAVE TWO PARAMETERS (INITIAL_STATE  , ACTION)

export const getautomanualstatus = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    // CHECKED TYPE OF ACTION / CONSTANT AND APP LOADED
    case GET_AUTOMANUALSTATUS:
      return { ...state, isLoading: true };

    // IF "GET_AUTOMANUALSTATUS" TYPE IS COMMING AND IT IS "SUCCESS" THEN INITIAL STATE WILL BE SAME AND IN "AUTOMANUALSTATUS" ARRAY WE UPDATE THE DATA AS "PAYLOAD" WHICH IS COMMING FROM ACTIONS
    case `${GET_AUTOMANUALSTATUS}_${SUCCESS}`:
      // console.log("132 payload: " + JSON.stringify(payload))
      return {
        ...state, // PREVIOUS STATE
        automanualstatus: [...payload],
      };

    // IF REQUEST GOT FAIL THEN ALSO SAME BUT THIS TIME IN PAYLOAD INSTEAD OF DATA ERROR WILL COME
    case `${GET_AUTOMANUALSTATUS}_${FAIL}`:
      return {
        ...state,
        automanualstatus: { ...payload },
      };

    // AND THIS IS BY-DEFAULT CASE WHEN NO CASE MATCH
    default:
      return {
        ...state,
      };
  }
};

export const getToken = (state = STATE_INT, { type, payload }) => {
  // console.log("155 in reducer getToken func" , payload)
  switch (type) {
    case GET_TOKEN:
      return { ...state, isLoading: true };
    case `${GET_TOKEN}_${SUCCESS}`:
      return {
        ...state,
        token: [...payload],
      };

    case `${GET_TOKEN}_${FAIL}`:
      return {
        ...state,
        token: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};

export const getDetails = (state = STATE_INT, { type, payload }) => {
  // console.log("168 payload" , payload);
  switch (type) {
    case GET_DETAILS:
      return { ...state, isLoading: true };
    case `${GET_DETAILS}_${SUCCESS}`:
      return {
        ...state,
        token: [...payload],
      };
    case `${GET_DETAILS}_${FAIL}`:
      return {
        ...state,
        token: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const getAmWa = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case GET_AMPWAT:
      return { ...state, isLoading: true };
    case `${GET_AMPWAT}_${SUCCESS}`:
      return {
        ...state,
        ampswatts: [...payload],
      };
    case `${GET_AMPWAT}_${FAIL}`:
      return {
        ...state,
        ampswatts: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};

//reciving Action request from getStatus
//this data calling from getStatus from HOME_SCREEN
export const getStatus = (state = STATE_INT, { type, payload }) => {
  // console.log("reducer 224 getStatus payload", payload);
  switch (type) {
    //in case action type is GET_STATUS now it will be calling
    case GET_STATUS:
      return { ...state, isLoading: true };
    case `${GET_STATUS}_${SUCCESS}`:
      return {
        ...state,
        live: [...payload],
      };
    case `${GET_STATUS}_${FAIL}`:
      return {
        ...state,
        live: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};

export const changeStatus = (state = STATE_INT, { type, payload }) => {
  // console.log("250 switch status ho");
  // console.log("234 reducer changeStatus func" , payload , "current Time" , Date.now());
  switch (type) {
    case GET_CHANGESTATUS:
      return { ...state, isLoading: true };
    case `${GET_CHANGESTATUS}_${SUCCESS}`:
      // console.log("255 changeStatus" , payload , "255 timeStamp" , Date.now())
      return {
        ...state,
        changestatus: [...payload],
      };
    case `${GET_CHANGESTATUS}_${FAIL}`:
      return {
        ...state,
        changestatus: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};

export const getFanSpeed = (state = STATE_INT, { type, payload }) => {
  // console.warn("261  payload reducer" ,  payload);


  switch (type) {
    case GET_CHANGEFANSPEED:
      return { ...state, isLoading: true };
    case `${GET_CHANGEFANSPEED}_${SUCCESS}`:
      return {
        ...state,
        fanspeed: [...payload],
      };
    case `${GET_CHANGEFANSPEED}_${FAIL}`:
      return {
        ...state,
        fanspeed: [...payload],
      };
    default:
      return state;
      break;
  }
};
export const getRaspberryPiLocalIp = (state = STATE_INT, { type, payload }) => {
  console.warn("281  payload reducer", payload);


  switch (type) {
    case GET_RASPBERRYPILOCALIP:
      return { ...state, isLoading: true };
    case `${GET_RASPBERRYPILOCALIP}_${SUCCESS}`:
      return {
        ...state,
        localGateWay_ip: [...payload],
      };
    case `${GET_RASPBERRYPILOCALIP}_${FAIL}`:
      return {
        ...state,
        localGateWay_ip: [...payload],
      };
    default:
      return state;
      break;
  }
};



export const getDefaultModes = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case GET_DEFAULT_MODES:
      return { ...state, isLoading: true }
    case `${GET_DEFAULT_MODES}_${SUCCESS}`:
      return {
        ...state,
        DEFAULT_MODE: [...payload]
      }
    case `${GET_DEFAULT_MODES}_${FAIL}`:
      return {
        ...state,
        DEFAULT_MODE: { ...payload }
      };
    default:
      return {
        ...state
      }
  }
};
export const getSwitchDetails = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case GET_SWITCHDETAILS:
      console.log('index page');
      return { ...state, isLoading: true };
    case `${GET_SWITCHDETAILS}_${SUCCESS}`:
      return {
        ...state,
        SwitchDetails: [...payload],
      };
    case `${GET_SWITCHDETAILS}_${FAIL}`:
      return {
        ...state,
        SwitchDetails: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};

export const getSwitchStatus = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case GET_SWITCHSTATUS:
      console.log('index page setautomanual status');
      return { ...state, isLoading: true };
    case `${GET_SWITCHSTATUS}_${SUCCESS}`:
      return {
        ...state,
        SwitchStatus: [...payload],
      };
    case `${GET_SWITCHSTATUS}_${FAIL}`:
      return {
        ...state,
        SwitchStatus: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};

export const setautomanualstatus = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case SET_AUTOMANUALSTATUS:
      console.log('index page setautomanual status');
      return { ...state, isLoading: true };
    case `${SET_AUTOMANUALSTATUS}_${SUCCESS}`:
      return {
        ...state,
        changeautomanualstatus: [...payload],
      };
    case `${SET_AUTOMANUALSTATUS}_${FAIL}`:
      return {
        ...state,
        changeautomanualstatus: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};


export const getAutomationDashboard = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case GET_AUTOMATIONDASHBOARD:
      console.log('index page setautomanual status');
      return { ...state, isLoading: true };
    case `${GET_AUTOMATIONDASHBOARD}_${SUCCESS}`:
      return {
        ...state,
        automodedashboard: [...payload],
      };
    case `${GET_AUTOMATIONDASHBOARD}_${FAIL}`:
      return {
        ...state,
        automodedashboard: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};


export const enabdisabAutomation = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case ENABEL_AUTOMATION:
      return { ...state, isLoading: true };
    case `${ENABEL_AUTOMATION}_${SUCCESS}`:
      return {
        ...state,
        enabdisAutomation: [...payload],
      };
    case `${ENABEL_AUTOMATION}_${SUCCESS}`:
      return {
        ...state,
        enabdisAutomation: { ...payload },
      };
    default:
      return {
        ...state
      };
  }

}


export const enable_disable_HardManual = (state = STATE_INT, { type, payload }) => {

  switch (type) {
    case GET_HARDMANUAL:
      return { ...state, isLoading: true };
    case `${GET_HARDMANUAL}_${SUCCESS}`:
      return {
        ...state,
        Hard_manual: [...payload],
      };
    case `${GET_HARDMANUAL}_${SUCCESS}`:
      return {
        ...state,
        Hard_manual: { ...payload },
      };
    default:
      return {
        ...state
      };
  }
}


export const setSwitchName = (state = STATE_INT, { type, payload }) => {

  switch (type) {
    case CHANGE_SWITCHNAME:
      return { ...state, isLoading: true };
    case `${CHANGE_SWITCHNAME}_${SUCCESS}`:
      return {
        ...state,
        change_switch_name: [...payload]
      }

    case `${CHANGE_SWITCHNAME}_${FAIL}`:
      return {
        ...state,
        change_switch_name: [...payload]
      };
    default:
      return {
        ...state
      };

  }
}
export const getPirStatus = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case GET_PIRSTATUS:
      console.log('index page');
      return { state, isLoading: true };
    case `${GET_PIRSTATUS}_${SUCCESS}`:
      return {
        state,
        pirstatus: [payload],
      };
    case `${GET_PIRSTATUS}_${FAIL}`:
      return {
        state,
        pirstatus: { payload },
      };
    default:
      return {
        state,
      };
  }
};
export const setPirStatus = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case SET_PIRSTATUS:
      return { ...state, isLoading: true };
    case `${SET_PIRSTATUS}_${SUCCESS}`:
      return {
        ...state,
        setpirstatus: [...payload],
      };
    case `${SET_PIRSTATUS}_${FAIL}`:
      return {
        ...state,
        setpirstatus: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const setAutomanualTemp = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case SET_AUTOMANUALTEMP:
      console.log('index page');
      return { ...state, isLoading: true };
    case `${SET_AUTOMANUALTEMP}_${SUCCESS}`:
      return {
        ...state,
        automanualtemp: [...payload],
      };
    case `${SET_AUTOMANUALTEMP}_${FAIL}`:
      return {
        ...state,
        automanualtemp: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const getRecentSwitchs = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case GET_RECENTSWITCHS:
      console.log('index page');
      return { ...state, isLoading: true };
    case `${GET_RECENTSWITCHS}_${SUCCESS}`:
      return {
        ...state,
        recentswitchs: [...payload],
      };
    case `${GET_RECENTSWITCHS}_${FAIL}`:
      return {
        ...state,
        recentswitchs: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const setUser = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case ADD_USER:
      // console.log("index page");
      return { ...state, isLoading: true };

    case `${ADD_USER}_${SUCCESS}`:
      return {
        ...state,
        _adduser: [payload],
      };
    case `${ADD_USER}_${FAIL}`:
      return {
        ...state,
        _adduser: { payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const getUser = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case GET_USER:
      console.log('index page');
      return { ...state, isLoading: true };
    case `${GET_USER}_${SUCCESS}`:
      return {
        ...state,
        users: [payload],
      };
    case `${GET_USER}_${FAIL}`:
      return {
        ...state,
        users: { payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const deleteUser = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case DELETE_USER:
      console.log('index page');
      return { ...state, isLoading: true };
    case `${DELETE_USER}_${SUCCESS}`:
      return {
        ...state,
        deleteuser: payload,
      };
    case `${DELETE_USER}_${FAIL}`:
      return {
        ...state,
        deleteuser: payload,
      };
    default:
      return {
        ...state,
      };
  }
};
export const lockUser = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case LOCK_USER:
      console.log('index page');
      return { ...state, isLoading: true };
    case `${LOCK_USER}_${SUCCESS}`:
      return {
        ...state,
        lockuser: [payload],
      };
    case `${LOCK_USER}_${FAIL}`:
      return {
        ...state,
        lockuser: { payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const getSearchUser = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case SEARCH_USER:
      console.log('index page');
      return { ...state, isLoading: true };
    case `${SEARCH_USER}_${SUCCESS}`:
      return {
        ...state,
        search_user: [payload],
      };
    case `${SEARCH_USER}_${FAIL}`:
      return {
        ...state,
        search_user: { payload },
      };
    default:
      return {
        ...state,
      };
  }
};

// !OLD MODE IMPLEMENTATION
export const getmodeswithcs = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case GET_MODESWITCHS:
      return { ...state, isLoading: true };
    case `${GET_MODESWITCHS}_${SUCCESS}`:
      return {
        ...state,
        modeswitchs: [...payload],
      };
    case `${GET_MODESWITCHS}_${FAIL}`:
      return {
        ...state,
        modeswitchs: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const getSetMode = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case SET_MODE:
      // console.log('index page');
      return { ...state, isLoading: true };
    case `${SET_MODE}_${SUCCESS}`:
      return {
        ...state,
        modeset: [payload],
      };
    case `${SET_MODE}_${FAIL}`:
      return {
        ...state,
        modeset: { payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const addMode = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case MODE_NAME:
      // console.log('index page');
      return { ...state, isLoading: true };
    case `${MODE_NAME}_${SUCCESS}`:
      return {
        ...state,
        modename: [payload],
      };
    case `${MODE_NAME}_${FAIL}`:
      return {
        ...state,
        modename: { payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const getModeDetails = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case MODE_DETAILS:
      console.log('index page');
      return { ...state, isLoading: true };
    case `${MODE_DETAILS}_${SUCCESS}`:
      return {
        ...state,
        detailsmode: [payload],
      };
    case `${MODE_DETAILS}_${FAIL}`:
      return {
        ...state,
        detailsmode: { payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const setModeDelete = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case DELETE_MODE:
      console.log('index page');
      return { ...state, isLoading: true };
    case `${DELETE_MODE}_${SUCCESS}`:
      return {
        ...state,
        delete_mode: [payload],
      };
    case `${DELETE_MODE}_${FAIL}`:
      return {
        ...state,
        delete_mode: { payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const setModeSwitch = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case MODE_SWITCH_CHANGE:
      console.log('index page');
      return { ...state, isLoading: true };
    case `${MODE_SWITCH_CHANGE}_${SUCCESS}`:
      return {
        ...state,
        switch_mode: [payload],
      };
    case `${MODE_SWITCH_CHANGE}_${FAIL}`:
      return {
        ...state,
        switch_mode: { payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const getModeSchedule = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case MODE_SCHEDULE:
      console.log('index page');
      return { ...state, isLoading: true };
    case `${MODE_SCHEDULE}_${SUCCESS}`:
      return {
        ...state,
        schedule_mode: [payload],
      };
    case `${MODE_SCHEDULE}_${FAIL}`:
      return {
        ...state,
        schedule_mode: { payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const setModeScheduleChange = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case MODE_SCHEDULE_CHANGE:
      console.log('index page');
      return { ...state, isLoading: true };
    case `${MODE_SCHEDULE_CHANGE}_${SUCCESS}`:
      return {
        ...state,
        change_schedule_mode: [payload],
      };
    case `${MODE_SCHEDULE_CHANGE}_${FAIL}`:
      return {
        ...state,
        change_schedule_mode: { payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const deleteScheduleMode = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case MODE_SCHEDULE_DELETE:
      console.log('index page');
      return { ...state, isLoading: true };
    case `${MODE_SCHEDULE_DELETE}_${SUCCESS}`:
      return {
        ...state,
        delete_schedule_mode: [payload],
      };
    case `${MODE_SCHEDULE_DELETE}_${FAIL}`:
      return {
        ...state,
        delete_schedule_mode: { payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const addModeScheduleMode = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case MODE_SCHEDULE_ADD:
      console.log('index page');
      return { ...state, isLoading: true };
    case `${MODE_SCHEDULE_ADD}_${SUCCESS}`:
      return {
        ...state,
        add_schedule_mode: [payload],
      };
    case `${MODE_SCHEDULE_ADD}_${FAIL}`:
      return {
        ...state,
        add_schedule_mode: { payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const setScheduleswitchsMode = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case MODE_SCHEDULE_DELETE:
      console.log('index page');
      return { ...state, isLoading: true };
    case `${MODE_SCHEDULE_DELETE}_${SUCCESS}`:
      return {
        ...state,
        switchs_schedule_mode: [payload],
      };
    case `${MODE_SCHEDULE_DELETE}_${FAIL}`:
      return {
        ...state,
        switchs_schedule_mode: { payload },
      };
    default:
      return {
        ...state,
      };
  }
};

export const schedulemode2 = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    //in case action type is GET_STATUS now it will be calling
    case SCHEDULE_MODE:
      return { ...state, isLoading: true };
    case `${SCHEDULE_MODE}_${SUCCESS}`:
      return {
        ...state,
        scheduleMode2: [...payload],
      };
    case `${SCHEDULE_MODE}_${FAIL}`:
      return {
        ...state,
        scheduleMode2: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};


// NEW MODE IMPLEMENTATION 

export const G_getMode = (state = STATE_INT, { type, payload }) => {

  switch (type) {
    case GET_G_MODEDELAILS:
      return { ...state, isLoading: true }

    case `${GET_G_MODEDELAILS}_${SUCCESS}`:
      return {
        ...state,
        G_MODEDELAILS: [...payload],
      }

    case `${GET_G_MODEDELAILS}_${FAIL}`:
      return {
        ...state,
        G_MODEDELAILS: { ...payload },
      }

    default:
      return {
        ...state
      }
  }
}

export const G_setMode = (state = STATE_INT, { type, payload }) => {

  switch (type) {
    case GET_G_CHANGEMODE:
      return { ...state, isLoading: true };
    case `${GET_G_CHANGEMODE}_${SUCCESS}`:
      return {
        ...state,
        G_CHANGEMODE: [...payload]
      };
    case `${GET_G_CHANGEMODE}_${FAIL}`:
      return {
        ...state,
        G_CHANGEMODE: {...payload}
      };

    default:
     return {
      ...state
     }
  }
}
export const G_addMode = (state = STATE_INT, { type, payload }) => {

  switch (type) {
    case GET_G_ADDMODE:
      return { ...state, isLoading: true };
    case `${GET_G_ADDMODE}_${SUCCESS}`:
      return {
        ...state,
        G_ADDMODE: [...payload]
      };
    case `${GET_G_ADDMODE}_${FAIL}`:
      return {
        ...state,
        G_ADDMODE: {...payload}
      };

    default:
     return {
      ...state
     }
  }
}
export const G_deleteMode = (state = STATE_INT, { type, payload }) => {

  switch (type) {
    case GET_G_DELETEMODE:
      return { ...state, isLoading: true };
    case `${GET_G_DELETEMODE}_${SUCCESS}`:
      return {
        ...state,
        G_DELETEMODE: [...payload]
      };
    case `${GET_G_DELETEMODE}_${FAIL}`:
      return {
        ...state,
        G_DELETEMODE: {...payload}
      };

    default:
     return {
      ...state
     }
  }
}


export const setTimeSchdeule = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case MODE_SCHEDULE_TIME:
      console.log('index page');
      return { ...state, isLoading: true };
    case `${MODE_SCHEDULE_TIME}_${SUCCESS}`:
      return {
        ...state,
        time_schedule_mode: [payload],
      };
    case `${MODE_SCHEDULE_TIME}_${FAIL}`:
      return {
        ...state,
        time_schedule_mode: { payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const getLocationSchedule = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case SCHEDULE_LOCATION_LIST:
      console.log('index page');
      return { ...state, isLoading: true };
    case `${SCHEDULE_LOCATION_LIST}_${SUCCESS}`:
      return {
        ...state,
        schedule_location: [payload],
      };
    case `${SCHEDULE_LOCATION_LIST}_${FAIL}`:
      return {
        ...state,
        schedule_location: { payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const getLocationScheduleSwitchs = (
  state = STATE_INT,
  { type, payload },
) => {
  switch (type) {
    case SCHEDULE_LOCATION_SWITCHS:
      console.log('index page');
      return { ...state, isLoading: true };
    case `${SCHEDULE_LOCATION_SWITCHS}_${SUCCESS}`:
      return {
        ...state,
        schedule_switchs: [payload],
      };
    case `${SCHEDULE_LOCATION_SWITCHS}_${FAIL}`:
      return {
        ...state,
        schedule_switchs: { payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const getLocationScheduleTime = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case SCHEDULE_LOCATION_TIME:
      console.log('index page');
      return { ...state, isLoading: true };
    case `${SCHEDULE_LOCATION_TIME}_${SUCCESS}`:
      return {
        ...state,
        schedule_loc_time: [payload],
      };
    case `${SCHEDULE_LOCATION_TIME}_${FAIL}`:
      return {
        ...state,
        schedule_loc_time: { payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const getLocationScheduleChange = (
  state = STATE_INT,
  { type, payload },
) => {
  switch (type) {
    case SCHEDULE_LOCATION_CHANGE:
      console.log('index page');
      return { ...state, isLoading: true };
    case `${SCHEDULE_LOCATION_CHANGE}_${SUCCESS}`:
      return {
        ...state,
        schedule_change: [payload],
      };
    case `${SCHEDULE_LOCATION_CHANGE}_${FAIL}`:
      return {
        ...state,
        schedule_change: { payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const locationScheduleDelete = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case SCHEDULE_LOCATION_DELETE:
      console.log('index page');
      return { ...state, isLoading: true };
    case `${SCHEDULE_LOCATION_DELETE}_${SUCCESS}`:
      return {
        ...state,
        delete_schedule_loc: [payload],
      };
    case `${SCHEDULE_LOCATION_DELETE}_${FAIL}`:
      return {
        ...state,
        delete_schedule_loc: { payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const addLocationSchedule = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case ADD_SCHEDULE_LOCATION:
      console.log('index page');
      return { ...state, isLoading: true };
    case `${ADD_SCHEDULE_LOCATION}_${SUCCESS}`:
      return {
        ...state,
        add_schedule_loc: [payload],
      };
    case `${ADD_SCHEDULE_LOCATION}_${FAIL}`:
      return {
        ...state,
        add_schedule_loc: { payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export const modifyScheduleLocation = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case MODIFY_SCHEDULE_LOCATION:
      console.log('index page');
      return { ...state, isLoading: true };
    case `${MODIFY_SCHEDULE_LOCATION}_${SUCCESS}`:
      return {
        ...state,
        modify_schedule_time: [payload],
      };
    case `${MODIFY_SCHEDULE_LOCATION}_${FAIL}`:
      return {
        ...state,
        modify_schedule_time: { payload },
      };
    default:
      return {
        ...state,
      };
  }
};

export const raspberry_ip = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case RASPBER_PI:
      console.log('index page Raspberry', payload);
      return { ...state, isLoading: true };
    case `${RASPBER_PI}_${SUCCESS}`:
      return {
        ...state,
        ip_raspb: [...payload],
      };
    case `${RASPBER_PI}_${FAIL}`:
      return {
        ...state,
        ip_raspb: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};

export const getAllLocation = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case GET_ALLLOCATION:
      console.log('index page Raspberry', payload);
      return { ...state, isLoading: true };
    case `${GET_ALLLOCATION}_${SUCCESS}`:
      return {
        ...state,
        allLocation: [...payload],
      };
    case `${GET_ALLLOCATION}_${FAIL}`:
      return {
        ...state,
        allLocation: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};

export const password_Change = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case PASSWORDCHANGE:
      console.log('index page PASSWORDCHANGE');
      return { ...state, isLoading: true };
    case `${PASSWORDCHANGE}_${SUCCESS}`:
      return {
        ...state,
        pass_change: [...payload],
      };
    case `${PASSWORDCHANGE}_${FAIL}`:
      return {
        ...state,
        pass_change: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};

export const ApiName = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    case GET_API:
      return { ...state, isLoading: true };
    case `${GET_API}_${SUCCESS}`:
      return {
        ...state,
        apiarray: [...payload],
      };
    case `${GET_API}_${FAIL}`:
      return {
        ...state,
        apiarray: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};

export const setswitchstatus = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    //in case action type is GET_STATUS now it will be calling
    case SET_SWITCHSTATUS:
      return { ...state, isLoading: true };
    case `${SET_SWITCHSTATUS}_${SUCCESS}`:
      return {
        ...state,
        switchstatus: [...payload],
      };
    case `${SET_SWITCHSTATUS}_${FAIL}`:
      return {
        ...state,
        switchstatus: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};

export const setPreesetStatus = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    //in case action type is GET_STATUS now it will be calling
    case SET_PREESET:
      return { ...state, isLoading: true };
    case `${SET_PREESET}_${SUCCESS}`:
      return {
        ...state,
        preesetSet: [...payload],
      };
    case `${SET_PREESET}_${FAIL}`:
      return {
        ...state,
        preesetSet: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};

export const getPreesetStatus = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    //in case action type is GET_STATUS now it will be calling
    case GET_PREESET:
      return { ...state, isLoading: true };
    case `${GET_PREESET}_${SUCCESS}`:
      return {
        ...state,
        preesetGet: [...payload],
      };
    case `${GET_PREESET}_${FAIL}`:
      return {
        ...state,
        preesetGet: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};

export const socketUpdatingStatus = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    //in case action type is GET_STATUS now it will be calling
    case UPDATE_SOCKET:
      return { ...state, isLoading: true };
    case `${UPDATE_SOCKET}_${SUCCESS}`:
      return {
        ...state,
        socketUpdating: [...payload],
      };
    case `${UPDATE_SOCKET}_${FAIL}`:
      return {
        ...state,
        socketUpdating: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};



export const update_scheduled_sw = (state = STATE_INT, { type, payload }) => {
  switch (type) {
    //in case action type is GET_STATUS now it will be calling
    case UPDATE_SCHEDULE_LOCATION:
      return { ...state, isLoading: true };
    case `${UPDATE_SCHEDULE_LOCATION}_${SUCCESS}`:
      return {
        ...state,
        update_schedule_switch: [...payload],
      };
    case `${UPDATE_SCHEDULE_LOCATION}_${FAIL}`:
      return {
        ...state,
        update_schedule_switch: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};

//sending entaire reducers data in single object.
//sending GET_STATUS action dispatching.
// these all  reducers combining here and the sending USING  "combineReducer()"
export default combineReducers({
  getToken,
  getDetails,
  getAmWa,
  getStatus,
  changeStatus,
  getFanSpeed,
  getmodeswithcs,
  getautomanualstatus,
  getAutomationDashboard,
  enabdisabAutomation,
  setSwitchName,
  setautomanualstatus,
  getPirStatus,
  enable_disable_HardManual,
  setPirStatus,
  setAutomanualTemp,
  getRecentSwitchs,
  setUser,
  getSearchUser,
  getUser,
  deleteUser,
  lockUser,
  // ! OLD MODE IMPLEMENTATION
  getSetMode,
  addMode,
  getModeDetails,
  setModeDelete,
  setModeSwitch,
  getModeSchedule,
  setModeScheduleChange,
  deleteScheduleMode,
  addModeScheduleMode,
  setScheduleswitchsMode,
  // NEW MODE IMPLEMENTATION
  G_getMode,
  G_setMode,
  G_addMode,
  G_deleteMode,


  setTimeSchdeule,
  getLocationSchedule,
  getLocationScheduleSwitchs,
  getLocationScheduleTime,
  getLocationScheduleChange,
  locationScheduleDelete,
  addLocationSchedule,
  modifyScheduleLocation,
  raspberry_ip,
  getAllLocation,
  password_Change,
  ApiName,
  getSwitchDetails,
  getSwitchStatus,
  setswitchstatus,
  setPreesetStatus,
  getPreesetStatus,
  socketUpdatingStatus,
  schedulemode2,
  update_scheduled_sw,
});
