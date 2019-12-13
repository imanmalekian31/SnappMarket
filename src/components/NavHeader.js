import React, {Component} from 'react';
import {Image, View, TouchableWithoutFeedback, TouchableOpacity, StatusBar} from 'react-native';
import {Body, Header, Text, Left, Right} from 'native-base';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';


class NavHeader extends Component {
    render() {
        const {onPress, rightIcon, leftIcon, navigation, screen, title} = this.props;
        return (
            <Header style={{backgroundColor: '#d1e5f8'}}>
                <StatusBar backgroundColor="#d1e5f8" barStyle="dark-content"/>
                <Left style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableWithoutFeedback onPress={onPress}>
                        <Icon name={rightIcon} size={30} color="gray"/>
                    </TouchableWithoutFeedback>
                </Left>
                <Right>
                    <TouchableWithoutFeedback onPress={onPress}>
                        <Icon name={leftIcon} size={30} color="gray"/>
                    </TouchableWithoutFeedback>
                </Right>
            </Header>
        );
    }
}

const mapStateToProps = (state) => {
    const {cart} = state.auth;
    return {
        cart,
    };
};

export default withNavigation(connect(mapStateToProps, null)(NavHeader));


const style = {
    menuIcon: {
        height: 20,
        width: 20,
        marginLeft: 10,
        transform: [{rotate: '180deg'}],
    },
    addressTitle: {
        fontFamily: 'IRANSansMobile',
        fontSize: 8,
        color: '#ff7cc5',
    },
    address: {
        fontFamily: 'IRANSansMobile',
        fontSize: 14,
        color: '#fff',
    },
    addressArrow: {
        height: 10,
        width: 10,
        marginLeft: 10,
        marginTop: 25,
    },
    mailIcon: {
        height: 23,
        width: 23,
        marginRight: 8,
    },
    digilogo: {
        width: 80,
        height: 40,
        resizeMode: 'contain',
        marginLeft: 20,
    },
    title: {
        fontFamily: 'IRANSansMobile',
        color: '#fff',
        marginLeft: 10,
    },
};
