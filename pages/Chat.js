'use strict';

import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Keyboard } from 'react-native';
import { DeviceEventEmitter,ScrollView, StyleSheet, View,TextInput, Text, Navigator, TouchableHighlight, TouchableOpacity } from 'react-native';
import t from 'tcomb-form-native';
import KeyboardSpacer from './KeyboardSpacer';

const Form = t.form.Form;
const User = t.struct({
  first_name: t.String,
  last_name: t.String,
  email: t.String,
  password: t.String,
  confirm_pass: t.String,
});
const Message = t.struct({
  message: t.String,
})
const options = {};


class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      messages: [],
      keyboardstatus: false,
    };
    this.handleText = this.handleText.bind(this)
    this.handlekeystate = this.handlekeystate.bind(this)
  }

  handleText() {
    if(this.state.text) {
      this.state.messages.push({text: this.state.text, type: 1});
      this.state.messages.push({text: "response", type: 2});
      this.state.text = "";
      this.setState(this.state);
    }
  }
  handlekeystate(value) {
    console.log(value)
    if(value === true) {
      this.setState({
        keyboardstatus: true
      })
    } else {
      this.setState({
        keyboardstatus: false
      })
    }
  }
  render() {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
      />
    );
  }

  renderScene(route, navigator) {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>

        <KeyboardSpacer handlekey = {this.handlekeystate}/>
        <View style={styles.chatbot}>
          <Text style={this.state.keyboardstatus? styles.botsmall : styles.bottitle}>ChatBot</Text>
        </View>
        <ScrollView style={{flex:8, backgroundColor: 'white'}}>
          <View style={styles.container}>
            {this.state.messages.map(function(element, index) {
              return (<Text style={element.type === 1?styles.message : styles.botmessage} key = {index}>
                {element.text}
              </Text>)
            })}
          </View>
        </ScrollView>
        <View style={this.state.keyboardstatus? styles.messageboxsmall : styles.messagebox}>
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.textinputbox}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            onSubmitEditing={this.handleText}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  chatbot: {
    flex: 1,
    backgroundColor: 'gray',
  },
  message:{
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#a5f1b7',
    borderColor: '#a5f1b7',
    padding: 5,
    width: 200,
    fontSize: 20,
    marginBottom: 10,
  },
  botmessage:{
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#a1e3e4',
    borderColor: '#a1e3e4',
    padding: 5,
    width: 200,
    fontSize: 20,
    marginBottom: 10,
  },
  messagebox: {
    flex: 1,
    marginBottom: -19,
  },
  textinputbox: {
    paddingLeft: 10,
    height: 40,
    backgroundColor: '#e4e4e4',
  },
  messageboxsmall:{
    flex: 1,
    marginBottom: 12,
  },
  bottitle: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 10,
  },
  botsmall: {
    fontSize: 15,
    textAlign: 'center',
    paddingTop: 5,
  },
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
});

module.exports = ChatPage;
