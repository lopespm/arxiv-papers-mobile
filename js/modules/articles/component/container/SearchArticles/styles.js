import EStyleSheet from 'react-native-extended-stylesheet';
import { TABLET } from '../../../../shared/styles/breakpoints';

export default EStyleSheet.create({
    toolbar: {
        marginTop: 8,
        marginLeft: 8,
        marginRight: 8,
    },
    searchBarInput: {
        borderWidth: 0,
    },
    container: {
        backgroundColor: '#EAEAEA',
    },
    [TABLET]: {
        container: {
            paddingLeft: 16,
            paddingRight: 16,
        },
        toolbar: {
            marginTop: 16,
        },
    },
});
