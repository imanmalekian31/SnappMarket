import React from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {getCategory, getSubCategory} from '../actions';


class Category extends React.Component {
    async componentDidMount() {
        // await this.props.getCategory();
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{backgroundColor: '#ececee'}}>
                <View style={style.body}>
                    {this.props.category.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={async () => {
                                await this.props.getSubCategory(item.id);
                                setTimeout(() => {
                                    this.props.navigation.navigate('subCategory', {
                                        id: item.id,
                                    });
                                }, 0);

                            }}
                                              style={style.categoryBody}>
                                <Text style={style.categoryTitle}>{item.title}</Text>
                                <Image source={{uri: item.image}} style={{width: 60, height: 60}}/>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        category,
    } = state.auth;
    return {
        category,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSubCategory: (category_id) => dispatch(getSubCategory(category_id)),
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Category));

const style = {
    body: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    categoryBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '45%',
        margin: 7,
        padding: 10,
        height: 70,
        borderRadius: 5,
    },
    categoryTitle: {
        fontFamily: 'IRANSansMobile',
        fontSize: 11,
        width: 60,
    },
};
