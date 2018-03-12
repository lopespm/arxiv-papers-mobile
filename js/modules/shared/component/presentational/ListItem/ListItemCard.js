// @flow
import React from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { Card, CardItem, Right, Body, Text } from 'native-base';
import styles from './styles';

type Props = {
    +title: string,
    +subTitle: string,
    +supplementalInfo: string,
    +onPress: () => mixed,
};

const ListItemCard = (props: Props) => (
    <Card style={styles.cardContainer}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(styles.touchRipple.color, false)}
          onPress={() => { props.onPress(); }}>
            <CardItem noBorder>
                <Body>
                    <Text numberOfLines={2} style={styles.titleAndSubtitle}>{props.title}</Text>
                    <Text note numberOfLines={1} style={styles.titleAndSubtitle}>{props.subTitle}</Text>
                </Body>
                <Right style={styles.supplementalInfoContainer}>
                    <Text note style={styles.supplementalInfo}>{props.supplementalInfo}</Text>
                </Right>
            </CardItem>
        </TouchableNativeFeedback>
    </Card>
);

export default ListItemCard;
