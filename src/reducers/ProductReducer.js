import {ADD_TO_CART, DELETE_CART, SET_RELATED_PRODUCTS} from '../actions/types';

const INITIAL_STATE = {
    related: [],
    suggestion: [],
    orders: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_RELATED_PRODUCTS:
            console.log(action.products);
            state.related = action.products.related;
            state.suggestion = action.products.suggestion;
            return {...state};
        case ADD_TO_CART:
            state.orders = action.orders;
            console.log('reducer order', action.orders);
            return {...state};
        case DELETE_CART:
            // const i = action.index;
            // state.orders = state.orders.slice(0, i).concat(state.orders.slice(i, state.orders.length));
            state.orders.splice(action.index, 1);
            return {...state};
        default:
            return state;
    }
};
