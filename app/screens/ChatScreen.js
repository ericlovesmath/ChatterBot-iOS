import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

class ChatScreen extends React.Component {
  constructor() {
    super();
    this.id = 1;
  }
  static navigationOptions = {title: "ChatterBot"}
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
    messages.unshift(MessageObj(Instance(text), ++this.id));
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

function Instance(instanceText) {
  $Hello = ["Hello","Hi","Wassup","Hey"];
  if ($Hello.indexOf(instanceText) > -1) {
    returnMessage = $Hello[Math.floor(Math.random() * $Hello.length)]
  }
  else {
    returnMessage = "I\'m sorry, I couldn't understand the message."
  }



  return returnMessage;
}
export default ChatScreen; 