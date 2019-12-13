import React from 'react';
import {View, ScrollView, Text, StatusBar} from 'react-native';
import {addToCart, getRelatedProducts} from '../actions';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import SellCartHorizontal from '../components/SellCartHorizontal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


class Cart extends React.Component {

    static formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };

    renderCart() {
        return this.props.orders.map((item, index) => {
            return (
                <SellCartHorizontal key={index} item={item} index={index}/>
            );
        });
    }

    componentDidMount() {
        this.forceUpdate();
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('prev', prevProps);
    }

    calculation(orders) {
        let sum = 0;
        orders.map((item) => {
            sum += (item.price - item.discounted_price) * item.countOrder;
        });
        return Cart.formatNumber(sum);

    }

    render() {
        const {orders} = this.props;
        return (
            <View style={style.body}>
                <StatusBar translucent={false} backgroundColor="#d1e5f8" barStyle="dark-content"/>
                <View style={{
                    height: 40,
                    width: '100%',
                    backgroundColor: '#407db6',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 5,
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon name='sale' color='#FFF' size={20}/>
                        <Text style={{fontFamily: 'IRANSansMobile', color: '#FFF', marginLeft: 10}}>سود شما از
                            خرید</Text>
                    </View>
                    <Text
                        style={{fontFamily: 'IRANSansNumber', color: '#FFF', marginLeft: 10}}>
                        {this.calculation(orders)} تومان
                    </Text>
                </View>
                <ScrollView>
                    {this.renderCart()}
                </ScrollView>
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
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Cart));


const style = {
    body: {
        flex: 1,
    },
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
