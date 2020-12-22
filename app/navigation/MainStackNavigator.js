import * as React from 'react';
import { View, Text, Button, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Home'

const Stack = createStackNavigator()

import Detail from '../screens/Detail'
import Login from '../screens/Login'

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerTitleAlign: 'center',
          gestureEnabled: true
        }}>
         <Stack.Screen
          name='Login'
          component={Login}
          options={{title: 'Login Screen' }}
        />
        <Stack.Screen
          name='Home'
          component={Home}
          options={
            ({navigation}) => (
            {  headerRight: () => (
              <TouchableOpacity style={styles.buttonStyleRight} onPress={() => navigation.navigate ('Login')}>
                <Text style={styles.text}>Logout</Text>
              </TouchableOpacity>
            ),  headerLeft: () => (
              <TouchableOpacity style={styles.buttonStyleRight} onPress={() => navigation.navigate ('Login')}>
                <Text style={styles.text}>Back</Text>
              </TouchableOpacity>
            ), }
          )}
        />
         <Stack.Screen
          name='Detail'
          component={Detail}
          options={
            ({navigation}) => (
            {  headerRight: () => (
              <TouchableOpacity style={styles.buttonStyleRight} onPress={() => navigation.navigate ('Login')}>
                <Text style={styles.text}>Logout</Text>
              </TouchableOpacity>
            ),  headerLeft: () => (
              <TouchableOpacity style={styles.buttonStyleRight} onPress={() => navigation.navigate ('Home')}>
                <Text style={styles.text}>Back</Text>
              </TouchableOpacity>
            ), }
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
    fontSize: 18,
    width: '100%',
  },
})

export default MainStackNavigator