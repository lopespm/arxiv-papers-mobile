import { Observable } from 'rxjs/Observable';
import InAppBilling from 'react-native-billing';
import { PURCHASE_TEA, purchaseTeaSuccess, purchaseTeaError } from '../actions';
import { reportNonFatal } from '../../shared/errorReporter';

const PURCHASED_SUCCESSFULY = 'PurchasedSuccessfully';

// Error type matching is done via this somewhat brittle string compare
// An alternative approach would be to have the error's `code` property populated by a react-native-billing domain error code: https://github.com/idehub/react-native-billing/issues/46#issuecomment-370152213
// See: https://github.com/idehub/react-native-billing/blob/c8eb7f3c6828053440b515231f56ea45c8d2daeb/android/src/main/java/com/idehub/Billing/InAppBillingBridge.java#L128-L131
// And: https://github.com/anjlab/android-inapp-billing-v3/blob/master/library/src/main/java/com/anjlab/android/iab/v3/Constants.java#L30-L34
const isPurchaseOfType = (error, errorCode) => error.message === `Purchase or subscribe failed with error: ${errorCode}`;
const isPurchaseCancelledByUser = error => isPurchaseOfType(error, 1);
const isNetworkNotAvailable = error => isPurchaseOfType(error, 2);

export default action$ =>
    action$
        .ofType(PURCHASE_TEA)
        .switchMap(action =>
            Observable.fromPromise(InAppBilling.close())
                .flatMap(() => Observable.fromPromise(InAppBilling.open()))
                .flatMap(() => Observable.fromPromise(InAppBilling.isPurchased(action.payload.productId)))
                .filter(isPurchased => !isPurchased)
                .flatMap(() => Observable.fromPromise(InAppBilling.purchase(action.payload.productId)))
                .filter(purchaseDetails => purchaseDetails.purchaseState === PURCHASED_SUCCESSFULY)
                .flatMap(() => Observable.fromPromise(InAppBilling.isValidTransactionDetails(action.payload.productId)))
                .filter(isTransactionValid => isTransactionValid)
                .map(details => purchaseTeaSuccess())
                .catch(error => Observable.of(purchaseTeaError(error))
                    .filter(() => !isPurchaseCancelledByUser(error) && !isNetworkNotAvailable(error))
                    .do(() => reportNonFatal('Error when purchasing tea', error)))
                .finally(() => Observable.fromPromise(InAppBilling.close)));

