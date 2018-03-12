// @flow
import React from 'react';
import { View } from 'react-native';
import styles from './styles';

type Props = {
    +visible: boolean,
};

const Overlay = (props: Props) => {
    if (props.visible === true) {
        return <View style={styles.overlay} {...props} />;
    }
    return (<View pointerEvents="none" accessible {...props} />);
};

export default Overlay;
