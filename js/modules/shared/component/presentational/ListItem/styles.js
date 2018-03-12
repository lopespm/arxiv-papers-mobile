import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    titleAndSubtitle: {
        marginLeft: 0,
        paddingRight: 8,
    },
    supplementalInfoContainer: {
        flex: 0,
        paddingRight: 5,
        alignSelf: 'stretch',
        paddingVertical: 2,
    },
    secondaryActionContainer: {
        flex: 0,
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 12,
    },
    cardContainer: {
        marginLeft: 8,
        marginRight: 8,
    },
    supplementalInfo: {
        fontSize: 12,
    },
    touchRipple: {
        color: '#aaaaaa22',
    },
});
