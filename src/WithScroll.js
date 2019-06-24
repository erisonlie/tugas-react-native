import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';

export default class ViewScroll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mahasiswa : [
                'Jennifer Lawrence', 'Josh Hutcherson', 'Kent', 'Babi'
            ]
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList 
                    keyExtractor={(item, index)=> index.toString()}
                    data={this.state.mahasiswa}
                    renderItem={({item, index})=>(
                        <View
                            style={{padding: 10, borderBottomColor: 'red', borderBottomWidth: 1}}
                            key={index}
                        >
                            <Text>{item}</Text>
                        </View>
                    )}
                />
            </View>
        );
    }
};