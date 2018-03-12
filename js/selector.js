// @flow
import { createSelector } from 'reselect';
import * as fromPapers from './modules/papers/selector';
import * as fromArticles from './modules/articles/selector';
import * as fromDonations from './modules/donations/selector';
import * as fromNavigation from './modules/navigation/selector';
import * as fromConnection from './modules/connection/selector';
import type { State } from './reducer';

const provide = provider =>
    (selector: Function) =>
        (state: State, props: any) =>
            selector(provider(state), props);
export const providePapersTo = provide(state => state.papers);
export const provideArticlesTo = provide(state => state.articles);
export const provideDonationsTo = provide(state => state.donations);
export const provideSnackbarTo = provide(state => state.snackbar);
export const provideNavigationTo = provide(state => state.navigation);
export const provideConnectionTo = provide(state => state.connection);

export const getSelectedArticle = createSelector(
    provideNavigationTo(fromNavigation.getSelectedArticleIdParameter),
    provideArticlesTo(fromArticles.getArticles),
    (selectedArticleId, articles) => articles[selectedArticleId],
);

export const getIsSelectedArticleDownloaded = createSelector(
    provideNavigationTo(fromNavigation.getSelectedArticleIdParameter),
    providePapersTo(fromPapers.getDownloadedPapers),
    (selectedArticleId, downloadedPapers) => downloadedPapers.some(({ id }) => id === selectedArticleId),
);

export const getIsSelectedArticleDownloadInFlightOrQueued = createSelector(
    provideNavigationTo(fromNavigation.getSelectedArticleIdParameter),
    providePapersTo(fromPapers.getQueuedPapersForDownload),
    providePapersTo(fromPapers.getPaperDownloadInFlightId),
    (selectedArticleId, queuedIds, inFlightId) =>
        (inFlightId === selectedArticleId) ||
        queuedIds.filter(({ id }) => id === selectedArticleId).length > 0,
);

export const getSelectedArticleDownloadedPaperPath = createSelector(
    provideNavigationTo(fromNavigation.getSelectedArticleIdParameter),
    providePapersTo(fromPapers.getDownloadedPapers),
    getIsSelectedArticleDownloaded,
    (selectedArticleId, downloadedPapers, isSelectedArticleDownloaded) => {
        if (isSelectedArticleDownloaded) {
            return downloadedPapers.find(({ id }) => id === selectedArticleId).path;
        }
        return null;
    },
);

export const getCurrentPageOfDownloadedPapersArticlesIds = (state: State) => {
    const pageSize = 10;
    const startIndex = provideArticlesTo(fromArticles.getDownloadedArticlesNextPageIndex)(state);
    return providePapersTo(fromPapers.getDownloadedPapers)(state)
        .slice(startIndex, startIndex + pageSize)
        .map(({ id }) => id);
};

export const getIsTeaPurchased = (state: State) => provideDonationsTo(fromDonations.getIsTeaPurchased)(state);

export const getIsConnected = (state: State) => provideConnectionTo(fromConnection.getIsConnected)(state);
