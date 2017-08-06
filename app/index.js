import React from 'react';
import { StackNavigator } from 'react-navigation';
import ChatScreen from './screens/ChatScreen';
import InformationScreen from './screens/InformationScreen';

export const Root = StackNavigator({
    Chat: { screen: ChatScreen },
    Information: { screen: InformationScreen }
});