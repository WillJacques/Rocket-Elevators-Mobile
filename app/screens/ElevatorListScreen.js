import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, FlatList } from 'react-native'

export default class ElevatorListScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      dataSource: []
    }
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state,callback)=>{
        return;
    };
  }
  
  getInfo() {
    fetch `https://wjrocketapi.azurewebsites.net/api/Elevator/Active`
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson
      })
    })
  }

  _renderItem = ({item, index}) => {
    const info = {
      id: item.id,
      status: item.status,
      serialNumber: item.serial_number
    }
    if (item.status != "Active"){
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.loginBtn}
          onPress={()=> this.props.navigation.navigate('ElevatorScreen', {item: info })}>
          <Text style={styles.text}> # {item.id} </Text>
          <Text style={styles.text}> Status : {item.status} </Text>
          <Text style={styles.text}> Serial # : {item.serial_number} </Text>
        </TouchableOpacity>
      </SafeAreaView>  
    )};
  }
  
  render() {
    this.getInfo()
    let {dataSource, isloading} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.textTitle}>Non-Active Elevators</Text>
        <FlatList
          data={dataSource}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebebeb',
    marginBottom: 40,
    textAlignVertical: "center",
    alignItems:"center",
    textAlign: 'center',
  },
  text: {
    color: '#101010',
    textAlignVertical: "center",
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
  },
  textTitle: {
    textAlign: 'center',
    textAlignVertical: "center",
    height: 75,
    color: '#101010',
    backgroundColor: "dodgerblue",
    fontSize: 32,
    fontWeight: 'bold',
    width: '100%',
  },
  loginBtn:{
    backgroundColor:"red",
    borderRadius:25,
    height:100,
    width:300,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
  }
})
