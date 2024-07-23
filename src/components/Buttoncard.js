import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import ButtonSwitchCard from '../components/ButtonSwitchCard';

const ButtonCard = ({ titl }) => {
    const [users, setusers] = useState([
        { title: "L", key: "f" },
        { title: "L", key: "g" },
        { title: "F", key: "h" },
        { title: "S", key: "i" },
        { title: "S", key: "j" }

    ]);
    // const users=[{ title: "L", key: "f" },
    // { title: "L", key: "g" },
    // { title: "F", key: "h" },
    // { title: "S", key: "i" },
    // { title: "S", key: "j" }]

    return (
        <View style={styles.card}>
            {/* <View style={styles.textAreatext}> */}

            <View style={styles.textArea}>
                {users.map(user => (
                    <TouchableOpacity>
                        <ButtonSwitchCard
                            title={user.title}
                            key={user.key}
                        />
                    </TouchableOpacity>))}
                <Text style={styles.title}>Board1</Text>

                {/* <Icon style={styles.icon}
                    name="angle-double-right"
                    size={35} /> */}
            </View>
            {/* </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        // marginTop: 10,
        marginBottom: 2,
        // marginRight: 10,
        // marginLeft: 10,
        // paddingBottom:10,
        borderRadius: 20,
        backgroundColor: '#4d4b4b',
        // borderBottomColor: '#ccc',
        // borderBottomWidth: 0.15,
        // zIndex: 2,
    },
    textArea: {
        paddingRight: 5,
        paddingBottom: 10,
        paddingTop: 10,
        flexDirection: "row"
    },
    textAreatext: {
        marginLeft: 5,
        marginBottom: 10,
        marginTop: 10,
        flexDirection: "row"
    },
    title: {
        marginLeft: 15,
        fontSize: 12,
        transform: [{ rotate: '270deg' }],
        color: '#252626',
    },
    icon: {
        paddingLeft: 25,
        marginTop: 20
    }
})


export default ButtonCard;