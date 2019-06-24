import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native'
import {Button} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
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
        title : 'Profile',
        headerStyle : {
            backgroundColor : '#d2a3a9',
        },
        headerLeft: null,
        headerTintColor : 'white'
    }

    renderSection = () =>{
        if(this.state.activeIndex == 0) {
            return(
                <View>
                    <Text>First section</Text>
                </View>
            )
        }
        else{
            return(
                <View>
                    <Text>reviews section</Text>
                </View>
            )
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.profile}>
                    <ImageBackground style={{width: '100%', height: 250, justifyContent: 'center', alignItems:'center'}} source={require('./assets/TUGAS2/download.jpg')}>
                        <Ionicons name="md-settings" color='black' size={24} style={{alignSelf:'flex-end', marginRight: 20, marginBottom : 90}}/>
                        <Text style={{fontSize:24, color:'black'}}>username</Text>
                        <Text style={styles.emailtext}>email@email.com</Text>
                        <Text style={styles.desctext}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                    </ImageBackground>
                </View>

                <View>
                {this.state.listfilms.map((item, index) => (
                    <View key={index} style={{ paddingHorizontal: 15, paddingVertical: 20, marginBottom: 15, backgroundColor: '#fdcf76' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                onLoad={(event) => this.resizePoster(event, index)}
                                source={item.poster}
                                style={{ width: item.posterWidth, height: item.posterHeight, marginRight: 15 }} />

                            <View style={{ flexDirection: 'column', flex: 1}}>
                                <View style={{ flexDirection: 'row', flex: 1, marginBottom: 5}}>
                                    <View style={{ flexDirection: 'column', flex: 1, marginRight: 15}}>
                                        <Text style={{ backgroundColor: '#b16e4b', paddingVertical: 3, paddingHorizontal: 8, alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 10, color: 'white', marginBottom: 3 }}>SEPT 23, 2018</Text>

                                        <Text style={{ flex: 1, flexWrap: 'wrap', fontWeight: 'bold', fontStyle: 'italic', fontSize: 16 }}>{item.title}</Text>

                                    </View>

                                    <View style={{ width: 50, height: 50, backgroundColor: '#aa7b6f', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>9,5</Text>
                                    </View>
                                </View>

                                <View>
                                    <Text style={{fontSize: 13}}>The Oscar-Winning Actress is getting Oscar-buzz for her upcoming in the adaptation Bad Blood</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
                {/* <View style={styles.reviews}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{color:'maroon', fontSize: 20}}>Reviews</Text>
                        <Text style={{color: 'maroon', borderLeftColor:'maroon', borderLeftWidth:1.5, paddingLeft:10}}>Write a Review <Ionicons name="md-create" color="maroon" size={20}/></Text>
                    </View>
                    <View style={styles.blackline}></View>
                    <View>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Text>Movie's Title <Text>(20xx)</Text></Text>
                            <Text>8/10</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{width:50, height:80, backgroundColor:'black', marginRight:10}}></View>
                            <Text style={{width: 250, height:100, fontSize:10}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                        </View>
                        <View style={styles.blackline}></View>
                    </View>
                </View> */}

                {/* <View>
                    <View style={{flexDirection:'row', justifyContent:'space-evenly', }}>
                        <Button type="clear" title="Ratings" onPress={()=>this.setState({activeIndex:0})} isActive={this.state.activeIndex == 0}  />
                        <View style={{borderLeftColor:'black', borderLeftWidth:1}}></View>
                        <Button type="clear" title="Reviews" onPress={()=>this.setState({activeIndex:1})} isActive={this.state.activeIndex == 1} />
                    </View>

                    <ScrollView>
                    {this.renderSection()}
                    </ScrollView>
                </View> */}

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    profile: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        height: 250,
        paddingBottom: 20,
    },
    emailtext : {
        fontSize : 12,
        color : 'black',
        fontStyle : 'italic'
    },
    desctext : {
        fontSize: 10,
        color : 'black',
        marginHorizontal : 15,
        marginTop : 10
    },
    reviews : {
        marginTop : 20,
        backgroundColor : 'white',
        width : 340,
        padding : 15,
        borderRadius: 5
    }
});