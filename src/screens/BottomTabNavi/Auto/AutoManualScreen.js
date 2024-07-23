/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  StatusBar,
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Switch,
  Dimensions,
  LogBox,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import InputSpinner from 'react-native-input-spinner';
import PropTypes, { array } from 'prop-types';

import Ico from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Toast from 'react-native-simple-toast';
import Slider from '@react-native-community/slider';
import DatePicker from 'react-native-date-picker';
import CheckBox from '@react-native-community/checkbox';
import { getSlno, wificonfig } from '../../AsyncStorage';
import { useTheme } from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';
import { BlurView } from '@react-native-community/blur';
import getwifi from '../../../config/ip_address';
import IconMapping from './IconMapping';



// import { Image } from 'react-native-paper';

// import Actions function and UI data will be  DISPATCHED using these actions functions
import { autoManualDetails } from '../../../redux/actions/autoManualDetails';
import { getpirStatus } from '../../../redux/actions/getpirStatus';
import { setpirStatus } from '../../../redux/actions/setpirStatus';
import { setAutomanulTempLux } from '../../../redux/actions/setAutomanualTempLux';
import { scheduleTime } from '../../../redux/actions/schedule/scheduleTime';
import { modifySchedule } from '../../../redux/actions/schedule/modifySchedule';
import { scheduleDelete } from '../../../redux/actions/schedule/scheduleDelete';
import { scheduleChange } from '../../../redux/actions/schedule/scheduleChange';
import { scheduleSwitchs } from '../../../redux/actions/schedule/scheduleSwitchs';
// import { mode_Details } from '../../../redux/actions/Mode/mode_Details';
import { getSwitchdetails } from '../../../redux/actions/getSwitchDetails';
import { changeStatus } from '../../../redux/actions/changeStatus';

import { getFireData } from '../../../redux/actions/getFireData';
import { fan_speed_change } from '../../../redux/actions/fan_speed_change';
// import { mode_Set } from '../../../redux/actions/Mode/mode_Set';
// import { addMode_ } from '../../../redux/actions/Mode/addMode_';
import { switchStatusUpdate } from '../../../redux/actions/switchStatusUpdate';
// import { modeSwitch } from '../../../redux/actions/Mode/modeSwitch';
import { scheduleAdd } from '../../../redux/actions/schedule/scheduleAdd';
// import { modeDelete } from '../../../redux/actions/Mode/modeDelete';
import { enab_disHardManual } from '../../../redux/actions/enab_disHardManual';
import { updateSchedule } from '../../../redux/actions/schedule/updateSchedule';
import { Button } from 'react-native-paper';
import { autoMationDashboard } from '../../../redux/actions/AutomationApis/autoMationDashboard';
import { EnableDisanlePirD } from '../../../redux/actions/AutomationApis/EnableDisablePirD';
import { color, log } from 'react-native-reanimated';
import { ShowGlobalModes } from '../../../redux/actions/Mode2/ShowGlobalModes';
import { ChangeGlobalmode } from '../../../redux/actions/Mode2/ChangeGlobalmode';
import { AddGlobalMode } from '../../../redux/actions/Mode2/AddGlobalMode';
import { DeleteGlobalMode } from '../../../redux/actions/Mode2/DeleteGlobalMode';
import { Picker } from '@react-native-picker/picker';


const { width, height } = Dimensions.get('screen');
const screenWidth = Dimensions.get('screen').width;
const diognal = height / width;
const size = diognal * 6.65;

let sl_no;
let ip_Add;
// let temparature;
// let luminosity;
// let pir_time;
// let cut_off;
// let fan_delay;
// let trans_time;
// let post_trans;

// let modes;
// console.log("86 cut_off: " + cut_off);
//in API need to pass 'switch_id' we reciving only timedata now using temp var
let id;

console.table("97 id", id);
//switchschedule modal data
const options = [
  {
    day: 'Sunday',
    status: false,
  },
  {
    day: 'Monday',
    status: false,
  },
  {
    day: 'Tuesday',
    status: false,
  },
  {
    day: 'Wednesday',
    status: false,
  },
  {
    day: 'Thursday',
    status: false,
  },
  {
    day: 'Friday',
    status: false,
  },
  {
    day: 'Saturday',
    status: false,
  },
];

//Temprorly declared data to display in Add_schedule switch_Timing , it should come from backend
const timings = [
  {
    on_time: '20:15:00',
    off_time: '19:15:00',
    is_activated: false,
    days: [
      {
        day: 'Sunday',
        status: true,
      },
      {
        day: 'Monday',
        status: false,
      },
      {
        day: 'Tuesday',
        status: false,
      },
      {
        day: 'Wednesday',
        status: false,
      },
      {
        day: 'Thursday',
        status: false,
      },
      {
        day: 'Friday',
        status: false,
      },
      {
        day: 'Saturday',
        status: false,
      },
    ],
  },
  {
    on_time: '9:15:00',
    off_time: '10:15:00',
    is_activated: false,
    days: [
      {
        day: 'Sunday',
        status: true,
      },
      {
        day: 'Monday',
        status: false,
      },
      {
        day: 'Tuesday',
        status: false,
      },
      {
        day: 'Wednesday',
        status: false,
      },
      {
        day: 'Thursday',
        status: false,
      },
      {
        day: 'Friday',
        status: false,
      },
      {
        day: 'Saturday',
        status: false,
      },
      {
        day: 'Sunday',
        status: true,
      },
      {
        day: 'Monday',
        status: true,
      },
      {
        day: 'Tuesday',
        status: false,
      },
      {
        day: 'Wednesday',
        status: false,
      },
      {
        day: 'Thursday',
        status: false,
      },
      {
        day: 'Friday',
        status: false,
      },
      {
        day: 'Saturday',
        status: false,
      },
    ],
  },
];


const anditems = [
  // { label: 'Autonomus Switchboard', value: 'A' },
  { label: 'A', value: 'A' },
  { label: 'H1', value: 'H1' },
  { label: 'H2', value: 'H2' },
  { label: 'H3', value: 'H3' },
];
const pirType = [
  { label: 'D', value: 'D' },
  { label: 'O', value: 'O' },
];







