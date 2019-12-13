import {
    SET_DATA,
    SET_CATEGORY,
    SET_SUB_CATEGORY,
    SET_APP_SLIDERS,
} from './types';

export const setData = (products) => {
    return {
        type: SET_DATA,
        products,
    };
};

export const setAppSliders = (products, offset) => {
    return {
        type: SET_APP_SLIDERS,
        products,
        offset,
    };
};

export const setCategory = (products) => {
    return {
        type: SET_CATEGORY,
        products,
    };
};


export const setSubCategory = (products) => {
    return {
        type: SET_SUB_CATEGORY,
        products,
    };
};


export const getData = () => {
    return (dispatch) => {
        dispatch({type: 'CONNECT'});
        fetch('https://core.snapp.market/api/v1/vendors/0qyzdw/main', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(setData(responseJson));
            })
            .catch((error) => {
                alert(error);
            });
    };
};

export const getAppSliders = (slider_id, offset) => {
    return (dispatch) => {
        dispatch({type: 'CONNECT'});
        fetch(`https://core.snapp.market/api/v1/vendors/0qyzdw/app-sliders/${slider_id}?limit=24&offset=${offset}&sort=`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                dispatch(setAppSliders(responseJson, offset));
            })
            .catch((error) => {
                alert(error);
            });
    };
};

export const getCategory = () => {
    return (dispatch) => {
        dispatch({type: 'CONNECT'});
        fetch('https://core.snapp.market/api/v1/vendors/0qyzdw/categories?with_sub_categorie', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(setCategory(responseJson));
            })
            .catch((error) => {
                alert(error);
            });
    };
};

export const getSubCategory = (category_id) => {
    return (dispatch) => {
        dispatch({type: 'CONNECT'});
        fetch(`https://core.snapp.market/api/v1/vendors/0qyzdw/categories/${category_id}?limit=5&offset=0`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(setSubCategory(responseJson));
            })
            .catch((error) => {
                alert(error);
            });
    };
};






