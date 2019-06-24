import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
    input : {
        width : 270,
        height : 30,
        fontSize: 12,
        backgroundColor : '#f0c5d5',
        borderRadius : 20,
        marginTop : 20
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

export default class Login extends React.Component {
    static navigationOptions = {
        title : 'Login',
        headerStyle : {
            backgroundColor : '#d2a3a9'
        },
        headerTintColor : 'white'
    }

    render() {
        return (
            <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                <Text style={{fontSize: 20, color: '#38908f'}}>Login</Text>
 
                <TextInput style={styles.input} placeholder="Username" placeholderTextColor='white'></TextInput>
                <TextInput style={styles.input} placeholder="Password" placeholderTextColor="white" secureTextEntry></TextInput>

                <TouchableOpacity style={styles.button} onPress={()=> this.props.navigation.navigate('Account')}><Text style={{color : 'white'}}>Login</Text></TouchableOpacity>
                <Text>Not a member? <Text style={{color : '#38908f'}} onPress={()=> this.props.navigation.navigate('Register')}>Register now!</Text></Text>
            </View>
        )
    }
}