// whatever API data need to call , just need to give that function it as argument in "automanualScreen"
const AutoManualScreen = ({
  navigation,
  getAutoMationDashboard,
  changeAutoMationFromDashboard,
  getDetails,
  updateScheduleSwitch,
  scheduleChanges,
  switchDetails,
  getScheduleDetails,
  getStatus,
  getFanSpeedStatus,
  getActiveStatus,
  pirData,
  setTempLux,
  setTimer,
  Delete_schedule,
  // !OLD MODE IMPLEMENTATION
  modeDetails,
  modeswitchDetails,
  dummy,
  _addmode,
  delete_Mode,

  // NEW MODE IMPLEMENTATION
  g_GetModes,
  g_changeGlobalmode,
  g_addGlobalmode,
  g_deleteGlobalmode,

  updateSwitch,
  _changeSwitch,
  getSchedule,
  hard_manual_action
}) => {
  // console.log("221 AutoManualScreen props" , getFanSpeedStatus )
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loadingPir, setloadingPir] = useState(false);

  //Theme setting
  const theme = useTheme();
  const styles = useStyles(theme);
  const { colors } = { ...theme };

  const [isEnabled, setIsEnabled] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [panic, setPanic] = useState(true)

  const [area, setarea] = useState();
  const [temparature, setTemparature] = useState();
  const [luminosity, setLuminosity] = useState();
  const [lumMethod, setLumMethod] = useState();
  // console.log("289 lum method", lumMethod);
  const [cut_off, setCut_off] = useState();
  // console.log("cutofffffffff", cut_off);
  const [pir_senstivity, setPir_senstivity] = useState();
  const [fan_delay, setFan_delay] = useState();


  // all the data from response comming to this state and we are using "location" for mapping in UI
  const [location, setlocation] = useState([]);

  // console.log("237 main all location " , location)

  // automation user Enabel and disabel
  const [automationModel, setAutomationModel] = useState(false);
  const [automationDashboardData, setAutomationDashboard] = useState([])

  //adding Schedule Modal
  const [scheduleModal, setscheduleModal] = useState(false);
  const [schedulelocation, setschedulelocation] = useState([]);

  //scheduletime module
  const [timemodalVisible, settimeModalVisible] = useState(false);
  const [timeData, settimeData] = useState([]);
  // console.log("first timeData" ,timeData);

  const [days, setdays] = useState([]);

  // console.log("days", days);

  const [open, setOpen] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [dispFrom, setDispFrom] = useState();
  const [dispTo, setDispTo] = useState();
  const [payloadFrom, setPayloadForm] = useState(null);
  const [payloadTo, setPayloadTo] = useState(null);
  const [dateF, setdateF] = useState(new Date());
  const [dateT, setdateT] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [modeFrom, setModeFrom] = useState('date');
  const [modeTo, setModeTo] = useState('date');
  //Add Schedule Module open
  const [addmodalVisible, setaddModalVisible] = useState(false);
  const [editmodalVisible, seteditModalVisible] = useState(false);
  //Temprorly declared time data
  const [timedatatemp, setTimedata] = useState(timings);
  const [oldscheduleTime, setoldScheduletime] = useState();
  const [get_sl_no, setSl_no] = useState('');

  // Time checking on click
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  // GLOBAL MODES STATES
  const [modebuttons, setModeButtons] = useState([]);
  const [g_ModeForm, setG_ModeForm] = useState(false);
  const [g_modeName, setG_modeName] = useState("");
  const [newButtonName, setNewButtonName] = useState("");
  // console.log("isactivated" , isactivated);

  // SWITCH Icons

  const [switchIcon, setSwitchIcon] = useState([])

  // console.log("372 switchIcon" , switchIcon);


  const getIconForSwitch = (firstLetter) => {

    // console.log("firstLetter", firstLetter);
    return IconMapping[firstLetter];
  };


  // FOR SCREEN REFERESEMENT
  const onRefresh = async () => {
    setRefreshing(true);
    await getwifi();
    setTimeout(

      async () => {

        sl_no = await getSlno();
        ip_Add = await wificonfig();

        console.log("onRefress IP", ip_Add);
        await init(sl_no);
        G_ModeDetails(sl_no)
        setLoading(false);
        setRefreshing(false);
      },

      1000);
  };


  useEffect(() => {
    setTimeout(async () => {
      // THESE THINGS WILL COME FROM ASYNCSTORAGE(sl_no , ip_add)
      sl_no = await getSlno();
      ip_Add = await wificonfig();

      setSl_no(sl_no);
      getpirdata(sl_no);
      G_ModeDetails(sl_no)

      init(sl_no, ip_Add);
    }, 1000);
    // console.log("useeffect called get pir state");
    return () => { };
  }, []);




  //!  MODE SHOULD COME BEFORE EVERYTHING
  // Global Mode Functions

  const G_ModeDetails = async (sl_no) => {
    const send = []
    const no = { sl_no, ip_Add };


    send.push(no);
    g_GetModes(send).then(response => {
      // console.log("Global ModeDetails", JSON.stringify(response))
      setModeButtons(response)
    })

  }


  const G_ModeChange = async (modeName) => {

    const send = []
    const no = { sl_no, ip_Add, mode: modeName };
    send.push(no);
    // console.log("senddddddd", send);

    g_changeGlobalmode(send).then(response => {
      console.log("ModeChange detail", response)
      if (response[0].status == "Success") {
        Alert.alert("Success", response[0].msg)
        onRefresh()
      } else {
        Alert.alert("Error", response[0].msg)
      }
    })

  }


  const handleModeAdd = async () => {
    const send = [];

    const isAnyDaySelected = days.some(day => day.status)
    // console.log("checking ...." , isAnyDaySelected);
    if (payloadFrom == null || payloadTo == null || !isAnyDaySelected || g_modeName == "") {
      Toast.show('please select Days, Timings and ModeName', Toast.LONG, Toast.TOP);
    }


    else {
      const data = {
        ip_Add,
        sl_no: sl_no,
        id: id,
        time_on: payloadFrom,
        time_off: payloadTo,
        days: days,
        mode: g_modeName,
      };

      // console.log('Addschedulepayload', data);
      send.push(data);
      // console.log('payload For Mode Saved', JSON.stringify(send))
    }

    g_addGlobalmode(send).then(response => {
      // console.log("Mode response" ,response );
      if (response[0].status == "Success") {
        Alert.alert("Success", response[0].msg)
      } else {
        Alert.alert("Error", response[0].msg)
      }
      setG_modeName("")
      setModeFrom(false)
    })
  }




  const handleDeleteG_mode = (Global_modeName) => {
    const send = []
    const data = {
      ip_Add,
      sl_no: sl_no,
      mode: Global_modeName,
    };

    send.push(data)

    console.log("for delete", send);

    g_deleteGlobalmode(send).then(response => {
      console.log("Mode response", response);
      if (response[0].status == "Success") {
        Alert.alert("Success", response[0].msg)
        onRefresh()
      } else {
        Alert.alert("Error", response[0].msg)
      }
    })
  }
  // FIRST INIT FUNCTION GOT LOAD WHEN APP RUNS

  const init = async sl_no => {
    const send = [];
    const no = { sl_no, ip_Add };

    send.push(no);


    getDetails(send).then(response => {
      // console.log("361 details" , response);
      // console.log("361 App Data", response);
      // console.log('361 details', JSON.stringify(response)); 
      setlocation(response);
      try {
        const forSwitchIcon = response.map((data) => (
          data.boards[0].switches.map((iconsw) => iconsw.sw)
        ))
        // console.log("fgfl;dkfmnbg" , forSwitchIcon);
        setSwitchIcon(forSwitchIcon.flat())

        

      } catch (error) {
        alert("SomeThing Went Wrong")
      }
      setLoading(false);
      setRefreshing(false);
    })
    // ), 5000)

    // console.log("396 interval" , interval)
  };

  // SCHEDULING PARTICULAR SWITCHBORD USING LOCATION AND SERIALNOB
  const scheduleinit = async location => {
    setscheduleModal(true);
    const e = await wificonfig();

    const send = [];
    const no = { sl_no: sl_no, location: location };
    send.push(no);
    // console.log("addschedulepayload payload 353", send);
    getScheduleDetails(send).then(response => {
      // console.log('for sechduling particular switchbord data', JSON.stringify(response));
      setschedulelocation(response);
      setLoading(false);
      setRefreshing(false);
    });
  };

  // PIR DATA LOADING WHEN APP LOADED
  const getpirdata = (status) => {
    const send = [];
    const no = { sl_no: sl_no, ip: ip_Add, status: status };
    send.push(no);

    // console.log("456", send);

    pirData(send).then(response => {
      // console.log("pirdata response 371", response )


      // console.log("pirdata response 371", response);
      // console.log("pirdata response 371", response[0].status);
      // setIsEnabled(false);
      onRefresh()
      setIsEnabled(response[0].automode_status);
      Toast.show(response[0].status, Toast.LONG, Toast.TOP);
    });
  };




  const automationChange = async (auto_mode, sw_id) => {

    const send = []
    const no = { "sl_no": sl_no, id: sw_id, auto_mode, ip_Add }
    send.push(no)

    console.log("548 send", send);
    changeAutoMationFromDashboard(send)
      .then(res => {
        console.log("550", res[0].automation_status);

      })

  }




  const autoMationDash = async () => {
    setAutomationModel(true)
    const send = []
    const e = await wificonfig();
    ip_Add = e;

    const no = { "sl_no": sl_no, "ip_Add": ip_Add }
    send.push(no)


    // console.log("sl_no of user : ", sl_no);

    getAutoMationDashboard(send).then(response => {
      // console.log("dashboard" , JSON.stringify(response));
      setAutomationDashboard(response)

      if (response[0].error) {
        Toast.show(response[0].error, Toast.LONG, Toast.TOP);
      }
    })
  }



  const hard_manual_configration = async (sw_id, hard_manual_status) => {
    // console.log("564" , sw_id);
    const send = []
    const e = await wificonfig();
    ip_Add = e;

    const no = { "sl_no": sl_no, "id": sw_id, "hard_manual": hard_manual_status, "ip_Add": ip_Add }

    send.push(no);

    console.log("hard_manual_status payload", send);
    hard_manual_action(send).then(res => {
      if (res[0].hard_manual == 0) {
        alert(res[0].status)
      } else {
        alert(res[0].status)
      }
    })
    onRefresh();

  }



  // SETTING MOTION SENSIOR VALUE when rspi working
  const setMotion = async (status, location) => {
    const send = [];
    const e = await wificonfig();
    ip_Add = e;
    const no = { sl_no: sl_no, location: location, status: status, ip: ip_Add };
    send.push(no);
    // console.log('412 pir data Enable Disable payload', send);
    getActiveStatus(send).then(response => {
      // console.log('response for Enable disable api', response);
      Toast.show(response[0].status)
      init(sl_no);
    });
    onRefresh()
  };

  // SWITCH STATUS CHANGE WHEN RSPI WORK
  const change_status = async (id, status, speed) => {
    // console.log('411 id, status ', id, status, speed);
    // console.warn("417 switch clicked")

    const sl_no = await getSlno();
    const send = [];

    const e = await wificonfig();
    ip_Add = e;

    const payload = {
      ip: ip_Add,
      sl_no: sl_no,
      id: id,
      status: status,
      speed: speed,
    };

    send.push(payload);

    console.log('431 payload getStatus', send);
    getStatus(send).then(response => {
      console.log('438 response getStatus', response);
      init(sl_no);

      if (response[0].error) {
        Toast.show(response[0].error, Toast.LONG, Toast.TOP);
      }
    });
  };

  // FAN SPEED REGOLUTION

  const change_fan_speed = async (id, status, value) => {
    console.log("449", id, status, value)
    // getFanSpeedStatus("bhosadi key Mahesh Dalley")
    const sl_no = await getSlno();
    const send = [];

    const e = await wificonfig();
    ip_Add = e;
    // console.log("550 ip", ip_Add);

    const payload = {
      ip: ip_Add,
      sl_no: sl_no,
      id: id,
      status: status,
      value: value,
    };

    send.push(payload);
    // console.log("442", send)

    getFanSpeedStatus(send).then(response => {
      console.log('479 Slider Response', response);
      // setSliderValue (response[0].speed)
      init(sl_no);

      if (response[0].error) {
        Toast.show(response[0].error, Toast.LONG, Toast.TOP);
      }
    });
  };

  // TEM AND LUX SETTING WHEN RSPI OPEN
  const set_templux = async () => {
    const sl_no = await getSlno(); //getting sl-no from asyncronus data
    const e = await wificonfig();
    ip_Add = e;
    const send = [];
    const payload = {
      ip: ip_Add,
      sl_no: sl_no,
      location: area,
      temp_th: temparature,
      lum_th: luminosity,
      lum_method: lumMethod,
      pir_senst: pir_senstivity,
      // cut_off: cut_off,
      cut_off: spinnerValue,
      // cut_off:cut_off,
      fan_delay: fan_delay,
      // trans_time: transz

    };


    send.push(payload);


    setModalVisible(!modalVisible);

    console.log("min/Avg", send);
    setTempLux(send).then(response => {
      // console.log('Sessor Complete 422', response);
      init(sl_no);
      if (response[0].error) {
        Toast.show(response[0].error, Toast.LONG, Toast.TOP);
      }
    });
  };

  // not working properly
  const set_value = (temp_th, lux_th, lum_method, area, pir_senst, cut_off, fan_delay) => {


    // console.log("fdsgfdn" ,lum_method )
    setTemparature(temp_th)
    setLuminosity(lux_th)
    setLumMethod(lum_method)
    setarea(area);
    setCut_off(cut_off);
    // setPir_senstivity(pir_senst)
    setFan_delay(fan_delay);

    setModalVisible(true);
  };


  const set_IndividualBoardvalue = async (boardSensitivity, rpi_board_no) => {

    console.log("rpi_board_no", rpi_board_no);
    const sl_no = await getSlno(); //getting sl-no from asyncronus data
    const e = await wificonfig();
    ip_Add = e;
    const send = []
    const payload = {
      "sl_no": sl_no,
      "swb_no_rpi": rpi_board_no,
      "pir_senst": boardSensitivity,
      "ip": ip_Add
    }

    send.push(payload)

    console.log("individual board payload: ", send);
    setTempLux(send).then(res => console.log("757 response", res))

    // console.log("743", boardSensitivity, rpi_board_no);
  }


  const set_Anding = async (board_type, rpi_board_no) => {


    // console.log("dsfghfdfg", board_type, rpi_board_no);
    const sl_no = await getSlno(); //getting sl-no from asyncronus data
    const e = await wificonfig();
    ip_Add = e;
    const send = []
    const payload = {
      "sl_no": sl_no,
      "swb_no_rpi": rpi_board_no,
      "pir_join": board_type,
      // "pir_mode": board_type,
      "ip": ip_Add
    }

    send.push(payload)
    // setAnd_SelectedValue(board_type);

    console.log("individual Anding board payload: ", send);
    setTempLux(send).then(res => console.log("757 response", res))

    // console.log("743", boardSensitivity, rpi_board_no);
  }
  const set_pirType = async (board_type, rpi_board_no) => {


    // console.log("dsfghfdfg", board_type, rpi_board_no);
    const sl_no = await getSlno(); //getting sl-no from asyncronus data
    const e = await wificonfig();
    ip_Add = e;
    const send = []
    const payload = {
      "sl_no": sl_no,
      "swb_no_rpi": rpi_board_no,
      "pir_mode": board_type,
      "ip": ip_Add
    }

    send.push(payload)
    // setAnd_SelectedValue(board_type);

    console.log("individual Anding board payload: ", send);
    setTempLux(send).then(res => console.log("757 response", res))

    // console.log("743", boardSensitivity, rpi_board_no);
  }

  //initializing switchschedule data{not understanding}

  const switchinit = switchid => {
    id = switchid;
    const send = [];
    const data = { sl_no: sl_no, id: switchid };
    send.push(data);

    // console.log("680 scheduling data ", send);
    switchDetails(send).then(response => {
      // console.log('switch sechdule data 459', JSON.stringify(response));
      settimeData(response);
      setLoading(false);
      setRefreshing(false);
      settimeModalVisible(true);
    });
  };

  const toggleSwitch = (index, item) => {
    // console.log('541 index', 'item', index, item);

    let temptime = [...timeData];
    // console.log('temptime', timeData);

    temptime[index - 1].is_activated = item;
    // console.log('temptime', temptime[0].is_activated);

    settimeData(temptime);

    const send = [];
    const data = {
      sl_no: sl_no,
      id: id,
      on_time: temptime[index - 1].on_time,
      off_time: temptime[index - 1].off_time,
      is_activated: item,
      days: temptime[index - 1].days,
    };
    send.push(data);
    console.log('Active Payload scheduleactivate', JSON.stringify(send));
    scheduleChanges(send).then(response => {
      console.log('active/inactive response', response);
      switchinit(id);
      if (response) {
        Toast.show(response, Toast.LONG, Toast.TOP);
      }
    });
  };

  const delete_schedule = index => {
    let temptime = [...timeData];
    // console.log("temptime" , temptime);
    const send = [];
    const data = {
      sl_no: sl_no,
      id: id,
      on_time: temptime[index - 1].on_time,
      off_time: temptime[index - 1].off_time,
      days: temptime[index - 1].days,
    };
    send.push(data);
    console.log("Delete send payload", JSON.stringify(send));
    Delete_schedule(send).then(response => {
      // console.log("delete res" , response);

      switchinit(id);
      if (response) {
        Toast.show(response, Toast.LONG, Toast.TOP);
      }
    });
  };

  const convertTimeFrom = (index, ontime) => {
    let data = ontime.split(':');
    let hour = data[0];
    let mins = data[1];

    const suffix = hour >= 12 ? 'PM' : 'AM';
    const hours = hour % 12 || 12;

    return (
      <Text>
        {hours}:{mins} {suffix}
      </Text>
    );
  };

  const convertTimeTo = (index, offtime) => {
    let data = offtime.split(':');
    let hour = data[0];
    let mins = data[1];
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const hours = hour % 12 || 12;

    // console.log(hours + ':' + mins + ':' + suffix);
    return (
      <Text>
        {hours}:{mins} {suffix}
      </Text>
    );
  };

  //Add_Timer Coder
  useEffect(() => {
    //reciving date from system current
    let tempDate = new Date();
    let hours = tempDate.getHours();
    let AmOrPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    var mins = tempDate.getMinutes();
    var minutes;
    if (mins <= 9) {
      minutes = '0' + mins;
    } else {
      minutes = mins;
    }

    var finalTime = hours + ':' + minutes + ' ' + AmOrPm;
    let fTime =
      tempDate.getHours() + ' : ' + tempDate.getMinutes() + ':' + '00';

    setDispFrom(finalTime);
    setDispTo(finalTime);
    return () => { };
  }, []);

  const toggle = index => {
    const newData = [...days];
    newData.splice(index, 1, {
      day: days[index].day,
      status: !days[index].status,
    });
    setdays(newData);
  };

  const apiCallAddschedule = () => {
    const send = [];

    if (payloadFrom == null || payloadTo == null) {
      Toast.show('please select Timings', Toast.LONG, Toast.TOP);
    } else {
      const data = {
        sl_no: sl_no,
        id: id,
        on_time: payloadFrom,
        off_time: payloadTo,
        days: days,
      };

      // console.log('Addschedulepayload', data);
      send.push(data);
      console.log('payload Schedueled Saved', JSON.stringify(send));
      // console.log('payload', send);
      setTimer(send).then(response => {
        console.log('662 response', JSON.stringify(response));

        switchinit(id);
        if (response === 'Switch scheduled!!') {

          setaddModalVisible(false);

          // console.log("switchinit called");
        } else {
          Toast.show(response, Toast.LONG, Toast.TOP);
          setaddModalVisible(false);
        }
      });
    }
  };

  const apiCall2 = () => {
    const send = [];
    const data = {
      sl_no: sl_no,
      id: id,
      on_time: payloadFrom,
      off_time: payloadTo,
      days: days,
      old_days: oldscheduleTime.days,
      old_on_time: oldscheduleTime.on_time,
      old_off_time: oldscheduleTime.off_time,
    };
    send.push(data);
    // console.log('editpayload', JSON.stringify(send));

    updateScheduleSwitch(send).then(response => {
      // console.log('Editresponse updateScheduleSwitch', response);

      if (response === 'updated') {
        Toast.show(response, Toast.LONG, Toast.TOP);
        seteditModalVisible(false);
        switchinit(id);
      } else {
        Toast.show(response, Toast.LONG, Toast.TOP);
        setModalVisible(false);
      }
    });
  };

  const onChangeFrom = selectedDate => {
    const currentDate = selectedDate || dateT;
    setOpenTo(Platform.OS === 'ios');
    setdateF(currentDate);
    let tempDateF = new Date(currentDate);
    var minsF = tempDateF.getMinutes();
    var minutesF;
    if (tempDateF.getMinutes() <= 9) {
      minutesF = '0' + minsF;
      // console.log("1", minutesF);
    } else {
      minutesF = minsF;
      // console.log("2", minutesF);
    }
    var finalTimeF = tempDateF.getHours() + ':' + minutesF + ':00';
    // console.log("final time", finalTimeF);
    setPayloadForm(finalTimeF);

    var hours = tempDateF.getHours();
    var AmOrPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    var finalTime = hours + ':' + minutesF + ' ' + AmOrPm;
    // let fTime = tempDateF.getHours() + ' : ' + tempDateF.getMinutes() + ':' + '00';
    setDispFrom(finalTime);
  };

  const onChangeTo = selectedDate => {
    const currentDate = selectedDate || dateT;
    setOpenTo(Platform.OS === 'ios');
    setdateT(currentDate);
    let tempDate = new Date(currentDate);
    var mins = tempDate.getMinutes();
    var minutes;
    if (tempDate.getMinutes() <= 9) {
      minutes = '0' + mins;
      // console.log("1", minutes);
    } else {
      minutes = mins;
      // console.log("2", minutes);
    }
    var finalTime = tempDate.getHours() + ':' + minutes + ':00';
    // console.log('amar curent date selected', finalTime);
    setPayloadTo(finalTime);

    var hoursz = tempDate.getHours();
    var AmOrPmz = hoursz >= 12 ? 'pm' : 'am';
    hoursz = hoursz % 12 || 12;
    var finalTimez = hoursz + ':' + minutes + ' ' + AmOrPmz;
    // let fTime = tempDateF.getHours() + ' : ' + tempDateF.getMinutes() + ':' + '00';
    setDispTo(finalTimez);
  };

  const showModeFrom = currentMode => {
    setOpen(true);
    // console.log("modal exicuting");
    setModeFrom(currentMode);
    // console.log("setmodefrom exicuting");
  };

  const showModeTo = currentMode => {
    setOpenTo(true);
    setModeTo(currentMode);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////
  //Adding mode in modal view
  const [modemodal, setmodeModal] = useState(false);
  const [modelocation, setmodeLocation] = useState([]);
  const [modeVal, setModeVal] = useState([]);
  const [modalVisiblename, setModalVisiblename] = useState(false);
  const [modeTimevisible, setmodeTimeVisible] = useState(false);

  //Setting the location for AddMode
  const [Addlocation, setAddlocation] = useState('');
  const [openTimemodal, setOpenTimemodal] = useState(false);
  const [openTimemodal2, setOpenTimemodal2] = useState(false);
  const [modedispFrom, setmodeDispFrom] = useState();
  const [modedispTo, setmodeDispTo] = useState();
  const [modepayloadFrom, setmodePayloadFrom] = useState(null);
  const [modepayloadTo, setmodePayloadTo] = useState(null);

  //Selecting Switches Details
  const [switchVisible, setswitchVisible] = useState(false);
  const [slocation, setslocation] = useState([]);
  const [sliderValue, setSliderValue] = useState();

  // console.log("sliderValue " , sliderValue);

  const [data, setData] = React.useState({
    mode: '',
    check_textInputChange: false,
    isValidUser: true,
  });

  const modetoggleSwitch = (index, item, mode, location) => {
    console.log('index,item,mode,location', index, item, mode, location);
    //there we are extracting location data but we have only the modelocation
    let templocation = [...modelocation];
    templocation[index - 1].mode_active_status = item;
    console.log('mode templocation', templocation);
    setmodeLocation(templocation);
    // // console.log(location);
    modeSwitchsData(item, mode, location);
  };

  const dateFrom = currentMode => {
    setOpenTimemodal(true);
    // console.log('modal exicuting');
    setModeFrom(currentMode);
    // console.log('setmodefrom exicuting');
  };

  const dateTo = currentMode => {
    setOpenTimemodal2(true);
    setModeTo(currentMode);
  };

  // const modeinit = locdata => {
  //   setmodeModal(true);
  //   const send = [];
  //   const no = { sl_no: sl_no, location: locdata };
  //   send.push(no);
  //   setLoading(false);
  //   setRefreshing(false);

  //   modeDetails(send).then(response => {
  //     console.log("967 response", JSON.stringify(response[0]['mode_details']));
  //     setmodeLocation(response);

  //   });
  // };

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        mode: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        mode: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const modeSwitchsData = (data, mode, loc) => {
    // console.log("modeswitchpayload", data, mode, loc);
    const send = [];
    const payload = { sl_no: sl_no, location: loc, mode: mode, status: data };
    send.push(payload);
    // console.log('modeswitchdata', send);
    _changeSwitch(send).then(response => {
      // console.log(response, 'change_switch_response');
      modeinit(loc);
    });
  };

  const DeleteMode = (mode, locdata) => {
    // console.log("deletecalled", mode, locdata);
    let send = [];
    const payload = { sl_no: sl_no, location: locdata, mode: mode };
    send.push(payload);
    // console.log(send);
    delete_Mode(send).then(response => {
      Toast.show(response, Toast.LONG, Toast.TOP);
      modeinit(locdata);
      // console.log(response, 'data');
    });
  };

  const checkMode = modename => {
    // console.log("newmodeName", modename);
    if (modename.trim().length >= 4) {
      addNewMode(modename);
      setModalVisiblename(!modalVisiblename);
    } else {
      Alert.alert('Wrong Input!', 'Mode field should be 4 character', [
        { text: 'Okay' },
      ]);
      return;
    }

    // console.log('modename', modename);
  };

  const addNewMode = modename => {
    const send = [];
    const no = { sl_no: sl_no, location: Addlocation, mode: modename };
    send.push(no);

    dummy(send).then(response => {

      setLoading(false);
      setRefreshing(false);

    });
    setLoading(true);
    _addmode(modeVal).then(response => {

      Toast.show(response, Toast.LONG, Toast.TOP);
      modeinit(Addlocation);
    });
  };

  const modetoggle = index => {
    const newData = [...days];
    newData.splice(index, 1, {
      day: days[index].day,
      status: !days[index].status,
    });
    setdays(newData);
  };

  // FUNCTION CALL ON MODE
  const apiCall = locdata => {
    const send = [];
    if (modepayloadFrom == null || modepayloadTo == null) {
      Toast.show('please select Timings', Toast.LONG, Toast.TOP);
    } else {
      const data = {
        sl_no: sl_no,
        mode: modes,
        location: Addlocation,
        on_time: modepayloadFrom,
        off_time: modepayloadTo,
        days: days,
      };
      send.push(data);
      // console.log('payload MODE TIME', JSON.stringify(send));
      getSchedule(send).then(response => {
        // console.log('GETTING RESPONSE getSchedule', JSON.stringify(response));
        if (response === 1) {
          Toast.show('Time added succesfully');
          // Toast.show(response, Toast.LONG, Toast.TOP);
          // console.log('exicute2');
          setmodeTimeVisible(false);
          modeinit(Addlocation);
          // navigation.navigate('modes');
        } else {
          Toast.show(response, Toast.LONG, Toast.TOP);
        }
      });
    }
  };

  const modeonChangeFrom = selectedDate => {
    // console.log("date", selectedDate)
    const currentDate = selectedDate || dateF;
    setOpenTimemodal(Platform.OS === 'ios');
    setdateF(currentDate);

    // Process the date values
    let tempDate = new Date(currentDate);
    var hours = tempDate.getHours();
    const str = tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + '00';
    setmodePayloadFrom(str);
    var AmOrPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    var mins = tempDate.getMinutes();
    var minutes;
    if (mins <= 9) {
      minutes = '0' + mins;
      // console.log('1', minutes);
    } else {
      minutes = mins;
    }
    // console.log("NEW", minutes);
    var finalTime = hours + ':' + minutes + ' ' + AmOrPm;
    let fTime =
      tempDate.getHours() + ' : ' + tempDate.getMinutes() + ':' + '00';
    setmodeDispFrom(finalTime);
    // setfromTime(fTime);
    //need to set AM/PM values
    setmodePayloadFrom(finalTime);
  };

  const modeonChangeTo = selectedDate => {
    const currentDate = selectedDate || dateT;
    setOpenTimemodal2(Platform.OS === 'ios');
    setdateT(currentDate);

    // Process the date values
    let tempDate = new Date(currentDate);
    var hours = tempDate.getHours();
    const str = tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + '00';
    setmodePayloadTo(str);
    var AmOrPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    var mins = tempDate.getMinutes();
    var minutes;
    if (mins <= 9) {
      minutes = '0' + mins;
    } else {
      minutes = mins;
    }

    var finalTime = hours + ':' + minutes + ' ' + AmOrPm;
    let fTime =
      tempDate.getHours() + ' : ' + tempDate.getMinutes() + ':' + '00';
    setmodeDispTo(finalTime);
    setTimer(fTime);
    setmodePayloadTo(finalTime);
  };

  //Applaying Selecting Switches in Modal
  //Status data updating based on recently changed sw status
  const call = slocation => {
    updateSwitch(slocation).then(response => {
      Toast.show(response, Toast.LONG, Toast.TOP);
    });
  };

  const sinit = (mode, locdata) => {
    switchDetails;
    setswitchVisible(true);
    const send = [];
    const no = { sl_no: sl_no, location: locdata, mode: mode };
    send.push(no);
    modeswitchDetails(send).then(response => {
      setslocation(response);
      setLoading(false);
      setRefreshing(false);
    });
  };

  //changing the Switch Status data not reciving frswitchDetailsm api
  // const modechange_status = async () => {
  //   const sl_no = await getSlno();
  //   const payload = {
  //     sl_no: sl_no,
  //     location: 'Hall',
  //     mode: 'work',
  //     status: status,
  //   };
  //   const send = [];
  //   send.push(payload);
  // };

  //AM | PM Time schedule
  function fromConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1, 4); // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }

  function toConvert(time) {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      // If time format correct
      time = time.slice(1, 4); // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }

  // 12 to 24 converter
  function fromconvertTime12To24(time) {
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM === 'PM' && hours < 12) hours = hours + 12;
    if (AMPM === 'AM' && hours === 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = '0' + sHours;
    if (minutes < 10) sMinutes = '0' + sMinutes;
    return sHours + ':' + sMinutes;
  }

  function toconvertTime12To24() {
    var time = '12:02:PM';
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM === 'PM' && hours < 12) hours = hours + 12;
    if (AMPM === 'AM' && hours === 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = '0' + sHours;
    if (minutes < 10) sMinutes = '0' + sMinutes;
    // return console.log('converting', sHours + ':' + sMinutes);
    // return setoffScheduletime(sHours + ":" + sMinutes);
  }


  const calculateSpinnerValue = (fan_delay) => {
    if (fan_delay < 60) {
      return 1
    } else if (fan_delay >= 60 && fan_delay < 120) {
      return 2
    } else if (fan_delay >= 120 && fan_delay < 180) {
      return 3
    } else if (fan_delay = 180) {
      return 4
    }
  };

  const [spinnerValue, setSpinnerValue] = useState()
  // console.log("spinnerValue", spinnerValue);
  // const spinnerValue = calculateSpinnerValue(fan_delay);
  useEffect(() => {
    setSpinnerValue(calculateSpinnerValue(fan_delay));
  }, [fan_delay]);




  const addMoreButton = () => {
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (newButtonName.trim() !== "") {
      const newButton = newButtonName.trim();
      setModeButtons([...modebuttons, newButton]);
      setNewButtonName("");
      setShowForm(false);
    }
  };



  return (
    <View style={styles.centeredView}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'light-content'} />
      <StatusBar backgroundColor={theme.dark ? '#1a1f25' : '#117C6F'} />
      <Text></Text>

      <View style={styles.modes} >

        {/* HoriZontal Modes Scroll Should be come here  */}
        <View>

          {modebuttons.map((button, index) => (

            <View>
              {/* Default Modes */}
              <ScrollView horizontal>
                {
                  button.instant != []

                    ?
                    (
                      button.instant?.map((modeData => (




                        modeData.status != 0 ?
                          (
                            <TouchableOpacity
                              style={styles.modethemOn}
                              onPress={() => G_ModeChange(
                                modeData.name,
                                modeData.status = '0'

                              )}
                              onLongPress={() => {
                                // console.log("long pres");
                                handleDeleteG_mode(modeData.name)
                              }}
                            >
                              <View key={index} style={styles.buttonContainer}>
                                <Text style={styles.modetitleButtonOn}  >{modeData.name.toUpperCase()}</Text>

                              </View>
                            </TouchableOpacity>

                          )

                          :

                          (
                            <TouchableOpacity
                              style={styles.modethemOff}
                              onPress={() => G_ModeChange(
                                modeData.name,
                                modeData.status = '1'

                              )}

                              onLongPress={() => {
                                console.log("long pres");
                                handleDeleteG_mode(modeData.name)
                              }}
                            >
                              <View key={index} style={styles.buttonContainer}>
                                <Text style={styles.modetitleButtonOff}  >{modeData.name.toUpperCase()}</Text>


                              </View>
                            </TouchableOpacity>
                          )

                      )))
                    )

                    :

                    null


                }
              </ScrollView>

              {/* Timeed Modes  */}
              <ScrollView horizontal>
                {
                  button.time != []

                    ?
                    (
                      button.time?.map((modeData => (

                        modeData.status != 0 ?
                          (
                            <TouchableOpacity
                              style={styles.modethemOn}
                              onPress={() => G_ModeChange(
                                modeData.name,
                                modeData.status = '0'

                              )}
                              onLongPress={() => {
                                // console.log("long pres");
                                handleDeleteG_mode(modeData.name)
                              }}
                            >
                              <View key={index} style={styles.customeModeBoxON}>
                                <View style={styles.customeModeTime}>
                                  <Text style={styles.modetitleButtonOn}>{modeData.time_on.substring(0, 5)}</Text>
                                  <Text style={styles.modetitleButtonOn}>{modeData.time_off.substring(0, 5)}</Text>
                                </View>

                                <Text style={styles.modetitleButtonOn}  >{modeData.name.toUpperCase()}</Text>


                                <View style={styles.customeModeDays}>
                                  <Text style={styles.modetitleButtonOn}>{modeData.days}</Text>
                                </View>

                              </View>
                            </TouchableOpacity>

                          )

                          :

                          (
                            <TouchableOpacity
                              style={styles.modethemOff}
                              onPress={() => G_ModeChange(
                                modeData.name,
                                modeData.status = '1'

                              )}

                              onLongPress={() => {
                                console.log("long pres");
                                handleDeleteG_mode(modeData.name)
                              }}
                            >
                              <View key={index} style={styles.customeModeBoxOff}>
                                <View style={styles.customeModeTime}>
                                  <Text style={styles.timeValue}>{modeData.time_on.substring(0, 5)}</Text>
                                  <Text style={styles.timeValue}>{modeData.time_off.substring(0, 5)}</Text>
                                </View>

                                <Text style={styles.modetitleButtonOff}  >{modeData.name.toUpperCase()}</Text>


                                <View style={styles.customeModeDays}>
                                  <Text style={styles.timeValue}>{modeData.days}</Text>
                                </View>

                              </View>
                            </TouchableOpacity>
                          )

                      )))
                    )

                    :

                    null


                }
              </ScrollView>
            </View>
          ))}


        </View>

      </View>


      {/* Modal for Add Modes */}

      <View style={styles.centeredView}>
        <View style={styles.Addschedulemodal}>
          <SafeAreaView>
            {

              (
                <>
                  <View style={styles.centeredView}>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={g_ModeForm}
                      onRequestClose={() => {
                        setG_ModeForm(!g_ModeForm);
                      }}>
                      <BlurView
                        style={styles.blurView}
                        blurType="dark" // Values = dark, light, xlight .
                        blurAmount={10}
                        reducedTransparencyFallbackColor="white"
                      />
                      <View style={styles.centeredView}>
                        <View style={styles.modalViewtimemodal}>
                          <Text style={styles.modalText}>
                            Add Your Modes
                          </Text>
                          <TextInput
                            label="Enter New Mode"
                            mode="outlined"
                            value={g_modeName}
                            onChangeText={setG_modeName}
                            style={{ marginBottom: 10 }}
                          />


                          <>
                            <View style={{ flexDirection: 'row' }}>
                              <Text></Text>
                              <TouchableOpacity
                                onPress={() => showModeFrom('time')}>
                                <View style={styles.cardthemOff}>
                                  <View style={styles.textArea}>
                                    <Text style={styles.titleButtonOffT}>
                                      {dispFrom}
                                    </Text>
                                  </View>
                                </View>
                              </TouchableOpacity>
                              <Text
                                style={{
                                  color: colors.modaltitletext,
                                  marginTop: 22,
                                  marginLeft: 10,
                                }}>
                                To
                              </Text>
                              <TouchableOpacity
                                onPress={() => showModeTo('time')}>
                                <View style={styles.cardthemOff}>
                                  <View style={styles.textArea}>
                                    <Text style={styles.titleButtonOffT}>
                                      {dispTo}
                                    </Text>
                                  </View>
                                </View>
                              </TouchableOpacity>
                              <View style={styles.cardboard}>
                                <DatePicker
                                  modal
                                  open={open}
                                  mode="time"
                                  date={dateF}
                                  onConfirm={date => {
                                    setOpen(false);
                                    onChangeFrom(date);
                                  }}
                                  onCancel={() => {
                                    setOpen(false);
                                  }}
                                />

                                <DatePicker
                                  modal
                                  open={openTo}
                                  mode="time"
                                  date={dateT}
                                  onConfirm={date => {
                                    setOpenTo(false);
                                    onChangeTo(date);
                                  }}
                                  onCancel={() => {
                                    setOpenTo(false);
                                  }}
                                />
                              </View>
                            </View>


                            {days.map((item, index) => (
                              <View style={{ flexDirection: 'row' }}>
                                <CheckBox
                                  key={item.id}
                                  // title={item.label}
                                  disabled={false}
                                  // checked={item.checked}
                                  value={item.status}
                                  onValueChange={() => toggle(index)}
                                />
                                <Text style={styles.titleButtonOffT}>
                                  {item.day}
                                </Text>
                              </View>

                            ))}

                            {/* Mode SAVE */}

                            <TouchableOpacity
                              onPress={() => handleModeAdd()}>
                              <View style={styles.Buttonsave}>
                                <View style={styles.textAreasave}>
                                  <Text style={styles.titlesave}>Save </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </>

                        </View>
                      </View>
                    </Modal>
                  </View>
                </>

              )}


          </SafeAreaView>
        </View>
      </View>


      {/* AutoMation DashBoard For Automation setting */}

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={automationModel}
          onRequestClose={() => {
            setAutomationModel(!automationModel);

          }}>
          <BlurView
            style={styles.blurView}
            blurType="light" // Values = dark, light, xlight .
            blurAmount={10}
            // viewRef={this.state.viewRef}
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.switchmodalView}>
            <SafeAreaView>
              <ScrollView
                style={styles.scrollView}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }>
                <View>
                  {automationDashboardData?.map(data => {
                    // console.log("2730 data" , data)
                    return (
                      <View>

                        <Text
                          style={{
                            fontSize: 30,
                            fontWeight: 'bold',
                            color: colors.modaltitletext,
                          }}>
                          {data.location}
                        </Text>

                        {data.boards.map(board => {
                          return (
                            <View style={styles.switchcard}>
                              <View
                                style={{ flexDirection: 'row' }}>
                                {board.switches.map(swi => {

                                  // console.log("1614 swi", swi);
                                  return (
                                    <>
                                      {/* <View style={{ flexDirection: 'row' }}><Text>{swi.sw}</Text></View> */}
                                      {swi['auto_mode'] != 0 ? (
                                        <TouchableOpacity
                                          onPress={() => {
                                            automationChange(
                                              swi['auto_mode'] = 0,
                                              swi.id,
                                              onRefresh()
                                            )
                                          }}>
                                          <View
                                            style={
                                              styles.cardthemOn
                                            }>
                                            <View
                                              style={
                                                styles.textArea
                                              }>
                                              <Text
                                                style={
                                                  styles.titleButtonOn
                                                }>
                                                {/* {swi['sw'][0]} */}
                                                {getIconForSwitch(swi['sw'][0].toUpperCase())}
                                              </Text>
                                            </View>
                                          </View>
                                        </TouchableOpacity>
                                      )

                                        :

                                        (
                                          <TouchableOpacity
                                            onPress={() => {
                                              automationChange(

                                                swi['auto_mode'] = 1,
                                                swi.id,

                                                onRefresh()
                                              )
                                            }}>
                                            <View
                                              style={
                                                styles.cardthemOff
                                              }>
                                              <View
                                                style={
                                                  styles.textArea
                                                }>
                                                <Text
                                                  style={
                                                    styles.titleButtonOff
                                                  }>
                                                  {/* {swi['sw'][0]} */}
                                                  {getIconForSwitch(swi['sw'][0].toUpperCase())}
                                                </Text>
                                              </View>
                                            </View>
                                          </TouchableOpacity>
                                        )}
                                    </>
                                  );
                                })}
                                {/* <Text style={styles.switchboardtitle}>{board.switchBoardId}</Text> */}
                              </View>
                              <View
                                style={{
                                  position: 'absolute',
                                  right: 0,
                                  marginRight: 10,
                                }}>
                                <Text
                                  style={styles.switchboardtitle}>
                                  {/* {board.switchBoardId} */}
                                </Text>
                              </View>
                            </View>
                          );
                        })}

                        {data.Bat != null
                          ? data.Bat.map(b => {
                            return (
                              <>
                                <View style={styles.switchcard}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                    }}>
                                    {b.switches.map((s, i) => (
                                      <>
                                        {s['status'] != 0 ? (
                                          <TouchableOpacity
                                            onPress={() => {
                                              modechange_status(
                                                s['id'],
                                                (s['status'] =
                                                  '0'),
                                              );
                                              // console.log(
                                              //   s['id'],
                                              // ),
                                              //   console.log(
                                              //     s['status'],
                                              //   );
                                              onRefresh();
                                            }}>
                                            <View
                                              style={
                                                styles.cardthemOn
                                              }>
                                              <View
                                                style={
                                                  styles.textArea
                                                }>
                                                <Text
                                                  style={
                                                    styles.titleButtonOn
                                                  }>
                                                  {s['sw'][0]}
                                                </Text>
                                              </View>
                                            </View>
                                          </TouchableOpacity>
                                        ) : (
                                          <TouchableOpacity
                                            onPress={() => {
                                              modechange_status(
                                                s['id'],
                                                (s['status'] =
                                                  '1'),
                                              );
                                              // console.log(
                                              //   s['id'],
                                              // ),
                                              //   console.log(
                                              //     s['status'],
                                              //   );
                                              onRefresh();
                                            }}>
                                            <View
                                              style={
                                                styles.cardthemOff
                                              }>
                                              <View
                                                style={
                                                  styles.textArea
                                                }>
                                                <Text
                                                  style={
                                                    styles.titleButtonOff
                                                  }>
                                                  {s['sw'][0]}
                                                </Text>
                                              </View>
                                            </View>
                                          </TouchableOpacity>
                                        )}
                                      </>
                                    ))}
                                    {/* <Text style={styles.switchboardtitle}>{b.switchBoardId}</Text> */}
                                  </View>
                                  <View
                                    style={{
                                      position: 'absolute',
                                      right: 0,
                                      marginRight: 10,
                                    }}>
                                    <Text
                                      style={
                                        styles.switchboardtitle
                                      }>
                                      {/* {b.switchBoardId} */}
                                    </Text>
                                  </View>
                                </View>
                              </>
                            );
                          })
                          : null}

                        {data.Bal != null
                          ? data.Bal.map(b => {
                            return (
                              <>
                                <View style={styles.switchcard}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                    }}>
                                    {b.switches.map((s, i) => (
                                      <>
                                        {s['status'] != 0 ? (
                                          <TouchableOpacity
                                            onPress={() => {
                                              modechange_status(
                                                s['id'],
                                                (s['status'] =
                                                  '0'),
                                              );
                                              onRefresh();
                                              // console.log(
                                              //   s['id'],
                                              // ),
                                              //   console.log(
                                              //     s['status'],
                                              //   );
                                            }}>
                                            <View
                                              style={
                                                styles.cardthemOn
                                              }>
                                              <View
                                                style={
                                                  styles.textArea
                                                }>
                                                <Text
                                                  style={
                                                    styles.titleButtonOn
                                                  }>
                                                  {s['sw'][0]}
                                                </Text>
                                              </View>
                                            </View>
                                          </TouchableOpacity>
                                        ) : (
                                          <TouchableOpacity
                                            onPress={() => {
                                              modechange_status(
                                                s['id'],
                                                (s['status'] =
                                                  '1'),
                                              );
                                              onRefresh();
                                              // console.log(
                                              //   s['id'],
                                              // ),
                                              //   console.log(
                                              //     s['status'],
                                              //   );
                                            }}>
                                            <View
                                              style={
                                                styles.cardthemOff
                                              }>
                                              <View
                                                style={
                                                  styles.textArea
                                                }>
                                                <Text
                                                  style={
                                                    styles.titleButtonOff
                                                  }>
                                                  {s['sw'][0]}
                                                </Text>
                                              </View>
                                            </View>
                                          </TouchableOpacity>
                                        )}
                                      </>
                                    ))}
                                  </View>
                                  <View
                                    style={{
                                      position: 'absolute',
                                      right: 0,
                                      marginRight: 10,
                                    }}>
                                    <Text
                                      style={
                                        styles.switchboardtitle
                                      }>
                                      {/* {b.switchBoardId} */}
                                    </Text>
                                  </View>
                                </View>
                              </>
                            );
                          })
                          : null}
                      </View>
                    );
                  })}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 10,
                  }}>
                  {/* <View>
                    <TouchableOpacity
                      style={{
                        width: 100,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,
                        marginBottom: 10,
                        backgroundColor: colors.modalbuttons,
                      }}
                      onPress={() => {
                        call(slocation);
                      }}>

                      <Text
                        style={[
                          styles.textSign,
                          {
                            color: colors.modaltitletext,
                            fontWeight: 'bold',
                          },
                        ]}>
                        Submit
                      </Text>
                      
                    </TouchableOpacity>
                  </View> */}
                  <View >
                    <TouchableOpacity
                      style={{
                        width: 100,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,
                        marginBottom: 10,
                        backgroundColor: colors.modalbuttons,
                      }}
                      onPress={() => {
                        setAutomationModel(!automationModel)
                        onRefresh()

                      }

                      }

                    >
                      <Text
                        style={[
                          styles.textSign,
                          {
                            color: colors.modaltitletext,
                            fontWeight: 'bold',
                          },
                        ]}>
                        Close
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          </View>
        </Modal>
      </View>


      {/* TEMPERATURE SETTING */}

      <SafeAreaView>

        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>



          {/*! Auto/Manula Mode Button */}
          <View style={{
            flexDirection: 'row',
            flexDirection: "row-reverse",
            justifyContent: 'space-between',
            alignItems: 'center',
            // marginTop: 10,
            // marginBottom: 10,
            // marginLeft: 10,
            marginRight: 8,
          }} >

            {
              loadingPir ? (
                <View>
                  <ActivityIndicator size="small" color="#ffffff" />
                </View>
              )

                :

                (
                  <View
                    style={{
                      width: "auto",
                      display: "flex",
                      alignSelf: "flex-end",
                      paddingTop: 15
                    }}
                  >
                    {isEnabled ?

                      (
                        <View>
                          <Text
                            style={{

                              fontSize: 14,
                              color: colors.locationtext,
                              fontWeight: 'bold',

                            }}>

                            Automation
                          </Text>
                          <TouchableOpacity
                            style={{
                              width: 50,
                            }}
                            onPress={() => {
                              {
                                // setMotion(false)
                                getpirdata("0");
                              }
                            }}

                            onLongPress={() =>
                              autoMationDash()
                            }

                          >
                            <Icon
                              name="motion-sensor"
                              color={colors.locationtext}
                              size={45}
                            />
                          </TouchableOpacity>
                        </View>
                      )

                      :

                      (
                        <TouchableOpacity
                          style={{ marginRight: 15 }}
                          onPress={() => {
                            {
                              //  setMotion(true)
                              getpirdata("1");
                            }
                          }}>
                          <Ico name="motion-sensor-off" color="grey" size={25} />
                        </TouchableOpacity>
                      )}

                  </View>
                )
            }


            {
              <View>
                <TouchableOpacity
                  onPress={
                    () => {
                      setdays(options);
                      setG_ModeForm(true)
                      // handleModeAdd()
                    }
                  }
                  style={styles.addButton}>
                  <Text style={{ color: '#000000', fontWeight: 'bold' }}>Add Modes</Text>
                </TouchableOpacity>
              </View>
            }
          </View>



          {/* MODAL FOR SETTING TEMPERATURE LUMINOSITY PIR SENSOR */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalView}>
              <View >
                {/* TEMPERATURE */}

                <View
                  style={[styles.rowicon, { justifyContent: 'space-between' }]}>
                  <Text style={styles.modelTitle}>Temperature</Text>

                  <InputSpinner
                    max={50}
                    min={20}
                    step={1}
                    colorMax={'#f04048'}
                    colorMin={'#40c5f4'}
                    textColor={colors.modaltitletext}
                    value={temparature}
                    onChange={num => {
                      console.log("temp", num);
                      // settemparature(num)
                      setTemparature(num)
                      // temparature = num;
                    }}
                  />
                </View>
                <Text></Text>

                {/* LUMINOSITY */}
                <View
                  style={[styles.rowicon, { justifyContent: 'space-between' }]}>
                  <Text style={styles.modelTitle}>Luminosity</Text>

                  <InputSpinner
                    max={200}
                    min={20}
                    step={1}
                    colorMax={'#f04048'}
                    colorMin={'#40c5f4'}
                    textColor={colors.modaltitletext}
                    value={luminosity}
                    onChange={lum => {
                      console.log("lum: " + lum);
                      setLuminosity(lum)
                      // luminosity = lum;
                    }}
                  />
                </View>


                <View style={styles.container}>
                  <View>
                    <Text style={styles.modelTitle}>Luminosity </Text>
                    <Text>(Calculation)</Text>
                  </View>

                  <View style={styles.checkboxContainer}>
                    <CheckBox

                      disabled={false}
                      value={lumMethod == "minimum"}
                      onValueChange={() => setLumMethod("minimum")}
                    />
                    <Text style={styles.label}>Min</Text>
                  </View>
                  <View style={styles.checkboxContainer}>
                    <CheckBox

                      disabled={false}
                      value={lumMethod == "average"}
                      onValueChange={() => setLumMethod("average")}
                    />
                    <Text style={styles.label}>Avg</Text>
                  </View>
                </View>

                <Text></Text>

                {/* CUT OFF TIME */}
                <View
                  style={[styles.rowicon, { justifyContent: 'space-between' }]}>
                  <View>
                    <Text style={styles.modelTitle}>Cut OFF Time</Text>
                    <Text>(in min.)</Text>

                  </View>


                  <InputSpinner
                    max={10}
                    min={1}
                    step={1}
                    colorMax={'#f04048'}
                    colorMin={'#40c5f4'}
                    textColor={colors.modaltitletext}
                    value={spinnerValue}

                    onChange={cutOff => {
                      // setCut_off(cutOff);
                      // console.log("cut off", cutOff);
                      setSpinnerValue(cutOff);
                      // setCut_off(cutOff);
                    }}

                  />

                </View>

                <Text></Text>

                {/* Fan Delay Time */}
                <View
                  style={[styles.rowicon, { justifyContent: 'space-between' }]}>
                  <View>
                    <Text style={styles.modelTitle}>Fan Delay Time </Text>
                    <Text>(in sec)</Text>
                  </View>

                  <InputSpinner
                    max={180}
                    min={10}
                    step={10}
                    colorMax={'#f04048'}
                    colorMin={'#40c5f4'}
                    textColor={colors.modaltitletext}
                    value={fan_delay}
                    onChange={del => {
                      console.log("fan_delay", del);
                      setFan_delay(del)
                      // fan_delay = del;
                    }}
                  />
                </View>
                <Text></Text>

                {/* PIR TRANSITION TIME */}
                {/* <View
                  style={[styles.rowicon, { justifyContent: 'space-between' }]}>
                  <View>
                    <Text style={styles.modelTitle}>Transition Time</Text>

                  </View>

                  <InputSpinner
                    max={10}
                    min={1}
                    step={1}
                    colorMax={'#f04048'}
                    colorMin={'#40c5f4'}
                    textColor={colors.modaltitletext}
                    value={trans_time}
                    onChange={trnsitionTime => {
                      setTrans_time(trnsitionTime)
                      // pir_time = num;
                    }}
                  />
                </View> */}

                <Text></Text>

                {/* POST CUTOFF TRANSITION TIME */}
                {/* <View
                  style={[styles.rowicon, { justifyContent: 'space-between' }]}>
                  <View>
                    <Text style={styles.modelTitle}>Post Transition Check Time</Text>
                  </View>

                  <InputSpinner
                    max={10}
                    min={1}
                    step={1}
                    colorMax={'#f04048'}
                    colorMin={'#40c5f4'}
                    textColor={colors.modaltitletext}
                    value={post_trans}
                    onChange={post_trans_time => {
                      setPost_trans(post_trans_time)
                      // pir_time = num;
                    }}
                  />
                </View> */}

                <Text></Text>

              </View>

              <View style={[styles.rowicon, { justifyContent: 'space-between' }]}>
                <TouchableOpacity
                  style={[styles.Modalbutton, styles.buttonClose]}
                  onPress={() => set_templux()}>
                  <Text style={styles.textStyle}>SUBMIT</Text>
                </TouchableOpacity>

                {/* <Text> </Text> */}

                {/* <TouchableOpacity
                  style={[styles.Modalbutton, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </Modal>

          {(loading || location.length === 0) ? (
            <View style={{ paddingTop: 300 }}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          )
            :
            (
              <>
                {location.map(loc => (

                  <>
                    <View pointerEvents={isEnabled ? 'auto' : 'none'}>
                      <Text> </Text>
                      {/* LOCATION NAME */}
                      <Text style={styles.title}>{loc.location}</Text>
                      <View style={styles.locationcard}>
                        {/* ALL TOP ICONS IN SWITCH BORD */}
                        <View
                          style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                          }}>
                          <View style={styles.rowicon}>
                            <Icon
                              style={styles.icon}
                              name="thermometer"
                              size={20}
                            />
                            <Text style={styles.baseText}>
                              {loc?.temp?.slice(0, 4)}&deg;c{' '}
                            </Text>
                            <Ico
                              style={styles.icon}
                              name="brightness-6"
                              size={20}
                            />
                            <Text style={styles.baseText}> {loc.lux}% lux </Text>

                            <Image
                              style={{
                                width: 20,
                                height: 18,
                                tintColor: colors.iconcolor,
                              }}
                              source={require('../../../assets/motion.png')}
                            />
                            <Text style={styles.baseText}>
                              {' '}
                              {loc.cut_off} Min-Pir{' '}
                            </Text>

                            <TouchableOpacity
                              onPress={() =>
                                set_value(
                                  loc.temp_th,
                                  loc.lux_th,
                                  loc.lum_method,
                                  loc.location,
                                  loc.pir_sensitivity,
                                  loc.cut_off,
                                  loc.fan_delay,

                                )
                              }>
                              {/* <TouchableOpacity onPress={() => set_templux(10, 10, loc.location)}> */}
                              <Feather
                                style={[styles.icon, { alignContent: 'flex-end' }]}
                                name="edit"
                                size={25}
                              />
                            </TouchableOpacity>
                          </View>



                          {/* SETTING Auto/Manual FROM SIDE */}
                          <View>
                            {loc.manual_status ? (
                              <View>
                                <TouchableOpacity
                                  onPress={() =>
                                    setMotion(
                                      (loc['manual_status'] = 0),
                                      loc.location,
                                    )
                                  }>
                                  <Ico
                                    style={{
                                      paddingLeft: 5,
                                      paddingBottom: 5,
                                      color: colors.locationtext,
                                    }}
                                    name="motion-sensor"
                                    size={30}
                                  />
                                </TouchableOpacity>
                              </View>
                            ) : (
                              <View>
                                <TouchableOpacity
                                  onPress={() =>
                                    setMotion(
                                      (loc['manual_status'] = 1),
                                      loc.location,
                                    )
                                  }>
                                  <Ico
                                    style={styles.icon}
                                    name="motion-sensor-off"
                                    size={18}
                                  />
                                </TouchableOpacity>
                              </View>
                            )}
                          </View>

                        </View>
                        {/* SWITCH OPERATION on/off */}
                        {loc.boards?.map(b => (

                          <>
                            <View style={[styles.cardboard, b.sensors_board ? { borderColor: "red", borderRadius: 5, padding: 5 } : null]}>
                              {
                                b.sensors_board
                                  ?

                                  (
                                    <View style={{ flex: 1, flexDirection: 'row' }}>


                                      <View
                                        style={[styles.rowicon]}>
                                        <View>
                                          <Text style={styles.modelTitle}>Motion Sensor</Text>

                                        </View>
                                        <InputSpinner
                                          max={10}
                                          min={1}
                                          step={1}
                                          colorMax={'#f04048'}
                                          colorMin={'#40c5f4'}
                                          textColor={colors.modaltitletext}
                                          value={b.pir_sensitivity}
                                          height={35}
                                          onChange={(value) => {
                                            set_IndividualBoardvalue(
                                              b.pir_sensitivity = value,
                                              b.switchBoardRpiId
                                            )
                                          }}
                                        />
                                      </View>


                                      <View style={{ flex: 1, flexDirection: 'row' }}>

                                        {/* For Autonomus and Hormony */}
                                        <View style={styles.selectedcontainer}>
                                          <View style={[styles.modalContent]}>
                                            <Picker

                                              selectedValue={b.pir_join}
                                              onValueChange={(itemValue) => set_Anding(b.pir_join = itemValue, b.switchBoardRpiId)}
                                            >
                                              {anditems.map((item, index) => (
                                                <Picker.Item key={index}
                                                  label={item.label}
                                                  value={item.value} />
                                              ))}
                                            </Picker>
                                          </View>

                                        </View>

                                        {/* For Descreate and Open */}
                                        <View style={styles.selectedcontainer}>


                                          <View style={styles.modalContent}>
                                            <Picker
                                              selectedValue={b.pir_mode}
                                              onValueChange={(itemValue) => set_pirType(b.pir_mode = itemValue, b.switchBoardRpiId)}
                                            >
                                              {pirType.map((item, index) => (
                                                <Picker.Item key={index} label={item.label} value={item.value} />
                                              ))}
                                            </Picker>
                                          </View>

                                        </View>


                                      </View>



                                    </View>
                                  )
                                  : null
                              }

                              <View style={{ flexDirection: 'row' }}>

                                <View style={[styles.switchboardCard]} >


                                  {/* SWITCHBORD ALL SWITCHES  DATA */}
                                  {b.switches.map((s, i) => (
                                    // console.log("1411 SWID , SWSTATUS , SW" , s.hard_manual )
                                    <>


                                      {
                                        s['status'] != 0

                                          ?
                                          (
                                            <TouchableOpacity
                                              onPress={() => {
                                                if (s.sw === 'F') {
                                                }
                                                change_status(
                                                  s['id'],
                                                  (s['status'] = '0'),
                                                  (s['speed'] = s.speed),
                                                );
                                              }}

                                              onLongPress={() => {
                                                const newHardManualValue = s.hard_manual == 0 ? 1 : 0;

                                                hard_manual_configration(s.id, newHardManualValue)

                                              }}

                                            >
                                              <View style={[styles.cardthemOn, s.hard_manual == 1 ? { borderColor: "green" } : null]}>
                                                <View style={styles.textArea}>
                                                  <View style={styles.automationIcon}>
                                                    <TouchableOpacity>
                                                      {(s.automationFlag == 1 ?

                                                        <Icon
                                                          name="motion-sensor"
                                                          style={{ color: "black" }}
                                                          size={20}
                                                        />
                                                        :
                                                        <Icon
                                                          name="motion-sensor-off"
                                                          color={colors.locationtext}
                                                          size={20}
                                                        />
                                                      )}
                                                    </TouchableOpacity>
                                                  </View>
                                                  <Text style={styles.titleButtonOn}>
                                                    {getIconForSwitch(s['sw'].toUpperCase())}

                                                    {/* {s['sw'].toUpperCase()  />} */}



                                                  </Text>
                                                  <Text style={styles.swnameOn}>
                                                    {s['sw_desc'].toUpperCase()}
                                                  </Text>
                                                </View>
                                              </View>
                                            </TouchableOpacity>
                                          )

                                          :


                                          (
                                            <TouchableOpacity
                                              onPress={() => {
                                                if (s.sw === 'F') {
                                                  // Only update the slider value if s.sw is 'F'
                                                  // setSliderValue(5);
                                                }
                                                change_status(
                                                  s['id'],
                                                  (s['status'] = '1'),
                                                  (s['speed'] = s.speed),
                                                );
                                              }}

                                              onLongPress={() => {
                                                const newHardManualValue = s.hard_manual == 0 ? 1 : 0;

                                                hard_manual_configration(s.id, newHardManualValue)


                                              }}

                                            >
                                              <View style={[styles.cardthemOff, s.hard_manual == 1 ? { borderColor: "green" } : null]}>
                                                <View style={styles.textArea}>

                                                  <View style={styles.automationIcon}>
                                                    {(s.automationFlag == 1 ? <Icon
                                                      name="motion-sensor"
                                                      // color={colors.locationtext}
                                                      size={20}
                                                    />
                                                      :
                                                      null

                                                    )}
                                                  </View>
                                                  <Text style={styles.titleButtonOff}>
                                                    {getIconForSwitch(s['sw'].toUpperCase())}

                                                    {/* {s['sw'].toUpperCase()} */}

                                                  </Text>
                                                  <Text style={styles.swnameOff}>
                                                    {s['sw_desc'].toUpperCase()}
                                                  </Text>
                                                </View>
                                              </View>
                                            </TouchableOpacity>
                                          )

                                      }
                                    </>
                                  ))}
                                </View>

                                {/* TRIED FOR SWITCHBORD ID TO SHOW FOR EACH SWITCHBOARD  */}



                              </View>

                              {/* FAN REGULATION CODE */}
                              {b.switches.map((s, i) => {
                                // console.log("1468 s" ,s)
                                // console.log("1349 swid,status,sw", s, "index in array", i)

                                // var index = i + 1
                                return (
                                  <>
                                    {s.switch_type?.charAt(0) != 'F' ? null : (
                                      <View style={{ flexDirection: 'column' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                          <Ico
                                            style={{
                                              marginLeft: 8,
                                              marginTop: 6,
                                              color: colors.iconcolor,
                                            }}
                                            name="fan"
                                            size={25}
                                          />
                                          {/* {console.log("slider initialize",s.speed)} */}
                                          {/*FAN SLIDER  */}
                                          <Slider
                                            style={{
                                              width: 200,
                                              height: 40,
                                              marginBottom: 5,
                                            }}
                                            minimumValue={0}
                                            maximumValue={5}
                                            step={1}
                                            minimumTrackTintColor="#3D5C64"
                                            maximumTrackTintColor="#61615a"
                                            value={parseFloat(
                                              s.status == 1 ? s.speed : 0,
                                            )}
                                            onSlidingComplete={value => {
                                              change_fan_speed(
                                                s['id'],

                                                value => {
                                                  if (value > 0) {
                                                    s['status'] = 1;
                                                  } else {
                                                    s['status'] = 0;
                                                  }
                                                  return s['status'];
                                                },

                                                value,
                                              );
                                            }}
                                          />

                                          {/* FAN RUNNING STATUS ON WHICH SPEED IT IS RUNNING AND PREVIOUS STATE */}
                                          <Text
                                            style={{ fontSize: 15, marginTop: 8 }}>
                                            {(s.status === 0 ? 0 : s.speed)}
                                          </Text>
                                        </View>
                                      </View>
                                    )}
                                  </>
                                );
                              })}
                            </View>
                          </>
                        ))}

                        {loc.Bat != null
                          ? loc.Bat.map(b => (
                            <>
                              <View style={styles.cardboard}>
                                <View style={{ flexDirection: 'row' }}>
                                  <View style={styles.switchboardCard}>
                                    {/* SWITCHBORD ALL SWITCHES  DATA */}
                                    {b.switches.map((s, i) => (
                                      <>
                                        {s['status'] != 0 ? (
                                          <TouchableOpacity
                                            onPress={() => {
                                              change_status(
                                                s['id'],
                                                (s['status'] = '0'),
                                              );
                                            }}>
                                            <View style={styles.cardthemOn}>
                                              <View style={styles.textArea}>
                                                <Text
                                                  style={styles.titleButtonOn}>
                                                   {getIconForSwitch(s['sw'].toUpperCase())}
                                                </Text>
                                              </View>
                                            </View>
                                          </TouchableOpacity>
                                        ) : (
                                          <TouchableOpacity
                                            onPress={() => {
                                              change_status(
                                                s['id'],
                                                (s['status'] = '1'),
                                              );
                                            }}>
                                            <View style={styles.cardthemOff}>
                                              <View style={styles.textArea}>
                                                <Text
                                                  style={styles.titleButtonOff}>
                                                  {getIconForSwitch(s['sw'].toUpperCase())}
                                                </Text>
                                              </View>
                                            </View>
                                          </TouchableOpacity>
                                        )}
                                      </>
                                    ))}
                                  </View>
                                  <View
                                    style={{
                                      position: 'absolute',
                                      right: 0,
                                      marginRight: 10,
                                    }}>
                                    <Text style={styles.boardtitle}>
                                      {b.switchBoardId}
                                    </Text>
                                  </View>
                                </View>
                                {b.switches.map((s, i) => {
                                  // console.log("s" , s);
                                  var index = i + 1;
                                  return (
                                    <>
                                      {s.sw != 'F' ? null : (
                                        <View style={{ flexDirection: 'column' }}>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Ico
                                              style={{
                                                marginLeft: 8,
                                                marginTop: 6,
                                                color: colors.iconcolor,
                                              }}
                                              name="fan"
                                              size={25}
                                            />

                                            <Slider
                                              style={{
                                                width: 200,
                                                height: 40,
                                                marginBottom: 5,
                                              }}
                                              minimumValue={0}
                                              maximumValue={5}
                                              step={1}
                                              minimumTrackTintColor="#3D5C64"
                                              maximumTrackTintColor="#61615a"
                                              value={parseInt(s.status)}
                                              onValueChange={value =>
                                                change_status(
                                                  s['id'],
                                                  (s['status'] =
                                                    value.toString()),
                                                )
                                              }
                                            />
                                            <Text
                                              style={[
                                                styles.titleButtonOff,
                                                { marginTop: 8 },
                                              ]}>
                                              {s['status']}
                                            </Text>
                                          </View>
                                        </View>
                                      )}
                                    </>
                                  );
                                })}
                              </View>
                            </>
                          ))
                          : null}
                        {loc.Bal != null
                          ? loc.Bal.map(b => (
                            <>
                              <View style={styles.cardboard}>
                                <View style={{ flexDirection: 'row' }}>
                                  <View style={styles.switchboardCard} >
                                    {b.switches.map((s, i) => (
                                      <>
                                        {s['status'] != 0 ? (
                                          <TouchableOpacity
                                            key={i}
                                            onPress={() => {
                                              change_status(
                                                s['id'],
                                                (s['status'] = '0'),
                                              );
                                            }}>
                                            <View style={styles.cardthemOn}>
                                              <View style={styles.textArea}>
                                                <Text
                                                  style={styles.titleButtonOn}>
                                                  {s['sw'].toUpperCase()}
                                                </Text>
                                              </View>
                                            </View>
                                          </TouchableOpacity>
                                        ) : (
                                          <TouchableOpacity
                                            onPress={() => {
                                              change_status(
                                                s['id'],
                                                (s['status'] = '1'),
                                              );
                                            }}>
                                            <View style={styles.cardthemOff}>
                                              <View style={styles.textArea}>
                                                <Text
                                                  style={styles.titleButtonOff}>
                                                  {s['sw'].toUpperCase()}
                                                </Text>
                                              </View>
                                            </View>
                                          </TouchableOpacity>
                                        )}
                                      </>
                                    ))}
                                  </View>
                                  <View
                                    style={{
                                      position: 'absolute',
                                      right: 0,
                                      marginRight: 10,
                                    }}>
                                    <Text style={styles.boardtitle}>
                                      {b.switchBoardId}
                                    </Text>
                                  </View>
                                </View>
                                {b.switches.map((s, i) => {
                                  var index = i + 1;
                                  return (
                                    <>
                                      {s.sw != 'F' ? null : (
                                        <View style={{ flexDirection: 'column' }}>
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                            }}>
                                            <Ico
                                              style={{
                                                marginLeft: 8,
                                                marginTop: 6,
                                                color: colors.iconcolor,
                                              }}
                                              name="fan"
                                              size={22}
                                            />
                                            <Slider
                                              style={{
                                                width: 200,
                                                height: 40,
                                                marginBottom: 5,
                                              }}
                                              minimumValue={0}
                                              maximumValue={5}
                                              step={1}
                                              minimumTrackTintColor="#3D5C64"
                                              maximumTrackTintColor="#61615a"
                                              // value={sliderValue}
                                              // value={parseInt(s.status)}
                                              onSlidingComplete={value => {
                                                // setSliderValue(value)
                                                change_fan_speed(
                                                  s['id'],
                                                  value => {
                                                    if (value > 0) {
                                                      s['status'] = 1;
                                                    } else {
                                                      s['status'] = 0;
                                                    }
                                                    return s['status'];
                                                  },
                                                  value,
                                                );
                                              }}
                                              onValueChange={value => {
                                                setSliderValue(value);
                                              }}
                                            />
                                            <Text
                                              style={[
                                                styles.titleButtonOff,
                                                { marginTop: 8 },
                                              ]}>
                                              {s['status']}
                                            </Text>
                                          </View>
                                        </View>
                                      )}
                                    </>
                                  );
                                })}
                              </View>
                            </>
                          ))
                          : null}




                        {/* MODE BOX VIEW */}
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: "center",
                            marginTop: 10

                          }}>

                          {/* MODE SETTING CODE  */}
                          <View style={{
                            display: 'flex',
                            flexDirection: "row",
                            alignItems: 'center',
                            alignSelf: 'flex-start',


                          }}>


                            <TouchableOpacity
                              onPress={() => {
                                modeinit(loc.location);
                                setAddlocation(loc.location);
                                // navigation.navigate('modes', { location: loc.location })
                              }}

                            >

                              <View style={{
                                display: 'flex',
                                flexDirection: "row",
                                alignItems: 'center',

                              }}>


                                <View style={{
                                  display: 'flex',
                                  flexDirection: "column",
                                }}>


                                  <View>


                                    {

                                      // console.log("2322 loc" , loc.mode)
                                      // loc.modeStatus == 0 || loc.modeStatus == ' '
                                      // loc.modeStatus 
                                      1

                                        ?

                                        (
                                          <View

                                            style={{
                                              display: 'flex',
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              // marginLeft: -15,
                                              // marginRight:-25,
                                              color: colors.cardtext
                                            }}
                                          >





                                            {/* Add Mode EDIT ICON IN MODE */}
                                            {/* <Feather
                                            style={[
                                              styles.icon,
                                              { alignContent: 'flex-end' },
                                            ]}
                                            name="edit"
                                            size={18}
                                          />
                                          <Button>
                                            <Text>Add Modes</Text>
                                          </Button> */}

                                          </View>

                                        )

                                        :


                                        (
                                          <Text style={{ color: colors.locationtext }}>
                                            {/* {' '}
                                        {loc.mode.slice(0, 1).toUpperCase() +
                                          loc.mode.slice(1, 6)} */}
                                            {/* {loc.mode.toUpperCase() +
                                          loc.mode} */}

                                          </Text>
                                        )
                                    }

                                  </View>


                                  {/* <View>
                                  {
                                    modelocation.map((modeData) => {
                                      // console.log("modelocation" , JSON.stringify(modeData.mode_details));
                                      return (
                                        modeData.mode_details.map((modeName) => {
                                          return (
                                        
                                              <Button style={{
                                                display:"flex"
                                              }}>{modeName.mode}</Button>

                                          )
                                        })
                                      )
                                    })
                                  }
                                </View> */}







                                </View>



                                <Text> </Text>

                              </View>
                            </TouchableOpacity>

                          </View>




                          {/* SCHEDULING CODE START */}
                          <View style={{ alignSelf: 'flex-end' }}>
                            <TouchableOpacity
                              onPress={() => {
                                scheduleinit(loc.location);
                                // navigation.navigate('Schedule')
                              }}>
                              <View style={{ flexDirection: 'row' }}>
                                <Image
                                  style={{
                                    width: 17,
                                    height: 17,
                                    tintColor: colors.iconcolor,
                                    marginTop: 11,
                                    marginRight: -15
                                  }}
                                  source={require('../../../assets/schedule0.png')

                                  }
                                />

                                <Button>
                                  <Text
                                    style={{
                                      color: colors.cardtext,
                                      fontSize: 15,
                                      marginTop: 2,
                                      fontWeight: 'bold',
                                      marginRight: 5,
                                    }}>
                                    AddSchedule
                                  </Text>
                                </Button>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>



                        {
                          // console.log("saftey" , .map((data)=>console.log(data)))

                          // loc.safetyData.map((data) => (

                          //   <View style={styles.safteyProduct}>

                          //     {/* GAS LEAK DETECTOR */}

                          //     {/* FIRE DETECTOR */}
                          //     <View>

                          //       {loadingPir ? (
                          //         <View>
                          //           <ActivityIndicator size="small" color="#ffffff" />
                          //         </View>
                          //       ) :

                          //         (
                          //           <View style={{
                          //             width: "auto",
                          //             display: "flex",
                          //             alignSelf: "center"
                          //           }}>
                          //             {isEnabled ? (
                          //               <TouchableOpacity
                          //                 style={{
                          //                   width: 50,
                          //                 }}
                          //               // onPress={() => {
                          //               //   {
                          //               //     // setMotion(false)
                          //               //     setIsEnabled(false);
                          //               //   }
                          //               // }}

                          //               >
                          //                 <MaterialCommunityIcons
                          //                   name="fire-alert"
                          //                   color="green"
                          //                   size={45}
                          //                 />
                          //               </TouchableOpacity>
                          //             ) : (
                          //               <TouchableOpacity
                          //                 style={{ marginRight: 15 }}
                          //               // onPress={() => {
                          //               //   {
                          //               //     //  setMotion(true)
                          //               //     setIsEnabled(true);
                          //               //   }
                          //               // }}

                          //               >
                          //                 <MaterialCommunityIcons name="fire-alert" color="red" size={45} />
                          //               </TouchableOpacity>
                          //             )}
                          //           </View>
                          //         )
                          //       }
                          //     </View>


                          //     {/* PANIC BUTTON */}
                          //     <View>

                          //       {loadingPir ? (
                          //         <View>
                          //           <ActivityIndicator size="small" color="#ffffff" />
                          //         </View>
                          //       ) :

                          //         (
                          //           <View style={{
                          //             width: "auto",
                          //             display: "flex",
                          //             alignSelf: "center"
                          //           }}>
                          //             {panic ? (
                          //               <TouchableOpacity
                          //                 style={{
                          //                   width: 50,
                          //                 }}
                          //                 onPress={() => {
                          //                   {

                          //                     setPanic(false)
                          //                     PanicData()

                          //                   }
                          //                 }}>
                          //                 <Image style={{ width: 30, height: 45, backgroundColor: "green", borderRadius: 10 }} source={require('../../../assets/panic-transformed.png')} />

                          //               </TouchableOpacity>
                          //             ) :

                          //               (
                          //                 <TouchableOpacity
                          //                   style={{ marginRight: 15 }}
                          //                   onPress={() => {
                          //                     {
                          //                       setPanic(true)
                          //                       PanicData()

                          //                     }
                          //                   }}

                          //                 >
                          //                   <Image style={{ width: 30, height: 45, backgroundColor: "red", borderRadius: 5 }} source={require('../../../assets/panic-transformed.png')} />

                          //                 </TouchableOpacity>
                          //               )}
                          //           </View>
                          //         )
                          //       }
                          //     </View>
                          //   </View>

                          // ))
                        }
                        {/* SAFTEY DEVICES */}


                        <View style={styles.safteyProduct}>

                          {/* GAS LEAK DETECTOR */}

                          {/* FIRE DETECTOR */}
                          {/* <View>

                          {loadingPir ? (
                            <View>
                              <ActivityIndicator size="small" color="#ffffff" />
                            </View>
                          ) :

                            (
                              <View style={{
                                width: "auto",
                                display: "flex",
                                alignSelf: "center"
                              }}>
                                {isEnabled ? (
                                  <TouchableOpacity
                                    style={{
                                      width: 50,
                                    }}
                                  onPress={() => {
                                    {
                                      // setMotion(false)
                                      setIsEnabled(false);
                                    }
                                  }}

                                  >
                                    <MaterialCommunityIcons
                                      name="fire-alert"
                                      color="green"
                                      size={45}
                                    />
                                  </TouchableOpacity>
                                ) : (
                                  <TouchableOpacity
                                    style={{ marginRight: 15 }}
                                  onPress={() => {
                                    {
                                      //  setMotion(true)
                                      setIsEnabled(true);
                                    }
                                  }}

                                  >
                                    <MaterialCommunityIcons name="fire-alert" color="red" size={45} />
                                  </TouchableOpacity>
                                )}
                              </View>
                            )
                          }
                        </View> */}


                          {/* PANIC BUTTON */}
                          {/* <View>

                          {loadingPir ? (
                            <View>
                              <ActivityIndicator size="small" color="#ffffff" />
                            </View>
                          ) :

                            (
                              <View style={{
                                width: "auto",
                                display: "flex",
                                alignSelf: "center"
                              }}>
                                {panic ? (
                                  <TouchableOpacity
                                    style={{
                                      width: 50,
                                    }}
                                    onPress={() => {
                                      {

                                        setPanic(false)
                                        PanicData()

                                      }
                                    }}>
                                    <Image style={{ width: 30, height: 45, backgroundColor: "green", borderRadius: 10 }} source={require('../../../assets/panic-transformed.png')} />

                                  </TouchableOpacity>
                                ) :

                                  (
                                    <TouchableOpacity
                                      style={{ marginRight: 15 }}
                                      onPress={() => {
                                        {
                                          setPanic(true)
                                          PanicData()

                                        }
                                      }}

                                    >
                                      <Image style={{ width: 30, height: 45, backgroundColor: "red", borderRadius: 5 }} source={require('../../../assets/panic-transformed.png')} />

                                    </TouchableOpacity>
                                  )}
                              </View>
                            )
                          }
                        </View> */}
                        </View>


                      </View>


                    </View>
                  </>
                ))}
              </>
            )}

          {/* for scrolling purpose we are added this view */}
          <View style={{ paddingBottom: "100%" }}>
            <Text></Text>

          </View>
        </ScrollView>

      </SafeAreaView>

      {/* For AddScheduel modal */}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={scheduleModal}
          onRequestClose={() => {
            setscheduleModal(!scheduleModal);
          }}>
          <BlurView
            style={styles.blurView}
            blurType="dark" // Values = dark, light, xlight .
            blurAmount={10}
            // viewRef={this.state.viewRef}
            reducedTransparencyFallbackColor="white"
          />

          <View style={styles.centeredView}>
            <View style={styles.Addschedulemodal}>
              <SafeAreaView>
                <ScrollView
                  style={styles.scrollView}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }>
                  {loading ? (
                    <View style={{ paddingTop: 300 }}>
                      <ActivityIndicator size="large" color="#ffffff" />
                    </View>
                  ) : (
                    <>
                      {schedulelocation.map(loc => (
                        <View>
                          {/* for cross/remove addschedule page */}
                          <TouchableOpacity
                            style={{
                              justifyContent: 'flex-end',
                              alignItems: 'flex-end',
                              borderRadius: 50,
                              marginRight: 10,
                            }}
                            onPress={() => setscheduleModal(false)}>
                            <Text
                              style={{
                                fontSize: 30,
                                color: colors.modaltitletext,
                                marginRight: 4,
                              }}>
                              x
                            </Text>
                          </TouchableOpacity>

                          <Text style={styles.locationtitletext}>
                            {loc.location}
                          </Text>
                          <View>
                            <View style={styles.rowicon}>
                              <Icon
                                style={styles.icon}
                                name="thermometer"
                                size={15}
                              />
                            </View>

                            {/* AddScheduel  data */}

                            {loc.boards?.map(b => (

                              <>
                                <View style={styles.cardboard}>
                                  <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'row' , flexWrap:'wrap'}}>
                                      {b.switches.map((s, i) => (
                                        <>
                                          <View>
                                            <TouchableOpacity
                                              onPress={() => {
                                                // console.log("s.id" , s.id);
                                                switchinit(s.id);
                                                // navigation.navigate('Scheduled list', { id: s.id, })
                                                // settimeModalVisible(true);
                                              }}>
                                              <View

                                                // style={styles.cardthemOn}
                                                style={[styles.cardthemOn, s.status_to_be == 0 ? { backgroundColor: "transparent" } : null]}

                                              >
                                                <View

                                                  style={styles.textArea}
                                                >
                                                  <Text
                                                    style={[styles.titleButtonOn, s.status_to_be == 0 ? { color: 'white' } : null]}
                                                  >
                                                    {/* {s['sw']
                                                      .toUpperCase()
                                                      .charAt(0, 1)} */}
                                                    {getIconForSwitch(s['sw'].toUpperCase().charAt(0, 1))}
                                                  </Text>
                                                </View>
                                              </View>
                                            </TouchableOpacity>
                                            {/* <View
                                              style={{
                                                justifyContent: 'flex-end',
                                                alignItems: 'center',
                                              }}>
                                              {timedatatemp != null
                                                ? timedatatemp.map(T => {
                                                  return (
                                                    <View
                                                      style={{
                                                        flexDirection:
                                                          'column',
                                                        borderWidth: 1,
                                                        borderRadius: 3,
                                                        marginBottom: 10,
                                                        marginLeft: 6,
                                                      }}>
                                                      <Text
                                                        style={{
                                                          fontSize: 8,
                                                          color:
                                                            colors.modaltext,
                                                          marginBottom: 2,
                                                          marginLeft: 2,
                                                          fontWeight: 'bold',
                                                        }}>
                                                        {T.on_time.slice(
                                                          0,
                                                          5,
                                                        )}{' '}
                                                        To{' '}
                                                        {T.off_time.slice(
                                                          0,
                                                          4,
                                                        )}
                                                      </Text>
                                                    </View>
                                                  );
                                                })
                                                : null}
                                            </View> */}
                                          </View>
                                        </>
                                      ))}
                                    </View>
                                    <View
                                      style={{
                                        position: 'absolute',
                                        right: 0,
                                        marginRight: 10,
                                      }}>
                                      <Text style={styles.boardtitle}>
                                        {b.switchBoardId.charAt(
                                          b.switchBoardId.length - 1,
                                        )}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              </>
                            ))}

                            {/* modifing the data has user required */}
                            {loc.Bat != null
                              ? loc.Bat.map(b => (
                                <>
                                  <View style={styles.cardboard}>
                                    <View style={{ flexDirection: 'row' }}>
                                      <View style={{ flexDirection: 'row' }}>
                                        {b.switches.map((s, i) => (
                                          <>
                                            <View>
                                              <TouchableOpacity
                                                onPress={() => {
                                                  switchinit(s.id);
                                                  // navigation.navigate('Scheduled list', { id: s.id, })
                                                  // settimeModalVisible(true);
                                                }}>
                                                <View
                                                  style={styles.cardthemOn}>
                                                  <View
                                                    style={styles.textArea}>
                                                    <Text
                                                      style={
                                                        styles.titleButtonOn
                                                      }>
                                                    {getIconForSwitch(s['sw'].toUpperCase().charAt(0, 1))}
                                                      {/* {s['sw']} */}
                                                    </Text>
                                                  </View>
                                                </View>
                                              </TouchableOpacity>
                                            </View>
                                          </>
                                        ))}
                                      </View>
                                      {/* <View
                                        style={{
                                          position: 'absolute',
                                          right: 0,
                                          marginRight: 10,
                                        }}>
                                        <Text style={styles.boardtitle}>
                                          {b.switchBoardId}
                                        </Text>
                                      </View> */}
                                    </View>
                                  </View>
                                </>
                              ))
                              : null}

                            {loc.Bal != null
                              ? loc.Bal.map(b => (
                                <>
                                  <View style={styles.cardboard}>
                                    <View style={{ flexDirection: 'row' }}>
                                      <View style={{ flexDirection: 'row' }}>
                                        {b.switches.map((s, i) => (
                                          
                                            <>
                                              <TouchableOpacity
                                                onPress={() => {
                                                  switchinit(s.id);
                                                  // navigation.navigate('Scheduled list', { id: s.id, })
                                                  // settimeModalVisible(true);
                                                }}>
                                                <View
                                                  style={styles.cardthemOn}>
                                                  <View
                                                    style={styles.textArea}>
                                                    <Text
                                                      style={
                                                        styles.titleButtonOn
                                                      }>
                                                         {getIconForSwitch(s['sw'].toUpperCase().charAt(0, 1))}
                                                      {/* {s['sw']} */}
                                                    </Text>
                                                  </View>
                                                </View>
                                              </TouchableOpacity>
                                             
                                              
                                            
                                          </>
                                        ))}
                                      </View>
                                      
                                    </View>
                                  </View>
                                </>
                              ))
                              : null}
                          </View>
                        </View>
                      ))}
                    </>
                  )}

                  {/* for scrolling purpose we are added this view */}
                  <View style={{ paddingBottom: 50 }}>
                    <Text></Text>
                    <Text></Text>
                  </View>
                </ScrollView>
              </SafeAreaView>
            </View>
          </View>
        </Modal>
      </View>

      {/* Time modal on clicking */}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={timemodalVisible}
          onRequestClose={() => {
            settimeModalVisible(!timemodalVisible);
          }}>
          <BlurView
            style={styles.blurView}
            blurType="light" // Values = dark, light, xlight .
            blurAmount={10}
            // viewRef={this.state.viewRef}
            reducedTransparencyFallbackColor="white"
          />

          <View style={styles.allscheduledisplaymodal}>
            <SafeAreaView>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }>
                {loading ? (
                  <View style={{ paddingTop: 300 }}>
                    <ActivityIndicator size="large" color="#ffffff" />
                  </View>
                ) : (
                  <>
                    {timeData == [] || timeData == 0 ? (
                      <View>
                        <TouchableOpacity
                          style={{
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            borderRadius: 50,
                            marginRight: 10,
                          }}
                          onPress={() => settimeModalVisible(false)}>
                          <Text
                            style={{
                              fontSize: 30,
                              color: colors.modaltitletext,
                              marginRight: 4,
                            }}>
                            x
                          </Text>
                        </TouchableOpacity>
                        <Text
                          style={[styles.modalText, { alignContent: 'center' }]}>
                          No More Schedule To Shown
                        </Text>
                      </View>
                    ) : (
                      <View>
                        <TouchableOpacity
                          style={{
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            borderRadius: 50,
                            marginRight: 10,
                            marginBottom: 5,
                          }}
                          onPress={() => settimeModalVisible(false)}>
                          <Text
                            style={{
                              fontSize: 30,
                              color: colors.modaltitletext,
                              marginRight: 8,
                            }}>
                            x
                          </Text>
                        </TouchableOpacity>

                        <>
                          {timeData.map((loc, index) => {
                            // console.log('loc kwadhij', loc);
                            const key = index + 1;
                            return (
                              // modal got return after clicking on switches
                              <>
                                {loc.on_time == null || loc.off_time == null ? (
                                  <View>
                                    <Text
                                      style={[
                                        styles.modalText,
                                        { alignContent: 'center' },
                                      ]}>
                                      No More Schedule To Shown
                                    </Text>
                                  </View>
                                ) : (
                                  <View>
                                    <View style={styles.locationcard} key={key}>
                                      <>
                                        <View style={{ flexDirection: 'column' }}>
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              justifyContent: 'space-between',
                                            }}>
                                            <Text style={styles.timeText}>
                                              {convertTimeFrom(
                                                key,
                                                loc.on_time,
                                              )}{' '}
                                              To{' '}
                                              {convertTimeTo(key, loc.off_time)}
                                            </Text>

                                            <Switch
                                              trackColor={{
                                                false: '#767577',
                                                true: '#81b0ff',
                                              }}
                                              thumbColor={
                                                loc.is_activated
                                                  ? '#FF0000'
                                                  : '#f4f3f4'
                                              }
                                              ios_backgroundColor="#3e3e3e"
                                              onValueChange={() => {
                                                toggleSwitch(
                                                  key,
                                                  !loc.is_activated,
                                                  loc.id,
                                                  loc.on_time,
                                                  loc.off_time,
                                                  loc.days,
                                                );
                                              }}
                                              value={loc.is_activated}
                                            />
                                          </View>

                                          {/* days */}
                                          <View style={{ flexDirection: 'row' }}>
                                            {loc.days.map((s, i) => (
                                              <>
                                                {s.status ? (
                                                  <Text
                                                    style={styles.titleText}>
                                                    {s.day.substring(0, 3)}
                                                  </Text>
                                                ) : null}
                                              </>
                                            ))}
                                          </View>

                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              justifyContent: 'flex-start',
                                            }}>
                                            {/* FOR ADDING SECHEDULE AGAIN */}
                                            {/* <TouchableOpacity
                                              onPress={() => {
                                                // navigation.navigate('Change Schedule', { from: convertTimeFrom(key), to: convertTimeTo(key), frompayload: loc.on_time, topayload: loc.off_time, days: loc.days, id: route.params.id, sl_no: slno });
                                                setdays(loc.days);
                                                setaddModalVisible(true);
                                              }}>
                                              <Ionicons
                                                style={styles.icon}
                                                name="ios-add-circle-outline"
                                                size={20}
                                              />
                                            </TouchableOpacity> */}
                                            {/* FOR DELETING SECHUDLE */}
                                            <TouchableOpacity
                                              onPress={() =>
                                                delete_schedule(key)
                                              }>
                                              <Ico
                                                style={styles.icon}
                                                name="delete-outline"
                                                size={55}
                                              />
                                            </TouchableOpacity>
                                            <Text></Text>
                                            <TouchableOpacity
                                              onPress={() => {
                                                setdays(loc.days);
                                                seteditModalVisible(true);
                                                // editdisp(JSON.stringify(loc.on_time));
                                                setoldScheduletime(loc);
                                                // navigation.navigate('Change Schedule', { from: convertTimeFrom(key), to: convertTimeTo(key), frompayload: loc.on_time, topayload: loc.off_time, days: loc.days, id: route.params.id, sl_no: slno });
                                              }}>
                                              <Feather
                                                style={styles.icon}
                                                name="edit"
                                                size={25}
                                              />
                                            </TouchableOpacity>
                                          </View>
                                        </View>
                                        {/* </TouchableOpacity> */}
                                      </>
                                    </View>
                                  </View>
                                )}
                              </>
                            );
                          })}
                        </>
                      </View>
                    )}

                    {/* Scheduling switches's Days according to our need in addschedule */}
                    <View style={styles.buttonsubmit}>
                      <TouchableOpacity
                        // style={styles.submit}
                        // onPress={() => navigation.navigate('schedule time', route.params)}
                        style={{
                          width: 100,
                          height: 40,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 15,
                          marginBottom: 10,
                          backgroundColor: colors.modalbuttons,
                        }}
                        onPress={() => {
                          setdays(options);
                          setaddModalVisible(true);
                        }}>
                        <Text
                          style={[
                            styles.textSign,
                            {
                              color: colors.modaltitletext,
                              fontWeight: 'bold',
                            },
                          ]}>
                          AddTiming
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                <View style={styles.centeredView}>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={editmodalVisible}
                    onRequestClose={() => {
                      seteditModalVisible(!editmodalVisible);
                    }}>
                    <BlurView
                      style={styles.blurView}
                      blurType="light" // Values = dark, light, xlight .
                      blurAmount={10}
                      // viewRef={this.state.viewRef}
                      reducedTransparencyFallbackColor="white"
                    />

                    <View style={styles.centeredView}>
                      <View style={styles.modalViewtimemodal}>
                        <Text style={styles.modalText}>
                          Welcome To Edit TimeSchedule
                        </Text>

                        {days != 0 ? (
                          <>
                            <View style={{ flexDirection: 'row' }}>
                              <Text></Text>
                              <TouchableOpacity
                                onPress={() => showModeFrom('time')}>
                                <View style={styles.cardthemOff}>
                                  <View style={styles.textArea}>
                                    <Text style={styles.titleButtonOffT}>
                                      {dispFrom}
                                    </Text>
                                  </View>
                                </View>
                              </TouchableOpacity>
                              <Text
                                style={{
                                  color: colors.modaltitletext,
                                  marginTop: 22,
                                  marginLeft: 10,
                                }}>
                                To
                              </Text>
                              <TouchableOpacity
                                onPress={() => showModeTo('time')}>
                                <View style={styles.cardthemOff}>
                                  <View style={styles.textArea}>
                                    <Text style={styles.titleButtonOffT}>
                                      {dispTo}
                                    </Text>
                                  </View>
                                </View>
                              </TouchableOpacity>
                              <View style={styles.cardboardT}>
                                <DatePicker
                                  modal
                                  open={open}
                                  mode="time"
                                  date={dateF}
                                  onConfirm={date => {
                                    setOpen(false);
                                    onChangeFrom(date);
                                  }}
                                  onCancel={() => {
                                    setOpen(false);
                                  }}
                                />

                                <DatePicker
                                  modal
                                  open={openTo}
                                  mode="time"
                                  date={dateT}
                                  onConfirm={date => {
                                    setOpenTo(false);
                                    onChangeTo(date);
                                  }}
                                  onCancel={() => {
                                    setOpenTo(false);
                                  }}
                                />
                              </View>
                            </View>
                            {days.map((item, index) => (
                              <View style={{ flexDirection: 'row' }}>
                                <CheckBox
                                  key={item.id}
                                  // title={item.label}
                                  disabled={false}
                                  // checked={item.checked}
                                  value={item.status}
                                  onValueChange={() => toggle(index)}
                                />
                                <Text style={styles.titleButtonOffT}>
                                  {item.day}
                                </Text>
                              </View>
                            ))}

                            {/* SAVE EDITED SCHEDULING */}
                            <TouchableOpacity onPress={() => apiCall2()}>
                              <View style={styles.Buttonsave}>
                                <View style={styles.textAreasave}>
                                  <Text style={styles.titlesave}>Save</Text>/
                                </View>
                              </View>
                            </TouchableOpacity>
                          </>
                        ) : (
                          <>
                            <View style={{ alignItems: 'center', marginTop: 50 }}>
                              <Text
                                style={{
                                  fontFamily: 'Cochin',
                                  fontSize: 10,
                                  color: 'red',
                                }}>
                                ...!Nothing TO Show Please Add Schedule...
                              </Text>
                            </View>
                          </>
                        )}
                      </View>
                    </View>
                  </Modal>
                </View>

                <View style={styles.centeredView}>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={addmodalVisible}
                    onRequestClose={() => {
                      setaddModalVisible(!addmodalVisible);
                    }}>
                    <BlurView
                      style={styles.blurView}
                      blurType="light" // Values = dark, light, xlight .
                      blurAmount={10}
                      // viewRef={this.state.viewRef}
                      reducedTransparencyFallbackColor="white"
                    />
                    <View style={styles.centeredView}>
                      <View style={styles.modalViewtimemodal}>
                        <Text style={styles.modalText}>
                          Welcome To Add Schedule
                        </Text>

                        {days != 0 ? (
                          <>
                            <View style={{ flexDirection: 'row' }}>
                              <Text></Text>
                              <TouchableOpacity
                                onPress={() => showModeFrom('time')}>
                                <View style={styles.cardthemOff}>
                                  <View style={styles.textArea}>
                                    <Text style={styles.titleButtonOffT}>
                                      {dispFrom}
                                    </Text>
                                  </View>
                                </View>
                              </TouchableOpacity>
                              <Text
                                style={{
                                  color: colors.modaltitletext,
                                  marginTop: 22,
                                  marginLeft: 10,
                                }}>
                                To
                              </Text>
                              <TouchableOpacity
                                onPress={() => showModeTo('time')}>
                                <View style={styles.cardthemOff}>
                                  <View style={styles.textArea}>
                                    <Text style={styles.titleButtonOffT}>
                                      {dispTo}
                                    </Text>
                                  </View>
                                </View>
                              </TouchableOpacity>
                              <View style={styles.cardboardT}>
                                <DatePicker
                                  modal
                                  open={open}
                                  mode="time"
                                  date={dateF}
                                  onConfirm={date => {
                                    setOpen(false);
                                    onChangeFrom(date);
                                  }}
                                  onCancel={() => {
                                    setOpen(false);
                                  }}
                                />

                                <DatePicker
                                  modal
                                  open={openTo}
                                  mode="time"
                                  date={dateT}
                                  onConfirm={date => {
                                    setOpenTo(false);
                                    onChangeTo(date);
                                  }}
                                  onCancel={() => {
                                    setOpenTo(false);
                                  }}
                                />
                              </View>
                            </View>
                            {days.map((item, index) => (
                              <View style={{ flexDirection: 'row' }}>
                                <CheckBox
                                  key={item.id}
                                  // title={item.label}
                                  disabled={false}
                                  // checked={item.checked}
                                  value={item.status}
                                  onValueChange={() => toggle(index)}
                                />
                                <Text style={styles.titleButtonOffT}>
                                  {item.day}
                                </Text>
                              </View>
                            ))}

                            {/* SCHEDULING SAVE */}

                            <TouchableOpacity
                              onPress={() => apiCallAddschedule()}>
                              <View style={styles.Buttonsave}>
                                <View style={styles.textAreasave}>
                                  <Text style={styles.titlesave}>Save </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </>
                        ) : (
                          <>
                            <View style={{ alignItems: 'center', marginTop: 50 }}>
                              <Text
                                style={{
                                  fontFamily: 'Cochin',
                                  fontSize: 10,
                                  color: 'red',
                                }}>
                                ...!Nothing TO Show Please Add Schedule...
                              </Text>
                            </View>
                          </>
                        )}
                      </View>
                    </View>
                  </Modal>
                </View>
              </ScrollView>
            </SafeAreaView>
          </View>
          {/* </View> */}
        </Modal>
      </View>

      {/* MODAL FOR SETTING MODE VIEW ON ADD MODES FROM CARD  */}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modemodal}
          onRequestClose={() => {
            setmodeModal(!modemodal);
          }}>
          <BlurView
            style={styles.blurView}
            blurType="light" // Values = dark, light, xlight .
            blurAmount={10}
            // viewRef={this.state.viewRef}
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.centeredView}>
            <View style={styles.modemodalview}>
              <Text style={styles.modalText}>Set Your Mode</Text>

              {/* ALL CONFIGURED MODES   */}
              <View style={styles.centeredView}>
                <SafeAreaView>
                  <ScrollView
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                    }>
                    {loading ? (
                      <View style={{ paddingTop: 300 }}>
                        <ActivityIndicator size="large" color="#ffffff" />
                      </View>
                    )
                      :

                      (
                        <>
                          {modelocation == [] || modelocation === null ? (
                            <View>
                              <Text
                                style={[
                                  styles.textStyle,
                                  { alignContent: 'center' },
                                ]}>
                                No More Modes To Shown
                              </Text>
                            </View>
                          )


                            :

                            (
                              <>
                                {modelocation.map((loc, index) => {
                                  const key = index + 1;
                                  return (
                                    <>
                                      {loc.mode_details.map(mode => {
                                        // console.log("2849 ilaha" , mode)
                                        return (
                                          <View style={styles.locationcard}>
                                            <>
                                              <View
                                                style={{ flexDirection: 'column' }}>
                                                <View
                                                  style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                  }}>
                                                  {/* MODE NAMES */}
                                                  <Text style={styles.modenametext}>
                                                    {
                                                      mode['mode']

                                                    }
                                                  </Text>
                                                  {/* MODE ACTIVATION */}
                                                  {/* MODE BASED ON TIME */}
                                                  {/* {mode['on_time'] == null ? ( */}
                                                  {

                                                    mode['mode'] == null ? (
                                                      <Switch
                                                        trackColor={{
                                                          false: '#767577',
                                                          true: '#81b0ff',
                                                        }}
                                                        thumbColor={
                                                          mode.mode_active_status
                                                            ? '#f5dd4b'
                                                            : '#f4f3f4'
                                                        }
                                                        ios_backgroundColor="#3e3e3e"
                                                        onValueChange={() =>
                                                          Toast.show(
                                                            'Set Timings',
                                                            Toast.LONG,
                                                            Toast.TOP,
                                                          )
                                                        }
                                                        value={false}
                                                      />
                                                    )

                                                      :

                                                      (
                                                        <Switch
                                                          trackColor={{
                                                            false: '#767577',
                                                            true: '#81b0ff',
                                                          }}
                                                          thumbColor={
                                                            mode.mode_active_status
                                                              ? '#f5dd4b'
                                                              : '#f4f3f4'
                                                          }
                                                          ios_backgroundColor="#3e3e3e"
                                                          onValueChange={() =>
                                                            modetoggleSwitch(
                                                              key,
                                                              !mode.mode_active_status,
                                                              mode.mode,
                                                              loc.location,
                                                            )
                                                          }
                                                          value={
                                                            mode['mode_active_status']
                                                          }
                                                        />
                                                      )}
                                                </View>
                                                <Text></Text>

                                                {/* ADD MODE */}
                                                <View
                                                  style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                  }}>
                                                  <View
                                                    style={{
                                                      flexDirection: 'row',
                                                      justifyContent: 'flex-start',
                                                    }}>
                                                    <TouchableOpacity
                                                      onPress={() => {
                                                        sinit(
                                                          mode['mode'],
                                                          loc.location,
                                                        ); // navigation.navigate('Select Switch', { modename: mode['mode'], location: route.params.location });
                                                        // console.log("insideofnavigation", mode['mode'], route.params.location);
                                                      }}>
                                                      <Feather
                                                        style={styles.icon}
                                                        name="edit"
                                                        size={25}
                                                      />
                                                    </TouchableOpacity>
                                                    {/* <Text></Text> */}
                                                    <TouchableOpacity
                                                      onPress={() =>
                                                        DeleteMode(
                                                          mode['mode'],
                                                          loc.location,
                                                        )
                                                      }>
                                                      <Ico
                                                        style={[
                                                          styles.icon,
                                                          { marginLeft: 8 },
                                                        ]}
                                                        name="delete-outline"
                                                        size={20}
                                                      />
                                                    </TouchableOpacity>

                                                    <Text> </Text>



                                                    {/* EDIT TIMER IN MODES */}


                                                    {/* <TouchableOpacity
                                                      activeOpacity={0.7}
                                                      // onPress={() => navigation.navigate('Add Schedule', { 'location': loc.location, 'mode': mode.mode, 'days': mode.days, 'on_time': mode['on_time'], 'off_time': mode.off_time })}
                                                      onPress={() => {
                                                        setdays(mode.days);
                                                        modes = mode.mode;
                                                        // console.log(
                                                        //   'SELECTED mode',
                                                        //   modes,
                                                        // );
                                                        setmodeTimeVisible(true);
                                                        // console.log(
                                                        //   'Daysdetails',
                                                        //   days,
                                                        // );
                                                      }}>
                                                      <MaterialCommunityIcons
                                                        style={styles.icon}
                                                        name="timer-outline"
                                                        size={20}
                                                      />
                                                    </TouchableOpacity> */}
                                                  </View>


                                                  {/* SHOWING TIMER IN MODES */}
                                                  {/* {mode['on_time'] == null
                                                  
                                                  
                                                  ?
                                                  
                                                  
                                                  (
                                                    <Text
                                                      style={{
                                                        color:
                                                          colors.modaltitletext,
                                                      }}>
                                                      Please Select Time
                                                    </Text>
                                                  ) 
                                                  
                                                  : 
                                                  
                                                  (
                                                    <Text style={styles.textDisp}>
                                                      {mode['on_time'] == null
                                                        ? null
                                                        : mode['on_time'].slice(
                                                          0,
                                                          5,
                                                        )}{' '}
                                                      {''}TO{'  '}
                                                      {mode['off_time'] == null
                                                        ? null
                                                        : mode['off_time'].slice(
                                                          0,
                                                          5,
                                                        )}
                                                      <Text>{'  '}</Text>
                                                    </Text>
                                                  )} */}
                                                </View>
                                              </View>
                                            </>
                                          </View>
                                        );
                                      })}
                                    </>
                                  );
                                })}
                              </>
                            )}
                        </>
                      )}

                    {/* SETTING MODE  */}
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 15,
                      }}>
                      <TouchableOpacity
                        style={{
                          width: 100,
                          height: 40,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 15,
                          marginBottom: 10,
                          backgroundColor: colors.modalbuttons,
                        }}
                        onPress={() => setModalVisiblename(true)}>
                        <Text
                          style={[
                            styles.textSign,
                            {
                              color: colors.modaltitletext,
                              fontWeight: 'bold',
                            },
                          ]}>
                          Add Mode
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <Modal
                      animationType="fade"
                      transparent={true}
                      visible={modalVisiblename}
                      onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
                        setModalVisiblename(false);
                      }}>
                      <BlurView
                        style={styles.blurView}
                        blurType="light" // Values = dark, light, xlight .
                        blurAmount={10}
                        // viewRef={this.state.viewRef}
                        reducedTransparencyFallbackColor="white"
                      />
                      <View style={styles.modalView}>
                        <SafeAreaView>
                          <ScrollView style={styles.scrollView}>
                            <View style={styles.action}>
                              <FontAwesome
                                name="user-o"
                                color="green"
                                size={20}
                              />
                              <TextInput
                                placeholder="Enter Mode Name"
                                placeholderTextColor={colors.modaltext}
                                style={{ color: colors.modaltitletext }}
                                autoCapitalize="none"
                                onChangeText={val => textInputChange(val)}
                                onEndEditing={e =>
                                  handleValidUser(e.nativeEvent.text)
                                }
                              />
                              {data.check_textInputChange ? (
                                <Animatable.View animation="bounceIn">
                                  <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                  />
                                </Animatable.View>
                              ) : null}
                            </View>
                            {data.isValidUser ? null : (
                              <Animatable.View
                                animation="fadeInLeft"
                                duration={500}>
                                <Text style={{ color: colors.modaltext }}>
                                  Mode Name atleast 4 characters long.
                                </Text>
                              </Animatable.View>
                            )}

                            <TouchableOpacity
                              style={[styles.Modalbutton, styles.buttonClose]}
                              onPress={() => {
                                checkMode(data.mode);
                              }}>
                              <Text style={styles.textStyle}>Add</Text>
                            </TouchableOpacity>
                            <Text> </Text>
                            <TouchableOpacity
                              style={[styles.Modalbutton, styles.buttonClose]}
                              onPress={() =>
                                setModalVisiblename(!modalVisiblename)
                              }>
                              <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                          </ScrollView>
                        </SafeAreaView>
                      </View>
                    </Modal>

                    <View style={styles.centeredView}>
                      <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modeTimevisible}
                        onRequestClose={() => {
                          setmodeTimeVisible(!modeTimevisible);
                        }}>
                        <BlurView
                          style={styles.blurView}
                          blurType="light" // Values = dark, light, xlight .
                          blurAmount={10}
                          // viewRef={this.state.viewRef}
                          reducedTransparencyFallbackColor="white"
                        />
                        <View style={styles.centeredView}>
                          <View style={styles.modalViewtimemodal}>
                            <Text style={styles.modalText}>
                              Welcome To Time Schedule
                            </Text>
                            {days != 0 ? (
                              <>
                                <View style={{ flexDirection: 'row' }}>
                                  <Text></Text>
                                  <TouchableOpacity
                                    onPress={() => dateFrom('time')}>
                                    <View style={styles.cardthemOff}>
                                      <View style={styles.textArea}>
                                        <Text style={styles.titleButtonOffT}>
                                          {modedispFrom}
                                        </Text>
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                  <Text
                                    style={{
                                      color: colors.modaltitletext,
                                      marginTop: 22,
                                      marginLeft: 10,
                                    }}>
                                    To
                                  </Text>
                                  <TouchableOpacity
                                    onPress={() => dateTo('time')}>
                                    <View style={styles.cardthemOff}>
                                      <View style={styles.textArea}>
                                        <Text style={styles.titleButtonOffT}>
                                          {modedispTo}
                                        </Text>
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                  <View style={styles.cardboardT}>
                                    <DatePicker
                                      modal
                                      open={openTimemodal}
                                      mode="time"
                                      date={dateF}
                                      onConfirm={date => {
                                        setOpenTimemodal(false);
                                        modeonChangeFrom(date);
                                      }}
                                      onCancel={() => {
                                        setOpenTimemodal(false);
                                      }}
                                    />

                                    <DatePicker
                                      modal
                                      open={openTimemodal2}
                                      mode="time"
                                      date={dateT}
                                      onConfirm={date => {
                                        setOpenTimemodal2(false);
                                        modeonChangeTo(date);
                                      }}
                                      onCancel={() => {
                                        setOpenTimemodal2(false);
                                      }}
                                    />
                                  </View>
                                </View>
                                {days.map((item, index) => (
                                  <View style={{ flexDirection: 'row' }}>
                                    <CheckBox
                                      key={item.id}
                                      // title={item.label}
                                      disabled={false}
                                      // checked={item.checked}
                                      value={item.status}
                                      onValueChange={() => modetoggle(index)}
                                    />
                                    <Text style={styles.titleButtonOffT}>
                                      {item.day}
                                    </Text>
                                  </View>
                                ))}
                                <TouchableOpacity onPress={() => apiCall()}>
                                  <View style={styles.Buttonsave}>
                                    <View style={styles.textAreasave}>
                                      <Text style={styles.titlesave}>Save</Text>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              </>
                            ) : (
                              <>
                                <View
                                  style={{ alignItems: 'center', marginTop: 50 }}>
                                  <Text
                                    style={{
                                      fontFamily: 'Cochin',
                                      fontSize: 10,
                                      color: 'red',
                                    }}>
                                    ...!Nothing TO Show Please Add Schedule...
                                  </Text>
                                </View>
                              </>
                            )}
                          </View>
                        </View>
                      </Modal>
                    </View>








                    {/* Mode last Model */}

                    <View style={styles.centeredView}>
                      <Modal
                        animationType="slide"
                        transparent={true}
                        visible={switchVisible}
                        onRequestClose={() => {
                          setswitchVisible(!switchVisible);
                        }}>
                        <BlurView
                          style={styles.blurView}
                          blurType="light" // Values = dark, light, xlight .
                          blurAmount={10}
                          // viewRef={this.state.viewRef}
                          reducedTransparencyFallbackColor="white"
                        />
                        <View style={styles.switchmodalView}>
                          <SafeAreaView>
                            <ScrollView
                              style={styles.scrollView}
                              refreshControl={
                                <RefreshControl
                                  refreshing={refreshing}
                                  onRefresh={onRefresh}
                                />
                              }>
                              <View>
                                {slocation.map(data => {
                                  // console.log("2730 data" , data)
                                  return (
                                    <View>
                                      <Text
                                        style={{
                                          fontSize: 20,
                                          fontWeight: 'bold',
                                          color: colors.modaltitletext,
                                        }}>
                                        Mode: {data.mode}
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: 15,
                                          fontWeight: 'bold',
                                          color: colors.modaltitletext,
                                        }}>
                                        {data.location}
                                      </Text>

                                      {data.boards.map(board => {
                                        return (
                                          <View style={styles.switchcard}>
                                            <View
                                              style={{ flexDirection: 'row' }}>
                                              {board.switches.map(swi => {
                                                return (
                                                  <>
                                                    {/* <View style={{ flexDirection: 'row' }}><Text>{swi.sw}</Text></View> */}
                                                    {swi['status'] != 0 ? (
                                                      <TouchableOpacity
                                                        onPress={() => {
                                                          swi['status'] = false;
                                                          // console.log(JSON.stringify(location));
                                                          onRefresh();
                                                        }}>
                                                        <View
                                                          style={
                                                            styles.cardthemOn
                                                          }>
                                                          <View
                                                            style={
                                                              styles.textArea
                                                            }>
                                                            <Text
                                                              style={
                                                                styles.titleButtonOn
                                                              }>
                                                              {swi['sw'][0]}
                                                            </Text>
                                                          </View>
                                                        </View>
                                                      </TouchableOpacity>
                                                    ) : (
                                                      <TouchableOpacity
                                                        onPress={() => {
                                                          swi['status'] = true;
                                                          onRefresh();
                                                        }}>
                                                        <View
                                                          style={
                                                            styles.cardthemOff
                                                          }>
                                                          <View
                                                            style={
                                                              styles.textArea
                                                            }>
                                                            <Text
                                                              style={
                                                                styles.titleButtonOff
                                                              }>
                                                              {swi['sw'][0]}
                                                            </Text>
                                                          </View>
                                                        </View>
                                                      </TouchableOpacity>
                                                    )}
                                                  </>
                                                );
                                              })}
                                              {/* <Text style={styles.switchboardtitle}>{board.switchBoardId}</Text> */}
                                            </View>
                                            <View
                                              style={{
                                                position: 'absolute',
                                                right: 0,
                                                marginRight: 10,
                                              }}>
                                              <Text
                                                style={styles.switchboardtitle}>
                                                {board.switchBoardId}
                                              </Text>
                                            </View>
                                          </View>
                                        );
                                      })}

                                      {data.Bat != null
                                        ? data.Bat.map(b => {
                                          return (
                                            <>
                                              <View style={styles.switchcard}>
                                                <View
                                                  style={{
                                                    flexDirection: 'row',
                                                  }}>
                                                  {b.switches.map((s, i) => (
                                                    <>
                                                      {s['status'] != 0 ? (
                                                        <TouchableOpacity
                                                          onPress={() => {
                                                            modechange_status(
                                                              s['id'],
                                                              (s['status'] =
                                                                '0'),
                                                            );
                                                            // console.log(
                                                            //   s['id'],
                                                            // ),
                                                            //   console.log(
                                                            //     s['status'],
                                                            //   );
                                                            onRefresh();
                                                          }}>
                                                          <View
                                                            style={
                                                              styles.cardthemOn
                                                            }>
                                                            <View
                                                              style={
                                                                styles.textArea
                                                              }>
                                                              <Text
                                                                style={
                                                                  styles.titleButtonOn
                                                                }>
                                                                {s['sw'][0]}
                                                              </Text>
                                                            </View>
                                                          </View>
                                                        </TouchableOpacity>
                                                      ) : (
                                                        <TouchableOpacity
                                                          onPress={() => {
                                                            modechange_status(
                                                              s['id'],
                                                              (s['status'] =
                                                                '1'),
                                                            );
                                                            // console.log(
                                                            //   s['id'],
                                                            // ),
                                                            //   console.log(
                                                            //     s['status'],
                                                            //   );
                                                            onRefresh();
                                                          }}>
                                                          <View
                                                            style={
                                                              styles.cardthemOff
                                                            }>
                                                            <View
                                                              style={
                                                                styles.textArea
                                                              }>
                                                              <Text
                                                                style={
                                                                  styles.titleButtonOff
                                                                }>
                                                                {s['sw'][0]}
                                                              </Text>
                                                            </View>
                                                          </View>
                                                        </TouchableOpacity>
                                                      )}
                                                    </>
                                                  ))}
                                                  {/* <Text style={styles.switchboardtitle}>{b.switchBoardId}</Text> */}
                                                </View>
                                                <View
                                                  style={{
                                                    position: 'absolute',
                                                    right: 0,
                                                    marginRight: 10,
                                                  }}>
                                                  <Text
                                                    style={
                                                      styles.switchboardtitle
                                                    }>
                                                    {b.switchBoardId}
                                                  </Text>
                                                </View>
                                              </View>
                                            </>
                                          );
                                        })
                                        : null}

                                      {data.Bal != null
                                        ? data.Bal.map(b => {
                                          return (
                                            <>
                                              <View style={styles.switchcard}>
                                                <View
                                                  style={{
                                                    flexDirection: 'row',
                                                  }}>
                                                  {b.switches.map((s, i) => (
                                                    <>
                                                      {s['status'] != 0 ? (
                                                        <TouchableOpacity
                                                          onPress={() => {
                                                            modechange_status(
                                                              s['id'],
                                                              (s['status'] =
                                                                '0'),
                                                            );
                                                            onRefresh();
                                                            // console.log(
                                                            //   s['id'],
                                                            // ),
                                                            //   console.log(
                                                            //     s['status'],
                                                            //   );
                                                          }}>
                                                          <View
                                                            style={
                                                              styles.cardthemOn
                                                            }>
                                                            <View
                                                              style={
                                                                styles.textArea
                                                              }>
                                                              <Text
                                                                style={
                                                                  styles.titleButtonOn
                                                                }>
                                                                {s['sw'][0]}
                                                              </Text>
                                                            </View>
                                                          </View>
                                                        </TouchableOpacity>
                                                      ) : (
                                                        <TouchableOpacity
                                                          onPress={() => {
                                                            modechange_status(
                                                              s['id'],
                                                              (s['status'] =
                                                                '1'),
                                                            );
                                                            onRefresh();
                                                            // console.log(
                                                            //   s['id'],
                                                            // ),
                                                            //   console.log(
                                                            //     s['status'],
                                                            //   );
                                                          }}>
                                                          <View
                                                            style={
                                                              styles.cardthemOff
                                                            }>
                                                            <View
                                                              style={
                                                                styles.textArea
                                                              }>
                                                              <Text
                                                                style={
                                                                  styles.titleButtonOff
                                                                }>
                                                                {s['sw'][0]}
                                                              </Text>
                                                            </View>
                                                          </View>
                                                        </TouchableOpacity>
                                                      )}
                                                    </>
                                                  ))}
                                                </View>
                                                <View
                                                  style={{
                                                    position: 'absolute',
                                                    right: 0,
                                                    marginRight: 10,
                                                  }}>
                                                  <Text
                                                    style={
                                                      styles.switchboardtitle
                                                    }>
                                                    {b.switchBoardId}
                                                  </Text>
                                                </View>
                                              </View>
                                            </>
                                          );
                                        })
                                        : null}
                                    </View>
                                  );
                                })}
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  marginTop: 10,
                                }}>
                                <View>
                                  <TouchableOpacity
                                    style={{
                                      width: 100,
                                      height: 40,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      borderRadius: 15,
                                      marginBottom: 10,
                                      backgroundColor: colors.modalbuttons,
                                    }}
                                    onPress={() => {
                                      call(slocation);
                                    }}>

                                    <Text
                                      style={[
                                        styles.textSign,
                                        {
                                          color: colors.modaltitletext,
                                          fontWeight: 'bold',
                                        },
                                      ]}>
                                      Submit
                                    </Text>
                                    {/* </LinearGradient> */}
                                  </TouchableOpacity>
                                </View>
                                <View>
                                  <TouchableOpacity
                                    style={{
                                      width: 100,
                                      height: 40,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      borderRadius: 15,
                                      marginBottom: 10,
                                      backgroundColor: colors.modalbuttons,
                                    }}
                                    onPress={() =>
                                      setswitchVisible(!switchVisible)
                                    }>
                                    <Text
                                      style={[
                                        styles.textSign,
                                        {
                                          color: colors.modaltitletext,
                                          fontWeight: 'bold',
                                        },
                                      ]}>
                                      Close
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </ScrollView>
                          </SafeAreaView>
                        </View>
                      </Modal>
                    </View>

                  </ScrollView>
                </SafeAreaView>




              </View>
            </View>
          </View>
        </Modal>
      </View>

    </View>
  );
};

