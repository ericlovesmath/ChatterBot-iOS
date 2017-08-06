import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { StackNavigator } from 'react-navigation';
let allInstances = [];
class ChatScreen extends React.Component {
  constructor() {
    super();
    this.id = 1;
  }
  static navigationOptions = ({ navigation }) => ({
    headerLeft: null,
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

    messages.unshift(MessageObj(CalcInstance(text), ++this.id));

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
    const {inst, key} = this.props.navigation.state.params ? 
    this.props.navigation.state.params :
    {inst: "Hello", key: ["Hello","Hi","Wassup","Hey"]}
    allInstances.push([inst, key])
    console.log(allInstances)

    const {removeInstances} = this.props.navigation.state.params ? 
    this.props.navigation.state.params :
    {removeInstances: false}
    if (removeInstances==true){
      allInstances=[["Hello",["Hello","Hi","Wassup","Hey"]]];
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
  let returnMessage = null;
  for(var i = allInstances.length - 1; i >= 0; i--) {
    if(allInstances[i] === [undefined,undefined,]) {
       allInstances.splice(i, 1);
    }
  }
  for (let i = 0; i < allInstances.length; i++) {
    let items = allInstances[i];
    let instance = items[0];
    let keys = items[1];
    //console.log(keys);
    if (keys.indexOf(instanceText) > -1) {
      returnMessage = "We are talking about \"".concat(instance, "\", correct?");
      //returnMessage = keys[Math.floor(Math.random() * keys.length)];
    }
  }
  if (returnMessage==null) {
    returnMessage = "I\'m sorry, I couldn't understand the message."
  }
  return returnMessage;
}
export default ChatScreen; 