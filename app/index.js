import React from 'react';
import { StackNavigator } from 'react-navigation';
import ChatScreen from './screens/ChatScreen';

export const Root = StackNavigator({
    Chat: { screen: ChatScreen },
});