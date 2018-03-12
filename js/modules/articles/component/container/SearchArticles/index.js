// @flow
import React, { Component } from 'react';
import { Card, Container } from 'native-base';
import OffscreenToolbar from 'react-native-offscreen-toolbar';
import { connect } from 'react-redux';
import { trim, isEmpty } from 'lodash';
import moment from 'moment/moment';
import styles from './styles';

import { searchArticles, clearSearchArticles } from '../../../actions';

import SearchBar from '../../../../shared/component/presentational/SearchBar';
import Overlay from '../../../../shared/component/presentational/Overlay';
import EmptyView from '../../../../shared/component/presentational/EmptyView';
import ListArticles from '../../presentational/ListArticles';
import { ListItemCard } from '../../../../shared/component/presentational/ListItem';

import { provideArticlesTo } from '../../../../../selector';
import { getSearchArticlesFetchError, getSearchQuery, getSearchArticles, getIsFetchingSearchArticles} from '../../../selector';

import type { ArticleId } from '../../../article';
import type { Action } from '../../../actions';

type Props = {
    +bootstrapQuery: string,
    +query: string,
    +searchResults: Array<Article>,
    +isFetching: boolean,
    +errorGeneric: boolean,
    +errorNoNetwork: boolean,
    +searchArticles: (query: string) => Action,
    +clearSearchArticles: () => Action,
    +onBackPressed: () => mixed,
    +onItemPressed: (articleId: ArticleId) => mixed,
};

type State = {
    overlayIsVisible: boolean,
};

class SearchScreen extends Component<Props, State> {
    state = { overlayIsVisible: false };

    componentWillMount() {
        this.fetchNewSearch(this.props.bootstrapQuery);
    }

    componentWillReceiveProps(nextProps) {
        this.searchBarRef.setText(nextProps.query);
    }

    searchBarRef: SearchBar;

    fetchNewSearch = (query) => {
        this.props.clearSearchArticles();
        this.searchIfQueryNotBlank(query);
    }

    fetchNextPage = () => {
        this.searchIfQueryNotBlank(this.props.query);
    }

    searchIfQueryNotBlank = (query) => {
        if (!isEmpty(trim(query))) { this.props.searchArticles(query); }
    }

    searchBarBlur = () => {
        this.searchBarRef.blur();
    }

    render() {
        const toolbar = (
            <Card style={styles.toolbar}>
                <SearchBar
                    alwaysShowBackButton
                    onSubmitEditing={event => this.fetchNewSearch(event.nativeEvent.text)}
                    onFocus={() => this.setState({ overlayIsVisible: true })}
                    onBlur={() => this.setState({ overlayIsVisible: false })}
                    onBackPress={() => this.props.onBackPressed()}
                    placeholder="Search Arxiv"
                    inputStyle={styles.searchBarInput}
                    ref={(c) => { this.searchBarRef = c; }}
                />
            </Card>
        );

        let emptyViewType;
        if (this.props.errorGeneric) {
            emptyViewType = EmptyView.types.errorOther;
        } else if (this.props.errorNoNetwork) {
            emptyViewType = EmptyView.types.errorNetwork;
        } else {
            emptyViewType = EmptyView.types.noError;
        }
        const emptyView = () => (
            <EmptyView
                titleWhenNoError="No articles found, try a different search term"
                iconNameWhenNoError="search"
                type={emptyViewType}
            />);

        const scrollable = (
            <ListArticles
                articles={this.props.searchResults}
                isFetching={this.props.isFetching}
                isFetchingFirstPage={false}
                isFetchingNextPage={this.props.isFetching}
                onEndReached={this.fetchNextPage}
                emptyView={emptyView}
                renderRow={article =>
                    (<ListItemCard
                        title={article.title}
                        subTitle={article.authors.map(author => author.name).join(', ')}
                        supplementalInfo={moment(article.updated).format('MM/YYYY')}
                        onPress={() => this.props.onItemPressed(article.id)}
                    />)
                }
                onTouchStart={this.searchBarBlur}
            />
        );

        const scrollableOverlay = (
            <Overlay visible={this.state.overlayIsVisible} onTouchStart={this.searchBarBlur} />
        );

        return (
            <Container style={styles.container}>
                <OffscreenToolbar
                    toolbar={() => toolbar}
                    scrollable={() => scrollable}
                    scrollableOverlay={() => scrollableOverlay}
                    toolbarHeight={52 + styles._toolbar.marginTop}
                    scrollablePaddingTop={57 + styles._toolbar.marginTop}
                />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const error = provideArticlesTo(getSearchArticlesFetchError)(state);
    return {
        query: provideArticlesTo(getSearchQuery)(state),
        searchResults: provideArticlesTo(getSearchArticles)(state),
        isFetching: provideArticlesTo(getIsFetchingSearchArticles)(state),
        errorGeneric: error.reasonGeneric,
        errorNoNetwork: error.reasonNoNetwork,
    };
};

const mapDispatchToProps = {
    searchArticles,
    clearSearchArticles,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
