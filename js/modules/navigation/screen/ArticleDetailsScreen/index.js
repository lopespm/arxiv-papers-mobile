// @flow
import React, { Component } from 'react';
import { Container, Header, Title, Icon, Button, Left, Body } from 'native-base';
import { View } from 'react-native';
import { connect } from 'react-redux';
import fileShare from '../../../shared/native/fileShare';

import { enqueueArticlePaperForDownload } from '../../../papers/actions';
import { navigateBack } from '../../actions';
import { showSnackbar } from '../../../snackbar/actions';

import ArticleDetails from '../../../articles/component/presentational/ArticleDetails';
import DownloadFab from '../../../shared/component/presentational/DownloadFab';

import { getSelectedArticle, getIsSelectedArticleDownloaded, getIsSelectedArticleDownloadInFlightOrQueued, getSelectedArticleDownloadedPaperPath } from '../../../../selector';

import styles from './styles';

import type { Article } from '../../../articles/article';
import type { QueuedPaper } from '../../../papers/paper';
import type { Action as PapersAction } from '../../../papers/actions';
import type { Action as NavigationAction } from '../../actions';
import type { Action as SnackbarAction } from '../../../snackbar/actions';

type Props = {
    +article: Article,
    +downloadedPaperPath: string,
    +isDownloaded: boolean,
    +isDownloadInFlight: boolean,
    +enqueueArticlePaperForDownload: (queuedPaper: QueuedPaper) => PapersAction,
    +navigateBack: () => NavigationAction,
    +showSnackbar: (title: string, duration: number) => SnackbarAction,
};

class ArticleDetailsScreen extends Component<Props> {
    onDownloadFabPress = () => {
        if (this.props.isDownloaded) {
            fileShare.openFileIntent(this.props.downloadedPaperPath, 'application/pdf')
                .catch(() => this.props.showSnackbar('No application found in the device to read PDF files', 5000));
        } else {
            const { article } = this.props;
            this.props.enqueueArticlePaperForDownload({ link: article.linkPdf, id: article.id, idHash: article.idHash});
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <Left style={styles.headerLeft}>
                        <Button transparent onPress={() => this.props.navigateBack()} testID="articleDetailGoBack">
                            <Icon name="md-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                    <Title style={styles.headerTitle}>{this.props.article.title}</Title>
                    </Body>
                </Header>

                <ArticleDetails article={this.props.article}/>

                <View style={styles.fabContainer}>
                    <DownloadFab
                        onPress={this.onDownloadFabPress}
                        isDownloaded={this.props.isDownloaded}
                        isDownloadInFlight={this.props.isDownloadInFlight}
                    />
                </View>
            </Container>
        );
    }
}

const mapStateToProps = (state, props) => ({
    article: getSelectedArticle(state, props),
    isDownloaded: getIsSelectedArticleDownloaded(state, props),
    isDownloadInFlight: getIsSelectedArticleDownloadInFlightOrQueued(state, props),
    downloadedPaperPath: getSelectedArticleDownloadedPaperPath(state, props),
});

const mapDispatchToProps = {
    enqueueArticlePaperForDownload,
    navigateBack,
    showSnackbar,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetailsScreen);
