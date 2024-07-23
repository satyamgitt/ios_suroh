import { Modal, ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Collapsible from 'react-native-collapsible'
import { Button, TextInput, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { getSlno, wificonfig } from '../../AsyncStorage'
import Ico from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import Feather from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import { autoManualDetails } from '../../../redux/actions/autoManualDetails'
import { changeStatus } from '../../../redux/actions/changeStatus'
import { switchNameChange } from '../../../redux/actions/switchNameChange'
import { color } from 'react-native-reanimated'
import Toast from 'react-native-simple-toast'
import getwifi from '../../../config/ip_address'
import { fan_speed_change } from '../../../redux/actions/fan_speed_change'


const width = Dimensions.get('screen').width
const height = Dimensions.get('window').height
// console.log("width: " + width + ", height: " + height);



let sl_no;
let ip_Add;



const TogelScreen = ({ getDetails, getStatus, changeSwitch, getFanSpeedStatus }) => {
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState([])
  const [refreshing, setRefreshing] = React.useState(false);
  // console.log("data in state", JSON.stringify(location));
  const [collasped, setcollasped] = useState({})
  const [switch_id, setSwitch_id] = useState()
  const [inputValue, setInputValue] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  // console.log("33 collasped data" , collasped);
  // const buttons = Array.from({ length: 7 }, (_, i) => i + 1);

  var itemMinHeight = height / location.length;
  // console.log("itemMinHeight", itemMinHeight);


  const toggelExpand = (location) => {
    // console.log("38" , location);


    setcollasped((prev) => ({
      ...prev,
      [location]: !prev[location],
    }))

  }

  useEffect(() => {
    setTimeout(async () => {
      sl_no = await getSlno();
      ip_Add = await wificonfig();

      // setSl_no(sl_no);
      // getpirdata(sl_no);
      init(sl_no, ip_Add);
    }, 1000);
    // console.log("useeffect called get pir state");
  }, []);

  const init = async sl_no => {
    const send = [];
    const no = { sl_no, ip_Add };

    send.push(no);


    getDetails(send).then(response => {

      // console.log("361 App NewUI Data", JSON.stringify(response));

      setLocation(response);
      setLoading(false);
      // setRefreshing(false);
    })
  };


  const onRefresh = async () => {
    setRefreshing(true);
    await getwifi();
    setTimeout(

      async () => {

        sl_no = await getSlno();
        ip_Add = await wificonfig();

        console.log("onRefress IP", ip_Add);
        await init(sl_no);
        setLoading(false);
        setRefreshing(false);
      },

      1000);
  };


  const change_status = async (id, status, speed) => {
    console.log('411 id, status , speed ', id, status, speed);
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

    console.log('431 send payload Switch on/off', send);
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
    console.log("550 ip", ip_Add);

    const payload = {
      ip: ip_Add,
      sl_no: sl_no,
      id: id,
      status: status,
      value: value,
    };

    send.push(payload);
    // console.log("442", payload)

    getFanSpeedStatus(send).then(response => {
      console.log('479 Slider Response', response);
      // setSliderValue (response[0].speed)
      init(sl_no);

      if (response[0].error) {
        Toast.show(response[0].error, Toast.LONG, Toast.TOP);
      }
    });
  };




  const handleSubmit = async () => {
    // console.log("123" , switch_id);
    // Here you can send the data to your backend or perform any other action
    const sl_no = await getSlno();
    const send = [];

    const e = await wificonfig();
    ip_Add = e;

    const payload = {
      ip: ip_Add,
      sl_no: sl_no,
      id: switch_id,
      newname: textInputValue,
    };

    send.push(payload);
    // console.log("send ", send);
    changeSwitch(send).then(res => {
      if (res) {
        Toast.show(res.message)
      } else {
        Toast.show(res.success)
      }
    })
    setInputValue(!inputValue)
    // Reset the input field after submission
    setTextInputValue('');
    onRefresh()
  };

  return (
    <SafeAreaView>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        {(loading || location.lenght === 0)
          ?
          (<View style={styles.loader}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>)
          :
          (location?.map((data) => {
            // console.log("dataforNew uidata boards", JSON.stringify(data.boards));
            return (
              <View style={{ minHeight: itemMinHeight }}>

                <View style={styles.container}>
                  <View><Text></Text></View>
                  <TouchableOpacity
                    style={styles.cardContainer}

                    onPress={() => toggelExpand(data.location)}>
                    <View style={{ position: "absolute", color: "black", top: 5, backgroundColor: "#6737B8", width: "100%" }}>
                      {/* <Text onPress={() => console.log("hello")} style={{}}><Feather name='edit' size={20} />Senser</Text> */}
                    </View>
                    <Text style={styles.heading}>
                      {data.location}
                    </Text>
                  </TouchableOpacity>

                  <Collapsible collapsed={!collasped[`${data.location}`]}>
                    <View>
                      {/* <Text style={{ color: "black" }}>Mode</Text> */}
                    </View>

                    <View style={styles.topcontainer}>
                      <View style={styles.buttonContainer}>
                        {
                          data.boards?.map((boards) => (
                            // console.log("bo" , boards.switches)
                            boards.switches?.map((switchdata, index) => (
//  console.log("switchdata" , switchdata)

                              <>
                                {

                                  switchdata.status != 0 ?
                                    (

                                      <TouchableOpacity
                                        key={index} style={styles.buttonON}
                                        onPress={() => {
                                          if (switchdata.switch_type === "Fan") { }
                                          change_status(switchdata.id, switchdata.status = "0", switchdata.speed = switchdata.speed);
                                        }}
                                        onLongPress={() => {

                                          setSwitch_id(switchdata.id);
                                          setInputValue(!inputValue)

                                        }
                                        }
                                      >


                                        <View style={styles.switch_On}>
                                          <View style={styles.textArea}>
                                            <Text style={`${switchdata.status} = "0"` ? styles.sw_namew : styles.sw_nameb}>{switchdata.sw_desc.toUpperCase()}</Text>
                                            {(switchdata.automationFlag == 1 ?

                                              <Icon
                                                name="motion-sensor"
                                                style={styles.titleButtonOn}
                                                size={25}
                                              />
                                              :
                                              null
                                            )}

                                          </View>


                                        </View>

                                        {

                                          switchdata.switch_type != "Fan" ? null:
                                            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 5, left: 3 , alignItems:'center' }}>

                                              <Ico
                                                name="fan"
                                                size={25}
                                              />

                                        
                                              <Slider
                                                style={{
                                                  width: 100,
                                                }}
                                                minimumValue={0}
                                                maximumValue={5}
                                                step={1}
                                                // minimumTrackTintColor="#3D5C64"
                                                // maximumTrackTintColor="#61615a"
                                                value={parseFloat(
                                                  switchdata.status == 1 ? switchdata.speed : 0,
                                                )}
                                                onSlidingComplete={value => {
                                                  change_fan_speed(
                                                    switchdata['id'],

                                                    value => {
                                                      if (value > 0) {
                                                        switchdata['status'] = 1;
                                                      } else {
                                                        switchdata['status'] = 0;
                                                      }
                                                      return s['status'];
                                                    },

                                                    value,
                                                  );
                                                }}
                                              />
                                               <Text
                                                style={[
                                                  { color:'green' , marginLeft:-12 , marginBottom:2 , fontWeight:'bold' , fontSize:21  },
                                                ]}>
                                                {(switchdata.status  === 0 ? 0 : switchdata.speed)}
                                                
                                              </Text>
                                    
                                              

                                              {/* FAN RUNNING STATUS ON WHICH SPEED IT IS RUNNING AND PREVIOUS STATE */}
                                             
                                            </View>

                                        }

                                      </TouchableOpacity>

                                    ) :
                                    (
                                      <TouchableOpacity

                                        key={index} style={styles.buttonOFF}
                                        onPress={() => {
                                          if (switchdata.sw_desc === "Fan") { }
                                          change_status(switchdata.id, switchdata.status = "1", switchdata.speed = switchdata.speed);
                                        }}
                                        onLongPress={() => {

                                          setSwitch_id(switchdata.id);
                                          setInputValue(!inputValue)

                                        }

                                        }
                                      >


                                        <View style={styles.switch_Off}>
                                          <View style={styles.textArea}>
                                            <Text style={`${switchdata.status} = "1"` ? styles.sw_nameb : styles.sw_namew} > {switchdata['sw_desc'].toUpperCase()}</Text>
                                            {(switchdata.automationFlag == 1 ?

                                              <Icon
                                                name="motion-sensor"
                                                style={styles.titleButtonOn}
                                                size={25}
                                              />
                                              :
                                             null
                                            )}

                                          </View>
                                        </View>
                                      </TouchableOpacity>
                                    )
                                }

                              </>
                            )
                            )
                          ))
                        }




                      </View>
                    </View>

                  </Collapsible>
                </View>

              </View>
            )
          }))




        }
        <View>

          <Modal
            animationType="slide" // Optional: Choose an animation type
            transparent={true}
            visible={inputValue}
            onRequestClose={() => {
              setInputValue(!inputValue)
            }

            }
          >
            <View style={styles.popupContainer}>

              <TextInput
                label="Enter text"
                mode="outlined"
                maxLength={10}
                value={textInputValue}
                onChangeText={setTextInputValue}
                style={{ marginBottom: 10 }}
              // onSubmitEditing={handleSubmit} 
              />
              <Button mode="contained" onPress={handleSubmit}>
                Submit
              </Button>
            </View>

          </Modal>
        </View>



      </ScrollView>


    </SafeAreaView>

  )
}

