// @flow
import React, { Component } from 'react';
import { NetInfo } from 'react-native';
import 'rxjs'; // Make all the operators available globally
import EStyleSheet from 'react-native-extended-stylesheet';
import { StyleProvider } from 'native-base';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Snackbar from './modules/snackbar/component/Snackbar';

import AppWithNavigationState from './modules/navigation/AppNavigator';
import configureStore from './configureStore';
import getTheme from './theme/components';
import themeProperties from './theme/attributes';

import { connectionOffline, connectionOnline } from './modules/connection/actions';

import type { Persistor } from 'redux-persist/lib/types';
import type { Store } from 'redux';

type State = {
    +store: Store,
    +persistor: Persistor,
}

export default class App<T> extends Component<T, State> {
    constructor(props: T) {
        super(props);
        EStyleSheet.build();
        const { store, persistor } = configureStore();
        this.state = { store, persistor };
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    async onBeforePersistGateLift() {
        const isConnected = await NetInfo.isConnected.fetch();
        this.handleConnectivityChange(isConnected);
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = (isConnected: boolean) => {
        const { dispatch } = this.state.store;
        if (isConnected) { dispatch(connectionOnline()); } else { dispatch(connectionOffline()); }
    }

    render() {
        return (
            <StyleProvider style={getTheme(themeProperties)}>
                <Provider store={this.state.store}>
                    <PersistGate persistor={this.state.persistor} onBeforeLift={this.onBeforePersistGateLift.bind(this)}>
                        <AppWithNavigationState />
                        <Snackbar />
                    </PersistGate>
                </Provider>
            </StyleProvider>
        );
    }
}
