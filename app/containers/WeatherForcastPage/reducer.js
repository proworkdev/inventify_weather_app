/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  GET_WEATHER_BY_WOEID_INIT,
  GET_WEATHER_BY_WOEID_SUCCESS,
  GET_WEATHER_BY_WOEID_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  location: '',
  weather: {},
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const waetherReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_WEATHER_BY_WOEID_INIT:
        draft.isLoading = true;
        break;

      case GET_WEATHER_BY_WOEID_SUCCESS:
        console.log('checkred====>>>>', action);
        draft.weather = action.weather;
        break;

      case GET_WEATHER_BY_WOEID_ERROR:
        draft.weather = action.error;
        break;
    }
  });

export default waetherReducer;
