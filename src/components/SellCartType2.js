import React, {useState} from 'react';
import {Image, Text, View, TouchableWithoutFeedback, ActivityIndicator, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {addToCart, getRelatedProducts} from '../actions';


class SellCartType2 extends React.Component {

    state = {
        order: 0,
    };

    static formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };

    addOrder() {
        const {order} = this.state;
        const {addToCart, orders, item} = this.props;
        addToCart(orders, item, order);
    };

    maxOfOrder() {
        alert('Ooooo...');
        this.setState({order: this.state.order - 1});
    };


    render() {
        const {order} = this.state;
        const {
            orders,
            title,
            discount_percent,
            image,
            item,
            id,
            price,
            discounted_price,
            getRelatedProducts,
            max_order_cap,
            addToCart,
        } = this.props;
        return (
            <TouchableWithoutFeedback onPress={() => {
                getRelatedProducts(item.id);
                setTimeout(() => {
                    this.props.navigation.navigate('sellCartDetails', {
                        product: item,
                        order: order,
                    });
                }, 1000);
            }}>
                <View style={style.cartBody}>
                    <View style={{
                        width: '98%',
                        height: 120,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {
                            image === '' ?
                                <Image
                                    style={{width: '100%', height: 100, resizeMode: 'contain'}}
                                    source={{uri: 'https://snappfood.ir/bundles/bodofoodfrontend/images/vendor/placeholder-new.jpg'}}
                                />
                                :
                                <Image
                                    style={{width: '100%', height: 100, resizeMode: 'contain'}}
                                    source={{uri: image}}
                                />
                        }

                        <View style={{position: 'absolute', top: 10, right: 10, width: '90%'}}>
                            {
                                order > 0 ? ((order <= max_order_cap) ? (<View style={style.btnChangeOrder}>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({order: order + 1});
                                            addToCart(orders, item, order + 1);
                                        }} style={style.btnDIncrement}>
                                            <Text style={style.btnDIText}>+</Text>
                                        </TouchableOpacity>
                                        <View style={style.textOrderBody}>
                                            <Text style={style.textOrder}>{order}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({order: order - 1});
                                            addToCart(orders, item, order - 1);
                                        }} style={style.btnDIncrement}>
                                            <Text style={style.btnDIText}>-</Text>
                                        </TouchableOpacity>
                                    </View>) : this.maxOfOrder())
                                    :
                                    <TouchableWithoutFeedback onPress={() => {
                                        this.setState({order: order + 1});
                                        addToCart(orders, item, order + 1);
                                    }}>
                                        <Icon name="plus-circle-outline" size={25} color="green"/>
                                    </TouchableWithoutFeedback>
                            }
                        </View>
                        {discount_percent !== 0 ?
                            <View style={{position: 'absolute', bottom: 10, left: 10}}>
                                <Text
                                    style={[style.discountPercent, discount_percent < 20 ? {backgroundColor: 'green'} : {backgroundColor: '#e7442f'}]}>{discount_percent}%
                                    تخفیف</Text>
                            </View>
                            : null}

                    </View>
                    <View style={{
                        width: '100%',
                        height: 25,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: 3,

                    }}>
                        <Text
                            style={{fontFamily: 'IRANSansBold'}}>{SellCartType2.formatNumber(discounted_price)} تومان</Text>
                        {discount_percent !== 0 ?
                            <Text style={{
                                fontFamily: 'IRANSansNumber',
                                textDecorationLine: 'line-through',
                                color: 'gray',
                                fontSize: 12,
                                marginLeft: 5,
                            }}>{SellCartType2.formatNumber(price)}</Text>
                            : null}
                    </View>
                    <View style={{
                        width: '100%', height: 50, padding: 5,
                    }}>
                        <Text style={{fontFamily: 'IRANSansMobile', fontSize: 11, color: '#444d56'}}>{title}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        );
    }
};

const mapStateToProps = (state) => {
    const {
        orders,
    } = state.product;
    return {
        orders,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        getRelatedProducts: (product_id) => dispatch(getRelatedProducts(product_id)),
        addToCart: (orders, newOrder, countOrder) => dispatch(addToCart(orders, newOrder, countOrder)),
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(SellCartType2));

const style = {
    discountPercent: {
        fontFamily: 'IRANSansNumber',
        backgroundColor: '#e7442f',
        borderRadius: 5,
        paddingRight: 5,
        paddingLeft: 5,
        color: '#fff',
        fontSize: 12,
    },
    cartBody: {
        height: 200,
        width: '33.33333%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderWidth: 0.5,
        borderColor: '#dddddd',
    },
    btnChangeOrder: {
        backgroundColor: '#fff',
        width: '100%',
        borderWidth: 0.5,
        borderColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 5,
    },
    btnDIncrement: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnDIText: {
        color: '#42b029',
        fontSize: 25,
        textAlign: 'center',
    },
    textOrderBody: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 0.5,
        borderLeftWidth: 0.5,
        borderColor: '#ccc',
    },
    textOrder: {
        fontFamily: 'IRANSansNumber',
        color: '#000',
        textAlign: 'center',
    },
};


