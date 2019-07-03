import React from 'react';
import { StyleSheet, View, Text, Image, AsyncStorage, TextInput, Button} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listfilms: [
                {
                    title: "The Hunger Games",
                    poster: require('./assets/TUGAS2/HungerGamesPoster.jpg'),
                    posterWidth: 1,
                    posterHeight: 1,
                    posterWidth2: 1,
                    posterHeight2: 1,
                    rating: '7.5'
                },
                {
                    title: "The Hunger Games: Catching Fire",
                    poster: require('./assets/TUGAS2/CatchingFirePoster.jpg'),
                    posterWidth: 1,
                    posterHeight: 1,
                    posterWidth2: 1,
                    posterHeight2: 1,
                    rating: '9.5'
                },
                {
                    title: "The Hunger Games: Mockingjay - Part 1",
                    poster: require('./assets/TUGAS2/MockingjayPart1Poster.jpg'),
                    posterWidth: 1,
                    posterHeight: 1,
                    posterWidth2: 1,
                    posterHeight2: 1,
                    rating: '8.5'
                },
                {
                    title: "The Hunger Games: Mockingjay - Part 2",
                    poster: require('./assets/TUGAS2/MockingjayPart2Poster.jpg'),
                    posterWidth: 1,
                    posterHeight: 1,
                    posterWidth2: 1,
                    posterHeight2: 1,
                    rating: '7.0'
                },
            ],
            activeIndex : 0
        }
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }    

    resizePoster = (event, index) => {
        let widthOrigin = event.nativeEvent.source.width
        let heightOrigin = event.nativeEvent.source.height
        let aspectRatio = heightOrigin / widthOrigin
        var posters = this.state.listfilms
        posters[index].posterWidth = 100 / aspectRatio
        posters[index].posterHeight = 100
        this.setState({
            listfilms: posters
        })
    }

    static navigationOptions = {
        header : null,
        // title : 'Profile',
        // headerStyle : {
        //     backgroundColor : '#38908f',
        // },
        // headerTintColor : 'white'
    }

    render() {
        return (
            <View style={{backgroundColor:'black'}}>
                <View style={styles.profile}>
                    <Ionicons name="md-settings" color='white' size={20} style={{alignSelf:'flex-end', marginRight:20}} onPress={()=> this.props.navigation.push('Settings')}/>
                    <Image style={{width: 80, height:80, justifyContent: 'center', alignItems:'center', borderRadius:40}} source={require('./assets/TUGAS2/download.jpg')} />
                    <Text style={{fontSize:18, fontWeight:'bold', color:'white', fontFamily:'Arial'}}>username</Text>
                    <Text style={styles.emailtext}>email@email.com</Text>
                    <Text style={styles.desctext}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                </View>

                <View>
                    <Text style={styles.sectionName}>All Reviews</Text>
                {this.state.listfilms.map((item, index) => (
                    <ScrollView key={index} style={{ paddingHorizontal: 15, paddingVertical: 20, marginBottom: 15,}}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                onLoad={(event) => this.resizePoster(event, index)}
                                source={item.poster}
                                style={{ width: item.posterWidth, height: item.posterHeight, marginRight: 15 }} />

                            <View style={{ flexDirection: 'column', flex: 1}}>
                                <View style={{ flexDirection: 'row', flex: 1, marginBottom: 5}}>
                                    <View style={{ flexDirection: 'column', flex: 1, marginRight: 15}}>
                                        <Text style={{ backgroundColor: '#b16e4b', paddingVertical: 3, paddingHorizontal: 8, alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 10, color: 'white', marginBottom: 3 }}>SEPT 23, 2018</Text>

                                        <Text style={{ flex: 1, flexWrap: 'wrap', fontWeight: 'bold', fontStyle: 'italic', fontSize: 16, color:'white'}}>{item.title}</Text>

                                    </View>

                                    <View style={{ width: 50, height: 50, backgroundColor: '#aa7b6f', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>9,5</Text>
                                    </View>
                                </View>

                                <View>
                                    <Text style={{fontSize: 13, color:'white'}}>The Oscar-Winning Actress is getting Oscar-buzz for her upcoming in the adaptation Bad Blood</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                ))}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    profile: {
        backgroundColor: 'rgba(255,255,255,.1)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20
    },
    emailtext : {
        fontSize : 12,
        color : 'rgba(255,255,255,.8)',
        fontStyle : 'italic',
        fontFamily: 'Arial'
    },
    desctext : {
        fontSize: 10,
        color : 'rgba(255,255,255,.8)',
        marginHorizontal : 15,
        marginTop : 10,
        textAlign : 'center',
        fontFamily: 'Arial'
    },
    reviews : {
        marginTop : 20,
        backgroundColor : 'white',
        width : 340,
        padding : 15,
        borderRadius: 5
    },
    sectionName : {
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 20,
        color:'white',
    },

});