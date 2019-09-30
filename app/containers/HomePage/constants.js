/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_LOACTION = 'weather/Home/CHANGE_LOACTION';
export const GET_LOACTION_WEATHER_INIT =
  'weather/Home/GET_LOACTION_WEATHER_INIT';
export const GET_LOACTION_WEATHER_SUCCESS =
  'weather/Home/GET_LOACTION_WEATHER_SUCCESS';
export const GET_LOACTION_WEATHER_ERROR =
  'weather/Home/GET_LOACTION_WEATHER_ERROR';
