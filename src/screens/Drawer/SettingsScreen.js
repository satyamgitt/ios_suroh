/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import PropTypes, { array } from "prop-types";
import { connect } from "react-redux";

import {
  Platform,
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import Slider from '@react-native-community/slider';
import Ico from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';
import { PasswordChange } from '../../redux/actions/Drawer/Settings/PasswordChange';
import DropDownPicker from 'react-native-dropdown-picker';


const initialValue = [
  {
    "location": "Entrance",
    "boards": [
      {
        "switchBoardId": "1",
        "switches": [
          {
            "id": "Ajna_A_12_2_Entrance_11",
            "sw": "L",
            "status": "1"
          },
          {
            "id": "Ajna_A_12_2_Entrance_12",
            "sw": "L",
            "status": "1"
          },
          {
            "id": "Ajna_A_12_2_Entrance_13",
            "sw": "S",
            "status": "1"
          }
        ]
      }
    ],
    "temp": "27",
    "lux": "26"
  },
  {
    "location": "Hall",
    "boards": [
      {
        "switchBoardId": "1",
        "switches": [
          {
            "id": "Ajna_A_12_2__11",
            "sw": "F",
            "status": "0"
          },
          {
            "id": "Ajna_A_12_2__12",
            "sw": "L",
            "status": "0"
          },
          {
            "id": "Ajna_A_12_2__13",
            "sw": "L",
            "status": "1"
          },
          {
            "id": "Ajna_A_12_2__14",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2__15",
            "sw": "S",
            "status": "0"
          }
        ]
      },
      {
        "switchBoardId": "2",
        "switches": [
          {
            "id": "Ajna_A_12_2__21",
            "sw": "F",
            "status": null
          },
          {
            "id": "Ajna_A_12_2__22",
            "sw": "S",
            "status": null
          },
          {
            "id": "Ajna_A_12_2__23",
            "sw": "S",
            "status": "1"
          },
          {
            "id": "Ajna_A_12_2__24",
            "sw": "S",
            "status": null
          },
          {
            "id": "Ajna_A_12_2__25",
            "sw": "W",
            "status": null
          }
        ]
      }
    ],
    "temp": "23",
    "lux": "30",
    "Balcony": [
      {
        "switchBoardId": "1",
        "switches": [
          {
            "id": "Ajna_A_12_2__Bal_11",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2__Bal_12",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2__Bal_13",
            "sw": "W",
            "status": null
          }
        ]
      }
    ],
    "BalconyB": "Balcony"
  },
  {
    "location": "Room1",
    "boards": [
      {
        "switchBoardId": "1",
        "switches": [
          {
            "id": "Ajna_A_12_2_Room1_11",
            "sw": "F",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Room1_12",
            "sw": "L",
            "status": "1"
          },
          {
            "id": "Ajna_A_12_2_Room1_13",
            "sw": "L",
            "status": "1"
          },
          {
            "id": "Ajna_A_12_2_Room1_14",
            "sw": "S",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Room1_15",
            "sw": "S",
            "status": null
          }
        ]
      },
      {
        "switchBoardId": "2",
        "switches": [
          {
            "id": "Ajna_A_12_2_Room1_21",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Room1_22",
            "sw": "S",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Room1_23",
            "sw": "S",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Room1_24",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Room1_25",
            "sw": "L",
            "status": null
          }
        ]
      }
    ],
    "temp": "34",
    "lux": "16",
    "Balcony": [
      {
        "switchBoardId": "1",
        "switches": [
          {
            "id": "Ajna_A_12_2_Roo_Bal_11",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Roo_Bal_12",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Roo_Bal_13",
            "sw": "S",
            "status": null
          }
        ]
      },
      {
        "switchBoardId": "2",
        "switches": [
          {
            "id": "Ajna_A_12_2_Roo_Bal_21",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Roo_Bal_22",
            "sw": "L",
            "status": null
          }
        ]
      }
    ],
    "BalconyB": "Balcony",
    "Bathroom": [
      {
        "switchBoardId": "1",
        "switches": [
          {
            "id": "Ajna_A_12_2_Roo_Bat_11",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Roo_Bat_12",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Roo_Bat_13",
            "sw": "S",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Roo_Bat_14",
            "sw": "S",
            "status": null
          }
        ]
      }
    ],
    "BathroomB": "Bathroom"
  },
  {
    "location": "Room2",
    "boards": [
      {
        "switchBoardId": "1",
        "switches": [
          {
            "id": "Ajna_A_12_2_Room2_11",
            "sw": "F",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Room2_12",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Room2_13",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Room2_14",
            "sw": "S",
            "status": null
          }
        ]
      },
      {
        "switchBoardId": "2",
        "switches": [
          {
            "id": "Ajna_A_12_2_Room2_21",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Room2_22",
            "sw": "S",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Room2_23",
            "sw": "S",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Room2_24",
            "sw": "S",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Room2_25",
            "sw": "S",
            "status": null
          }
        ]
      }
    ],
    "temp": "10",
    "lux": "10",
    "Balcony": [
      {
        "switchBoardId": "1",
        "switches": [
          {
            "id": "Ajna_A_12_2_Roo_Bal_11",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Roo_Bal_12",
            "sw": "S",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Roo_Bal_13",
            "sw": "S",
            "status": null
          }
        ]
      },
      {
        "switchBoardId": "2",
        "switches": [
          {
            "id": "Ajna_A_12_2_Roo_Bal_21",
            "sw": "S",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Roo_Bal_22",
            "sw": "S",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Roo_Bal_23",
            "sw": "L",
            "status": null
          }
        ]
      }
    ],
    "BalconyB": "Balcony",
    "Bathroom": [
      {
        "switchBoardId": "1",
        "switches": [
          {
            "id": "Ajna_A_12_2_Roo_Bat_11",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Roo_Bat_12",
            "sw": "S",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Roo_Bat_13",
            "sw": "S",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Roo_Bat_14",
            "sw": "S",
            "status": null
          }
        ]
      },
      {
        "switchBoardId": "2",
        "switches": [
          {
            "id": "Ajna_A_12_2_Roo_Bat_21",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Roo_Bat_22",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Roo_Bat_23",
            "sw": "S",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Roo_Bat_24",
            "sw": "S",
            "status": null
          }
        ]
      }
    ],
    "BathroomB": "Bathroom"
  },
  {
    "location": "Kitchen",
    "boards": [
      {
        "switchBoardId": "1",
        "switches": [
          {
            "id": "Ajna_A_12_2_Kitchen_11",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Kitchen_12",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Kitchen_13",
            "sw": "F",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Kitchen_14",
            "sw": "S",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Kitchen_15",
            "sw": "S",
            "status": null
          }
        ]
      },
      {
        "switchBoardId": "2",
        "switches": [
          {
            "id": "Ajna_A_12_2_Kitchen_21",
            "sw": "F",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Kitchen_22",
            "sw": "S",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Kitchen_23",
            "sw": "S",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Kitchen_24",
            "sw": "S",
            "status": null
          }
        ]
      }
    ],
    "temp": "25",
    "lux": "10",
    "Balcony": [
      {
        "switchBoardId": "1",
        "switches": [
          {
            "id": "Ajna_A_12_2_Kit_Bal_11",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Kit_Bal_12",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Kit_Bal_13",
            "sw": "S",
            "status": null
          }
        ]
      }
    ],
    "BalconyB": "Balcony"
  },
  {
    "location": "Dining Area",
    "boards": [
      {
        "switchBoardId": "1",
        "switches": [
          {
            "id": "Ajna_A_12_2_Dining Area_11",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Dining Area_12",
            "sw": "F",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Dining Area_13",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Dining Area_14",
            "sw": "S",
            "status": null
          }
        ]
      }
    ],
    "temp": "25",
    "lux": "10"
  },
  {
    "location": "Bathroom",
    "boards": [
      {
        "switchBoardId": "1",
        "switches": [
          {
            "id": "Ajna_A_12_2_Bathroom_11",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Bathroom_12",
            "sw": "S",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Bathroom_13",
            "sw": "F",
            "status": null
          }
        ]
      }
    ],
    "temp": "25",
    "lux": "10"
  },
  {
    "location": "Others",
    "boards": [
      {
        "switchBoardId": "1",
        "switches": [
          {
            "id": "Ajna_A_12_2_Others_11",
            "sw": "F",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Others_12",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Others_13",
            "sw": "L",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Others_14",
            "sw": "S",
            "status": null
          },
          {
            "id": "Ajna_A_12_2_Others_15",
            "sw": "S",
            "status": null
          }
        ]
      }
    ],
    "temp": "25",
    "lux": "10"
  }
]

const SettingsScreen = (navigation, submitData) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSwitch, setModalSwitch] = useState(false);
  const [location, setlocation] = useState(initialValue);
  const [data, setData] = React.useState({
    oldPassword: '',
    new_Password: '',
    reEnter_Password: '',
    check_textInputChangeold: false,
    secureTextEntryold: true,
    isValidUserold: true,
    check_textInputChangepa: false,
    secureTextEntrypa: true,
    isValidUserpa: true,
    check_textInputChangere: false,
    secureTextEntryre: true,
    isValidUserre: true,
    isValidPassword: true,
  });

  const [items, setItems] = useState([
    { label: 'Plug Point', value: 'pp' },
    { label: 'WiFi', value: 'wifi' },
    { label: 'Refrigerator', value: 'ref' },
    { label: 'T V', value: 'tv' },
    { label: 'Speakers', value: 'sp' },
    { label: 'Water Filter', value: 'wf' },
  ]);

  const textInputChangeold = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        oldPassword: val,
        check_textInputChangeold: true,
        isValidUserold: true
      });
    } else {
      setData({
        ...data,
        oldPassword: val,
        check_textInputChangeold: false,
        isValidUserold: false
      });
    }
  };

  const handleValidUserold = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        isValidUserold: true
      });
    } else {
      setData({
        ...data,
        isValidUserold: false
      });
    }
  };

  const textInputChangepa = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        new_Password: val,
        check_textInputChangepa: true,
        isValidUserpa: true
      });
    } else {
      setData({
        ...data,
        new_Password: val,
        check_textInputChangepa: false,
        isValidUserpa: false
      });
    }
  };

  const handleValidUserpa = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        isValidUserpa: true
      });
      // console.log("old password", ...data);
    } else {
      setData({
        ...data,
        isValidUserpa: false
      });
    }
  };

  const textInputChangere = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        reEnter_Password: val,
        check_textInputChangere: true,
        isValidUserre: true
      });
      // console.log("re-enter password", data);
    } else {
      setData({
        ...data,
        reEnter_Password: val,
        check_textInputChangere: false,
        isValidUserre: false
      });
    }
  };

  const handleValidUserre = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        isValidUserre: true
      });
      // console.log("re-enter password", data.reEnter_Password);
    } else {
      setData({
        ...data,
        isValidUserre: false
      });
    }
  };

  const PasswordCross = () => {
    if (data.new_Password === data.reEnter_Password) {
      setData({
        ...data,
        isValidPassword: true
      });
      // handleChange();
      console.log(data.isValidPassword);
    } else {
      setData({
        ...data,
        isValidPassword: false
      });
      console.log(data.isValidPassword);

    }
  };

  const handleChange = () => {
    console.log("handlechange called");
    const temp = data
    const send = [{ 'slno': '34' }]
    submitData(send)
      .then(response => {
        console.log("response", response);
        if (response[0].error) {
          Toast.show(response[0].error, Toast.LONG, Toast.TOP);
        }
        console.log('presseddetails');
      })
  };

  return (
    <View style={styles.cardboard}>
      <SafeAreaView>
        <ScrollView style={styles.scrollView}>
          <View style={styles.textInput}>
            <Text></Text>
            <Text></Text>
            <View style={styles.card}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={{ textAlign: 'center', paddingBottom: 20, fontSize: 20, color: '#ffffff' }}>Privacy/Change Password</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.card}>
              <TouchableOpacity onPress={() => setModalSwitch(true)}>
                <Text style={{ textAlign: 'center', paddingBottom: 20, fontSize: 20, color: '#ffffff' }}>Switch Naming</Text></TouchableOpacity>
            </View>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              // Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalView}>
              <Text style={[styles.text_footer]}>Current Password</Text>
              <View style={styles.action}>
                <FontAwesome
                  name="unlock"
                  color="green"
                  size={20}
                />
                <TextInput
                  placeholder="Old Password"
                  placeholderTextColor="#666666"
                  style={[styles.textInput]}
                  autoCapitalize="none"
                  onChangeText={(val) => textInputChangeold(val)}
                  onEndEditing={(e) => handleValidUserold(e.nativeEvent.text)}

                />
                {data.check_textInputChangeold ?
                  <Animatable.View
                    animation="bounceIn"
                  >
                    <Feather
                      name="check"
                      color="green"
                      size={20}
                    />
                  </Animatable.View>
                  : null}
              </View>
              {data.isValidUserold ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>Password must be 6 characters long.</Text>
                </Animatable.View>
              }
              <Text style={[styles.text_footer]}>New Password</Text>
              <View style={styles.action}>
                <FontAwesome
                  name="lock"
                  color="green"
                  size={20}
                />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#666666"
                  style={[styles.textInput]}
                  autoCapitalize="none"
                  onChangeText={(val) => textInputChangepa(val)}
                  onEndEditing={(e) => handleValidUserpa(e.nativeEvent.text)}
                />
                {data.check_textInputChangepa ?
                  <Animatable.View
                    animation="bounceIn"
                  >
                    <Feather
                      name="check"
                      color="green"
                      size={20}
                    />
                  </Animatable.View>
                  : null}
              </View>
              {data.isValidUserpa ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>Password must be 6 characters long.</Text>
                </Animatable.View>
              }
              <Text style={[styles.text_footer]}>ReEnter Password</Text>
              <View style={styles.action}>
                <FontAwesome
                  name="lock"
                  color="green"
                  size={20}
                />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#666666"
                  style={[styles.textInput]}
                  autoCapitalize="none"
                  onChangeText={(val) => textInputChangere(val)}
                  onEndEditing={(e) => handleValidUserre(e.nativeEvent.text)}
                />
                {data.check_textInputChangere ?
                  <Animatable.View
                    animation="bounceIn"
                  >
                    <Feather
                      name="check"
                      color="green"
                      size={20}
                    />
                  </Animatable.View>
                  : null}
              </View>
              {data.isValidUserre ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>Password must be 6 characters long.</Text>
                </Animatable.View>
              }
              {data.isValidPassword ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>Password doesn't match.</Text>
                </Animatable.View>
              }
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => { PasswordCross() }}

              >
                <Text style={styles.textStyle} >SAVE</Text>
              </TouchableOpacity>
            </View>
          </Modal >

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalSwitch}
            onRequestClose={() => {
              // Alert.alert("Modal has been closed.");
              setModalSwitch(!modalSwitch);
            }}
          >
            <View style={styles.modalView}>
              <Text style={[styles.text_footer]}>Device SetUp</Text>

              {location.map(loc =>
                <View style={styles.cardboard}>
                  <Text style={styles.title}>{loc.location}</Text>
                  {loc.boards.map(b =>
                    <>
                      <Text style={styles.boardtitle}>{b.switchBoardId}</Text>
                      <View style={styles.cardboard}>
                        {b.switches.map((s, i) => (
                          <>
                            <View style={{ flexDirection: 'row' }}>
                              <View style={styles.cardthemOn}>
                                <View style={styles.textArea}>
                                  <Text style={styles.titleButtonOn}>
                                    {s['sw']}
                                  </Text>
                                </View>
                              </View>

                              <RNPickerSelect
                                onValueChange={(value) => console.log(value)}
                                items={[
                                  { label: 'Plug Point', value: 'pp' },
                                  { label: 'WiFi', value: 'wifi' },
                                  { label: 'Refrigerator', value: 'ref' },
                                  { label: 'T V', value: 'tv' },
                                  { label: 'Speakers', value: 'sp' },
                                  { label: 'Water Filter', value: 'wf' },

                                ]}
                              />
                            </View>
                          </>
                        ))}

                      </View>
                    </>
                  )}
                  {loc.sublocb != null ? <Text style={styles.baseTextH}>   {loc.sublocb}</Text> : null}
                  {loc.bathroom != null ? loc.bathroom.map(b =>
                    <>
                      <View style={styles.cardboard}>
                        {b.switches.map((s, i) => (
                          <>
                            <View style={{ flexDirection: 'row' }}>
                              <View style={styles.cardthemOn}>
                                <View style={styles.textArea}>
                                  <Text style={styles.titleButtonOn}>
                                    {s['sw']}
                                  </Text>
                                </View>
                              </View>
                              <RNPickerSelect
                                onValueChange={(value) => console.log(value)}
                                items={[
                                  { label: 'Plug Point', value: 'pp' },
                                  { label: 'WiFi', value: 'wifi' },
                                  { label: 'Refrigerator', value: 'ref' },
                                  { label: 'T V', value: 'tv' },
                                  { label: 'Speakers', value: 'sp' },
                                  { label: 'Water Filter', value: 'wf' },

                                ]}
                              />
                            </View>
                          </>
                        ))}
                        <Text style={styles.boardtitle}>{b.switchBoardId}</Text>
                      </View>
                    </>
                  ) : null}

                  {loc.sublocc != null ? <Text style={styles.baseTextH}>   {loc.sublocc}</Text> : null}
                  {loc.balcony != null ? loc.balcony.map(b =>
                    <>
                      <View style={styles.cardboard}>
                        {b.switches.map((s, i) => (
                          <>
                            <View style={styles.cardboard}>
                              <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.titleButtonOn}>
                                  {s['sw']}
                                </Text>
                                <View style={styles.container}>
                                  <DropDownPicker
                                    placeholder="Select an item"
                                    defaultIndex={0}
                                    containerStyle={{
                                      height: 90,
                                    }}
                                    dropDownStyle={{
                                      marginTop: 11,
                                      borderBottomLeftRadius: 10,
                                      borderBottomRightRadius: 10,
                                      fontSize: 20,
                                      fontWeight: 'bold',
                                    }}
                                    dropDownMaxHeight={200}
                                    itemStyle={{ justifyContent: 'flex-start', marginTop: 10, borderBottomWidth: 0.5, fontSize: 50 }}

                                    style={{
                                      borderBottomColor: '#4C84FF',
                                      borderBottomWidth: 1,
                                      zIndex: 5000,
                                      backgroundColor: '#eeeeee',
                                      borderBottomLeftRadius: 0,
                                      borderBottomRightRadius: 0,
                                      borderBottomStartRadius: 3,
                                      borderBottomEndRadius: 3,
                                      borderColor: '#eeeeee'
                                    }}

                                    listMode="SCROLLVIEW"
                                    searchable={true}
                                    // multiple={true}
                                    // min={0}
                                    // max={2}
                                    open={open}
                                    value={value}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={setValue}
                                    setItems={setItems}
                                  />
                                </View>
                                {/* <DropDownPicker
                                  onValueChange={(value) => console.log(value)}
                                  setItems={[
                                    { label: 'Plug Point', value: 'pp' },
                                    { label: 'WiFi', value: 'wifi' },
                                    { label: 'Refrigerator', value: 'ref' },
                                    { label: 'T V', value: 'tv' },
                                    { label: 'Speakers', value: 'sp' },
                                    { label: 'Water Filter', value: 'wf' },

                                  ]}
                                /> */}
                              </View>
                            </View>
                          </>
                        ))}
                        <Text style={styles.boardtitle}>{b.switchBoardId}</Text>
                      </View>
                    </>
                  ) : null}

                </View>
              )}


              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleChange()}
              >
                <Text style={styles.textStyle} >SAVE</Text>
              </TouchableOpacity>
            </View>
          </Modal >
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

