import React, {Component} from 'react';
import {View, Dimensions, StatusBar} from 'react-native';
import {Badge} from 'react-native-elements';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import {
    createAppContainer,
    createSwitchNavigator, withNavigation,
} from 'react-navigation';

import Header from './components/NavHeader';
import SideBar from './components/SideBar';


//screens
import Home from './screens/Home';
import ShoppingList from './screens/ShoppingList';
import Search from './screens/Search';
import Category from './screens/Category';
import Cart from './screens/Cart';
import Start from './screens/Start';
import SellCartDetails from './screens/SellCartDetails';
import SubCategory from './screens/SubCategory';
import ProductList from './screens/ProductList';
import {addToCart, getRelatedProducts} from './actions';
import {connect} from 'react-redux';


const {height, width} = Dimensions.get('window');


class Router extends Component<Props> {
    render() {


        const mainTab = createBottomTabNavigator({
            home: createStackNavigator({
                mainHome: {
                    screen: Home,
                    navigationOptions: ({navigation}) => ({
                        header: (
                            <Header onPress={() => navigation.toggleDrawer()}
                                    rightIcon="menu"
                                    screen="Home"/>
                        ),
                    }),
                },
            }, {
                navigationOptions: {
                    tabBarLabel: 'خانه',
                    tabBarIcon: ({tintColor}) => (
                        <Icon name="home" size={25} color={tintColor}/>
                    ),
                },
            }),
            shoppingList: {
                screen: ShoppingList,
                navigationOptions: ({navigation}) => ({
                    header: (
                        <Header onPress={() => navigation.toggleDrawer()}
                                rightIcon="menu"
                                screen="Home"/>
                    ),
                    tabBarLabel: 'لیست خرید',
                    tabBarIcon: ({tintColor}) => (
                        <Icon name="format-list-bulleted" size={25} color={tintColor}/>
                    ),
                }),
            },
            search: {
                screen: Search,
                navigationOptions: ({navigation}) => ({
                    header: (
                        <Header onPress={() => navigation.toggleDrawer()}
                                rightIcon="menu"
                                screen="Home"/>
                    ),
                    tabBarLabel: 'جستوجو',
                    tabBarIcon: ({tintColor}) => (
                        <Icon name="magnify" size={25} color={tintColor}/>
                    ),
                }),
            },
            category: createStackNavigator({
                mainCategory: {
                    screen: Category,
                    navigationOptions: ({navigation}) => ({
                        header: null,
                    }),
                },
                subCategory: {
                    screen: SubCategory,
                    navigationOptions: ({navigation}) => ({
                        header: null,
                    }),
                },
            }, {
                navigationOptions: {
                    tabBarLabel: 'دسته بندی',
                    tabBarIcon: ({tintColor}) => (
                        <Icon name="apps" size={25} color={tintColor}/>
                    ),
                },
            }),
            cart: {
                screen: Cart,
                navigationOptions: ({navigation}) => ({
                    header: (
                        <Header onPress={() => navigation.toggleDrawer()}
                                rightIcon="menu"
                                screen="Home"/>
                    ),
                    tabBarLabel: 'سبد خرید',
                    tabBarIcon: ({tintColor}) => (
                        this.props.orders.length > 0 ?
                            <Badge value={this.props.orders.length} status="error"
                                   badgeStyle={{borderWidth: 3, borderColor: '#ff613b'}}
                            textStyle={{fontFamily:'IRANSansNumber'}}/>
                            :
                            <Icon name="cart-outline" size={25} color={tintColor}/>
                    ),
                }),
            },

        }, {
            navigationOptions: {
                header: null,
            },
            tabBarOptions: {
                activeTintColor: '#3e8cdd',
                labelStyle: {
                    fontFamily: 'IRANSansMobile',
                },
            },
        });

        const Navigator = createSwitchNavigator({
            startScreen: Start,
            mainSwitch: createDrawerNavigator({
                mainDrawer: createStackNavigator({
                    home: {screen: mainTab},
                    sellCartDetails: {screen: SellCartDetails},
                    productList: {
                        screen: ProductList,
                        navigationOptions: ({navigation}) => ({
                            headerTitleStyle: {fontFamily: 'IRANSansMobile'},
                            headerStyle: {
                                backgroundColor: '#f7f7f7',
                            },
                            title: navigation.state.params.title,
                        }),
                    },
                }, {
                    headerLayoutPreset: 'center',
                }),
            }, {
                contentComponent: SideBar,
                drawerPosition: 'right',
                drawerWidth: width,
                drawerType: 'slide',
                navigationOptions: {header: null},
            }),
        }, {
            navigationOptions: {header: null},
        });

        const NavigationApp = createAppContainer(Navigator);


        return (
            <View style={{flex: 1, backgroundColor: '#eeeeee'}}>
                <StatusBar translucent={false} backgroundColor="#d1e5f8" barStyle="dark-content"/>
                <NavigationApp/>
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


export default connect(mapStateToProps, null)(Router);
