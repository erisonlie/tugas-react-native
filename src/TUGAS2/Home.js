import React from 'react';
import { StyleSheet, View, Text, ScrollView, ImageBackground, Image, TouchableHighlight, AsyncStorage} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { FlatList } from 'react-native-gesture-handler';
import { isUserWhitespacable } from '@babel/types';
import BackEndAddress from './Terserah';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listfilms: [],
        }
    }

    getDataMovies() {
        fetch(`${BackEndAddress.ApalahArtiSebuahNama}/allmovies`)
            .then(response => response.json())
            .then(res => {
                this.setState({
                    listfilms: res
                })
            })
            .catch(error => {
                console.error(error)
            })
    }

    componentDidMount() {
        this.getDataMovies();
    }

    static navigationOptions = {
        title: 'MoreView',
        headerStyle: {
            backgroundColor: '#38908f'
        },
        headerLeft: null,
        headerTintColor: 'white'
    }

    dateFormatter(dateToFormat) {
        if(dateToFormat === '') {
            return ''
        } else {
            let dateFormatted = '';
            const d = new Date(dateToFormat);
            dateFormatted += d.getFullYear()
            return dateFormatted;    
        }
    }

    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor:'black' }}>
                <View style={styles.containerNewReleased}>
                    <Text style={styles.sectionName}>New Released Films</Text>
                    <Carousel
                        data={this.state.listfilms}
                        sliderWidth={350}
                        itemWidth={140}
                        renderItem={({ item, index }) => (
                            <TouchableHighlight onPress={() => this.props.navigation.push('DetailFilm', {id_movie : item.id_movie})}>
                                <View key={{ index }} style={{ flexDirection: 'row', marginTop : 10}}>
                                    <ImageBackground
                                        source={{ uri: `${BackEndAddress.ApalahArtiSebuahNama}/images/` + item.poster }}
                                        style={{ height: 210, width: 140, flexDirection: 'column', justifyContent: 'space-between'}}>
                                        <View></View>
                                        <View style={{backgroundColor : 'rgba(0,0,0,0.5)', padding: 6}}>
                                        <Text style={{ color: 'white', fontFamily: 'Arial', fontWeight: 'bold', fontSize: 14 }}>
                                            {item.title} ({this.dateFormatter(item.release_date)})
                                        </Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                            </TouchableHighlight>
                        )}
                    />
                </View>

                <View>
                    <Text style={styles.sectionName}>Top Rated Films of the Week</Text>
                    <ScrollView horizontal={true} style={styles.containerTopRatedFilms}>
                        {this.state.listfilms.map((item, index) => (
                            <View key={index} style={{ backgroundColor: '#38908f', marginRight: 20, marginLeft: 20, flexDirection: 'row', position: 'relative' }}>
                                <View style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,0.8)', width: 40, height: 40, zIndex: 1000, right: 0, alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: 20 }}><Text style={{ color: 'white', fontWeight: 'bold', fontStyle: 'italic' }}>{index + 1}</Text></View>

                                <View style={{ backgroundColor: 'white', height: 150, width: 110, paddingHorizontal: 13, paddingTop: 10, position: 'relative' }}>
                                    <View style={{ borderBottomWidth: 2, borderBottomColor: 'black', width: 40, marginBottom: 5 }}></View>
                                    <Text style={{ fontWeight: 'bold', color:'black'}}>{item.title}</Text>
                                    <Text style={{ backgroundColor: 'rgba(0,0,0,0.8)', alignSelf: 'flex-start', position: 'absolute', bottom: 0, paddingHorizontal: 11, paddingVertical: 11, marginTop: 9, fontSize: 17, fontWeight: 'bold', fontFamily: 'Verdana', color: 'white' }}>{item.rating}</Text>
                                </View>

                                <Image
                                    source={{ uri: `${BackEndAddress.ApalahArtiSebuahNama}/images/` + item.poster }}
                                    style={{ height: 150, width: 100 }} />
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <View>
                    <Text style={styles.sectionName}>News</Text>
                    <View style={{ backgroundColor: '#f4dcd6' }}>
                        {/* {this.state.news.map((item, index) => (
                            <View key={index} style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 25, borderBottomWidth: 2, borderBottomColor: '#e18d96', paddingVertical: 15, alignItems: 'center' }}>
                                <Image
                                    source={require('./assets/TUGAS2/news1.jpg')}
                                    style={{ width: 70, height: 70, marginRight: 10 }} />
                                <View style={{ flex: 1 }}>
                                    <Text style={{ flex: 1, flexWrap: 'wrap', fontWeight: 'bold', marginBottom: 5 }}>{item.title}</Text>
                                    <View style={{ borderBottomWidth: 2, width: 50, borderBottomColor: '#fdbccf', marginBottom: 3 }}></View>
                                    <Text style={{ fontSize: 12, paddingLeft: 5, fontWeight: 'bold', color: 'rgba(0,0,0,.4)' }}>{item.writer} | {item.datePublsihed}</Text>
                                </View>
                            </View>
                        ))} */}
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    containerNewReleased: {
        paddingVertical : 10,
        alignItems: 'center',
        marginBottom: 30
    },
    containerTopRatedFilms: {
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        marginBottom : 10
    },
    sectionName: {
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        color: 'white'
    },
});