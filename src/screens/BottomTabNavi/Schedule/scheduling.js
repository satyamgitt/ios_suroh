/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Dimensions, ScrollView, SafeAreaView, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native'; import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Ico from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
// import { homeStatus } from '../../../redux/actions/homeStatus';
import { locationSchedule } from '../../../redux/actions/schedule/locationSchedule';
// import { scheduleTime } from '../../../redux/actions/schedule/scheduleTime';
// import { scheduleChange } from '../../../redux/actions/schedule/scheduleChange';
// import { scheduleAdd } from '../../../redux/actions/schedule/scheduleAdd';
// import { modifySchedule } from '../../../redux/actions/schedule/modifySchedule';
import { getSlno } from '../../AsyncStorage';
import { useTheme } from '@react-navigation/native';
import { color } from 'react-native-reanimated';
import { getAllLocation } from '../../../redux/reducers';


const { width, height } = Dimensions.get('screen');
const diognal = height / width;
const size = diognal * 6.65
var sl_no;

// const Scheduling = ({ navigation, getStatus }) => {
const Scheduling = ({ getAllLocation }) => {

  // console.log("props 29 sechdulimng" , props.getLocationSchedule);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [status, setStatus] = useState([]);

  const theme = useTheme();
  const styles = useStyles(theme);
  const { colors } = { ...theme };


  const onRefresh = () => {
    setLoading(false)
    getData(sl_no)
    setRefreshing(true);
  };

  const getData = (sl_no) => {
    // setLoading(true)
    const send = [];
    const no = { sl_no: sl_no };
    send.push(no);
    console.log('Sechude Page payload send', send);
    getAllLocation(send)
      .then(response => {
        console.log("response from Gernral setting", Object.keys(response), Object.values(response), "end");
        setRefreshing(false);
        setStatus(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    setTimeout(async () => {
      sl_no = await getSlno();
      setLoading(true)
      getData(sl_no);
    }, 1000);
    return () => { };
  }, []);

  const navigateToScheduleLocation = (slocation) => {
    console.log(slocation)
    alert("Work in Progress...");
    // navigation.navigate('ScheduleLocation', { location: s.location })
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          <Text></Text>
          {loading ? (
            <View style={{ paddingTop: 300 }}>
              <ActivityIndicator size='large' color="#ffffff" /></View>
          ) : (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }}>
              {status.map(s => (
                // console.log("data: " + s)
                <TouchableOpacity
                  onPress={() => { navigateToScheduleLocation(s.location) }}>
                  <View style={styles.card}>
                    <Text style={styles.cardTitle}>{s.location}</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ color: colors.text }}>Devices :</Text>
                      <Ico name="timer-outline" size={20} />
                      <Text style={[styles.cardText, { marginTop: diognal * 3.58 }]}>x{s.switches}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>)}
        </ScrollView>
      </SafeAreaView>
    </View >
  );
};

Scheduling.propTypes = {

  getAllLocation: PropTypes.func,
  schedule_location: PropTypes.instanceOf(Array),
};

Scheduling.defaultProps = {

  getAllLocation: () => { },
  schedule_location: [],

};

// const mapStateToProps = ({ getStatus: { schedule_location } }) => ({ schedule_location });
// const mapDispatchToProps = { getStatus: send => locationSchedule(send) };

const mapStateToProps = ({ getLocationSchedule: { schedule_location } }) => ({ schedule_location });
// const mapDispatchToProps = { getStatus: send => locationSchedule(send) };
const mapDispatchToProps = { getAllLocation: send => locationSchedule(send) };


export default connect(mapStateToProps, mapDispatchToProps)(Scheduling);

const useStyles = theme => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 9
  },
  cardTitle: {
    fontSize: diognal * 8.53,
    fontWeight: '700',
    marginLeft: diognal * 2.37,
    marginBottom: diognal * 9.25,
    color: theme.colors.text,
  },
  cardText: {
    fontSize: diognal * 5.69,
    color: theme.colors.text,
  },
  icon: {
    marginRight: diognal * 1.37
  },
  card: {
    padding: diognal * 4.74,
    height: height / 8,
    width: width / 2.5,
    marginVertical: diognal * 3.8,
    marginHorizontal: diognal * 4.74,
    borderRadius: diognal * 9.48,
    backgroundColor: theme.colors.card,
    // borderBottomColor: '#ccc',
    // borderBottomWidth: 0.15,
    // borderWidth: 0.15,
    // zIndex: 2,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },

});


