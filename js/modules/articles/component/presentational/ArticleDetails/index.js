// @flow
import React from 'react';
import { Content, Text } from 'native-base';
import moment from 'moment';
import styles from './styles';
import type { Article } from '../../../article';

const flattenAuthors = authors => authors
    .map(author => author.name)
    .reduce((previous, current) => `${previous}, ${current}`);

type Props = {
    +article: Article,
};

const ArticleDetails = ({ article }: Props) => {
    const title = article.title;
    const authors = flattenAuthors(article.authors);
    const date = moment(article.updated).format('MM/YYYY');
    const summary = article.summary;

    return (
        <Content contentContainerStyle={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.authors}>{authors}</Text>
            <Text style={styles.date}>(Submitted on {date})</Text>
            <Text style={styles.summary}>{summary}</Text>
        </Content>);
};

export default ArticleDetails;
