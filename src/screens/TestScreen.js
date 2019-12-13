import React from 'react';
import {View, Text} from 'react-native';

export default class TestScreen extends React.Component {
    render() {
        return (
            <View style={style.body}>
                <Text>TestScreen</Text>
            </View>
        );
    }
}


const style = {
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
};
