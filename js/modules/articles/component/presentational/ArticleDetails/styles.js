import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform } from 'react-native';
import { TABLET } from '../../../../shared/styles/breakpoints';

export default EStyleSheet.create({
    content: {
        paddingTop: 16,
        paddingVertical: 16 + 70,
        paddingHorizontal: 16,
    },
    [TABLET]: {
        content: {
            width: 600,
            alignSelf: 'center',
            paddingVertical: 32 + 70,
            paddingHorizontal: 32,
        },
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        ...Platform.select({
            ios: {
                fontFamily: 'System',
            },
            android: {
                fontFamily: 'Roboto_medium',
            },
        }),
    },
    authors: {
        fontSize: 16,
        lineHeight: 28,
    },
    date: {
        fontSize: 13,
        lineHeight: 24,
    },
    summary: {
        paddingTop: 16,
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'justify',
    },
});
