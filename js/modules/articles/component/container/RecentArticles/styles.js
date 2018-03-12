import EStyleSheet from 'react-native-extended-stylesheet';
import { TABLET } from '../../../../shared/styles/breakpoints';

export default EStyleSheet.create({
    listContainer: {
        flex: 1,
    },
    [TABLET]: {
        listContainer: {
            paddingHorizontal: 8,
        },
    },
});