AutoManualScreen.propTypes = {
  getDetails: PropTypes.func,
  automanualstatus: PropTypes.instanceOf(Array),

  getActiveStatus: PropTypes.func,
  pirstatus: PropTypes.instanceOf(Array),

  pirData: PropTypes.func,
  setpirstatus: PropTypes.instanceOf(Array),

  setTempLux: PropTypes.func,
  automanualtemp: PropTypes.instanceOf(Array),

  getScheduleDetails: PropTypes.func,
  scheduleMode2: PropTypes.instanceOf(Array),

  switchDetails: PropTypes.func,
  schedule_loc_time: PropTypes.instanceOf(Array),

  setTimer: PropTypes.func,
  modify_schedule_time: PropTypes.instanceOf(Array),

  getStatus: PropTypes.func,
  changestatus: PropTypes.instanceOf(Array),


  getFanSpeedStatus: PropTypes.func,
  fan_speed_change: PropTypes.instanceOf(Array),

  Delete_schedule: PropTypes.func,
  delete_schedule_loc: PropTypes.instanceOf(Array),

  scheduleChanges: PropTypes.func,
  schedule_change: PropTypes.instanceOf(Array),

  modeDetails: PropTypes.func,
  detailsmode: PropTypes.instanceOf(Array),

  modeswitchDetails: PropTypes.func,
  getSwitchStatus: PropTypes.instanceOf(Array),

  dummy: PropTypes.func,
  modeset: PropTypes.instanceOf(Array),

  _addmode: PropTypes.func,
  modename: PropTypes.instanceOf(Array),

  updateSwitch: PropTypes.func,
  switchstatus: PropTypes.instanceOf(Array),

  _changeSwitch: PropTypes.func,
  switch_mode: PropTypes.instanceOf(Array),

  getSchedule: PropTypes.func,
  add_schedule_loc: PropTypes.instanceOf(Array),

  delete_Mode: PropTypes.func,
  delete_mode: PropTypes.instanceOf(Array),

  updateScheduleSwitch: PropTypes.func,
  update_schedule_switch: PropTypes.instanceOf(Array),


  getpanicData: PropTypes.func,
  getFireData: PropTypes.instanceOf(Array),
};

