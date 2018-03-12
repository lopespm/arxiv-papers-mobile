// @flow
import React from 'react';
import { ListItem, Right, Body, Text } from 'native-base';
import styles from './styles';

type Props = {
    +title: string,
    +subTitle: string,
    +supplementalInfo: string,
    +onPress: () => mixed,
    +testID?: string,
};

const ListItemPlain = (props: Props) => (
    <ListItem noBorder onPress={() => { props.onPress(); }} testID={props.testID}>
        <Body>
            <Text numberOfLines={2} style={styles.titleAndSubtitle}>{props.title}</Text>
            <Text note numberOfLines={1} style={styles.titleAndSubtitle}>{props.subTitle}</Text>
        </Body>
        <Right style={styles.supplementalInfoContainer}>
            <Text note style={styles.supplementalInfo}>{props.supplementalInfo}</Text>
        </Right>
    </ListItem>
);

export default ListItemPlain;
