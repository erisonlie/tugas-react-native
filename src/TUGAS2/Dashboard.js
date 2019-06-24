import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listnotifications: [
                {
                    notif: 'Someone just upvoted your review on The Hunger Games!',
                    icon: 'md-thumbs-up',
                    color: 'green',
                    backColor: '#e5fbe5'
                },
                {
                    notif: 'In the last four hours, your thoroughly written review on Black Swan has been upvoted by 678 users and downvoted by 12 users! Looking forward to sharing another excellent reviews of yours! Congrats',
                    icon: 'md-heart',
                    color: '#f20079',
                    backColor: '#ffdfef'
                }
            ]
        }
    }

    static navigationOptions = {
        title : 'Notification',
        headerStyle : {
            backgroundColor : '#d2a3a9',
        },
        headerLeft: null,
        headerTintColor : 'white'
    }

    render() {
        return (
            <ScrollView>
                {this.state.listnotifications.map((item, index)=>(
                    <View style={{flexDirection: 'row', paddingVertical: 15, paddingHorizontal: 20, marginBottom: 5, backgroundColor: item.backColor}} key={index}>
                        <View style={{marginRight: 15, justifyContent: 'center'}}>
                            <Ionicons name={item.icon} color={item.color} size={30}/>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{flex: 1, flexWrap: 'wrap', fontSize: 13}}>{item.notif}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        )
    }
}