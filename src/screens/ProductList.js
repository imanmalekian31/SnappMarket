import React, {useState} from 'react';
import {View, Text, RefreshControl, FlatList, StatusBar, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import SellCartType2 from '../components/SellCartType2';
import {getAppSliders} from '../actions';

class ProductList extends React.Component {


    state = {
        hasNext: !this.props.app_sliders.is_last,
        refreshing: false,
    };

    static renderItems(item) {
        if (item.images.length > 0) {
            return (
                <SellCartType2 item={item} image={item.images[0].image} {...item}/>
            );
        } else {
            return (
                <SellCartType2 item={item} image='' {...item}/>
            );
        }

    }

    loadMore() {
        console.log('end');
        const {getAppSliders, app_sliders, offset} = this.props;
        getAppSliders(app_sliders.id, offset);
        setTimeout(() => {
            // this.loadMore();
        }, 1000);
    }

    componentDidUpdate() {
        console.log('update');
    }


    render() {
        const {hasNext, refreshing} = this.state;
        const {getAppSliders, app_sliders} = this.props;
        return (
            <View style={style.body}>
                <StatusBar translucent={false} backgroundColor="#f7f7f7" barStyle="dark-content"/>
                <FlatList
                    data={app_sliders.products}
                    renderItem={(product) => ProductList.renderItems(product.item)}
                    keyExtractor={(item, index) => index}
                    numColumns={3}
                    columnWrapperStyle={{flexDirection: 'row'}}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => {
                                this.loadMore();
                                console.log('refresh');
                            }}
                            colors={['#6364D8', '#a7acb0', '#F99E07']}
                        />
                    }
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (hasNext) {
                            this.loadMore();
                        }
                    }}
                />
            </View>
        );
    }
}

const mapStateToProps = ({auth}) => {
    const {
        app_sliders,
        offset,
    } = auth;
    console.log('home', app_sliders);
    return {
        app_sliders,
        offset,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getAppSliders: (slider_id, offset) => dispatch(getAppSliders(slider_id, offset)),
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ProductList));


const style = {
    body: {
        flex: 1,
    },
};
