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

const key = 'weather';
function WeatherForcastPage({ getWeatherForcastData, match: { params } }) {
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
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
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
