// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchArticles from '../../../articles/component/container/SearchArticles';
import { navigateToDetails, navigateBack } from '../../actions';
import { getSearchQueryParameter } from '../../selector';
import type { Action } from '../../actions';
import type { Article } from '../../../articles/article';

type Props = {
    +bootstrapQuery: string,
    +navigateToDetails: (article: Article) => Action,
    +navigateBack: () => Action,
}

class SearchScreen extends Component<Props> {
    render() {
        return (
            <SearchArticles
                bootstrapQuery={this.props.bootstrapQuery}
                onItemPressed={articleId => this.props.navigateToDetails(articleId)}
                onBackPressed={this.props.navigateBack}
            />
        );
    }
}

const mapStateToProps = (state, props) => ({
    bootstrapQuery: getSearchQueryParameter(state, props),
});

const mapDispatchToProps = {
    navigateToDetails,
    navigateBack,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
