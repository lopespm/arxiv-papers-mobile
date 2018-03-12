import { combineEpics } from 'redux-observable';
import { showSnackbar } from '../../snackbar/actions';
import { PURCHASE_TEA_ERROR, FETCH_PURCHASED_DONATIONS_ERROR } from '../actions';

const purchaseTea = action$ =>
    action$
        .ofType(PURCHASE_TEA_ERROR)
        .map(() => showSnackbar('An error occurred during the transaction'));

const purchasedDonations = action$ =>
    action$
        .ofType(FETCH_PURCHASED_DONATIONS_ERROR)
        .map(() => showSnackbar('An error occurred when contacting Google Play'));


export default combineEpics(
    purchaseTea,
    purchasedDonations,
);
