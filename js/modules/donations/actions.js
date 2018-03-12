// @flow
import { TEA } from './productIds';

export const FETCH_PURCHASED_DONATIONS = 'FETCH_PURCHASED_DONATIONS';
export const FETCH_PURCHASED_DONATIONS_SUCCESS = 'FETCH_PURCHASED_DONATIONS_SUCCESS';
export const FETCH_PURCHASED_DONATIONS_ERROR = 'FETCH_PURCHASED_DONATIONS_ERROR';

export const PURCHASE_TEA = 'PURCHASE_TEA';
export const PURCHASE_TEA_SUCCESS = 'PURCHASE_TEA_SUCCESS';
export const PURCHASE_TEA_ERROR = 'PURCHASE_TEA_ERROR';

export type Action = {|
    +type: 'FETCH_PURCHASED_DONATIONS' | 'PURCHASE_TEA_SUCCESS',
|} | {|
    +type: 'FETCH_PURCHASED_DONATIONS_SUCCESS',
    +payload: {|
        +purchasedDonationsIds: $ReadOnlyArray<string>,
    |}
|} | {|
    +type: 'PURCHASE_TEA',
    +payload: {|
        +productId: string,
    |}
|} | {|
    +type: 'FETCH_PURCHASED_DONATIONS_ERROR' | 'PURCHASE_TEA_ERROR',
    +payload: {|
        +error: Error,
    |}
|}

export const fetchPurchasedDonations = (): Action => ({
    type: FETCH_PURCHASED_DONATIONS,
});

export const fetchPurchasedDonationsSuccess = (purchasedDonationsIds: $ReadOnlyArray<string>): Action => ({
    type: FETCH_PURCHASED_DONATIONS_SUCCESS,
    payload: {
        purchasedDonationsIds,
    },
});

export const fetchPurchasedDonationsError = (error: Error): Action => ({
    type: FETCH_PURCHASED_DONATIONS_ERROR,
    payload: {
        error,
    },
});

export const purchaseTea = (): Action => ({
    type: PURCHASE_TEA,
    payload: {
        productId: TEA,
    },
});

export const purchaseTeaSuccess = (): Action => ({
    type: PURCHASE_TEA_SUCCESS,
});

export const purchaseTeaError = (error: Error): Action => ({
    type: PURCHASE_TEA_ERROR,
    payload: {
        error,
    },
});

