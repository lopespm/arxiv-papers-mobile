// @flow
import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import articleMapper from '../article';
import type { Article, ArticleId } from '../article';

const xmlParser = require('react-native-xml2js').parseString;

const parseXml = xml => new Promise(((resolve, reject) => {
    xmlParser(xml, (err, result) => {
        if (err) { reject(err); } else { resolve(result); }
    });
}));

const response = (articles): { articles: $ReadOnlyArray<Article> } => ({ articles });

const fetchArticles = uri =>
    ajax.get(uri)
        .map(rawResponse => rawResponse.xhr._response)
        .flatMap(responseText => Observable.fromPromise(parseXml(responseText)))
        .map((parsedResult) => {
            const feed = parsedResult.feed;
            if (feed.hasOwnProperty('entry')) {
                return response(feed.entry.map(entry => articleMapper.mapToDomain(entry)));
            }
            return response([]);
        });

const searchArticles = (query: string, pageStartIndex: number, pageSize: number) => fetchArticles(`http://export.arxiv.org/api/query?search_query=all:${query}&start=${pageStartIndex}&max_results=${pageSize}`);

const recentArticles = (pageStartIndex: number, pageSize: number) => fetchArticles(`http://export.arxiv.org/api/query?search_query=ALL&start=${pageStartIndex}&max_results=${pageSize}&sortBy=submittedDate&sortOrder=descending`);

const fetchByIds = (ids: $ReadOnlyArray<ArticleId>) => {
    if (ids.length > 0) {
        return fetchArticles(`http://export.arxiv.org/api/query?id_list=${ids.join(',')}`);
    }

    return Observable.of(response([]));
};

module.exports = {
    searchArticles,
    recentArticles,
    fetchByIds,
};
