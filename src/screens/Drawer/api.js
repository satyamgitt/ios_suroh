
import { useEffect, useState } from "react";
import { View, Text } from "react-native-animatable";
import PropTypes, { array } from 'prop-types';
import { connect } from "react-redux";
import { getApi } from "../../redux/actions/getApi"

const Api = (getApiData) => {
    const [data, setData] = useState('');

    useEffect(() => {

        getApiData()
            .then(response => {
                console.log("new API response", response.data)
            })
    }, []);

    return (
        <View>
            <Text>Hello</Text>
        </View>
    )
}

Api.PropTypes = {
    getApiData: PropTypes.func,
    apiarray: PropTypes.instanceOf(Array),
};

Api.defaultProps = {
    getApiData: () => { },
    apiarray: [],
};

const mapStateToProps = ({ ApiName: { apiarray } }) => ({ apiarray });
const mapDispatchToProps = { getApiData: () => getApi() };


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Api);

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
// import React, { useState, useEffect } from 'react';
// import PropTypes, { array } from "prop-types";
// import { connect } from "react-redux";
// import { getApi } from "../../redux/actions/getApi"
// import {
//     Share,
//     Platform,
//     Alert,
//     Modal,
//     Image,
//     StyleSheet,
//     Text,
//     View,
//     ScrollView,
//     TextInput,
//     SafeAreaView,
//     ActivityIndicator,
//     Pressable,
//     TouchableOpacity,
//     RefreshControl
// } from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';
// import * as Animatable from 'react-native-animatable';
// import Toast from 'react-native-simple-toast';
// import Slider from '@react-native-community/slider';
// import Ico from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from 'react-native-vector-icons/Feather';
// import { getSlno } from '../AsyncStorage';
// import { add_User } from '../../redux/actions/add_User';
// import { searchUser } from '../../redux/actions/searchUser';
// import { Users } from '../../redux/actions/Users';
// import { delete_User } from '../../redux/actions/delete_User';
// import { lock_User } from '../../redux/actions/lock_User';



// const Api = ({ lock_User }) => {



//     useEffect(() => {
//         log();
//         return () => { };
//     }, []);

//     const log = () => {
//         lock_User()
//             .then(response => {
//                 console.log("new API response", response.data)
//             })
//     };

//     return (
//         <View>
//             <Text>hi</Text>
//         </View>
//     );
// };
// Api.propTypes = {
//     lock_User: PropTypes.func,
//     apiarray: PropTypes.instanceOf(Array),

// };

// Api.defaultProps = {
//     lock_User: () => { },
//     apiarray: [],
// };

// const mapStateToProps = ({ ApiName: { apiarray } }) => ({ apiarray });
// const mapDispatchToProps = { lock_User: () => getApi() };
// export default connect(mapStateToProps, mapDispatchToProps)(Api);
