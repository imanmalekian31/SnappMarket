import React, {Component} from 'react';
import {
    View,
    Image,
    SafeAreaView,
    Text,
    ScrollView,
    TouchableWithoutFeedback, StatusBar,
} from 'react-native';
import SideBarItem from './SideBarItem';
import LinearGradient from 'react-native-linear-gradient/index';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class SideBar extends Component {

    render() {
        return (
            <LinearGradient colors={['#0a5491', '#4fb9e1']} style={{flex: 1}}>
                <SafeAreaView style={{flex: 1}} forceInset={{top: 'always', horizontal: 'never'}}>
                    <View style={style.header}>
                        <TouchableWithoutFeedback onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Icon name="chevron-right" size={20} color="#fff" style={{textAlign: 'left'}}/>
                        </TouchableWithoutFeedback>
                        <Text style={{fontFamily: 'IRANSansNumber', color: '#fff', fontSize: 25, marginTop: 20}}>ایمان
                            ملکیان</Text>
                        <Text style={{fontFamily: 'IRANSansNumber', color: '#fff', fontSize: 20}}>0 تومان</Text>
                    </View>
                    <ScrollView>
                        <SideBarItem name={'سفارش‌های پیشین'} routeName={'iman'} key={'home'} icon={'history'}/>
                        <SideBarItem name={'لیست خرید'} nav={'home'} icon={'format-list-bulleted'}/>
                        <SideBarItem name={'دسته‌بندی‌ها'} nav={'home'} icon={'apps'}/>
                        <SideBarItem name={'انتخاب آدرس'} nav={'home'} icon={'store'}/>
                        <SideBarItem name={'افزایش اعتبار'} nav={'home'} icon={'wallet'}/>
                        <SideBarItem name={'پیام ها'} nav={'home'} icon={'email'}/>
                        <SideBarItem name={'پشتیبانی'} nav={'home'} icon={'phone-in-talk'}/>
                        <SideBarItem name={'خروج'} nav={'home'} icon={'logout'}/>
                    </ScrollView>
                </SafeAreaView>
            </LinearGradient>

        );
    }
}

const style = {
    backgroundImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'repeat',
    },
    goBackArrow: {
        width: 20,
        height: 20,
        transform: [{rotate: '180deg'}],
        position: 'absolute',
        top: 10,
        left: 10,
    },
    header: {
        // backgroundColor: 'gray',
        marginTop: 25,
        height: '25%',
        width: '100%',
        padding: 20,
    },
    headerBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.3,
    },
    headerName: {
        backgroundColor: '#ef394f',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderTopRightRadius: 0,
        width: 100,
        padding: 5,
        position: 'absolute',
        top: 30,
        left: 100,
    },
};
