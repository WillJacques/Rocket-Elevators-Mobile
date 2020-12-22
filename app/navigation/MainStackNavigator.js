import * as React from 'react';
import { View, Text, Button, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import ElevatorListScreen from '../screens/ElevatorListScreen'

const Stack = createStackNavigator()

import ElevatorScreen from '../screens/ElevatorScreen'
import LoginScreen from '../screens/LoginScreen'

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='LoginScreen'
        screenOptions={{
          headerTitleAlign: 'center',
          gestureEnabled: true,
        }}>
         <Stack.Screen
          name='LoginScreen'
          component={LoginScreen}
          options={{title: 'Login' }}
        />
        <Stack.Screen
          name='ElevatorListScreen'
          component={ElevatorListScreen}
          options={
            ({navigation}) => (
            {  headerRight: () => (
              <TouchableOpacity style={styles.buttonStyleRight} onPress={() => navigation.navigate ('LoginScreen')}>
                <Text style={styles.text}>Logout</Text>
              </TouchableOpacity>
            ),  headerLeft: () => (
              <TouchableOpacity style={styles.buttonStyleRight} onPress={() => navigation.navigate ('LoginScreen')}>
                <Text style={styles.text}>Back</Text>
              </TouchableOpacity>
            ), title: 'Elevator List' }
          )}
        />
         <Stack.Screen
          name='ElevatorScreen'
          component={ElevatorScreen}
          options={
            ({navigation}) => (
            {  headerRight: () => (
              <TouchableOpacity style={styles.buttonStyleRight} onPress={() => navigation.navigate ('Login')}>
                <Text style={styles.text}>Logout</Text>
              </TouchableOpacity>
            ),  headerLeft: () => (
              <TouchableOpacity style={styles.buttonStyleRight} onPress={() => navigation.navigate ('ElevatorListScreen')}>
                <Text style={styles.text}>Back</Text>
              </TouchableOpacity>
            ), title: 'Elevator' }
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  buttonStyleRight: {
    backgroundColor:"red",
    color:"white",
    borderRadius:5,
    padding: 20,
    marginRight:10,
    marginLeft:10,
    height:20,
    width:100,
    alignItems:"center",
    justifyContent:"center",
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    width: '100%',
  },
})

export default MainStackNavigator