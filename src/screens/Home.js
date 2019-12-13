import React, {Fragment} from 'react';
import {View, I18nManager, ScrollView} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import BannerScrollView from '../components/BannerScrollView';
import CategoryVertical from '../components/HomeCategoryListVertical';
import ScrollViewCategory from '../components/ScrollViewCategory';

class Home extends React.Component {

    componentWillMount() {
        I18nManager.forceRTL(true);
    }

    render() {
        return (
            <Fragment>
                <View style={style.body}>
                    <ScrollView>
                        <BannerScrollView banner={this.props.scroll_view_banner[0].images}/>
                        <BannerScrollView banner={this.props.banners[0].images}/>
                        <CategoryVertical category={this.props.category_list_vertical[0]}/>
                        <BannerScrollView banner={this.props.scroll_view_banner[1]['images']}/>
                        {/*<BannerScrollView banner={this.props.banners[1]['images']}/>*/}
                        {/*<BannerScrollView banner={this.props.scroll_view_banner[2]['images']}/>*/}
                        {/*<CategoryVertical category={this.props.category_list_vertical[1]}/>*/}
                        {/*<BannerScrollView banner={this.props.banners[2]['images']}/>*/}
                        {/*<BannerScrollView banner={this.props.banners[3]['images']}/>*/}
                        {/*<ScrollViewCategory title={this.props.home_category_list_horizontal[0].title}*/}
                        {/*                    category={this.props.home_category_list_horizontal[0].products}/>*/}
                        <ScrollViewCategory title={this.props.home_category_list_horizontal[5].title}
                                            category={this.props.home_category_list_horizontal[5].products}/>
                        {/*<BannerScrollView banner={this.props.banners[5]['images']}/>*/}
                        {/*<ScrollViewCategory category={this.props.home_category_list_horizontal[4]}/>*/}
                        {/*<ScrollViewCategory category={this.props.home_category_list_horizontal[5]}/>*/}
                        {/*<BannerScrollView banner={this.props.banners[6]['images']}/>*/}
                        {/*<ScrollViewCategory category={this.props.home_category_list_horizontal[6]}/>*/}
                        {/*<ScrollViewCategory category={this.props.home_category_list_horizontal[7]}/>*/}
                    </ScrollView>
                </View>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        banners,
        scroll_view_banner,
        category_list_vertical,
        home_category_list_horizontal,
    } = state.auth;
    return {
        banners,
        scroll_view_banner,
        category_list_vertical,
        home_category_list_horizontal,
    };
};

export default withNavigation(connect(mapStateToProps, null)(Home));


const style = {
    body: {
        backgroundColor: '#f7f7f7',
    },
};
