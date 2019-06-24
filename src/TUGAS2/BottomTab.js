import React from "react";
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { StyleSheet, View, Text } from 'react-native'
import HomeComponent from './Home.js';
import DashboardComponent from './Dashboard.js';
import AccountComponent from './Account.js';
import LoginComponent from './Login.js';
import Register from './Register.js';
import DetailFilmComponent from './DetailFilmComponent.js';
import ReviewComponent from './ReviewComponent.js';
import Ionicons from 'react-native-vector-icons/Ionicons'

const HomeStack = createStackNavigator({
    HomeRoot : {
        screen: HomeComponent
    },
    DetailFilm : {
        screen: DetailFilmComponent
    },
    Review : {
        screen: ReviewComponent
    }
})

const DashboardStack = createStackNavigator({
    DashboardRoot : {
        screen: DashboardComponent
    }
})

const AccountStack = createStackNavigator({
    Login : {
        screen: LoginComponent
    },
    Register : {
        screen: Register
    },
    Account : {
        screen: AccountComponent
    },
})

const BottomTab = createBottomTabNavigator({
    HomeTab: {
        screen: HomeStack,
        navigationOptions: {
            tabBarIcon: ({tintColor})=> (
                <Ionicons name="md-home" color={tintColor} size={35}/>
            )
        }
    },
    DashboardTab: {
        screen: DashboardStack,
        navigationOptions: {
            tabBarIcon: ({tintColor})=> (
                <Ionicons name="md-notifications" color={tintColor} size={35}/>
            )
        }
    },
    AccountTab: {
        screen: AccountStack,
        navigationOptions: {
            tabBarIcon: ({tintColor})=> (
                <Ionicons name="md-person" color={tintColor} size={35}/>
            )
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: 'rgb(153,0,26)',
        inactiveTintColor: 'rgba(0,0,0,.5)',
        style : {
            borderTopColor: 'rgb(255,179,230)',
            shadowColor: 'black',
            backgroundColor: 'rgb(255,204,246)',
            height: 45,
            paddingBottom: 2,
        },
        showLabel: false
    }
})

export default createAppContainer(BottomTab);
