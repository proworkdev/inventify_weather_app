/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  CHANGE_LOACTION,
  GET_LOACTION_WEATHER_INIT,
  GET_LOACTION_WEATHER_SUCCESS,
  GET_LOACTION_WEATHER_ERROR,
} from './constants';
/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function changeLocation(location) {
  return {
    type: CHANGE_LOACTION,
    location,
  };
}

export function getWeatherByLocation() {
  return {
    type: GET_LOACTION_WEATHER_INIT,
  };
}

export function successLocationWeather(weather) {
  return {
    type: GET_LOACTION_WEATHER_SUCCESS,
    weather,
  };
}

export function errorLocation(error) {
  return {
    type: GET_LOACTION_WEATHER_ERROR,
    error,
  };
}
