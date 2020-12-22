import React from 'react';
import { ImageBackground, StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Image, Button, StatusBar, Alert } from 'react-native';

function WelcomeScreen(props) {
    const handlePress = () => console.log("Text pressed");
    return (
    <SafeAreaView style={styles.container}>
      <Text onPress={handlePress}>Welcome to your employee portal</Text>
      <TouchableOpacity style={styles.button} onPress={() => console.log("image tap")}>
      <Image source={require('../assets/R2.png')} />
      </TouchableOpacity>
      <Button color="red" position="relative" top="50" title="Log in" onPress={() => Alert.alert("My title", "My message", [ 
        {text: "Yes", onPress: () => console.log("YES")},
        {text: "No", onPress: () => console.log("NO")},]) 
        }
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    button: {
        padding: 50
    },
    container: {
      flex: 1,
      backgroundColor: 'dodgerblue',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default WelcomeScreen;