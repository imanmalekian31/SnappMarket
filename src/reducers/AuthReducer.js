import {SET_DATA, SET_CATEGORY, SET_SUB_CATEGORY, SET_APP_SLIDERS} from '../actions/types';

const INITIAL_STATE = {
    data: [],
    banners: [],
    scroll_view_banner: [],
    category_list_vertical: [],
    wonderSellCart: null,
    home_category_list_horizontal: [],
    category: [],
    sub_category: [],
    app_sliders: [],
    offset: 0,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_DATA:
            state.data = action.products['items'];
            let data = state.data;
            state.banners = [];
            state.scroll_view_banner = [];
            state.category_list_vertical = [];
            state.home_category_list_horizontal = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i]['size'] === 'MEDIUM' && data[i]['type'] === 'campaign_banner') {
                    data[i]['images'].length === 1 ?
                        state.banners = [...state.banners, data[i]]
                        :
                        state.scroll_view_banner = [...state.scroll_view_banner, data[i]];
                } else if (data[i]['type'] === 'category_list_vertical') {
                    state.category_list_vertical = [...state.category_list_vertical, data[i]];
                } else if (data[i].hasOwnProperty('products')) {
                    state.home_category_list_horizontal = [...state.home_category_list_horizontal, data[i]];
                }
            }
            console.log(state.category_list_vertical);
            console.log(state.data);
            return {...state};
        case SET_APP_SLIDERS:
            if (action.offset === 0) {
                state.app_sliders = [];
                state.app_sliders = action.products.items[0];
            } else {
                console.log('reducer', action.products.items[0].products);
                state.app_sliders.products = [...state.app_sliders.products, ...action.products.items[0].products];
                state.app_sliders.is_last = action.products.items[0].is_last;
            }
            state.offset = action.offset + 1;
            console.log('reducer', state.app_sliders);
            return {...state};
        case SET_CATEGORY:
            state.category = [];
            state.category = action.products['items'];
            console.log(state.category);
            return {...state};
        case SET_SUB_CATEGORY:
            state.sub_category = [];
            state.sub_category = action.products;
            console.log(state.sub_category);
            return {...state};
        default:
            return state;
    }
};
