import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image, Dimensions} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {getAppSliders} from '../actions';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

class BannerScrollView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderTitleImages() {
        let length = this.props.banner.length;
        return this.props.banner.map((item, index) => {
            return (
                <TouchableOpacity disabled={!item.is_clickable} activeOpacity={.7} key={index}
                                  style={[length === 1 ? style.oneBanner : style.multiBanner]}
                                  onPress={() => {
                                      this.props.getAppSliders(item.id, 0);
                                      setTimeout(() => {
                                          this.props.navigation.navigate('productList', {
                                              title: item.title,
                                          });
                                      }, 200);
                                  }}>
                    <Image source={{uri: item.img_url}}
                           style={{height: '100%', width: '100%', borderRadius: 15, resizeMode: 'contain'}}/>
                </TouchableOpacity>
            );
        });
    }

    render() {
        return (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {this.renderTitleImages()}
            </ScrollView>
        );
    }
}

const mapStateToProps = ({auth}) => {
    const {
        app_sliders,
    } = auth;
    return {
        app_sliders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAppSliders: (slider_id, offset) => dispatch(getAppSliders(slider_id, offset)),
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(BannerScrollView));


const style = {
    multiBanner: {
        width: 300,
        height: 150,
        margin: 10,
    },
    oneBanner: {
        width,
        height: 180,
        marginTop: 10,
        marginRight: 5,
    },
};
