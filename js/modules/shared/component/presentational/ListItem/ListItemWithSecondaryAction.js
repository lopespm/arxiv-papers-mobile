// @flow
import React from 'react';
import { TouchableNativeFeedback, Platform } from 'react-native';
import { ListItem, Right, Body, Text, Icon } from 'native-base';
import styles from './styles';

type Props = {
    +title: string,
    +subTitle: string,
    +onPress: () => mixed,
    +onSecondaryActionPress: () => mixed,
    +testID?: string,
};

const ListItemWithSecondaryAction = (props: Props) => (
    <ListItem noBorder onPress={() => { props.onPress(); }}  testID={props.testID}>
        <Body>
        <Text numberOfLines={2} style={styles.titleAndSubtitle}>{props.title}</Text>
        <Text note numberOfLines={1} style={styles.titleAndSubtitle}>{props.subTitle}</Text>
        </Body>
        <TouchableNativeFeedback
            background={
                (Platform.OS === 'android' && Platform.Version >= 21) ?
                    TouchableNativeFeedback.Ripple(styles.touchRipple.color, true) :
                    TouchableNativeFeedback.SelectableBackground()}
            onPress={() => { props.onSecondaryActionPress(); }}>
            <Right style={styles.secondaryActionContainer} >
                <Icon name="trash" style={styles.secondaryAction} />
            </Right>
        </TouchableNativeFeedback>
    </ListItem>
);

export default ListItemWithSecondaryAction;