import EStyleSheet from 'react-native-extended-stylesheet';
import { TABLET } from '../../../styles/breakpoints';

export default EStyleSheet.create({
    overlay: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.3,
        backgroundColor: 'black',
    },
    [TABLET]: {
        overlay: {
            left: -16,
            right: -16,
        },
    },
});
