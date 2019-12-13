import React, {Fragment} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import SellCart from './SellCart';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const ScrollViewCategory = (props) => {

    const renderWonderSellCart = () => {
        return props.category.map((item, index) => {
            if (item.images.length > 0) {
                return (
                    <TouchableOpacity key={index} onPress={() => {
                        props.navigation.navigate('sellCartDetails', {
                            product: item,
                        });
                    }}>
                        <SellCart key={index} item={item} image={item.images[0].image} {...item}/>
                    </TouchableOpacity>
                );
            } else {
                return (
                    <TouchableOpacity key={index} onPress={() => {
                        props.navigation.navigate('sellCartDetails', {
                            product: item,
                        });
                    }}>
                        <SellCart key={index} item={item} image='' {...item}/>
                    </TouchableOpacity>
                );
            }
        });
    };

    return (
        <Fragment>
            <View
                style={style.scrollViewBody}>
                <View style={style.scrollViewHeader}>
                    <Text style={{fontFamily: 'IRANSansMobile'}}>{props.title}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontFamily: 'IRANSansMobile', color: '#3e8cdd'}}>بیشتر</Text>
                        <Icon name="chevron-left" size={15} color="#3e8cdd"/>
                    </View>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                            contentContainerStyle={[{
                                backgroundColor: '#fff',
                            }, props.category.length < 3 ? {width: '100%'} : null]}>
                    {renderWonderSellCart()}
                </ScrollView>
            </View>
        </Fragment>
    );
};

export default withNavigation(connect(null, null)(ScrollViewCategory));

const style = {
    scrollViewBody: {
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'gray',
        marginTop: 10,
        marginBottom: 10,
    },
    scrollViewHeader: {
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
};

