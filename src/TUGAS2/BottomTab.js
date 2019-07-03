import React from "react";
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import HomeComponent from './Home.js';
import SearchComponent from './Search.js';
import AccountComponent from './Account.js';
import LoginComponent from './Login.js';
import Register from './Register.js';
import Settings from './Settings';
import DetailFilmComponent from './DetailFilmComponent.js';
import ReviewComponent from './ReviewComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loading from './Loading'

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

const SearchStack = createStackNavigator({
    SearchRoot : {
        screen: SearchComponent
    }
})

const ProfileStack = createStackNavigator({
    Profile : {
        screen: AccountComponent
    },
    Settings : {
        screen : Settings
    }
})

const AccountStack = createStackNavigator({
    Login : {
        screen: LoginComponent
    },
    Register : {
        screen : Register
    }
})

const AccountSwitch = createSwitchNavigator({
    LoadingScreen : {
        screen : Loading   
    },
    AccountStack : {
        screen : AccountStack
    },
    ProfileStack : {
        screen : ProfileStack
    },
}, {
    initialRouteName : 'LoadingScreen'
})

const BottomTab = createBottomTabNavigator({
    HomeTab: {
        screen: HomeStack,
        navigationOptions: {
            tabBarIcon: ({tintColor})=> (
                <Ionicons name="md-home" color={tintColor} size={30}/>
            )
        }
    },
    SearchTab: {
        screen: SearchStack,
        navigationOptions: {
            tabBarIcon: ({tintColor})=> (
                <Ionicons name="md-search" color={tintColor} size={30}/>
            )
        }
    },
    AccountTab: {
        screen: AccountSwitch,
        navigationOptions: {
            tabBarIcon: ({tintColor})=> (
                <Ionicons name="md-person" color={tintColor} size={30}/>
            )
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: '#38908f',
        inactiveTintColor: 'rgba(255,255,255,.4)',
        style : {
            borderTopColor: '#38908f',
            borderTopWidth: 1,
            shadowColor: 'black',
            backgroundColor: 'black',
            height: 50,
            paddingBottom: 2,
        },
        showLabel: false
    }
})

export default createAppContainer(BottomTab);
