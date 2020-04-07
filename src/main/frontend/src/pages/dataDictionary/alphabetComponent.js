import React from 'react';
import { Link } from 'react-scroll';
import { withStyles } from '@material-ui/core';

const AlphabetComponent = ({ classes, alphabetsData }) => (
  <div className={classes.alphabetContainer}>
    <div className={classes.dictText}>DATA DICTIONARY</div>
    <span className={classes.alphabetText}>
      {alphabetsData && alphabetsData.map((alphabetNode) => (
        alphabetNode.status ? (
          <span>
|&nbsp;
            <Link
              activeClass={classes.activeLink}
              to={alphabetNode.alphabet}
              spy
              smooth
              offset={-180}
              duration={500}
            >

              <span className={classes.alphabetExists}>{alphabetNode.alphabet}</span>
            </Link>
&nbsp;
          </span>
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
    letterSpacing: '1px',
    fontSize: '21px',
    fontWeight: 'bold',
  },
  alphabetText: {
    paddingLeft: '32px',
    letterSpacing: '1px',
    fontFamily: 'Poppins Regular',
    fontSize: '14px',
    color: '#929292',
  },
  alphabetContainer: {
    paddingTop: '32px',
    paddingBottom: '32px',
    paddingLeft: '32px',
  },
  alphabetExists: {
    textDecoration: 'underline',
    color: '#06849E',
    '&:hover': {
      cursor: 'pointer',
      fontFamily: 'Poppins Bold',
      textDecoration: 'none',
    },
  },
  activeLink: {
    fontFamily: 'Poppins Bold',
    background: '#28cde5',
  },
});

export default withStyles(styles)(AlphabetComponent);
