/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { color } from 'react-native-reanimated';
import DropDownPicker from 'react-native-dropdown-picker';
import { getSlno, wificonfig } from '../AsyncStorage';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { raspberryPiLocalIp } from '../../redux/actions/raspberryPiLocalIp';
import Toast from 'react-native-simple-toast';
import { DataTable } from 'react-native-paper';
import WifiRegisterTable from './wifiRegisterTable'
import getwifi from "../../config/ip_address"






const WifiRegister = ({ getRaspberryPiLocalIp }) => {
  const [text, setText] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [currentNetwork, setCurrentNetwork] = useState()
  // const[connection , setConnetion] = useState("Connecting....")
  // console.log("34 connec" , connection);
  // const [priority, setPriority] = React.useState(null);
  // const [wifi, setWifi] = React.useState();



  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    // { label: 'Select an item', value:' ' },
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' },
  ]);

  const [showView, setShowView] = useState(false);
  const [showViewData, setShowViewData] = useState();

  const raspberryPiLocalIp = async () => {
    const send = [];

    const payload = {
      sl_no
    };

    send.push(payload);

    try {
      const response = await getRaspberryPiLocalIp(send);

      //  console.log("622222" , response[0].ip_address);

      // setConnetion(response[0].ip_address)
      return response['ip_address'];
    } catch (error) {
      console.error('An error occurred:', error);
      return null; // Return a default value or handle the error accordingly
    }
  };

  const handleClick = async e => {
    // console.log("e" , e);
    ////////////////////////////////////////////////////////////
    //get ip locally conected router using async storage///////
    ////////////////////////////////////////////////////////////
    // const payload = [
    //   {
    //     sl_no: sl_no,
    //     wifi_name: text,
    //     password: password,
    //     priority: value,
    //     operation: 'add',
    //   },
    // ];

    // console.log('wifi payload', payload);

    // const oldip = await wificonfig();
    // console.log('get ip addr', oldip);

    // console.log("Text",text);
    // console.log("password",password);
    // console.log("value",value);
    // console.log("sl_no",sl_no);
    // console.log("Payload", payload);
    // console.log('oldip', oldip);
    // axios({
    //     method: "POST",
    //     url: `http://${oldip}/i-switch/wifiFile.php`,
    //     data: payload,
    //     timeout: 2000
    // })
    //     .then(res => {
    //         let dg = res.data;
    //         console.log("response", res.data);
    //         Alert.alert('msg', res.data);
    //     })
    //     .catch(err => {
    //         console.log("Error", err);
    //     })
  };

  NetInfo.fetch().then(state => {

    setCurrentNetwork(state.type)
    // currentNetwork = state.type;
    // console.log("currentNetwork inside NetInfo", currentNetwork);
  });


  useEffect(() => {
    setTimeout(async () => {
      sl_no = await getSlno();
    }, 1000);
    // console.log('use effect called get pir state');

    return () => { };
  }, []);

  const openView = result => {
    setShowView(true);
    setShowViewData(result);
  };
  const closeView = () => {
    setShowView(false);
    setShowViewData();
  };
  const getwifiip = async () => {
    try {
      const data = await AsyncStorage.getItem('id');
      const payload = [{ sl_no: data }];
      const ip_address = await raspberryPiLocalIp(data);
      console.log("let See", ip_address);
      axios({
        method: 'POST',
        url: `http://${ip_address}/i-switch/automation/pingAPI.php`, // Use template literal for interpolation
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept',
        },
        timeout: 10000,
      })
        .then(response => {

          // console.log(response);

          if (response.data == 1) {
            return openView(
              'connected to Raspberry and connection with its database is up and running',
            );
          } else {
            return openView(
              'connected to Raspberry but database is disabled or disconnected',
            );
          }
        })
        .catch(err => {
          return openView('Cannot communicate with Raspberry pi' + err);
        });
    } catch (error) {
      return openView('An error occurred hai:' + error);
    }
  };

  const styles = StyleSheet.create({});

  return (
    <>
      <View style={styles.cardboard}>
        <SafeAreaView>
{/* <View>
  <Text>
    {currentNetwork}
  </Text>
</View> */}
          <Text
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            Add Your Wifi{' '}
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: 50,
              marginLeft: 10,
              paddingHorizontal: 15,
            }}>
            WIFI
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={setText}
            placeholder="Wifi_name"
            value={text}
          />
          <Text style={{ color: 'white', marginLeft: 10, paddingHorizontal: 15 }}>
            Password
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="*****"
          />
        </SafeAreaView>

        <View style={{ paddingHorizontal: 15 }}>
          <DropDownPicker
            placeholder="Select WIFI Priority"
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
            itemStyle={{
              justifyContent: 'flex-start',
              marginTop: 10,
              borderBottomWidth: 0.5,
              fontSize: 50,
            }}
            style={{
              borderBottomColor: '#4C84FF',
              borderBottomWidth: 1,
              zIndex: 5000,
              backgroundColor: '#eeeeee',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              borderBottomStartRadius: 3,
              borderBottomEndRadius: 3,
              borderColor: '#eeeeee',
            }}
            listMode="SCROLLVIEW"
            searchable={true}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>

        <View
          style={{
            width: 100,
            height: 40,
            borderColor: '#5b0d63',
            backgroundColor: '#cdd1ce',
            borderRadius: 20,
            marginLeft: 120,
            marginTop: 30,
            marginBottom: 20,
          }}>
          <Text
            style={{
              width: 100,
              color: '#0f471e',
              borderRadius: 20,
              textAlign: 'center',
              textShadowRadius: 1,
              fontSize: 22,
            }}
            onPress={handleClick}>
            Save
          </Text>

        </View>


        <View>
          <WifiRegisterTable />
        </View>



        <View style={{ padding: 10, borderWidth: 1 }}>
          <TouchableOpacity onPress={() => getwifiip()}>
            <View
              style={{
                padding: 10,
                borderColor: '#5b0d63',
                backgroundColor: '#cdd1ce',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>Verify current local connection</Text>
            </View>
          </TouchableOpacity>
          {showView && (
            <View style={{ position: 'relative', padding: 20, borderWidth: 1 }}>
              <Text style={{ fontWeight: '900', paddingVertical: 10 }}>
                Result
              </Text>
              <TouchableOpacity
                onPress={closeView}
                style={{
                  padding: 10,
                  backgroundColor: '#cdd1ce',
                  position: 'absolute',
                  right: 15,
                  top: 15,
                }}>
                <Text>Close</Text>
              </TouchableOpacity>
              <Text>{showViewData}</Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const mapStateToProps = state => {
  return {
    raspberryPiLocalIpData: state.raspberryPiLocalIpData, // Replace with the correct reducer key
  };
};

const mapDispatchToProps = {
  getRaspberryPiLocalIp: raspberryPiLocalIp,
};
export default connect(mapStateToProps, mapDispatchToProps)(WifiRegister);

// export default WifiRegister;

const styles = StyleSheet.create({

  input: {
    height: 40,
    paddingHorizontal: 15,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'green',
    backgroundColor: '#ffffff',
    borderColor: 'pink',
    borderRadius: 10,
  },

  cardboard: {
    margin: 10,
    // marginBottom: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
    // backgroundColor: '#2b2b2b',
    backgroundColor: '#4d4b4b',
  },
});
