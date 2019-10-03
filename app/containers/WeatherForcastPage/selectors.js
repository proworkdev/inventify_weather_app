/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectWether = state => state.weather || initialState;

const makeSelectLocation = () =>
  createSelector(
    selectWether,
    homeState => homeState.location,
  );

const makeSelectWeather = () =>
  createSelector(
    selectWether,
    homeState => homeState.weather,
  );
export { selectWether, makeSelectLocation, makeSelectWeather };
