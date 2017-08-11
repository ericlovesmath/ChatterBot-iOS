import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { StackNavigator } from 'react-navigation';

let allInstances = [];
let inst = null;
let key = null;

class ChatScreen extends React.Component {
  constructor() {
    super();
    this.id = 1;
    this.state = {
      messages: []
    };
  }
  static navigationOptions = ({ navigation }) => {
    const emptyLambda = () => { };
    return ({
      headerLeft: null,
      headerRight: <Button
        title="ⓘ  "
        onPress={() =>
          navigation.navigate('Information', {
            changeInst: navigation.state.params.changeInst
            || emptyLambda
          })
        }
      />,
      title: "ChatterBot"
    })
  }
  changeInst = (inst, key) => {
    this.props.navigation.setParams({inst, key});
  }
  componentWillMount() {
    this.props.navigation.setParams({
      inst: "Hello",
      key: ["Hello", "Hi", "Wassup", "Hey"],
      changeInst: this.changeInst,
    })
    
    this.setState({
      messages: [
        {
          _id: this.id,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }


  respond = () => {
    const response = this.state.messages[0];
    const { text } = response;
    const messages = this.state.messages.slice();
    messages.unshift(MessageObj(CalcInstance(text), ++this.id));
    this.setState({ messages });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.respond();
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { inst, key } = this.props.navigation.state.params ?
      this.props.navigation.state.params :
      { inst: "Hello", key: ["Hello", "Hi", "Wassup", "Hey"] }
    
    allInstances.push([inst,key]);
    console.log(inst);
    console.log(key);
    const { removeInstances } = this.props.navigation.state.params ?
      this.props.navigation.state.params :
      { removeInstances: false }
    if (removeInstances == true) {
      allInstances = [["Hello", ["Hello", "Hi", "Wassup", "Hey"]]];
    }
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

function MessageObj(message, id) {
  return {
    _id: id,
    text: message,
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://facebook.github.io/react/img/logo_og.png',
    },
  };
}

function CalcInstance(instanceText) {
  var levenshtein = require('fast-levenshtein');
  let cutInstanceText = instanceText.split(" ");
  let returnMessage = null;
  for (let i = 0; i < allInstances.length; i++) {
    let items = allInstances[i];
    let instance = items[0];
    let keys = items[1];
    for (var j = 0; j < keys.length; j++) {
      let key = keys[j];
      for (var k = 0; k < cutInstanceText.length; k++) {
        let instanceWord = cutInstanceText[k];
        if (levenshtein.get(instanceWord.toLowerCase(), key.toLowerCase()) <= (key.length) / 2) {
          returnMessage = "We are talking about \"".concat(instance, "\", correct?");
        }
      }
    }
    if (returnMessage == null) {
      returnMessage = "I\'m sorry, I couldn't understand the message.";
    }
  }
  return returnMessage;
}
export default ChatScreen; 