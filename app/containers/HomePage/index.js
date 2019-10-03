/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { Link } from 'react-router-dom';
import CenteredSection from './CenteredSection';
import { changeLocation } from './actions';
import { makeSelectLocation, makeSelectWeather } from './selectors';
import reducer from './reducer';
import saga from './saga';
import '../WeatherForcastPage/index.css';
import InputForm from '../../components/InputForm';
const key = 'home';

export function HomePage({
  location,
  // loading,
  // error,
  weather,
  onChangeLocation,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When initial state location is not null, submit the form to load repos
    // console.log(weather);
  }, []);
  // console.log('homepage===>>>', weather);
  return (
    <div className="robin">
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div>
        <div className="weather-box">
          <div className="logo">
            <img src={require('images/logo.png')} alt="logo" />
          </div>
          <form className="weather-form">
            <div className="input-form">
              <InputForm
                id="location"
                type="text"
                className="form-control"
                placeholder="e.g New DelhI, India"
                value={location}
                onChange={onChangeLocation}
              />
              <i className="fa fa-search" />
              <CenteredSection>
                <div
                  className="card"
                  style={{ width: '20rem', margin: 'auto' }}
                >
                  {weather.map(loc => (
                    <div key={loc.woeid} className="card-body">
                      <p style={{ padding: '2px' }} className="list-group-item">
                        <Link to={`/weather-forcast/${loc.woeid}`}>
                          {loc.title}
                        </Link>
                        <span> {loc.location_type}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </CenteredSection>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

HomePage.propTypes = {
  // loading: PropTypes.bool,
  // error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  weather: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  location: PropTypes.string,
  onChangeLocation: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  location: makeSelectLocation(),
  weather: makeSelectWeather(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeLocation: evt => dispatch(changeLocation(evt.target.value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