AutoManualScreen.defaultProps = {
  getDetails: () => { },
  automanualstatus: [],

  getActiveStatus: () => { },
  pirstatus: [],

  pirData: () => { },
  setpirstatus: [],

  setTempLux: () => { },
  automanualtemp: [],

  getScheduleDetails: () => { },
  scheduleMode2: [],

  switchDetails: () => { },
  schedule_loc_time: [],

  getStatus: () => { },
  statusData: [],

  getFanSpeedStatus: () => { },
  fan_speed_change: [],

  setTimer: () => { },
  modify_schedule_time: [],

  Delete_schedule: () => { },
  delete_schedule_loc: [],

  scheduleChanges: () => { },
  schedule_change: [],

  modeDetails: () => { },
  detailsmode: [],

  modeswitchDetails: () => { },
  getSwitchstatus: [],


  dummy: () => { },
  modeset: [],

  _addmode: () => { },
  modename: [],

  updateSwitch: () => { },
  switchstatus: [],

  _changeSwitch: () => { },
  switch_mode: [],

  getSchedule: () => { },
  add_schedule_loc: [],

  delete_Mode: () => { },
  delete_mode: [],

  updateScheduleSwitch: () => { },
  update_schedule_switch: [],


  getpanicData: () => { },
  getFireData: [],
};

