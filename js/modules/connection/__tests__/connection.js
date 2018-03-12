import reducer from '../reducer';
import { connectionOnline, connectionOffline } from '../actions';
import { getIsConnected } from '../selector';

it('is connected when online', () => {
    const nextState = reducer({}, connectionOnline());
    expect(getIsConnected(nextState)).toEqual(true);
});

it('is disconnected when offline', () => {
    const nextState = reducer({}, connectionOffline());
    expect(getIsConnected(nextState)).toEqual(false);
});
