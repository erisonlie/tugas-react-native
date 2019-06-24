import React from 'react'
import { View, Text, Image, ScrollView, FlatList, Dimensions, StyleSheet } from 'react-native'


export default class Instagram extends React.Component {
 
    constructor(props) {
        super(props)

        this.state = {
            feeds: [
                {
                    username: 'adam',
                    name: 'Adam',
                    avatar: require('./assets/images1/adam.jpg'),
                    post: {
                        image: require('./assets/images/spiderman-animated.jpg'),
                        caption: 'Nonton Spider-Man into the spider-verse',
                        width: 1,
                        height: 1
                    }
                },
                {
                    username: 'ben',
                    name: 'Ben',
                    avatar: require('./assets/images1/ben.png'),
                    post: {
                        image: require('./assets/images/shazam.jpg'),
                        caption: 'Film DCU terbaik !!',
                        width: 1,
                        height: 1
                    }
                },
                {
                    username: 'max',
                    name: 'Max',
                    avatar: require('./assets/images1/max.png'),
                    post: {
                        image: require('./assets/images/dragon.jpg'),
                        caption: 'Binge watching : Game of Thrones !!',
                        width: 1,
                        height: 1
                    }
                },
                {
                    username: 'perry',
                    name: 'Perry',
                    avatar: require('./assets/images1/perry.png'),
                    post: {
                        image: require('./assets/images/lion-king.jpg'),
                        caption: 'The Lion King is an upcoming American musical fantasy drama film directed by Jon Favreau and produced by Walt Disney Pictures.',
                        width: 1,
                        height: 1
                    }
                },
                {
                    username: 'mike',
                    name: 'Mike',
                    avatar: require('./assets/images1/mike.png'),
                    post: {
                        image: require('./assets/images/logo-mikroskil.png'),
                        caption: 'Belajar pengembangan aplikasi mobile di STMIK Mikroskil',
                        width: 1,
                        height: 1
                    }
                }
                
            ]
        }
    }

    resizeImageKeepAspectRatio = (event, index) => {
        let widthScreen = Dimensions.get('window').width
        let widthOrigin = event.nativeEvent.source.width
        let heightOrigin = event.nativeEvent.source.height
        let aspectRatio = widthOrigin / heightOrigin
        var items = this.state.feeds
        items[index].post.width = widthScreen
        items[index].post.height = widthScreen / aspectRatio
        this.setState({
            images: items
        })
    }

    render() {
        return (
            <ScrollView>
                <View style={{backgroundColor : '#fff', borderBottomColor : '#eee', borderBottomWidth : 1}}>
                    <FlatList
                        data={this.state.feeds}
                        horizontal
                        keyExtractor={(item, index)=> index.toString() }
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item, index})=>(
                            <View style={styles.story_container}>
                               
                                <Image source={item.avatar} style={styles.image_story} />
                                
                                <Text style={styles.username_story}>{item.username}</Text>
                            </View>
                        )}
                    />
                </View>

                {this.state.feeds.map((item, index) => (
                    <View key={index} style={styles.feeds}>
                        <View style={styles.header_feed}>
                          
                                <Image style={styles.avatar} source={item.avatar} />
                                <Text style={styles.username}>{item.username}</Text>
                           
                        </View>
                        <Image onLoad={(event) => this.resizeImageKeepAspectRatio(event, index)}
                            style={{ width: item.post.width, height: item.post.height }} source={item.post.image} />
                        <View style={styles.caption_container}>
                            <Text>
                                <Text style={styles.username}>{item.username}</Text>
                                <Text style={styles.caption}> {item.post.caption}</Text>
                            </Text>
                        </View>
                    </View>
                ))
                }
            </ScrollView>
        )
    }
}

var styles = StyleSheet.create({
    feeds: { paddingBottom: 20, backgroundColor : '#fff' },
    header_feed: {
        flexDirection: 'row', paddingVertical: 10, alignItems: 'center'
    },
    avatar: { width: 30, height: 30, borderRadius: 15, marginHorizontal: 10 },
    username: { fontSize: 13, fontWeight: 'bold', color : '#222' },
    caption_container : {
        padding : 10
    },
    caption : {
        color : '#222',
        fontSize : 13
    },
    story_container : {
        padding : 10,
        alignItems : 'center'
    },
    image_story : {
        height : 60,
        width : 60,
        borderRadius : 30,
        borderColor : 'orange',
        borderWidth : 2.5,
        backgroundColor : '#fff',
        padding : 2
    },
    username_story : {
        fontSize : 12
    }
})