const mapStateToProps = ({
  getautomanualstatus: { automanualstatus },
  setautomanualstatus: { changeautomanualstatus },
  getPirStatus: { pirstatus },
  setPirStatus: { setpirstatus },
  setAutomanualTemp: { automanualtemp },

  // setFanSpeed:{fan_speed_change}
}) =>
// console.warn("3094 mapStateToProps fanSpeedRegulation" , setFanSpeed)
({
  automanualstatus,
  changeautomanualstatus,
  pirstatus,
  setpirstatus,
  automanualtemp,
  // fan_speed_change
});

const mapDispatchToProps = {
  getAutoMationDashboard: send => autoMationDashboard(send),
  changeAutoMationFromDashboard: send => EnableDisanlePirD(send),
  getDetails: send => autoManualDetails(send),
  switchDetails: send => scheduleTime(send),
  setTimer: send => modifySchedule(send),
  updateScheduleSwitch: send => updateSchedule(send),
  getScheduleDetails: send => scheduleSwitchs(send),
  getStatus: send => changeStatus(send),
  getFanSpeedStatus: send => fan_speed_change(send),
  getActiveStatus: send => setpirStatus(send),
  pirData: send => getpirStatus(send),
  setTempLux: send => setAutomanulTempLux(send),
  Delete_schedule: send => scheduleDelete(send),
  scheduleChanges: send => scheduleChange(send),

  // ! MODE OLD IMPLEMENTATION
  modeDetails: send => mode_Details(send),
  modeswitchDetails: send => getSwitchdetails(send),
  dummy: send => mode_Set(send),
  _addmode: data => addMode_(data),
  _changeSwitch: send => modeSwitch(send),
  delete_Mode: send => modeDelete(send),

  // MODE NEW IMPLEMENTATION
  g_GetModes: send => ShowGlobalModes(send),
  g_changeGlobalmode: send => ChangeGlobalmode(send),
  g_addGlobalmode: send => AddGlobalMode(send),
  g_deleteGlobalmode: send => DeleteGlobalMode(send),

  getSchedule: send => scheduleAdd(send),
  hard_manual_action: send => enab_disHardManual(send),
  updateSwitch: send => switchStatusUpdate(send),
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoManualScreen);

