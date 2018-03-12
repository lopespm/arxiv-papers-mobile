// @flow
import React from 'react';
import { Fab } from 'native-base';
import IconExtended from '../IconExtended';
import ProgressIcon from '../ProgressIcon';
import styles from './styles';

type Props = {
    +isDownloadInFlight: boolean,
    +isDownloaded: boolean,
    +onPress: () => mixed,
};

const DownloadFab = (props: Props) => {
    let icon;
    if (props.isDownloadInFlight) {
        icon = <ProgressIcon testID="downloadFabIconInProgress" />;
    } else if (props.isDownloaded) {
        icon = (<IconExtended
            family="FontAwesome"
            name="file-pdf-o"
            testID="downloadFabIconDownloaded"
        />);
    } else {
        icon = <IconExtended name="download" testID="downloadFabIconDownload" />;
    }

    return (
        <Fab
            disabled={props.isDownloadInFlight}
            style={styles.fab}
            position="bottomRight"
            onPress={props.onPress}
            testID="downloadFab"
        >
            {icon}
        </Fab>
    );
};

export default DownloadFab;
