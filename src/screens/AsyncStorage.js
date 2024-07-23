/* eslint-disable prettier/prettier */
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';


// getting item from async storage
export const getSlno = async () => {
    try {
        const value = await AsyncStorage.getItem('id');
        // console.log('Ayncstorage file get async login = ', value);
        if (value !== null) {
            // value previously stored
            return value;
        }
    } catch (e) {
        console.log('Ayncstorage  file Error retrive error: ', e);
    }
};

export const getUsername = async () => {
    try {
        const value = await AsyncStorage.getItem('username');
        // console.log('Ayncstorage file get user name = ', value);
        if (value !== null) {
            // value previously stored
            return value;
        }
    } catch (e) {
        console.log('Ayncstorage file  Error retrive error: ', e);
    }
};

export const getFirstname = async () => {
    try {
        const value = await AsyncStorage.getItem('firstName');
        // console.log('Ayncstorage file get user First name = ', value);
        if (value !== null) {
            // value previously stored
            return value;
        }
    } catch (e) {
        console.log('Ayncstorage file Error retrive error: ', e);
    }
};

export const getLastname = async () => {
    try {
        const value = await AsyncStorage.getItem('lastName');
        // console.log('Ayncstorage file get user last name = ', value);
        if (value !== null) {
            // value previously stored
            return value;
        }
    } catch (e) {
        console.log('Ayncstorage file  Errorretrive error: ', e);
    }
};

export const getUsertype = async () => {
    try {
        const value = await AsyncStorage.getItem('usertype');
        // console.log('Ayncstorage file get user usertype = ', value);
        if (value !== null) {
            // value previously stored
            return value;
        }
    } catch (e) {
        console.log('Ayncstorage file Error retrive error: ', e);
    }
};

export const getEmail = async () => {
    try {
        const value = await AsyncStorage.getItem('email');
        // console.log('Ayncstorage file get user email = ', value);
        if (value !== null) {
            // value previously stored
            return value;
        }
    } catch (e) {
        console.log('Ayncstorage file  Errorretrive error: ', e);
    }
};

export const getAmps = async () => {
    try {
        const value = await AsyncStorage.getItem('amps');
        // console.log('Ayncstorage file get present Amps = ', value);
        if (value !== null) {
            // value previously stored
            return value;
        }
    } catch (e) {
        console.log('Ayncstorage file  Errorretrive error: ', e);
    }
};

export const getWatts = async () => {
    try {
        const value = await AsyncStorage.getItem('watts');
        // console.log('Ayncstorage file get present watts = ', value);
        if (value !== null) {
            console.log("Ayncstorage file amp value", value);
            // value previously stored
            return value;
        }
    } catch (e) {
        console.log('Ayncstorage file Error retrive error: ', e);
    }
};


export const setipAddr = async (ip_addr) => {
    try {
        const value = await AsyncStorage.setItem('ip_addr', ip_addr);
        if (value !== null) {
            // value previously stored
            return value;
        }
    } catch (e) {
        console.log('Ayncstorage file Error retrive error: ', e);
    }
};


export const getipAddr = async () => {
    try {
        const value = await AsyncStorage.getItem('ip_addr');
        console.log('get ip addr = ', value);
        if (value !== null) {
            // value previously stored
            return value;
        }
    } catch (e) {
        console.log('Ayncstorage file  Errorretrive error: ', e);
    }
};


export const wificonfig = async () => {
    try {
        const value = await AsyncStorage.getItem('wifiip');
        console.log('Ip on which sending data = ', value);
        
        if (value !== null) {
            // value previously stored
            return value;
        }
    } catch (e) {
        console.log('Ayncstorage file Error retrive error: ', e);
    }
};