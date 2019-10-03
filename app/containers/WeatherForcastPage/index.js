/*
 * FeaturePage
 *
 * List all the features
 */
import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import H1 from 'components/H1';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { makeSelectLocation, makeSelectWeather } from './selectors';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { getWeatherForcast } from './actions';
import './index.css';

const key = 'weather';
function WeatherForcastPage({
  getWeatherForcastData,
  match: { params },
  weather,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    if (params && params.woeid) {
      getWeatherForcastData(params.woeid);
    }
  }, []);
  return (
    <div>
      <Helmet>
        <title>Weather Forcast Page</title>
        <meta
          name="description"
          content="Feature page of React.js Boilerplate application"
        />
      </Helmet>
      <div className="location-box">
        <img
          src={require('./images/cloud.png')}
          className="bg-cloud"
          alt="cloud"
        />
        <div className="logo">
          <img src={require('./images/logo.png')} alt="logo" />
        </div>
        <div className="location-weather">
          <div className="location-name">{weather.title}</div>
          <div className="temp-celc">
            <span>
              {weather.consolidated_weather
                ? Math.round(weather.consolidated_weather[0].the_temp) + '° C'
                : ''}
            </span>{' '}
            /{' '}
            <span>
              {weather.consolidated_weather
                ? Math.round(
                    toFahrenheit(weather.consolidated_weather[0].the_temp),
                  ) + '° F'
                : ''}
            </span>
          </div>
        </div>

        <div className="temp-list">
          <ul>
            {weather.consolidated_weather &&
              weather.consolidated_weather.map(el => (
                <li key={el.id}>
                  <div className="temp-day">
                    <div className="day-name">
                      <p>
                        <b>
                          {new Date(el.applicable_date).getDate() ===
                          new Date().getDate()
                            ? 'Today'
                            : moment(
                                el.applicable_date,
                                'YYYY-MM-DD HH:mm:ss',
                              ).format('dddd')}
                        </b>
                      </p>
                    </div>
                    <div className="weather-type">
                      <img
                        src={require('images/cloud-icon.png')}
                        alt="cloudIcon"
                      />
                    </div>
                    <div className="temp-celc">
                      <span>{Math.round(el.the_temp) + '° C'} </span> /{' '}
                      <span>
                        {Math.round(toFahrenheit(el.the_temp)) + '° F'}{' '}
                      </span>
                    </div>
                    <hr />
                    <p>Forecast : {el.weather_state_name}</p>
                    <p>Min. Temp : {Math.round(el.min_temp)}°C</p>
                    <p>Max. Temp : {Math.round(el.max_temp)}°C</p>
                    <p>Avg. Temp : {Math.round(el.the_temp)}°C</p>
                    <p>Humidity : {Math.round(el.humidity)}%</p>
                    <p>Wind Speed : {Math.round(el.wind_speed)} mph</p>
                    <p>Visibility : {Math.round(el.visibility)} miles</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

WeatherForcastPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  match: PropTypes.object,
  getWeatherForcastData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  location: makeSelectLocation(),
  weather: makeSelectWeather(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function toFahrenheit(cel) {
  return (cel * 9) / 5 + 32;
}

export function mapDispatchToProps(dispatch) {
  return {
    getWeatherForcastData: woeid => dispatch(getWeatherForcast(woeid)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(WeatherForcastPage);
