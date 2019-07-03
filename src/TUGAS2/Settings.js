import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, AsyncStorage} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default class Settings extends React.Component{
    static navigationOptions = {
        title : 'Settings',
        headerStyle : {
            backgroundColor : 'rgba(0,0,0,.9)',
        },
        headerTitleStyle : {
            fontSize: 15,
            textAlign: 'center',
            flex: 1
        },
        headerRight: (<View />),
        headerTintColor : 'white'
    }

    logOut() {
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('id')
        this.props.navigation.navigate('AccountStack')
    }

    render(){
        return(
            <ScrollView style={{backgroundColor:'black', paddingHorizontal: 20, paddingVertical:10}}>
                <Text style={styles.settingTitle}>Account</Text>
                <TouchableOpacity>
                    <Text style={styles.settingName}>Edit Profile</Text>
                    <Text style={styles.settingDesc}>Change profile's description</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.settingName}>Change Password</Text>
                    <Text style={styles.settingDesc}>Change account's password</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.logOut()}>
                    <Text style={styles.settingName}>Log out</Text>
                    <Text style={styles.settingDesc}>Currently logged in as username</Text>
                </TouchableOpacity>

                <View style={styles.line}></View>

                <Text style={styles.settingTitle}>Notification</Text>
                <TouchableOpacity>
                    <Text style={styles.settingName}>Notifications</Text>
                    <Text style={styles.settingDesc}>Choose which notifications to recieve</Text>
                </TouchableOpacity>

                <View style={styles.line}></View>

                <Text style={styles.settingTitle}>About</Text>
                <TouchableOpacity>
                    <Text style={styles.settingName}>Version</Text>
                    <Text style={styles.settingDesc}>Beta 1.?? damn we didn't count it XD</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.settingName}>Terms and Conditions</Text>
                    <Text style={styles.settingDesc}>All the stuff you need to know</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.settingName}>Privacy Policy</Text>
                    <Text style={styles.settingDesc}>Important for both of us</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.settingName}>Support</Text>
                    <Text style={styles.settingDesc}>???</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    settingTitle : {
        color : 'white',
        fontSize : 15,
        fontWeight: 'bold',
        marginBottom: 15
    },
    settingName:{
        color : 'white',
        fontSize : 13,
    },
    settingDesc : {
        color: 'rgba(255,255,255,.4)',
        fontSize: 9,
        marginBottom: 15
    },
    line : {
        borderBottomColor:'rgba(255,255,255,.4)',
        borderBottomWidth: .5,
        marginBottom : 15
    }
})