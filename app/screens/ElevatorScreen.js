import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image } from 'react-native'
import logo from '../assets/R2.png'

function ElevatorScreen(props) {
  const { route } = props
  const { navigation } = props
  const { item } = route.params
  const { id, status, serialNumber } = item
  
  async function changeStatus() {
    const url = `https://wjrocketapi.azurewebsites.net/api/Elevator/${id}`
    const someData = {
      "status": "Active"
    }   
      const putMethod = {
        method: 'PUT',
        headers: {
         'Content-type': 'application/json; charset=UTF-8' 
        },
        body: JSON.stringify(someData)
      }
      fetch(url, putMethod)
  }

  async function getInfo() {
    var url = `https://wjrocketapi.azurewebsites.net/api/Elevator/Spec/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data
  }
  if (status == "Active"){
    return (
      <View style={styles.container}>
        <Image source={ logo }style={styles.logo}/>
        <View>
          <Text style={styles.text}>Id : {id}</Text>
          <Text style={styles.textGreen}>Status : {status}</Text>
          <Text style={styles.text}>Serial # : {serialNumber}</Text>
          <TouchableOpacity style={styles.appButtonContainer}
            onPress={() => navigation.navigate ('ElevatorListScreen')}>
            <Text style={styles.appButtonText}>Back to list</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }else {
  return (
    <View style={styles.container}>
    <Image source={ logo }style={styles.logo}/>
    <View>
      <Text style={styles.text}>Id : {id}</Text>
      <Text style={styles.textRed}>Status : {status}</Text>
      <Text style={styles.text}>Serial # : {serialNumber}</Text>
        <TouchableOpacity style={styles.appButtonContainer}
            onPress={ async () => { 
              await changeStatus();
              const Elevator = await getInfo();
              const newInfo = {
                id: Elevator.id,
                status: "Active",
                serialNumber: Elevator.serial_number,
              }
              navigation.navigate('ElevatorScreen', {item:newInfo})
            } }>
          <Text style={styles.appButtonText}>Change status to Active</Text>
        </TouchableOpacity>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  text: {
    color: '#101010',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  },
  textGreen: {
    color: 'green',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  },
  textRed: {
    color: 'red',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  },
  logo: {
    margin:50,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "red",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin:50
  },
  appButtonText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
})

export default ElevatorScreen

// src/screens/ElevatorScreen.js