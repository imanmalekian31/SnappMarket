import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Dimensions} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {getSubCategory} from '../actions';
import ScrollViewCategory from '../components/ScrollViewCategory';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

let height = Dimensions.get('window').height;
var SCREEN_HEIGHT = height + 50;
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;


class SubCategory extends React.Component {

    componentDidMount() {
        const itemId = this.props.navigation.getParam('id');
        // this.props.getSubCategory(itemId);
    }

    renderSubCategory() {
        return this.props.sub_category.items.map((category, index) => {
            return (
                <ScrollViewCategory key={index} title={category.title} category={category.products}/>
            );
        });
    }

    renderNavBar = () => (
        <View style={styles.navContainer}>
            <View style={styles.statusBar}/>
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.iconLeft} onPress={() => {
                    this.props.navigation.goBack();
                }}>
                    <Icon name="arrow-right" size={25} color="#fff"/>
                </TouchableOpacity>

                <Text style={styles.headerTitleText}>{this.props.sub_category['category'].title}</Text>

                <TouchableOpacity style={styles.iconRight} onPress={() => {
                }}>
                </TouchableOpacity>
            </View>
        </View>
    );

    renderContent = () => (
        <ScrollView contentContainerStyle={{backgroundColor: '#f7f7f7'}}>
            {this.renderSubCategory()}
        </ScrollView>
    );

    renderTags = () => (
        <View style={{
            backgroundColor: '#fff',
            width: '100%',
            height: 50,
            position: 'absolute',
            bottom: 0,
            borderBottomWidth: 0.2,
        }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{alignItems: 'center'}}>
                {
                    this.props.sub_category.items.map((category, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => {
                                this.props.getSubCategory(category.id);
                            }} style={styles.tagBody}>
                                <Text style={styles.tagText}>{category.title}</Text>
                            </TouchableOpacity>
                        );
                    })
                }
            </ScrollView>
        </View>
    );


    render() {
        const {cover} = this.props.sub_category['category'];
        return (
            <View style={styles.container}>
                <ReactNativeParallaxHeader
                    headerMinHeight={100}
                    headerMaxHeight={200}
                    extraScrollHeight={20}
                    navbarColor="#fff"
                    title=""
                    titleStyle={styles.titleStyle}
                    backgroundImage={{uri: cover}}
                    backgroundImageScale={-2}
                    renderNavBar={this.renderNavBar}
                    renderContent={this.renderContent}
                    renderSubTags={this.renderTags}
                    containerStyle={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    innerContainerStyle={styles.container}
                    scrollViewProps={{
                        // onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
                        // onScrollEndDrag: () => console.log('onScrollEndDrag'),
                    }}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const {sub_category} = state.auth;
    return {sub_category};
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSubCategory: (category_id) => dispatch(getSubCategory(category_id)),
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(SubCategory));

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
    },
    navContainer: {
        height: HEADER_HEIGHT + 50,
        marginHorizontal: 10,
    },
    statusBar: {
        height: STATUS_BAR_HEIGHT,
        backgroundColor: 'transparent',
    },
    navBar: {
        height: NAV_BAR_HEIGHT,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    titleStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    tagBody: {
        borderWidth: 0.3,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        height: 30,
        marginLeft: 5,
        marginRight: 5,
    },
    tagText: {
        fontFamily: 'IRANSansMobile',
        color: '#3e8cdd',
        marginRight: 8,
        marginLeft: 8,
    },
    headerTitleText: {
        fontFamily: 'IRANSansBold',
        color: '#fff',
        fontSize: 25,
    },
});
