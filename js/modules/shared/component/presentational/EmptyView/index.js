// @flow
import React from 'react';
import { View, Text } from 'react-native';
import IconExtended from '../IconExtended';
import styles from './styles';
import { reportNonFatal } from '../../../errorReporter';

type Props = {
    +titleWhenNoError: string,
    +iconNameWhenNoError?: string,
    +type: number,
};

const EmptyView = (props: Props) => {
    const iconFamily = 'MaterialIcons';
    let iconName;
    let title;
    if (props.type === EmptyView.types.noError) {
        iconName = props.iconNameWhenNoError ? props.iconNameWhenNoError : 'list';
        title = props.titleWhenNoError;
    } else if (props.type === EmptyView.types.errorNetwork) {
        iconName = 'cloud-off';
        title = 'No internet connection';
    } else {
        iconName = 'error-outline';
        title = 'An error occurred, please try again';
        reportNonFatal(`Unexpected EmptyView type: ${props.type}`);
    }

    return (
        <View style={styles.container}>
            <IconExtended
                name={iconName}
                family={iconFamily}
                style={styles.icon}
            />
            <Text style={styles.title}>{title}</Text>
        </View>);
};

EmptyView.types = Object.freeze({ noError: 1, errorNetwork: 2, errorOther: 3 });

export default EmptyView;
