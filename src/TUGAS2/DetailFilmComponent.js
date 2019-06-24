import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableHighlight } from 'react-native'
import ReadMore from 'react-native-read-more-text';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class DetailFilmComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailfilm: [],
            actorslist: []
        };
    }

    componentDidMount() {
        fetch('http://192.168.43.174:8000/movie/' + this.props.navigation.getParam('id_movie'))
            .then(response => response.json())
            .then(res => {
                this.setState({
                    detailfilm: res
                })
            })
            .catch(error => {
                console.error(error)
            })

        fetch('http://192.168.43.174:8000/movie/' + this.props.navigation.getParam('id_movie') + '/actor')
            .then(response => response.json())
            .then(res => {
                this.setState({
                    actorslist: res
                })
            })
            .catch(error => {
                console.error(error)
            })
    }

    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{ fontSize: 12, color: 'navy' }} onPress={handlePress}>Read more</Text>

        )
    }

    _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={{ fontSize: 12, color: 'navy' }} onPress={handlePress}>Show less</Text>
        )
    }

    static navigationOptions = {
        title: 'Detail Film',
        headerStyle: {
            backgroundColor: '#d2a3a9',
        },
        headerLeft: null,
        headerTintColor: 'white'
    }

    howManyStars(number) {
        var staricons = [];
        for (let i = 0; i < Math.floor(number); i++) {
            staricons.push(
                <View key={i}>
                    <Ionicons name="md-star" size={15} />
                </View>
            )
        }
        if (number == Math.floor(number)) {
            return staricons
        } else {
            staricons.push(
                <View key={staricons.length + 1}>
                    <Ionicons name="md-star-half" size={15} />
                </View>
            )
            return staricons
        }
    }

    render() {
        return (
            <ScrollView>
                {this.state.detailfilm.map((item, index) => (
                    <View key={index}>
                        <View style={{ paddingLeft: 20, marginTop: 20, paddingRight: 20, marginBottom: 20, flexDirection: 'row' }}>
                            <Image
                                source={{ uri: 'http://192.168.43.174:8000/images/' + item.poster }}
                                style={{ height: 180, width: 120, flexDirection: 'column', justifyContent: 'space-between', marginRight: 10 }}
                            />
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 19 }}>{item.title}</Text>
                            </View>
                        </View>

                        <View style={{ marginBottom: 25 }}>
                            <Text style={{ fontSize: 18, paddingLeft: 20, paddingBottom: 6, marginBottom: 4, textTransform: 'uppercase', fontWeight: 'bold', borderBottomColor: 'rgba(0,0,0,.4)', borderBottomWidth: 1 }}>Plot</Text>

                            <Text style={{ fontSize: 12, flexWrap: 'wrap', flex: 1, paddingHorizontal: 20, paddingVertical: 4 }}>{item.summary}</Text>
                        </View>
                    </View>
                ))}

                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.push('Review', { id_movie: this.props.navigation.getParam('id_movie') })}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, marginBottom: 8, borderBottomColor: 'rgba(0,0,0,.4)', borderTopColor: 'rgba(0,0,0,.4)', borderBottomWidth: 1, borderTopWidth: 1 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="md-clipboard" size={25} style={{ paddingRight: 8 }} />
                                <Text style={{ fontSize: 18, textTransform: 'uppercase', fontWeight: 'bold' }}>Reviews</Text>
                            </View>
                            <Ionicons name="md-arrow-dropright-circle" size={25} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 25 }}>
                    <Text style={{ fontSize: 18, paddingLeft: 20, paddingBottom: 6, marginBottom: 4, textTransform: 'uppercase', fontWeight: 'bold', borderBottomColor: 'rgba(0,0,0,.4)', borderBottomWidth: 1 }}>Roles</Text>
                    {this.state.actorslist.map((item, index) => (
                        <View key={index} style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 8 }}>
                            <Image
                                source={{ uri: 'http://192.168.43.174:8000/images/' + item.profile }}
                                style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                            />
                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16 }}>{item.full_name}</Text>
                                <Text style={{ textTransform: 'uppercase', fontSize: 11 }}>{item.role}</Text>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>
        )
    }
}