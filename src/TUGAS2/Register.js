import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, AsyncStorage} from 'react-native'
import Address from './Terserah';

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



export default class Register extends React.Component {
    static navigationOptions = {
        header : null
    }

    constructor(props){
        super(props);
        this.state = {
            username: '',
            email_address :'',
            password :'',
            check: ''
        }
    }

    doSignUp(){
        const { password, check } = this.state;
        if (password !== check) {
            alert("Passwords don't match");
        } else {
            fetch(`${Address.ApalahArtiSebuahNama}/register`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username : this.state.username,
                    email_address : this.state.email_address,
                    password : this.state.password
                })
            })
            .then(res => {
                AsyncStorage.setItem('token', res.token);
                AsyncStorage.setItem('id', res.id);
                this.props.navigation.navigate('ProfileStack')
            })
            .catch(err => {
                alert('There is problem while fetching.');
                console.log(err)
            })
        }
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
            <View style={{alignItems: 'center', flex: 1, justifyContent: 'center', backgroundColor:'black'}}>
                <Text style={{fontSize:20, color: 'white', fontWeight:'bold', width: '100%', textAlign: 'center'}}>Register</Text>
 
                <TextInput style={styles.input} placeholder="Username" placeholderTextColor='rgba(0,0,0,.5)' value={this.state.username} onChangeText={value => {this.setState({username: value})}}></TextInput>
                <TextInput style={styles.input} placeholder="Email" placeholderTextColor='rgba(0,0,0,.5)' value={this.state.email_address} onChangeText={value => {this.setState({email_address: value})}}/>
                <TextInput style={styles.input} placeholder="Password" secureTextEntry placeholderTextColor='rgba(0,0,0,.5)' value={this.state.password} onChangeText={value => {this.setState({password :value})}}></TextInput>
                <TextInput style={styles.input} placeholder="Re-type Password" secureTextEntry placeholderTextColor='rgba(0,0,0,.5)' value={this.state.check} onChangeText={value => {this.setState({check:value})}}></TextInput>

                <TouchableOpacity style={styles.button} onPress={()=> this.doSignUp()}><Text style={{color : 'white'}}>Register</Text></TouchableOpacity>
                <Text style={{color:'white'}}>Already registered? <Text style={{color : '#38908f'}} onPress={()=> this.props.navigation.navigate('Login')}>Log me in!</Text></Text>
            </View>
            </TouchableWithoutFeedback>
        )
    }
}  