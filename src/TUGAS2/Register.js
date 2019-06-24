import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
    input : {
        width : 270,
        height : 30,
        fontSize: 12,
        backgroundColor : '#b5ddd1',
        borderRadius : 20,
        marginTop : 20
    },
    button : {
        width : 270,
        height: 40,
        alignItems : 'center',
        backgroundColor : '#e17e76',
        marginVertical : 20,
        borderRadius : 25,
        paddingTop : 10
    }
})



export default class Register extends React.Component {
    static navigationOptions = {
        title : 'Register',
        headerStyle : {
            backgroundColor : '#d2a3a9'
        },
        headerTintColor : 'white'
    }

    constructor(props){
        super(props)
    }
    render() {
        return (
            <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                <Text style={{fontSize:20, color: '#e17e76'}}>Register</Text>
 
                <TextInput style={styles.input} placeholder="Username" placeholderTextColor='white'></TextInput>
                <TextInput style={styles.input} placeholder="Email" placeholderTextColor='white' keyboardType="email-address"></TextInput>
                <TextInput style={styles.input} placeholder="Password" placeholderTextColor="white" secureTextEntry></TextInput>
                <TextInput style={styles.input} placeholder="Re-type Password" placeholderTextColor="white" secureTextEntry></TextInput>

                <TouchableOpacity style={styles.button} onPress={()=> this.props.navigation.navigate('Login')}><Text style={{color : 'white'}}>Register</Text></TouchableOpacity>
                <Text>Already registered? <Text style={{color : '#38908f'}} onPress={()=> this.props.navigation.navigate('Login')}>Login me!</Text></Text>
            </View>
        )
    }
}  