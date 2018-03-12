import EStyleSheet from 'react-native-extended-stylesheet';
import { TABLET } from '../../../shared/styles/breakpoints';

export default EStyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA',
    },
    header: {},
    headerLeft: {
        flex: 0,
        paddingLeft: 6,
        width: 62,
    },
    headerTitle: {
        paddingRight: 6,
    },
    fabContainer: {},
    [TABLET]: {
        header: {
            height: 62,
        },
        headerLeft: {
            paddingLeft: 10,
        },
        headerTitle: {
            paddingLeft: 16,
            paddingRight: 10,
        },
        fabContainer: {
            marginRight: 4,
        },
    },
});
