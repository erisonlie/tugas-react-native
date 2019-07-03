import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'
import BackEndAddress from './Terserah';
import { tsParenthesizedType } from '@babel/types';

export default class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showResult: 'searchDisplay',
            listfilms: []
        }
    }

    static navigationOptions = {
        header: null
    }

    searchResults(value) {
        if (value !== '') {
            fetch(`${BackEndAddress.ApalahArtiSebuahNama}/search/${value}`)
                .then(response => response.json())
                .then(res => {
                    if (!(res.length)) {
                        this.setState({ showResult: 'displayKosong' })
                    } else {
                        this.setState({ listfilms: res })
                    }
                })
                .catch(error => { console.warn(error) })
        }
    }

    dateFormatter(dateToFormat) {
        if (dateToFormat === '') {
            return ''
        } else {
            let dateFormatted = '';
            const d = new Date(dateToFormat);
            dateFormatted += d.getFullYear()
            return dateFormatted;
        }
    }

    changeSearchDisplay(value) {
        if (value === '') {
            this.setState({ showResult: 'searchDisplay' })
        } else {
            this.setState({ showResult: 'searchResult' })
            this.searchResults(value);
        }
    }

    render() {
        DataTampilan = () => {
            if (this.state.showResult === 'searchDisplay') {
                return (
                    <View style={styles.explanationContainer}>
                        <Text style={styles.headingText}>Search CinePedia</Text>
                        <Text style={styles.descriptionText}>Find your favorite movie, then read, write, and share your thoughts about it</Text>
                    </View>
                )
            } else if (this.state.showResult === 'displayKosong') {
                return (
                    <View style={styles.explanationContainer}>
                        <Text style={styles.headingText}>We're sorry...</Text>
                        <Text style={styles.descriptionText}>The movie you were looking for is not found. We're working hard to expanding our movies collection.</Text>
                        <Text style={styles.descriptionText}>Meanwhile, you can submit a request to us regarding the availability of certain titles through e-mail.</Text>
                    </View>
                )
            } else if (this.state.showResult === 'searchResult') {
                return (
                    <ScrollView>
                        {this.state.listfilms.map((item, index) => (
                            <TouchableOpacity key={index} style={{ flexDirection: 'row', padding: 15 }} onPress={() => this.props.navigation.push('DetailFilm', { id_movie: item.id_movie })}>
                                <Image source={{ uri: `${BackEndAddress.ApalahArtiSebuahNama}/images/` + item.poster }} style={{ height: 75, width: 50 }} />

                                <View style={{ marginLeft: 10, marginTop: 5 }}>
                                    <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>{item.title}</Text>
                                    <Text style={{ color: 'white', fontSize: 12 }}>{this.dateFormatter(item.release_date)}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Ionicons name="md-star" size={16} color='white' />
                                        <Text style={{ color: 'white', fontSize: 12, marginLeft: 5 }}>{item.overall_rating}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )
            }
        }

        return (
            <View style={styles.container}>
                <View style={styles.inputSearchContainer}>
                    <TextInput
                        style={styles.inputSearch}
                        placeholder="Search for movies"
                        returnKeyType="search"
                        placeholderTextColor="rgba(255,255,255,.6)"
                        selectionColor='#38908f'
                        onChangeText={value => this.changeSearchDisplay(value)}
                    />

                    <Ionicons style={{ flexDirection: 'column', flex: 1, marginRight: 5 }} name="md-search" size={20} color='#38908f' />
                </View>

                <DataTampilan />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputSearchContainer: {
        overflow: 'hidden',
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: 'rgba(255,255,255,.1)',
        borderRadius: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputSearch: {
        paddingLeft: 15,
        height: 40,
        width: '100%',
        fontSize: 14,
        flexDirection: 'column',
        flex: 9,
        color: 'white'
    },
    container: {
        backgroundColor: 'black',
        height: '100%'
    },
    headingText: {
        fontSize: 25,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 5
    },
    descriptionText: {
        fontSize: 13,
        fontFamily: 'Arial',
        color: 'white',
        textAlign: 'center'
    },
    explanationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 20
    }
})