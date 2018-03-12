import { Observable } from 'rxjs/Observable';
import RNFetchBlob from 'react-native-fetch-blob';
import { DOWNLOAD_PAPER, receiveDownloadedPaper, downloadNextQueuedPaper, downloadPaperErrorGeneric, downloadPaperErrorNoNetwork } from '../actions';
import { getIsConnected } from '../../../selector';
import { reportNonFatal } from '../../shared/errorReporter';

const fetchBlob = (link, idHash) => RNFetchBlob
    .config({
        addAndroidDownloads: {
            path: `${RNFetchBlob.fs.dirs.SDCardApplicationDir}/${idHash}.pdf`,
            useDownloadManager: true,
            notification: true,
            mime: 'application/pdf',
            description: 'File downloaded by arXiv Papers',
        },
    })
    .fetch('GET', link);

const downloadPaper = (queuedPaper) =>
    Observable.fromPromise(fetchBlob(queuedPaper.link, queuedPaper.idHash))
        .flatMap(resp => [
            receiveDownloadedPaper({ path: resp.path(), id: queuedPaper.id, idHash: queuedPaper.idHash }),
            downloadNextQueuedPaper(),
        ])
        .catch(error => Observable.of(downloadPaperErrorGeneric(error, queuedPaper), downloadNextQueuedPaper())
            .do(() => reportNonFatal('Error when downloading paper', error)));

export default (action$, store, { state$ }) =>
    action$
        .ofType(DOWNLOAD_PAPER)
        .withLatestFrom(state$)
        .map(([action, state]) => [action.payload.queuedPaper, getIsConnected(state)])
        .switchMap(([queuedPaper, isConnected]) => {
            if (isConnected) {
                return downloadPaper(queuedPaper);
            }
            return Observable.of(downloadPaperErrorNoNetwork(new Error('No connection'), queuedPaper), downloadNextQueuedPaper());
        });

