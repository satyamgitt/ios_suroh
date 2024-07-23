import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ButtonSwitchCard = ({ title }) => {
    return (
        <View style={styles.card}>
            <View style={styles.textArea}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        borderColor: '#0f0d0d',
        borderWidth: 1,
        // marginTop: 10,
        // marginBottom: 10,
        // marginRight: 20,
        marginLeft: 10,
        borderRadius: 10,
        // backgroundColor: '#A0A0A0',
        // backgroundColor: '#606060',
        // borderBottomColor: '#ccc',
        // borderBottomWidth: 0.15,
        zIndex: 1,
    },
    textArea: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 18,
        paddingLeft: 18,
        flexDirection: "row"

    },
    title: {
        // fontSize: 25,
        // fontFamily: 'sans-serif',
        // fontWeight: '700',
        color: '#0a0a0a',
        fontSize: 20,
        // color: "#302f2f",
        fontWeight: "bold",
        textAlign: "center"
    }
})


export default ButtonSwitchCard;