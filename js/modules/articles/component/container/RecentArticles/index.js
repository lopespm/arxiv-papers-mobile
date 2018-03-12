// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import styles from './styles';

import { fetchRecentArticles, clearRecentArticles } from '../../../actions';

import EmptyView from '../../../../shared/component/presentational/EmptyView';
import ListArticles from '../../presentational/ListArticles';
import { ListItemPlain } from '../../../../shared/component/presentational/ListItem';

import { provideArticlesTo } from '../../../../../selector';
import { getRecentArticlesFetchError, getRecentArticles, getIsFetchingRecentArticles } from '../../../selector';

import type { Article } from '../../../article';
import type { Action } from '../../../actions';

type Props = {
    +articles: $ReadOnlyArray<Article>,
    +isFetching: boolean,
    +errorGeneric: boolean,
    +errorNoNetwork: boolean,
    +fetchRecentArticles: () => Action,
    +clearRecentArticles: () => Action,
    +onItemPressed: (article: Article) => mixed,
};

type State = {
    isFetchingFirstPage: boolean,
};

class RecentArticles extends Component<Props, State> {
    componentWillMount() {
        this.setState({ isFetchingFirstPage: true });
        this.props.fetchRecentArticles();
    }

    componentWillUnmount() {
        this.props.clearRecentArticles();
    }

    fetchNextPage = () => {
        this.setState({ isFetchingFirstPage: false });
        this.props.fetchRecentArticles();
    }

    resetAndFetchFirstPage = () => {
        this.setState({ isFetchingFirstPage: true });
        this.props.clearRecentArticles();
        this.props.fetchRecentArticles();
    }

    render() {
        let emptyViewType;
        if (this.props.errorGeneric) {
            emptyViewType = EmptyView.types.errorOther;
        } else if (this.props.errorNoNetwork) {
            emptyViewType = EmptyView.types.errorNetwork;
        } else {
            emptyViewType = EmptyView.types.noError;
        }
        const emptyView = () => (
            <EmptyView titleWhenNoError={'No recent articles available'} type={emptyViewType} />);

        return (
            <View style={styles.listContainer}>
                <ListArticles
                    articles={this.props.articles}
                    isFetchingFirstPage={this.props.isFetching && this.state.isFetchingFirstPage}
                    isFetchingNextPage={this.props.isFetching && !this.state.isFetchingFirstPage}
                    contentContainerStyle={{ paddingTop: 8 }}
                    onEndReached={this.fetchNextPage}
                    onRefresh={this.resetAndFetchFirstPage}
                    emptyView={emptyView}
                    renderRow={article =>
                        (<ListItemPlain
                            title={article.title}
                            subTitle={article.authors.map(author => author.name).join(', ')}
                            supplementalInfo={moment(article.updated).format('MM/YYYY')}
                            onPress={() => { this.props.onItemPressed(article); }}
                            testID="recentArticle"
                        />)}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const error = provideArticlesTo(getRecentArticlesFetchError)(state);
    return {
        articles: provideArticlesTo(getRecentArticles)(state),
        isFetching: provideArticlesTo(getIsFetchingRecentArticles)(state),
        errorGeneric: error.reasonGeneric,
        errorNoNetwork: error.reasonNoNetwork,
    };
};

const mapDispatchToProps = {
    fetchRecentArticles,
    clearRecentArticles,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentArticles);
