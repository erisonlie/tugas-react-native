import React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, AsyncStorage, TouchableWithoutFeedback, Keyboard} from 'react-native'
import Address from './Terserah';

export default class Login extends React.Component {
    static navigationOptions = {
        header : null
    }

    constructor(props) {
        super(props);
        this.state = {
            email_address: '',
            password: '',
        }
    }

    loginHandler() {
        fetch(`${Address.ApalahArtiSebuahNama}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email_address: this.state.email_address,
                password: this.state.password
            })
        })
        .then(response => {
            response.json().then(
                res => {
                    AsyncStorage.setItem('token', res.token);
                    AsyncStorage.setItem('id', res.id);
                    this.props.navigation.navigate('ProfileStack')
                }
            )
        })
        .catch(err => {
            alert('There is problem while fetching.');
            console.log(err)
        })
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
            <View style={{alignItems: 'center', flex: 1, justifyContent: 'center', backgroundColor: 'black'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', width:'100%', textAlign:'center'}}>Login</Text>
 
                <TextInput onChangeText={value => {this.setState({email_address: value})}} style={styles.input} placeholder="Email" placeholderTextColor='rgba(0,0,0,.5)' value={this.state.email_address}/>
                <TextInput onChangeText={value => {this.setState({password: value})}} secureTextEntry style={styles.input} placeholder="Password" placeholderTextColor='rgba(0,0,0,.5)' value={this.state.password}/>

                <TouchableOpacity style={styles.button} onPress={()=> this.loginHandler()}><Text style={{color: 'white'}}>Login</Text></TouchableOpacity>
                <Text style={{color:'white'}}>Not a member? <Text style={{color : '#38908f'}} onPress={()=> this.props.navigation.navigate('Register')}>Register now!</Text></Text>
            </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    input : {
        width : 270,
        height : 30,
        fontSize: 12,
        backgroundColor : 'white',
        borderRadius : 20,
        marginTop : 20,
        padding : 5
    },
    button : {
        width : 270,
        height: 40,
        alignItems : 'center',
        backgroundColor : '#38908f',
        marginVertical : 20,
        borderRadius : 25,
        paddingTop : 10
    }
})
