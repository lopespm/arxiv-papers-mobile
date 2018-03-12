// @flow
import React, { Component } from 'react';
import { View, Linking, Alert } from 'react-native';
import { Container, Header } from 'native-base';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { connect } from 'react-redux';
import { reportNonFatal } from '../../../shared/errorReporter';

import { purchaseTea } from '../../../donations/actions';
import { navigateToSearch, navigateToDetails } from '../../actions';

import DownloadedArticles from '../../../articles/component/container/DownloadArticles';
import RecentArticles from '../../../articles/component/container/RecentArticles';
import SearchBar from '../../../shared/component/presentational/SearchBar';
import Overlay from '../../../shared/component/presentational/Overlay';
import ToolbarDropdown from '../../../shared/component/presentational/ToolbarDropdown';
import splashScreen from '../../../shared/native/splashScreen';

import { getIsTeaPurchased } from '../../../../selector';

import styles from './styles';

import type { NavigationState } from 'react-native-tab-view/src/TabViewTypeDefinitions';
import type { Action as DonationsAction } from '../../../donations/actions';
import type { Action as NavigationAction } from '../../actions';
import type { Article } from '../../../articles/article';

type Props = {
    +currentRoute: any,
    +purchaseTea: () => DonationsAction,
    +isTeaPurchased: boolean,
    +navigateToSearch: (article: Article) => NavigationAction,
    +navigateToDetails: (article: Article) => NavigationAction,
}

type State = {
    tabNavigation: NavigationState<*>,
    overlayIsVisible: boolean,
}

class HomeScreen extends Component<Props, State> {
    state = {
        tabNavigation: {
            index: 0,
            routes: [
                { key: 'recent', title: 'NEW' },
                { key: 'downloaded', title: 'DOWNLOADED' },
            ],
        },
        overlayIsVisible: false,
    };

    componentDidMount() {
        setTimeout(() => splashScreen.hide(), 1000);
    }

    componentWillReceiveProps(nextProps) {
        const wasScreenFocused = this.props.currentRoute.routeName === 'Home';
        const isScreenFocused = nextProps.currentRoute.routeName === 'Home';

        if (isScreenFocused && !wasScreenFocused) {
            this.screenDidFocus();
        }
    }

    searchBarRef: SearchBar;

    screenDidFocus = () => {
        this.searchBarRef.setText('');
    }

    searchBarBlur = () => {
        this.searchBarRef.blur();
    }

    showTeaDonationDialog = () => {
        Alert.alert(
            'Buy developer (Pedro) a cup of tea?',
            'Enjoyed the application and would like to show your support?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Yes', onPress: this.props.purchaseTea },
            ],
            { cancelable: true },
        );
    }

    openSourceCodePage = () => {
        Linking.openURL('https://github.com/lopespm/arxiv-papers-mobile')
            .catch(err => reportNonFatal('An error occurred when opening source code page', err));
    }

    handleTabIndexChange = index => this.setState({ tabNavigation: { ...this.state.tabNavigation, index } });

    renderTabs = SceneMap({
        recent: () => <RecentArticles onItemPressed={(article) => { this.props.navigateToDetails(article.id); }} />,
        downloaded: () => <DownloadedArticles onItemPressed={(article) => { this.props.navigateToDetails(article.id); }} />,
    });

    render() {
        const dropDownTeaDonationItem =
            this.props.isTeaPurchased ?
                { label: 'Thank you :)', onPress: () => {} } :
                { label: 'Buy Dev a Tea', onPress: this.showTeaDonationDialog };

        return (
            <Container testID="homeScreen">
                <Header searchBar hasTabs regular style={styles.header} />
                <TabViewAnimated
                    navigationState={this.state.tabNavigation}
                    renderScene={this.renderTabs}
                    renderHeader={props =>
                        <View style={styles.tabBarContainer}>
                            <TabBar {...props} style={styles.tabBar} tabStyle={styles.tabItem} labelStyle={styles.tabLabel} indicatorStyle={styles.tabIndicator} />
                        </View>
                    }
                    onIndexChange={this.handleTabIndexChange}
                />
                <Overlay visible={this.state.overlayIsVisible} onTouchStart={this.searchBarBlur} />
                <View style={styles.searchBar}>
                    <SearchBar
                        onSubmitEditing={event => this.props.navigateToSearch(event.nativeEvent.text)}
                        onFocus={() => this.setState({ ...this.state, overlayIsVisible: true })}
                        onBlur={() => this.setState({ overlayIsVisible: false })}
                        placeholder="Search Arxiv"
                        inputStyle={styles.searchBarInput}
                        ref={(c) => { this.searchBarRef = c; }}
                        inputProps={{ testID: 'homeSearchInput' }}
                        menuComponent={<ToolbarDropdown items={
                            [{ label: 'Source Code on GitHub', onPress: this.openSourceCodePage }, dropDownTeaDonationItem]}
                        />}
                    />
                </View>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const currentRoute = state.navigation.routes[state.navigation.index];
    return {
        currentRoute,
        isTeaPurchased: getIsTeaPurchased(state),
    };
};

const mapDispatchToProps = {
    purchaseTea,
    navigateToSearch,
    navigateToDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
