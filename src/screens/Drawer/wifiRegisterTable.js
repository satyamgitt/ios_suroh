import React from "react"
import { StyleSheet } from "react-native"
import { View } from "react-native-animatable"
import { DataTable } from "react-native-paper"
import Icon from 'react-native-vector-icons/AntDesign';
const WifiRegisterTable = () => {
  return (
    <View>
      
    <DataTable style={styles.container}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>Wifi Name</DataTable.Title>
        <DataTable.Title>Password</DataTable.Title>
        <DataTable.Title>Priority</DataTable.Title>
        <DataTable.Title>Edit</DataTable.Title>
        <DataTable.Title>Delete</DataTable.Title>
      </DataTable.Header>
      <DataTable.Row>
        <DataTable.Cell>Radhika</DataTable.Cell>
        <DataTable.Cell>Dosa</DataTable.Cell>
        <DataTable.Cell>23</DataTable.Cell>
        <DataTable.Cell>
        <Icon name="edit" size={20} color="blue" />
        </DataTable.Cell>
        <DataTable.Cell>
        <Icon name="delete" size={20} color="red" />
        </DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  </View>
)
}

export default WifiRegisterTable

const styles = StyleSheet.create({
    container: {
        padding: 15,
      },
      tableHeader: {
        backgroundColor: '#DCDCDC',
      }
});