import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native'
import ReadMore from 'react-native-read-more-text';
import { ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class ReviewComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ratingStars: ['ALL', 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1],
            reviewFilter: [],
            numberHolder: 1
        };
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

    _handleTextReady = () => {
        console.log('ready!');
    }

    static navigationOptions = {
        title: 'Review',
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

    componentDidMount() {
        this.fetchReview(this.props.navigation.getParam('id_movie'), '')
    }

    fetchReview(idmovie, star) {
        var randomNumber = Math.floor(Math.random() * 50) + 1;
      
        fetch('http://192.168.43.174:8000/movie/' + idmovie + '/review' + star)
            .then(response => response.json())
            .then(res => {
                this.setState({
                    reviewFilter: res,
                    numberHolder: randomNumber
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    dateFormatter(dateToFormat) {
        if(dateToFormat === '') {
            return ''
        } else {
            let dateFormatted = '';
            var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            const d = new Date(dateToFormat);
            dateFormatted += d.getDay() + ' ' + month[d.getMonth()] + ' ' + d.getFullYear()
            return dateFormatted;    
        }
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ flexDirection: 'row', paddingVertical: 15, marginBottom: 10 }}>
                        <View style={{ paddingLeft: 10 }}></View>
                        {this.state.ratingStars.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.borderButtonRating} onPress={() => this.fetchReview(this.props.navigation.getParam('id_movie'), item === 'ALL' ? '' : '/' + item )}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.textButtonRating}>{item}</Text>
                                    {item === 'ALL' ? <Text></Text> : <Ionicons name="md-star" size={18} /> }
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                        {this.state.reviewFilter.map((item, index) => (
                            <View key={index + this.state.numberHolder} style={{ paddingHorizontal: 20 }}>
                                <View style={{ borderBottomColor: 'rgba(0,0,0,.2)', borderBottomWidth: 1, paddingBottom: 6, marginBottom: 5 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 13 }}>
                                        {item.review_title}
                                    </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {this.howManyStars(item.rating)}
                                        <Text style={{ flexDirection: 'row', fontSize: 12, paddingLeft: 8, marginLeft: 7, borderLeftColor: 'rgba(0,0,0,.5)', borderLeftWidth: 1 }}>
                                            {item.username} on {this.dateFormatter(item.date_added)}
                                        </Text>
                                    </View>
                                </View>

                                <ReadMore
                                    numberOfLines={3}
                                    renderTruncatedFooter={this._renderTruncatedFooter}
                                    renderRevealedFooter={this._renderRevealedFooter}
                                    onReady={this._handleTextReady}>
                                    <Text style={{ fontSize: 12 }}>
                                        {item.review}
                                    </Text>
                                </ReadMore>
                            </View>
                        ))}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    borderButtonRating: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'rgba(0,0,0,.5)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 13
    },
    textButtonRating: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingRight: 2
    }
});