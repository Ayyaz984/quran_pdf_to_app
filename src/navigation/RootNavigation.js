import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ImageView from '../screens/ImageView';
import DrawerNavigation from './DrawerNavigation';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main">
        {props => <DrawerNavigation {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default RootNavigation;
