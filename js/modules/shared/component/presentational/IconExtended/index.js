// @flow
import React from 'react';
import { StyleProvider, getTheme, Icon } from 'native-base';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type Props = {
    +family?: string,
    +name: string,
    +style?: StyleObj
}

const IconExtended = (props: Props) => {
    const { family } = props;
    const icon = <Icon {...props} />;
    if (family) {
        const customTheme = getTheme({ iconFamily: family });
        return <StyleProvider style={customTheme}>{icon}</StyleProvider>;
    }
    return icon;
};

export default IconExtended;
