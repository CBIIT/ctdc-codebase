import React from 'react';
import { Link } from 'react-scroll';
import { withStyles } from '@material-ui/core';

const AlphabetComponent = ({ classes, alphabetsData }) => (
  <div className={classes.alphabetContainer}>
    <div className={classes.dictText}>DATA DICTIONARY</div>
    <span className={classes.alphabetText}>
      {alphabetsData && alphabetsData.map((alphabetNode) => (
        alphabetNode.status ? (
          <Link
            activeClass={{ color: 'yellow' }}
            to={alphabetNode.alphabet}
            spy
            smooth
            offset={-180}
            duration={500}
          >
               |&nbsp;
            <span className={classes.alphabetExists}>{alphabetNode.alphabet}</span>
&nbsp;
          </Link>
        ) : (
          <span>
|&nbsp;
            {alphabetNode.alphabet}
&nbsp;
          </span>
        )))}

    </span>
  </div>
);
const styles = () => ({
  dictText: {
    display: 'inline',
    color: '#2F2F2F',
    fontFamily: 'Lato',
    fontSize: 21,
    fontWeight: 'bold',
  },
  alphabetText: {
    paddingLeft: '32px',
  },
  alphabetContainer: {
    paddingTop: '32px',
    paddingBottom: '32px',
    paddingLeft: '32px',
  },
  alphabetExists: {
    textDecoration: 'underline',
  },
});

export default withStyles(styles)(AlphabetComponent);
