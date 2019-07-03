import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native'
import ReadMore from 'react-native-read-more-text';
import { ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Stars from 'react-native-stars-rating';
import BackEndAddress from './Terserah';

export default class ReviewComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ratingStars: [
                {rate: 'ALL', count: 0},
                {rate: 5, count: 0},
                {rate: 4.5, count: 0},
                {rate: 4, count: 0},
                {rate: 3.5, count: 0},
                {rate: 3, count: 0},
                {rate: 2.5, count: 0},
                {rate: 2, count: 0},
                {rate: 1.5, count: 0},
                {rate: 1, count: 0}
            ],
            reviewCount: [],
            reviewFilter: [],
            numberHolder: 1,
            testajah: ''
        };
    }

    assignReviewCount(idmovie) {
        fetch(`${BackEndAddress.ApalahArtiSebuahNama}/movie/${idmovie}/review/count`)
            .then(response => response.json())
            .then(res => {
                let items = JSON.parse(JSON.stringify(this.state.ratingStars))
                for (i = 0; i < this.state.ratingStars.length; i++) {
                    for (j = 0; j < res.length; j++) {
                        if (this.state.ratingStars[i].rate == res[j].rating) {
                            items[i].count = res[j].count
                        }
                    }
                }
                this.setState({ratingStars : items})
            })
            .catch(error => {
                console.log(error)
            })
    }

    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={styles.readMoreShowLess} onPress={handlePress}>Read more</Text>
        )
    }

    _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={styles.readMoreShowLess} onPress={handlePress}>Show less</Text>
        )
    }
    
    static navigationOptions = {
        title: 'Reviews',
        headerStyle: {
            backgroundColor: '#38908f',
        },
        headerTintColor: 'white'
    }

    componentDidMount() {
        this.fetchReview(this.props.navigation.getParam('id_movie'), '')
        this.assignReviewCount(this.props.navigation.getParam('id_movie'))
    }

    fetchReview(idmovie, star) {
        var randomNumber = Math.floor(Math.random() * 50) + 1;
        
        fetch(`${BackEndAddress.ApalahArtiSebuahNama}/movie/${idmovie}/review${star}`)
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
            <ScrollView style={{backgroundColor:'black'}}>
                <View>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.scrollViewButton}>
                        <View style={{ paddingLeft: 10 }}></View>
                        {this.state.ratingStars.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.borderButtonRating} onPress={() => this.fetchReview(this.props.navigation.getParam('id_movie'), item.rate === 'ALL' ? '' : '/' + item.rate )}>
                                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                    <View style={styles.containerStarRating}>
                                        <Text style={styles.textButtonRating}>{item.rate}</Text>
                                        {item.rate === 'ALL' ? <Text></Text> : <Ionicons name="md-star" size={18} color='#38908f'/> }
                                    </View>
                                    {item.count == 0 ? <Text style={styles.textReviewCount}>0</Text> : <Text style={styles.textReviewCount}>{item.count}</Text>}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    
                    {!this.state.reviewFilter || !this.state.reviewFilter.length ?
                        <View style={{paddingHorizontal: 20}}>
                            <Text style={{textAlign: 'center'}}>No reviews with the specified rating has been posted by our users yet.</Text>
                        </View>
                    : 
                    this.state.reviewFilter.map((item, index) => (
                        <View key={index + this.state.numberHolder} style={styles.reviewContainer}>
                            <View style={styles.reviewTitleContainer}>
                                <Text style={{ fontWeight: 'bold', fontSize: 13, color: 'white' }}>
                                    {item.review_title}
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Stars
                                        isActive={false}
                                        rateMax={5}
                                        rate={item.rating}
                                        size={15}
                                        isHalfStarEnabled={true}
                                        color='#38908f'
                                    />
                                    <Text style={styles.reviewWriterandDate}>
                                        {item.username} on {this.dateFormatter(item.date_added)}
                                    </Text>
                                </View>
                            </View>

                            <ReadMore
                                numberOfLines={3}
                                renderTruncatedFooter={this._renderTruncatedFooter}
                                renderRevealedFooter={this._renderRevealedFooter}>
                                <Text style={{ fontSize: 12, color: 'white' }}>
                                    {item.review}
                                </Text>
                            </ReadMore>
                        </View>
                    ))
                        
                    }
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    borderButtonRating: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 13
    },
    textButtonRating: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingRight: 2,
        color:'white'
    },
    containerStarRating: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 3,
        borderBottomWidth: 1,
        borderBottomColor: 'white'
    },
    readMoreShowLess: {
        fontSize: 12,
        color: '#38908f',
        fontWeight: 'bold',
        paddingTop:5
    },
    reviewWriterandDate: {
        flexDirection: 'row',
        fontSize: 12,
        paddingLeft: 8,
        marginLeft: 7,
        borderLeftColor: 'white',
        borderLeftWidth: 1,
        color: 'white'
    },
    reviewTitleContainer: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        paddingBottom: 6,
        marginBottom: 5
    },
    reviewContainer: {
        marginBottom: 15,
        marginHorizontal: 13,
        paddingHorizontal: 13,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,.8)'
    },
    scrollViewButton: {
        flexDirection: 'row',
        paddingVertical: 15,
        marginBottom: 10,
        backgroundColor:'rgba(255,255,255,.3)'
    },
    textReviewCount: {
        fontSize: 12,
        fontWeight: 'bold',
        color:'white'
    },
});