const useStyles = theme =>
  StyleSheet.create({
    modebutton: {
      padding: 2,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "grey",
      marginHorizontal: 4
    },
    activeButton: {
      backgroundColor: '#3b9eb8',
    },
    inactiveButton: {
      backgroundColor: 'grey',
    },
    automationFlag: {
      backgroundColor: "skyblue",
    },
    centeredView: {
      // justifyContent: "center",
      // alignItems: "center",
      // marginTop: 22
    },

    modes: {

      display: 'flex',
      flexDirection: "row",
      justifyContent: "space-between"

    },
    safteyProduct: {

      display: 'flex',
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 10
      // gap: 20

    },
    baseText: {
      fontSize: 13,
      fontWeight: 'bold',
      color: theme.colors.cardtext,
    },
    baseTextH: {
      fontWeight: 'bold',
      paddingBottom: 3,
      fontSize: 15,
      color: theme.colors.modaltext,
    },
    modalView: {
      // margin: 8,
      backgroundColor: theme.colors.modalcolor,
      borderRadius: 20,
      paddingVertical: 35,
      paddingHorizontal: 15,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      display: "flex",
      flexDirection: "column",
      rowGap: 10

    },
    Addschedulemodal: {
      margin: 8,
      backgroundColor: theme.colors.modalcolor,
      borderRadius: 20,
      paddingVertical: 10,
      padding: 8,
      // paddingHorizontal: 15,
      // alignItems: "center",
      shadowColor: '#000',
      // shadowOffset: {
      //     width: 2,
      //     height: 2
      // },
      // shadowOpacity: 0.25,
      // shadowRadius: 4,
      // elevation: 5
    },


    buttonClose: {
      backgroundColor: theme.colors.modalbuttons,
    },
    textStyle: {
      color: theme.colors.modaltitletext,
      // color: "#2f353d",
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      color: theme.colors.modaltitletext,
      fontWeight: 'bold',
    },
    buttonRow: {
      // height: 100,
      flexDirection: 'row',
      marginTop: 50,
      marginLeft: 27,
      marginRight: 49,
    },
    locationcard: theme.dark
      ? {
        padding: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 20,
        // borderWidth: 1,
        // borderColor: '#323F4B',
        backgroundColor: theme.colors.locationcard,
      }
      : {
        padding: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 20,
        // backgroundColor: theme.colors.locationcard,
        // borderBottomWidth: 0.15,
        // zIndex: 2,
        borderColor: '#117C6F',
        borderWidth: 1,
      },
    cardboard: theme.dark
      ? {
        marginVertical: 4,
        borderWidth: 2,
        borderRadius: 10
      }
      : {
        marginBottom: 2,
        borderWidth: 2,
        borderRadius: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        backgroundColor: theme.colors.cardboard,
      },

    switchboardCard: theme.dark
      ? {
        flex: 1,
        borderRadius: 10,
        marginVertical: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 1,
        borderColor: "black",
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
      }
      : {
        flex: 1,
        flexWrap: "wrap",
        borderRadius: 20,
        borderWidth: 1,
        transparent: 1,
        marginBottom: 2,
        flexDirection: 'row',
        borderColor: "white",
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
      },



    cardthemOn: theme.dark
      ? {
        flexDirection: 'row',
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 10,
        marginRight: 10,
        borderRadius: 8,
        width: 65,
        height: 65,

        backgroundColor: '#fbffff',
        zIndex: 1,
        // borderColor: 'green',
        borderWidth: 3,
      }
      : {
        flexDirection: 'row',
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 10,
        marginRight: 10,
        borderRadius: 8,
        width: 65,
        height: 65,
        backgroundColor: '#117C6F',
        zIndex: 1,
        // borderColor: '#3D5C64',
        borderWidth: 3,
      },
    cardthemOff: theme.dark
      ? {
        flexDirection: 'row',
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 10,
        marginRight: 10,
        borderRadius: 8,
        width: 65,
        height: 65,
        backgroundColor: '#22272d',
        zIndex: 1,
        // borderColor: '#abb0b3',
        // borderWidth: 1,
        borderWidth: 3,
      }
      : {
        flexDirection: 'row',
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 10,
        marginRight: 10,
        borderRadius: 8,
        width: 65,
        height: 65,
        // backgroundColor: '#DAE2DF',
        zIndex: 1,
        borderColor: '#117C6F',
        borderWidth: 3,
      },

    boardtitle: {
      // marginTop: 20,
      marginLeft: 10,
      fontSize: 15,
      alignItems: 'center',
      color: theme.colors.locationtext,
    },
    boadBat: {
      paddingHorizontal: 10,
      fontSize: 15,
      fontWeight: 'bold',
      // transform: [{rotate: '270deg' }],
      color: theme.colors.locationtext,
    },
    title: {
      paddingLeft: 20,
      fontSize: 35,
      marginTop: -35,
      // fontFamily: 'sans-serif',
      // fontWeight: '700',
      // color: '#000000',
      // fontSize: 35,
      color: theme.colors.locationtext,
      fontWeight: 'bold',
      textAlign: "center"
    },
    timeText: {
      fontSize: 14,
      color: theme.colors.modaltitletext,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    textArea: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 10,
      paddingLeft: 10,
      // borderColor:"blue",
      justifyContent: 'center',
      position: "relative"
    },
    icon: {
      paddingLeft: 5,
      paddingBottom: 5,
      color: theme.colors.iconcolor,
    },

    titleButtonOn: theme.dark
      ? {
        // fontSize: 8,
        color: '#22272d',
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 2
      }
      : {
        fontSize: 8,
        // color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 2
      },
    titleButtonOff: theme.dark
      ? {
        fontSize: 8,
        color: '#abb0b3',
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 2
      }
      : {
        fontSize: 8,
        color: '#282929',
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 2
      },

    automationIcon: {
      position: 'absolute',
      top: 0,
      right: -5,

      // paddingBottom: 5

    },


    swnameOn: theme.dark
      ? {
        fontSize: 8,
        color: '#4287f5',
        fontWeight: 'bold',
        textAlign: 'center',
        flexWrap: 'wrap'

      }
      : {
        fontSize: 8,
        color: '#4287f5',
        fontWeight: 'bold',
        textAlign: 'center',
        textAlign: 'center',
        flexWrap: 'wrap'
      },
    swnameOff: theme.dark
      ? {
        fontSize: 8,
        color: '#fcfdff',
        fontWeight: 'bold',
        textAlign: 'center',
        flexWrap: 'wrap'

      }
      : {
        fontSize: 8,
        color: '#fcfdff',
        fontWeight: 'bold',
        textAlign: 'center',
        flexWrap: 'wrap'
      },
    rowicon: {
      flexDirection: 'row',
      textAlign: 'center',
      marginLeft: 20
    },
    modelTitle: {
      color: theme.colors.modaltitletext,
      fontSize: 18,
      marginTop: 4,
      marginRight: 10,
      fontWeight: 'bold',
      // margin: 15
    },
    Modalbutton: {
      // justifyContent: 'flex-end',
      // alignItems: 'flex-end',
      // alignContent: 'flex-end',
      borderRadius: 20,
      height: 40,
      width: 100,
      padding: 10,
      elevation: 2,
      marginTop: 20,
    },

    FloatingActionButtonStyle: {
      position: 'absolute',
      width: 100,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 120,
      bottom: 20,
      backgroundColor: '#009387',
      borderRadius: 200 / 2,
    },
    FloatingActionButtonStyleSwitch: {
      position: 'absolute',
      width: 100,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 30,
      backgroundColor: '#009387',
      borderRadius: 5,
    },
    titleText: {
      marginTop: 7,
      marginLeft: 3,
      fontSize: 15,
      color: theme.colors.modaltext,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    submit: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
    },
    buttonsubmit: {
      alignItems: 'center',
      marginTop: 20,
    },
    titleButtonOffT: {
      fontSize: 16,
      color: theme.colors.modaltext,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    textAreasave: {
      paddingHorizontal: 6,
      paddingVertical: 6,
    },
    titlesave: {
      fontSize: 16,
      color: theme.colors.modaltitletext,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    Buttonsave: {
      marginHorizontal: 10,
      marginVertical: 10,
      borderRadius: 8,
      height: 40,
      width: 100,
      backgroundColor: theme.colors.modalbuttons,
      zIndex: 1,
      borderColor: '#0f0d0d',
      borderWidth: 1,
    },
    modalViewtimemodal: {
      margin: 20,
      backgroundColor: theme.colors.modalcolor,
      borderRadius: 20,
      padding: 35,
      alignItems: 'stretch',
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    allscheduledisplaymodal: {
      margin: 12,
      backgroundColor: theme.colors.modalcolor,
      borderRadius: 20,
      // padding: 35,
      // paddingTop: 10,
      paddingBottom: 10,
      alignItems: 'stretch',
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    locationtitletext: {
      fontWeight: 'bold',
      color: theme.colors.modaltitletext,
      fontSize: 20,
    },
    modecolor: {
      fontSize: 11,
      color: theme.colors.cardtext,
      fontWeight: 'bold',
      marginLeft: 5,
    },
    modemodalview: {
      margin: 10,
      backgroundColor: theme.colors.modalcolor,
      borderRadius: 20,
      // padding: 35,
      paddingTop: 10,
      paddingBottom: 10,
      // alignItems: 'stretch',
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modenametext: {
      color: theme.colors.modaltitletext,
      fontWeight: 'bold',
    },
    textDisp: {
      color: theme.colors.modaltitletext,
      // fontSize: 15,
      fontWeight: 'bold',
      // fontFamily: 'sans-serif',
      // textAlign: 'center',
      // marginLeft: 5,
    },
    switchmodalView: {
      margin: 10,
      backgroundColor: theme.colors.modalcolor,
      borderRadius: 20,
      height: 'auto',
      padding: 10,
      alignItems: 'stretch',
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    blurView: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    switchboardtitle: {
      color: theme.colors.modaltitletext,
    },
    container: {
      flexDirection: 'row', // Arrange items in a row
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      marginLeft: 35,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 20, // Add space between the checkbox groups
    },
    label: {
      marginLeft: 5,
    },
    buttonContainer: {
      // flexDirection: "row",
      // alignItems: "center",
    },


    modethemOn: theme.dark
      ? {
        borderRadius: 5,
        width: "auto",
        padding: 5,
        // elevation: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fbffff',
        zIndex: 1,
        borderWidth: 2,
      }

      : {
        borderRadius: 20,
        height: 30,
        width: "auto",
        padding: 10,
        elevation: 2,
        flexDirection: 'row',
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        borderColor: '#3D5C64',
        borderWidth: 3,
      },
    modethemOff: theme.dark
      ? {
        borderRadius: 5,
        // height: 50,
        width: "auto",
        padding: 10,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#22272d',
        zIndex: 1,
        borderWidth: 2,
      }
      : {
        flexDirection: 'row',
        // marginLeft: 10,
        // marginBottom: 10,
        // marginTop: 10,
        borderRadius: 8,
        // backgroundColor: '#DAE2DF',
        zIndex: 1,
        borderColor: '#117C6F',
        borderWidth: 3,
      },



    modetitleButtonOn: theme.dark
      ? {
        color: '#22272d',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        padding: 5
      }
      : {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
      },
    modetitleButtonOff: theme.dark
      ? {
        fontSize: 16,
        color: '#abb0b3',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        padding: 5
      }
      : {
        fontSize: 16,
        color: '#282929',
        fontWeight: 'bold',
        textAlign: 'center',
      },





    customeModeTime: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },







    // customeModeBoxON:{
    //   flexDirection: 'row',
    //   justifyContent: 'space-between',
    //   alignItems: 'center',
    //   marginTop: 10,
    // },  


    addButton: {
      padding: 10,
      backgroundColor: "lightgreen",
      alignItems: "center",
    },

    selectedcontainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: 20,
      height: 30,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#fff',
      margin: 5,
      position: "relative"

    },


    modalContent: {
      width: 200,
      position: "absolute",
      left: 0,
      right: 0
    },



  });

// NetInfo.addEventListener(state => {
//     console.log("Connection type in status details page", state.type);
//     console.log("Is connected?", state.isConnected);
//     if (state.type == 'wifi') {
//         console.log('eiei');
//         return () => { }
//     }

// });

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
