import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Profile extends Component {
    static navigationOptions = {
        title: 'Profile',
        headerStyle : {
            backgroundColor: 'red'
        },
        headerTintColor: 'yellow',
        headerTitleStyle : {
            fontSize: 20
        }
    }
    
    render() {
        return (
            <View>
                <Text>Screen Profile</Text>
            </View>
        );
    }
};