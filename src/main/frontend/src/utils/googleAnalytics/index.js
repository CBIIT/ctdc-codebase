// utils/GoogleAnalytics.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { Route } from 'react-router-dom';

class GoogleAnalytics extends Component {
  componentDidMount() {
    const { props } = this;
    this.logPageChange(props.location.pathname, props.location.search);
  }

  componentDidUpdate({ location: prevLocation }) {
    const { location: { pathname, search } } = this.props;
    const isDifferentPathname = pathname !== prevLocation.pathname;
    const isDifferentSearch = search !== prevLocation.search;

    if (isDifferentPathname || isDifferentSearch) {
      this.logPageChange(pathname, search);
    }
  }

  logPageChange(pathname, search = '') {
    const page = pathname + search;
    const { location } = window;
    const { props } = this;
    ReactGA.set({
      page,
      location: `${location.origin}${page}`,
      ...props.options,
    });
    ReactGA.pageview(page);
  }

  render() {
    return null;
  }
}

GoogleAnalytics.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
//   options: PropTypes.object,
};

const RouteTracker = () => <Route component={GoogleAnalytics} />;

const init = (options = {}) => {
  const env = process.env || {};
  const isGAEnabled = !!env.REACT_APP_GA_TRACKING_ID;

  if (isGAEnabled) {
    ReactGA.initialize(
      env.REACT_APP_GA_TRACKING_ID, {
        debug: env.REACT_APP_GA_DEBUG === 'true',
        ...options,
      },
    );
  }

  return isGAEnabled;
};

const sendEvent = (category, action, label, value = null) => {
  const event = {
    category,
    action,
    label,
  };

  if (value !== null && typeof value === 'number') {
    event.value = value;
  }

  ReactGA.event(event);
};

export default {
  GoogleAnalytics,
  RouteTracker,
  init,
  sendEvent,
};
