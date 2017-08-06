import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { StackNavigator } from 'react-navigation';

class ChatScreen extends React.Component {
  constructor() {
    super();
    this.id = 1;
  }
  static navigationOptions = ({ navigation }) => ({
    headerRight: <Button
        title="ⓘ  "
        onPress={() =>
          navigation.navigate('Information')
        }
      />,
    title: "ChatterBot"
  })

  state = {
    messages: [],
  };
  componentWillMount() {
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
    const {text} = response;
    const messages = this.state.messages.slice();
////////////////////////////////////////////////////////////////////////////////////////////////
    messages.unshift(MessageObj(CalcInstance(text), ++this.id));
    //if ((text=="Hi") || (text=="Hello")) {
    //  messages.unshift(MessageObj("Hello!", ++this.id));
    //}
    //else {
      //messages.unshift(MessageObj("I'm sorry, I couldn't understand the message", ++this.id));
    //}
////////////////////////////////////////////////////////////////////////////////////////////////
    this.setState({messages});
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
  let returnMessage = null;
  /////////////////////////////////////
  let $Hello = ["Hello","Hi","Wassup","Hey"];
  let allInstances = [$Hello];
  /////////////////////////////////////
  for (let i = 0; i < allInstances.length; i++) {
    let instance = allInstances[i];
    console.log(instance);
    console.log(instanceText);
    if (instance.indexOf(instanceText) > -1) {
      returnMessage = instance[Math.floor(Math.random() * instance.length)];
      console.log("YA GOT IT");
    }
  }
  if (returnMessage==null) {
    returnMessage = "I\'m sorry, I couldn't understand the message."
  }
  return returnMessage;
}
export default ChatScreen; 