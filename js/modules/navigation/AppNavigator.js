// @flow
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { NAVIGATION_ROOT_KEY } from '../../configureStore/navigation';
import { navigateBack } from './actions';

import HomeScreen from './screen/HomeScreen';
import SearchScreen from './screen/SearchScreen';
import ArticleDetailsScreen from './screen/ArticleDetailsScreen';

import type { State } from './reducer';
import type { Dispatch } from 'redux';

export const AppNavigator = StackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: null,
        },
    },
    Search: {
        screen: SearchScreen,
        navigationOptions: {
            header: null,
        },
    },
    ArticleDetails: {
        screen: ArticleDetailsScreen,
        navigationOptions: {
            header: null,
        },
    },
});

type Props = {
    dispatch: Dispatch,
    navigation: $PropertyType<State, 'navigation'>,
}

class AppWithNavigationState extends Component<Props> {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        const { dispatch, navigation } = this.props;
        if (navigation.index === 0) {
            return false;
        }
        dispatch(navigateBack());
        return true;
    };

    render() {
        const { dispatch, navigation } = this.props;
        const addListener = createReduxBoundAddListener(NAVIGATION_ROOT_KEY);
        return (
            <AppNavigator navigation={addNavigationHelpers({ dispatch, state: navigation, addListener })} />
        );
    }
}

const mapStateToProps = state => ({
    navigation: state.navigation,
});

export default connect(mapStateToProps)(AppWithNavigationState);
