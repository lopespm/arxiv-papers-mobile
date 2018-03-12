import EStyleSheet from 'react-native-extended-stylesheet';
import theme from '../../../../theme/attributes';
import { TABLET } from '../../../shared/styles/breakpoints';

export default EStyleSheet.create({
    header: {
        height: 58,
    },
    searchBar: {
        flex: 1,
        position: 'absolute',
        left: 8,
        top: 8,
        right: 8,
    },
    searchBarInput: {
        backgroundColor: '#FAFAFA',
    },
    tabBarContainer: {
        backgroundColor: theme.tabDefaultBg,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: EStyleSheet.hairlineWidth,
        shadowOffset: {
            height: EStyleSheet.hairlineWidth,
        },
    },
    tabBar: {
        backgroundColor: theme.tabDefaultBg,
        elevation: 0,
    },
    tabItem: {},
    tabLabel: {},
    tabIndicator: {
        backgroundColor: '#fff',
    },
    [TABLET]: {
        searchBar: {
            left: 24,
            top: 16,
            right: 24,
        },
        header: {
            height: 58 + 8,
        },
        tabLabel: {
            fontSize: 16,
        },
        tabBar: {
            width: 400,
            alignSelf: 'center',
        },
        tabItem: {
            width: 200,
        },
    },
});