import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { provideNavigationTo } from '../selector';

export const NAVIGATION_ROOT_KEY = 'root';

export default () => createReactNavigationReduxMiddleware(NAVIGATION_ROOT_KEY, provideNavigationTo(navigation => navigation));