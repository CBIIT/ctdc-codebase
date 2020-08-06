import React from 'react';
import GraphiQL from 'graphiql';
import { withStyles } from '@material-ui/core';
import fetch from 'isomorphic-fetch';
import customDefaultQuery from './GraphiqlDefaultQuery';

const BACKEND = process.env.REACT_APP_BACKEND_API;

function graphQLFetcher(graphQLParams) {
  return fetch(BACKEND, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then((response) => response.json());
}

const GraphqlView = ({ classes }) => (
  <div className={classes.grapqhQlContainer}>
    <GraphiQL
      query={customDefaultQuery}
      editorTheme="solarized light"
      fetcher={graphQLFetcher}
    />
  </div>
);


const styles = () => ({
  grapqhQlContainer: {
    height: '600px',
    marginTop: '-44px',
  },
});


export default withStyles(styles)(GraphqlView);
