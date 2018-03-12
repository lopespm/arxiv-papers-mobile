import EStyleSheet from 'react-native-extended-stylesheet';
import { TABLET } from '../../../../shared/styles/breakpoints';

export default EStyleSheet.create({
    container: {
        flex: 1,
    },
    listLastItemContainer: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    [TABLET]: {
        container: {
            width: 568,
            alignSelf: 'center',
        },
    },
});
