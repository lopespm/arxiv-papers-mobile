// @flow
export const CONNECTION_ONLINE = 'CONNECTION_ONLINE';
export const CONNECTION_OFFLINE = 'CONNECTION_OFFLINE';

export type Action = { type: 'CONNECTION_ONLINE' | 'CONNECTION_OFFLINE' };

export const connectionOnline = (): Action => ({ type: CONNECTION_ONLINE });
export const connectionOffline = (): Action => ({ type: CONNECTION_OFFLINE });
