import { Observable } from 'rxjs/Observable';
import InAppBilling from 'react-native-billing';
import { FETCH_PURCHASED_DONATIONS, fetchPurchasedDonationsSuccess, fetchPurchasedDonationsError } from '../actions';
import { reportNonFatal } from '../../shared/errorReporter';

export default action$ =>
    action$
        .ofType(FETCH_PURCHASED_DONATIONS)
        .switchMap(action =>
            Observable.fromPromise(InAppBilling.close())
                .flatMap(() => Observable.fromPromise(InAppBilling.open()))
                .flatMap(() => Observable.fromPromise(InAppBilling.listOwnedProducts()))
                .map(fetchPurchasedDonationsSuccess)
                .catch(error => Observable.of(fetchPurchasedDonationsError(error))
                    .do(() => reportNonFatal('Error when fetching purchased donations', error)))
                .finally(() => Observable.fromPromise(InAppBilling.close)));
