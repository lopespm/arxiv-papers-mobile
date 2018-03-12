// @flow
import * as React from 'react';
import { View, RefreshControl } from 'react-native';
import { List, Spinner } from 'native-base';
import styles from './styles';
import type { Article } from '../../../article';
import theme from '../../../../../theme/attributes';

type Props = {
    +articles: $ReadOnlyArray<Article>,
    +isFetchingFirstPage: boolean,
    +isFetchingNextPage: boolean,
    +onEndReached: () => mixed,
    +onRefresh?: () => mixed,
    +emptyView?: () => React.Node,
    +renderRow: (article: Article) => React.Node,
};

const ListArticles = (props: Props) => {
    const renderFooter = () =>
        (props.isFetchingNextPage ?
            <View style={styles.listLastItemContainer}><Spinner color={theme.brandPrimary} /></View> :
            <View style={styles.listLastItemContainer} />);

    let refreshControl;
    if (props.onRefresh) {
        refreshControl = <RefreshControl refreshing={props.isFetchingFirstPage} onRefresh={props.onRefresh} />;
    }

    let emptyViewResolved;
    if (props.emptyView
        && (!props.articles || props.articles.length === 0)
        && !props.isFetchingFirstPage
        && !props.isFetchingNextPage) {
        emptyViewResolved = props.emptyView();
    }
    return (
        <View style={styles.container}>
            {emptyViewResolved}
            <List
                onEndReachedThreshold={360}
                {...props}
                onEndReached={() => { if (props.articles.length > 0) { props.onEndReached(); } }}
                dataArray={props.articles}
                renderFooter={renderFooter}
                refreshControl={refreshControl}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default ListArticles;
