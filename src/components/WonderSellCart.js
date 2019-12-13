import React from 'react';
import {Image, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class WonderSellCart extends React.Component {
    render() {
        const {title, discount_percent, price, images, discounted_price} = this.props;
        return (
            <View style={{
                height: 230,
                width: 150,
                backgroundColor: '#fff',
                margin: 5,
                marginBottom: 10,
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                borderRadius: 5,
            }}>
                <View style={{
                    width: '98%',
                    height: 120,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image
                        style={{width: '100%', height: 100, resizeMode: 'contain'}}
                        source={{uri: images[0]['image']}}/>
                    <View style={{position: 'absolute', top: 10, right: 10}}>
                        <Icon name="plus-circle-outline" size={25} color="green"/>
                    </View>
                </View>
                <View style={{
                    width: '100%', height: 40,padding: 5
                }}>
                    <Text style={{fontFamily: 'IRANSansMobile', fontSize: 12, color: '#444d56'}}>{title}</Text>
                </View>
                <View style={{width: '100%', height: 50}}>
                    <View style={{width: '100%' , padding: 5}}>
                        <Text style={{fontFamily: 'IRANSansBold'}}>{discounted_price} تومان</Text>
                    </View>
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontFamily: 'IRANSansNumber',
                            textDecoration: 'line-through',
                            color: '#444d56',
                        }}>{discounted_price}</Text>
                        <Text style={{
                            fontFamily: 'IRANSansNumber',
                            textDecoration: 'line-through',
                            backgroundColor: '#e7442f',
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 10,
                            paddingRight: 10,
                            paddingLeft: 10,
                            color: '#fff',
                        }}>{discount_percent}% تخفیف</Text>
                    </View>
                </View>
            </View>
        );
    }

}
