import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import LandingView from './landingView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { STATS_QUERY } from '../../utils/graphqlQueries';

const landingController = () => (
  <Query query={STATS_QUERY}>
    {({ data, loading, error }) => (loading ? <CircularProgress /> : (error ? <Typography variant="headline" color="warning" size="sm">{error && `An error has occurred in loading stats component: ${error}`}</Typography>
      : <LandingView statsData={data} />
    ))}
  </Query>
);

export default landingController;
