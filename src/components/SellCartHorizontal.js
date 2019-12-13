import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {addToCart, getRelatedProducts, deleteCart} from '../actions';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

class SellCartHorizontal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: this.props.item.countOrder,
        };
    }


    maxOfOrder() {
        alert('Ooooo...');
        this.setState({order: this.state.order - 1});
    };

    static formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };

    render() {
        const {order} = this.state;
        const {item, addToCart, orders, deleteCart, index} = this.props;
        return (
            <View style={{
                width: '100%',
                height: 120,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: '#fff',
                borderBottomWidth: 0.5,
            }}>
                <View style={{flex: 1}}>

                    {
                        item.images.length > 0 ?
                            <Image
                                style={{width: 80, height: 80, resizeMode: 'contain'}}
                                source={{uri: item.images[0].image}}
                            />
                            :

                            <Image
                                style={{width: 80, height: 80, resizeMode: 'contain'}}
                                source={{uri: 'https://snappfood.ir/bundles/bodofoodfrontend/images/vendor/placeholder-new.jpg'}}
                            />
                    }
                </View>
                <View style={{flex: 2, justifyContent: 'space-between', height: '100%'}}>
                    <Text style={{fontFamily: 'IRANSansMobile', margin: 5}}>{item.title}</Text>
                    <View style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        margin: 5,
                    }}>
                        <TouchableOpacity onPress={() => {
                            deleteCart(index);
                        }}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Icon name='delete' size={15} color='green'/>
                                <Text style={{fontFamily: 'IRANSansMobile', color: 'green'}}>حذف</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Icon name='refresh' size={15} color='green'/>
                            <Text style={{fontFamily: 'IRANSansMobile', color: 'green'}}>جایگزینی</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    flex: 2,
                    height: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    {
                        item.discount_percent > 0 ?
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                <Text style={{
                                    fontFamily: 'IRANSansNumber',
                                    textDecorationLine: 'line-through',
                                    color: 'gray',
                                    marginRight: 10,
                                }}>
                                    {SellCartHorizontal.formatNumber(item.price * order)} تومان
                                </Text>
                                <Text style={{fontFamily: 'IRANSansNumber'}}>
                                    {SellCartHorizontal.formatNumber(item.discounted_price * order)} تومان
                                </Text>
                            </View>
                            :
                            <Text style={{
                                fontFamily: 'IRANSansNumber',
                                textAlign: 'center',
                                marginTop: 10,
                            }}>
                                {SellCartHorizontal.formatNumber(item.price * order)} تومان
                            </Text>
                    }

                    {
                        order <= item.max_order_cap ?
                            <View style={style.btnChangeOrder}>
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
                            </View>
                            :
                            this.maxOfOrder()
                    }

                </View>
            </View>
        );
    }
}

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
        deleteCart: (index) => dispatch(deleteCart(index)),
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(SellCartHorizontal));

const style = {
    btnChangeOrder: {
        backgroundColor: '#fff',
        width: '80%',
        borderWidth: 0.5,
        borderColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
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
