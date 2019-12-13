import React from 'react';
import {View, Text, Image, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import {getSubCategory} from '../actions';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

class HomeCategoryListVertical extends React.Component {

    renderTopCategory() {
        return this.props.category.images.map((item, index) => {
            return (
                <TouchableWithoutFeedback
                    key={index} onPress={async () => {
                    await this.props.getSubCategory(item.reference_target);
                    setTimeout(() => {
                        this.props.navigation.navigate('subCategory', {
                            id: item.reference_target,
                        });
                    }, 200);

                }}>
                    <View key={index}
                          style={{flexDirection: 'column', margin: 5, alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{width: 100, height: 100}}>
                            <Image
                                style={{width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 10}}
                                source={{uri: item.img_url}}/>
                        </View>
                        <Text style={{fontFamily: 'IRANSansMobile', fontSize: 10, marginTop: 5}}>{item.title}</Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        });
    }

    render() {
        return (
            <View>
                <Text style={{
                    textAlign: 'center',
                    fontFamily: 'IRANSansMobile',
                    marginTop: 10,
                }}>{this.props.category['title']}</Text>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    flexWrap: 'wrap',
                    padding: 10,
                    justifyContent: 'center',
                }}>
                    {this.renderTopCategory()}
                </View>
            </View>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getSubCategory: (category_id) => dispatch(getSubCategory(category_id)),
    };
};

export default withNavigation(connect(null, mapDispatchToProps)(HomeCategoryListVertical));

const style = {
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
};
