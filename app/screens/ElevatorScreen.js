import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image } from 'react-native'
import logo from '../assets/R2.png'

function ElevatorScreen(props) {
  const { route } = props
  const { navigation } = props
  const { item } = route.params
  const { id, status, serialNumber } = item

  // PUT someData to API to an elevator ID no Return for this function
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

  // create a sleep function since I'm still not able to make the .then after my function changeStatus()... will look at it at the end
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  // Get all elevator infos from a specific Id
  async function getInfo() {
    var url = `https://wjrocketapi.azurewebsites.net/api/Elevator/Spec/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data
  }
  // on page reload the status should be active and show it in green
  if (status == "Active"){
    return (
      <View style={styles.container}>
        <Image source={ logo }style={styles.logo}/>
        <View>
          <Text style={styles.text}>Id : {id}</Text>
          <Text style={styles.textGreen}>Status : {status}</Text>
          <Text style={styles.text}>Serial # : {serialNumber}</Text>
          <TouchableOpacity style={styles.appButtonContainer}
          // Return to elevator list after click on button "Back to list"
            onPress={() => navigation.navigate ('ElevatorListScreen')}> 
            <Text style={styles.appButtonText}>Back to list</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }else {
  // on page load the status should be inactive and show it in red
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
              await sleep(500)
              const Elevator = await getInfo();
              const newInfo = {
                id: Elevator.id,
                status: Elevator.status,
                serialNumber: Elevator.serial_number,
              }
              // Refresh the page after button click with the infos needed to load it
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