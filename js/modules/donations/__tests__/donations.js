import reducer from '../reducer';
import { fetchPurchasedDonationsSuccess, purchaseTeaSuccess, purchaseTeaError } from '../actions';
import { getIsTeaPurchased } from '../selector';
import { TEA } from '../productIds';

it('successfuly purchases tea', () => {
    const nextState = reducer({}, purchaseTeaSuccess());
    expect(getIsTeaPurchased(nextState)).toEqual(true);
});

it('does not purchase on purchase error', () => {
    const nextState = reducer({}, purchaseTeaError(Error('Purchase Error')));
    expect(getIsTeaPurchased(nextState)).toEqual(false);
});

it('successfuly fetches purchased donations', () => {
    let nextState = reducer({}, fetchPurchasedDonationsSuccess([TEA]));
    expect(getIsTeaPurchased(nextState)).toEqual(true);
    nextState = reducer({}, fetchPurchasedDonationsSuccess(['product id A', 'product id B']));
    expect(getIsTeaPurchased(nextState)).toEqual(false);
});
