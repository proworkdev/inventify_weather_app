/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { END_POINT } from '../../utils/constants';
import { successLocationWeather, errorLocation } from './actions';
import { GET_WEATHER_BY_WOEID_INIT } from './constants';
/**
 * Github repos request/response handler
 */
export function* getWeatherForcast(action) {
  // Select username from store
  const requestURL = `${END_POINT}/location/${action.woeid}`;
  try {
    // Call our request helper (see 'utils/request')
    const weather = yield call(request, requestURL);
    yield put(successLocationWeather(weather));
  } catch (err) {
    yield put(errorLocation(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getWeatherData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_WEATHER_BY_WOEID_INIT, getWeatherForcast);
}
