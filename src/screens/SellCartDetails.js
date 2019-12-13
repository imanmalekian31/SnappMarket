import React, {useState} from 'react';
import {View, Text, Image, ScrollView, StatusBar, TouchableOpacity, AsyncStorage} from 'react-native';
import ScrollViewCategory from '../components/ScrollViewCategory';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {addToCart, getRelatedProducts} from '../actions';


const SellCartDetails = (props) => {

    const [order, setOrder] = useState(props.navigation.getParam('order', 0));
    const [finalOrders, setFinalOrders] = useState(props.navigation.getParam('order', 0));

    const formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };

    const {navigation, related, suggestion, addToCart, orders} = props;
    const product = navigation.getParam('product');
    console.log('sellDetails', order);
    return (
        <View style={style.body}>
            <StatusBar translucent={false} backgroundColor="#d1e5f8" barStyle="dark-content"/>
            <ScrollView>
                <View style={style.detailsBody}>
                    <View>
                        <Image style={{width: 150, height: 150}} source={{uri: product['images'][0].image}}/>
                    </View>
                    <View style={{width: 300}}>
                        <Text style={style.detailsTitle}>{product.title}</Text>
                    </View>
                    <View style={style.detailsCostBody}>
                        <Text
                            style={[style.detailsCostText, product.discount_percent > 0 ? {color: 'green'} : {color: 'gray'}]}>
                            {formatNumber(product['discounted_price'])} تومان
                        </Text>
                        {
                            product.discount_percent > 0 ?
                                <Text
                                    style={style.detailsDiscountCostText}>
                                    {formatNumber(product['price'])} تومان
                                </Text>
                                : null
                        }
                    </View>
                    {
                        product.discount_percent > 0 ?
                            <View style={{marginTop: 10}}>
                                <Text
                                    style={[{fontFamily: 'IRANSansNumber'}, product.discount_percent < 20 ? {color: 'green'} : {color: 'red'}]}>{product.discount_percent}%
                                    تخفیف</Text>
                            </View>
                            : null
                    }
                </View>
                {related.length !== 0 ? <ScrollViewCategory title='محصولات مشابه' category={related}/> : null}
                {suggestion.length !== 0 ? <ScrollViewCategory title='محصولات پیشنهادی' category={suggestion}/> : null}
            </ScrollView>
            <View
                style={style.changeOrderBody}>
                {
                    order > 0 ?
                        <View style={style.btnChangeOrder}>
                            <TouchableOpacity onPress={() => {
                                setOrder(order + 1);
                                addToCart(orders, product, order + 1);
                            }} style={style.btnDIncrement}>
                                <Text style={style.btnDIText}>+</Text>
                            </TouchableOpacity>
                            <View style={style.textOrderBody}>
                                <Text style={style.textOrder}>{order}</Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                                setOrder(order - 1);
                                addToCart(orders, product, order - 1);
                            }} style={style.btnDIncrement}>
                                <Text style={style.btnDIText}>-</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        null
                }
                <TouchableOpacity onPress={() => {
                    order === 0 ? setOrder(order + 1) : setFinalOrders(finalOrders + 1);
                    finalOrders < order ? setFinalOrders(finalOrders + (order - finalOrders)) : setFinalOrders(finalOrders - (order - finalOrders));
                    addToCart(orders, product, order + 1);
                    console.log(order, finalOrders);
                }}
                                  style={[style.btnAdd, order > 0 ? (order === finalOrders ? {
                                      width: '40%',
                                  } : {width: '40%'}) : {width: '90%'}]}>
                    <Text style={style.btnText}>
                        {
                            order > 0 ? (order === finalOrders ? 'افزوده شده' : 'تغییر تعداد') : 'افزودن به سبد خرید'
                        }
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const mapStateToProps = ({product}) => {
    const {
        related,
        suggestion,
        orders,
    } = product;
    return {
        related,
        suggestion,
        orders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (orders, newOrder, countOrder) => dispatch(addToCart(orders, newOrder, countOrder)),
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(SellCartDetails));


const style = {
    body: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    detailsBody: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderBottomWidth: 0.2,
        borderColor: 'gray',
    },
    detailsTitle: {
        fontFamily: 'IRANSansBold',
        textAlign: 'center',
        fontSize: 18,
    },
    detailsCostBody: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    detailsCostText: {
        fontFamily: 'IRANSansBold',
        fontSize: 16,
    },
    detailsDiscountCostText: {
        fontFamily: 'IRANSansBold',
        textDecorationLine: 'line-through',
        color: 'gray',
        marginLeft: 10,
    },
    changeOrderBody: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderTopWidth: 0.5,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    btnAdd: {
        backgroundColor: '#42b029',
        borderRadius: 5,
        padding: 5,
    },
    btnText: {
        fontFamily: 'IRANSansMobile',
        color: '#fff',
        textAlign: 'center',
    },
    btnChangeOrder: {
        width: '40%',
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
