// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SnackbarCommand from 'react-native-snackbar';

import { provideSnackbarTo } from '../../../selector';
import { getSnackbarId, getSnackbarTitle, getSnackbarDuration } from '../selector';

type Props = {
    +id: string,
    +title: string,
    +duration: number,
}

class Snackbar extends Component<Props> {
    componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id && nextProps.title) {
            SnackbarCommand.show({
                title: nextProps.title,
                duration: nextProps.duration,
            });
        }
    }

    render() {
        return (null);
    }
}

const mapStateToProps = state => ({
    id: provideSnackbarTo(getSnackbarId)(state),
    title: provideSnackbarTo(getSnackbarTitle)(state),
    duration: provideSnackbarTo(getSnackbarDuration)(state),
});


export default connect(mapStateToProps, {})(Snackbar);
