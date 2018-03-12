// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';

import { fetchDownloadedArticles, clearDownloadedArticles } from '../../../actions';
import { deletePaperIfPermitted } from '../../../../papers/actions';

import EmptyView from '../../../../shared/component/presentational/EmptyView';
import ListArticles from '../../presentational/ListArticles';
import { ListItemWithSecondaryAction } from '../../../../shared/component/presentational/ListItem';

import { provideArticlesTo } from '../../../../../selector';
import { getDownloadedArticlesFetchError, getDownloadedArticles, getIsFetchingDownloadedArticles } from '../../../selector';

import type { Article, ArticleId } from '../../../article';
import type { Action as ArticlesAction } from '../../../actions';
import type { Action as PapersAction } from '../../../../papers/actions';

type Props = {
    +articles: Array<Article>,
    +isFetching: boolean,
    +errorGeneric: boolean,
    +errorNoNetwork: boolean,
    +fetchDownloadedArticles: () => ArticlesAction,
    +clearDownloadedArticles: () => ArticlesAction,
    +deleteDownloadedArticleAndPaperIfPermitted: (articleId: ArticleId) => PapersAction,
    +onItemPressed: (article: Article) => mixed,
};

type State = {
    isFetchingFirstPage: boolean,
};

class DownloadedArticles extends Component<Props, State> {
    componentWillMount() {
        this.setState({ isFetchingFirstPage: true });
        this.props.fetchDownloadedArticles();
    }

    componentWillUnmount() {
        this.props.clearDownloadedArticles();
    }

    fetchNextPage = () => {
        this.setState({ isFetchingFirstPage: false });
        this.props.fetchDownloadedArticles();
    }

    resetAndFetchFirstPage = () => {
        this.setState({ isFetchingFirstPage: true });
        this.props.clearDownloadedArticles();
        this.props.fetchDownloadedArticles();
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
            <EmptyView titleWhenNoError={'Your downloaded articles will appear here'} type={emptyViewType} />);

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
                      (<ListItemWithSecondaryAction
                          title={article.title}
                          subTitle={article.authors.map(author => author.name).join(', ')}
                          onPress={() => { this.props.onItemPressed(article); }}
                          onSecondaryActionPress={() => { this.props.deleteDownloadedArticleAndPaperIfPermitted(article.id); }}
                          testID="downloadedArticle"
                      />)}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const error = provideArticlesTo(getDownloadedArticlesFetchError)(state);
    return {
        articles: provideArticlesTo(getDownloadedArticles)(state),
        isFetching: provideArticlesTo(getIsFetchingDownloadedArticles)(state),
        errorGeneric: error.reasonGeneric,
        errorNoNetwork: error.reasonNoNetwork,
    };
};

const mapDispatchToProps = ({
    fetchDownloadedArticles,
    clearDownloadedArticles,
    deleteDownloadedArticleAndPaperIfPermitted: deletePaperIfPermitted,
});

export default connect(mapStateToProps, mapDispatchToProps)(DownloadedArticles);
