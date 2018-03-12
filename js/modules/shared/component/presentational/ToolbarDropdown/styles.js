import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    icon: {
        marginRight: 6,
        color: '#737373',
    },
    menuPlaceholder: {
        backgroundColor: 'transparent',
        width: 1,
        height: EStyleSheet.hairlineWidth,
    },
});
