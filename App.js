import { I18nManager, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DrawerNavigation from './src/navigation/DrawerNavigation';

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

const App = () => {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <SafeAreaView style={{flex:1}}>
          <DrawerNavigation />
        </SafeAreaView>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
