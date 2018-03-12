// @flow
import md5 from 'react-native-md5';
import { trim } from 'lodash';

type Author = {
    +name: string,
}

export type Article = {
    +id: string,
    +idHash: string,
    +title: string,
    +summary: string,
    +authors: Array<Author>,
    +published: string,
    +updated: string,
    +linkWebPage: string,
    +linkPdf: string,
};
export type ArticleId = $PropertyType<Article, 'id'>;
export type ArticleIdHash = $PropertyType<Article, 'idHash'>;
export type ArticleLinkPdf = $PropertyType<Article, 'linkPdf'>;

const removeEmptySpacesAndLineBreaks = text => trim(text).replace(/[\r\n]+/g, ' ').replace(/\s\s+/g, ' ');

const create = ({ id, title, summary, authors, published, updated, linkWebPage, linkPdf }: $Diff<Article, {idHash: string}> = {}): Article => ({
    id,
    idHash: md5.hex_md5(id),
    title,
    summary,
    authors,
    published,
    updated,
    linkWebPage,
    linkPdf,
});

const mapToDomain = (articleEntity: Object): Article => {
    const id = articleEntity.id[0].split('arxiv.org/abs/').slice(-1)[0];
    return create({
        id,
        title: removeEmptySpacesAndLineBreaks(articleEntity.title[0]),
        summary: removeEmptySpacesAndLineBreaks(articleEntity.summary[0]),
        authors: articleEntity.author,
        published: articleEntity.published[0],
        updated: articleEntity.updated[0],
        linkWebPage: articleEntity.link.find(link => link.$.rel === 'alternate').$.href,
        linkPdf: articleEntity.link.find(link => link.$.title === 'pdf').$.href,
    });
};

module.exports = {
    create,
    mapToDomain,
};