TogelScreen.propTypes = {
  getDetails: PropTypes.func,
  automanualstatus: PropTypes.instanceOf(Array),
}
TogelScreen.defaultProps = {
  getDetails: () => { },
  automanualstatus: [],
}

const mapStateToProps = ({
  getautomanualstatus: { automanualstatus },
}) => ({
  automanualstatus,
})

const mapDispatchToProps = {
  getDetails: send => autoManualDetails(send),
  getStatus: send => changeStatus(send),
  changeSwitch: send => switchNameChange(send),
  getFanSpeedStatus: send => fan_speed_change(send),
}

export default connect(mapStateToProps, mapDispatchToProps)(TogelScreen)

const styles = StyleSheet.create({
  loader: {
    paddingTop: 400
  },
  container: {
    margin: 0,
    padding: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9f5ea',

  },

  cardContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#30ecbf',
    borderRadius: 30,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10, // Required for Android 
    width: 350,
    height: 100,
    // borderBottomWidth: 3,


  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonON: {
    width: '45%', // Adjust as needed for spacing between buttons
    marginVertical: 10,
    paddingVertical: 45,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: "#EEE4B1",
    backgroundColor: '#5F0F40',
    borderRadius: 5,


  },
  sw_nameb: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  sw_namew: {

    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },


  // btnContainerStyle: {
  //   height:80,
  //   paddingBottom: 0,
  //   backgroundColor: '#6737B8',
  //   paddingVerticalTop: 8,
  //   width: width / 2,
  //   borderRadius: 4,
  //   marginBottom: 5,
  //   textAlign: 'center',

  // },
  // btnTextStyle: {
  //   color: '#ffffff',
  //   fontSize: 16,
  //   textTransform: 'uppercase',
  //   textAlign: 'center',
  //   fontFamily: 'Quicksand-Medium',
  //   marginTop:27


  // }
  titleButtonOn: {
    position: 'absolute',
    bottom: 40,
    left: 55,
    color: 'red'
  },
  titleButtonOff: {
    position: 'absolute',
    bottom: 40,
    left: 55,
    color: 'green'
  },
  topcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {

    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: "80%",
  },

  buttonOFF: {
    width: '45%', // Adjust as needed for spacing between buttons
    marginVertical: 10,
    paddingVertical: 45,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',

    // backgroundColor: "#F9F5F6",
    // backgroundColor: '#6737B8',
    backgroundColor: "#F9F5F6",
    borderRadius: 5,


  },



  popupContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
  },
  popupTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },



})