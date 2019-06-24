import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

export default class Test extends Component {

    render() {
        return (
            <ScrollView
                horizontal
            >
                <View style={{flexDirection: 'row'}}>
                <View style={{backgroundColor: 'red', width: 200, height: 200}} />
                <View style={{backgroundColor: 'green', width: 200, height: 200}} />
                <View style={{backgroundColor: 'blue', width: 200, height: 200}} />
                </View>
            </ScrollView>
        );
    }
};