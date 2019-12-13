import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/es/storage';

//reducers
import AuthReducer from './AuthReducer';
import ProductReducer from './ProductReducer';

export default combineReducers({
    auth: persistReducer({
        key: 'AuthReducer',
        storage,
    }, AuthReducer),
    product: persistReducer({
        key: 'ProductReducer',
        storage,
    }, ProductReducer),

    // auth : AuthReducer

});
