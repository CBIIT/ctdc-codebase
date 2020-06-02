import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import TrialView from './trialDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { TRIAL_BY_ID_QUERY } from '../../utils/graphqlQueries';
import Error from '../error/Error';

const TrialDetailContainer = ({ match }) => (
  <Query query={TRIAL_BY_ID_QUERY} variables={{ id: match.params.id }}>
    {({ data, loading, error }) => {
      // loading status
      if (loading) {
        return <CircularProgress />;
      }

      // error as a internet error
      if (error) {
        return <Typography variant="headline" color="warning" size="sm">{error && `An error has occurred in loading  component: ${error}`}</Typography>;
      }

      // error as not thing return from api
      if (!data || !data.clinicalTrialByTrialId[0] || data.clinicalTrialByTrialId.length === 0) {
        return <Error />;
      }

      return <TrialView data={data} />;
    }}
  </Query>
);


export default TrialDetailContainer;
