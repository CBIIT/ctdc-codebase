import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import CaseDetailView from './caseDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_CASE_DETAIL_DATA_QUERY } from '../../utils/graphqlQueries';
import Error from '../error/Error';

const CaseDetailContainer = ({ match }) => (
  <Query query={GET_CASE_DETAIL_DATA_QUERY} variables={{ case_id: match.params.id }}>
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
      if (!data || data.caseDetailByCaseId.length === 0) {
        return <Error />;
      }

      return <CaseDetailView data={data} />;
    }}
  </Query>
);

export default CaseDetailContainer;
