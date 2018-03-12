// @flow
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from './AppNavigator';
import { NAVIGATE_BACK, NAVIGATE_SEARCH, NAVIGATE_DETAILS } from './actions';
import type { Action } from './actions';

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Home'));

export type State = typeof initialState;
export default function navigation(state: State = initialState, action: Action): State {
    switch (action.type) {
        case NAVIGATE_BACK:
            return AppNavigator.router.getStateForAction(
                NavigationActions.back(),
                state,
            );
        case NAVIGATE_SEARCH:
            return AppNavigator.router.getStateForAction(
                NavigationActions.navigate({
                    key: 'Search',
                    routeName: 'Search',
                    params: { query: action.payload.query },
                }),
                state,
            );
        case NAVIGATE_DETAILS:
            return AppNavigator.router.getStateForAction(
                NavigationActions.navigate({
                    key: 'ArticleDetails',
                    routeName: 'ArticleDetails',
                    params: { articleId: action.payload.articleId },
                }),
                state,
            );
        default:
            return state;
    }
}
