import React, {Component} from 'react';
import {View, Text, AsyncStorage} from 'react-native';

export default class Loading extends Component {
    componentDidMount(){
        this.props.navigation.addListener('didFocus', ()=> {
            AsyncStorage.getItem('token')
            .then(response => {
                if(response === null) {
                    this.props.navigation.navigate('AccountStack')
                } else {
                    this.props.navigation.navigate('ProfileStack')
                }
            })    
        })
    }   

    render(){
        return(
            <View>
                <Text>AAAAAAAAAAAAAAAAAAAAAAAAAAA</Text>
            </View>
        )
    }
}