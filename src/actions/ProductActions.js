import {
    SET_RELATED_PRODUCTS,
    ADD_TO_CART,
    DELETE_CART,
} from './types';

export const addToCart = (orders, newOrder, countOrder) => {
    let found = false;
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id === newOrder.id) {
            orders[i] = {...newOrder, countOrder: countOrder};
            found = true;
        }
    }
    if (!found) {
        orders.push({...newOrder, countOrder: countOrder});
    }


    console.log('add order', orders);
    return {
        type: ADD_TO_CART,
        orders,
    };

};

export const setRelatedProducts = (products) => {
    return {
        type: SET_RELATED_PRODUCTS,
        products,
    };
};

export const deleteCart = (index) => {
    return {
        type: DELETE_CART,
        index,
    };
};


export const getRelatedProducts = (product_id) => {
    return (dispatch) => {
        dispatch({type: 'CONNECT'});
        fetch(`https://core.snapp.market/api/v1/vendors/0qyzdw/products/${product_id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(setRelatedProducts(responseJson));
            })
            .catch((error) => {
                alert(error);
            });
    };
};




