import React, {Component} from 'react';
import {Image, StyleSheet, TouchableWithoutFeedback, Text, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


class SideBarItem extends Component {

    render() {
        const {name, nav, icon, type, page, routeName, key} = this.props;
        return (
            <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate({
                    routeName: routeName,
                    params:
                        {
                            title: type,
                            page: page,
                        },
                    key: routeName,
                })}>
                <View style={styles.rowItem}>
                    <Icon name={icon} size={22} color="white" style={{marginLeft: 10}}/>
                    <Text style={styles.rowText}>{name}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default withNavigation(SideBarItem);

const styles = StyleSheet.create({
    rowItem: {
        width: '100%',
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 10,
    },
    rowIcon: {
        flex: 2,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    rowText: {
        fontFamily: 'IRANSansMobile',
        fontSize: 15,
        flex: 8,
        color: '#fff',
        paddingRight: 35,
    },
});
