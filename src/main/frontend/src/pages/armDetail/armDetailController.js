import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArmDetail from './armDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { ARMS_BY_ID_QUERY } from '../../utils/graphqlQueries';
import Error from '../error/Error';

const ArmDetailContainer = ({ match }) => (
  <Query query={ARMS_BY_ID_QUERY} variables={{ arm_id: match.params.id }}>
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
      if (!data || !data.armDetail || !data.armDetail.arm_id) {
        return <Error />;
      }

      return <ArmDetail data={data} />;
    }}
  </Query>
);

export default ArmDetailContainer;
