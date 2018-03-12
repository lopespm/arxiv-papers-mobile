import { combineEpics } from 'redux-observable';
import fetchPurchasedDonations from './fetchPurchasedDonations';
import purchaseTea from './purchaseTea';
import showSnackbarOnError from './showSnackbarOnError';

export default combineEpics(
    fetchPurchasedDonations,
    purchaseTea,
    showSnackbarOnError,
);
