import React, {Component} from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import Router from './Router';
import {store, persistor} from './store/index';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={<View/>}>
                    <Router/>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
