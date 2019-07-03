import React from 'react';
import { StyleSheet, View, Text, Image, Button, Modal, Dimensions, TouchableHighlight, TextInput } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import Stars from 'react-native-stars-rating';
import BackEndAddress from './Terserah';

export default class DetailFilmComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailfilm: [],
            actorslist: [],
            modalVisible: false,
            reviewTitle: '',
            rating: '',
            reviewBody: '',
            modalIndex: 0,
            starCount: 0
        };
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        })
    }

    componentDidMount() {
        fetch(`${BackEndAddress.ApalahArtiSebuahNama}/movie/${this.props.navigation.getParam('id_movie')}`)
            .then(response => response.json())
            .then(res => {
                this.setState({
                    detailfilm: res
                })
            })
            .catch(error => {
                console.error(error)
            })

        fetch(`${BackEndAddress.ApalahArtiSebuahNama}/movie/${this.props.navigation.getParam('id_movie')}/actor`)
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

    static navigationOptions = {
        header: null
    }

    modalContent = () => {
        let theView
        if (this.state.modalIndex == 0) {
            theView =
                <View style={styles.allModal}>
                    <View style={styles.modalClosePrev}>
                        <View></View>
                        <TouchableHighlight style={styles.highlight} onPress={() => this.setState({modalVisible: false, reviewTitle: '', reviewBody: '', starCount: 0})} >
                            <View style={styles.buttonClosePrev}>
                                <Ionicons name="md-close-circle-outline" size={25} color="white" />
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.modalChild}>
                        <Text style={styles.textModal}>What would you like your review title to be?</Text>
                        <View style={styles.textInputTitle}>
                            <TextInput 
                                placeholder="Your review title..."
                                onChangeText={(value)=> this.setState({reviewTitle: value})}
                                value={this.state.reviewTitle}
                                placeholderTextColor="white"

                            />
                        </View>
                        <Button onPress={() => this.setState({ modalIndex: 1 })} title="NEXT" style={styles.textModal} />
                    </View>
                </View>

        } else if (this.state.modalIndex == 1) {
            theView =
                <View style={styles.allModal}>
                    <View style={styles.modalClosePrev}>
                        <TouchableHighlight style={styles.highlight} onPress={() => this.setState({ modalIndex: 0 })}>
                            <View style={styles.buttonClosePrev}>
                                <Ionicons name="md-arrow-dropleft-circle" size={25} color='#38908f' />
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.highlight} onPress={() => this.setState({ modalVisible: false, reviewTitle: '', reviewBody: '', starCount: 0 })}>
                            <View style={styles.buttonClosePrev}>
                                <Ionicons name="md-close-circle-outline" size={25} color='#38908f' />
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.modalChild}>
                        <Text style={styles.textModal}>How would you rate the movie based on your experience?</Text>
                        <Stars
                            isActive={true}
                            rateMax={5}
                            rate={this.state.starCount}
                            onStarPress={(rating)=> this.onStarRatingPress(rating)}
                            size={50}
                            isHalfStarEnabled={true}
                            color='turquoise'
                        />
                        <Button onPress={() => this.setState({ modalIndex: 2 })} title="NEXT" style={styles.textModal} />
                    </View>
                </View>

        } else if (this.state.modalIndex == 2) {
            theView =
                <View style={styles.allModal}>
                    <View style={styles.modalClosePrev}>
                        <TouchableHighlight style={styles.highlight} onPress={() => this.setState({ modalIndex: 1 })}>
                            <View style={styles.buttonClosePrev}>
                                <Ionicons name="md-arrow-dropleft-circle" size={25} color="white" />
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.highlight} onPress={() => this.setState({ modalVisible: false, reviewTitle: '', reviewBody: '', starCount: 0 })}>
                            <View style={styles.buttonClosePrev}>
                                <Ionicons name="md-close-circle-outline" size={25} color="white" />
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.modalChild}>
                        <Text style={styles.textModal}>Now, write down your thoughts about the movie! We are looking forward to sharing it as reference to people who need it</Text>
                        <View style={styles.textInputTitle}>
                            <TextInput 
                                multiline={true}
                                numberOfLines={8}
                                onChangeText={(value)=> this.setState({reviewBody: value})}
                                value={this.state.reviewBody}
                                placeholderTextColor="white"
                            />
                        </View>
                        <Button onPress={() => this.setState({ modalIndex: 0, modalVisible: false })} title="SUBMIT" style={styles.textModal}/>
                    </View>
                </View>
        }
        return theView
    }


    render() {
        return (
            <View style={{backgroundColor:'black'}}>
                <ScrollView>
                    {this.state.detailfilm.map((item, index) => (
                        <View key={index}>
                            <View style={{ paddingLeft: 20, marginTop: 20, paddingRight: 20, marginBottom: 20, flexDirection: 'row' }}>
                                <Image
                                    source={{ uri: `${BackEndAddress.ApalahArtiSebuahNama}/images/` + item.poster }}
                                    style={{ height: 180, width: 120, flexDirection: 'column', justifyContent: 'space-between', marginRight: 10 }}
                                />
                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 19, color:'white'}}>{item.title}</Text>
                                </View>
                            </View>

                            <View style={{ marginBottom: 25 }}>
                                <Text style={styles.contentTitle}>Plot</Text>
                                <Text style={styles.summaryPlot}>{item.summary}</Text>
                            </View>
                        </View>
                    ))}

                    <View style={{ marginBottom: 25 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.push('Review', { id_movie: this.props.navigation.getParam('id_movie') })}>
                            <View style={styles.reviewView}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name="md-clipboard" size={25} style={{ paddingRight: 8 }} color='#38908f'/>
                                    <Text style={{color :'#38908f', fontSize:17, fontWeight:'bold', textTransform:'uppercase'}}>Reviews</Text>
                                </View>
                                <Ionicons name="md-arrow-dropright-circle" size={25}color='#38908f'/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginBottom: 80}}>
                        <Text style={styles.contentTitle}>Roles</Text>
                        {this.state.actorslist.map((item, index) => (
                            <View key={index} style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 8 }}>
                                <Image
                                    source={{ uri: `${BackEndAddress.ApalahArtiSebuahNama}/images/` + item.profile }}
                                    style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                                />
                                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16, color:'white' }}>{item.full_name}</Text>
                                    <Text style={{ textTransform: 'uppercase', fontSize: 11, color:'white' }}>{item.role}</Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    <Modal visible={this.state.modalVisible}>
                        {this.modalContent()}
                    </Modal>

                </ScrollView>

                <ActionButton
                    buttonColor='#38908f'
                    renderIcon={() => <Ionicons name="md-create" size={25}color='black'/>}
                    size={56}
                    onPress={() => this.setState({ modalVisible: true })}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contentTitle: {
        fontSize: 18,
        paddingLeft: 20,
        paddingBottom: 6,
        marginBottom: 4,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        borderBottomColor: 'rgba(255,255,255,.4)',
        borderBottomWidth: 1,
        color : '#38908f'
    },
    reviewView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 8,
        borderBottomColor: 'rgba(255,255,255,.4)',
        borderTopColor: 'rgba(255,255,255,.4)',
        borderBottomWidth: 1,
        borderTopWidth: 1
    },
    modalClosePrev: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonClosePrev: {
        width: 50,
        height: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    summaryPlot: {
        fontSize: 12,
        flexWrap: 'wrap',
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 4,
        color:'white'
    },
    allModal: {
        backgroundColor: 'black',
        height: '100%'
    },
    modalChild: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        fontWeight: 'bold'
    },
    textInputTitle: {
        width: '100%',
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: 'rgba(255,255,255,.1)',
        borderRadius: 15
    },
    textModal: {
        color: 'white',
        fontSize: 25,
        fontFamily: 'Arial',
        marginBottom: 25
    },
    highlight: {
        width: 50,
        height: 50
    }
});