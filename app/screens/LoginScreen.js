import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, TextInput, TouchableOpacity, Alert} from 'react-native';

import bgImage from '../assets/rocketvertical.jpg';
import logo from '../assets/R2.png';


const { width: WIDTH } = Dimensions.get('window') 

function LoginScreen(props) {
  const [text, setText] = useState('');
  const { navigation } = props

  async function getData(email) {

    var url = `https://wjrocketapi.azurewebsites.net/api/Employee/find/${email}`;
    const response = await fetch(url);
    const data = await response.json();
    return data
  };
  async function checkData() {
    var getEmployee = await getData(text)
    if (getEmployee.length == 1) {
      navigation.navigate("ElevatorListScreen")
    } else {
      Alert.alert("Oups! Your email didn't match !", "Please enter a valid employee email...",[
        {text: "OK, Let's try again !"}
      ])
    }
  }
    return (
      <ImageBackground source={ bgImage }style={styles.backgroundContainer}>
         <View style={styles.logo}>
          <Image source={ logo }style={styles.logo}/>
        </View>
        <View style={{top: 340}}>
          <TextInput
            style={styles.input}
            placeholder={'Email'}
            onChangeText={text => setText(text)}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid= 'transparent'
            down="50"
            textAlign={'center'}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn}
          onPress={checkData}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </ImageBackground>

    );
}


const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: WIDTH -100,
    height: 45,
    borderRadius:25,
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25
  },
  loginBtn:{
    width: WIDTH -250,
    backgroundColor:"red",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10,
    top: 320,
  },
  logo: {
    width:281,
    height:100,
    marginBottom:-300,
  },

});

export default LoginScreen