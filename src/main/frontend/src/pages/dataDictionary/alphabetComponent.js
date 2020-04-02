/* eslint-disable */

import React from 'react';
import { Link, animateScroll as scroll } from "react-scroll";
import { withStyles } from '@material-ui/core';


const alpahabets = ['A','B','C','D','E', 'F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];// 61 bytes

const AlphabetComponent = ({ classes }) => (
  <div className={classes.alphabetContainer}>
<div className={classes.dictText}>DATA DICTIONARY</div>
        <span className={classes.alphabetText}>
          {alpahabets && alpahabets.map((alpahabet)=>(<Link
                activeClass="active"
                to={alpahabet}
                spy
                smooth
                offset={-70}
                duration={500}
              >
               |&nbsp;{alpahabet}&nbsp;
              </Link>))}
        
        </span>
        </div>
);
const styles = () => ({
  dictText:{
    display: 'inline',
    color: '#2F2F2F',
    fontFamily: 'Lato',
    fontSize: 21,
    fontWeight: 'bold',
  },
  alphabetText:{
    paddingLeft: '32px',
  },
  alphabetContainer:{
    paddingTop: '32px',
    paddingBottom: '32px',
    paddingLeft: '32px',
  },
});

export default withStyles(styles)(AlphabetComponent);