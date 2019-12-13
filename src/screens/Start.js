import React from 'react';
import {View, Image, ActivityIndicator, StatusBar} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {getCategory, getData} from '../actions';

class Start extends React.Component {
    async componentDidMount() {
        await this.props.getData();
        await this.props.getCategory();
        setTimeout(() => {
            this.props.navigation.navigate('mainSwitch');
        }, 1000);
    }

    render() {
        return (
            <View style={style.body}>
                <StatusBar translucent={false} backgroundColor="#eeeeee" barStyle="dark-content"/>
                <Image source={require('../assets/image/logo.png')}
                       style={{width: 200, height: 150, resizeMode: 'contain'}}/>
                <ActivityIndicator/>
            </View>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getData: () => dispatch(getData()),
        getCategory: () => dispatch(getCategory()),
    };
};

export default withNavigation(connect(null, mapDispatchToProps)(Start));


const style = {
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
};
