import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeComponent from './screen/Home'
import ProfileComponent from './screen/Profile'

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeComponent
    },
    Profile: {
        screen: ProfileComponent
    }
});

export default createAppContainer(AppNavigator)