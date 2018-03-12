import { DELETE_PAPER_SUCCESS } from '../../../papers/actions';
import { deleteDownloadedArticle } from '../../actions';

export default action$ =>
    action$
        .ofType(DELETE_PAPER_SUCCESS)
        .map(action => deleteDownloadedArticle(action.payload.id));
