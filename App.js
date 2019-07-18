/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from './src/Home';
import Camera from './src/Camera';
import TextOutput from './src/TextOutput';

const AppNavigator = createStackNavigator({
  Home: Home,
  Camera: Camera,
  Output: TextOutput
});


export default createAppContainer(AppNavigator);