SettingsScreen.propTypes = {
  submitData: PropTypes.func,
  pass_change: PropTypes.instanceOf(Array)
};

SettingsScreen.defaultProps = {
  submitData: () => { },
  pass_change: []

};


const mapStateToProps = ({ password_Change: { pass_change } }) => ({ pass_change });
const mapDispatchToProps = { submitData: (send) => PasswordChange(send) };


export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  input: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 15
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    // alignContent: 'flex-end',
    borderRadius: 20,
    height: 40,
    width: 100,
    padding: 10,
    elevation: 2,
    marginTop: 20,
    marginLeft: 150,
  },
  textStyle: {
    color: 'white',
    // color: "#2f353d",
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  boardtitle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // paddingStart: 60,
    // paddingHorizontal: 10,
    // paddingVertical: 10,
    // paddingLeft: 40,
    marginLeft: 180,
    fontSize: 12,
    // transform: [{rotate: '270deg' }],
    color: '#252626',
  },
  card: {
    marginTop: 10,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    // borderColor: '#696969',
    // backgroundColor: '#ccc',
    backgroundColor: '#3d3c3c',
    // borderBottomColor: '#ccc',
    borderBottomWidth: 0.15,
    // zIndex: 2,
  },
  cardboard: {
    marginBottom: 15,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#4d4b4b',
  },
});

