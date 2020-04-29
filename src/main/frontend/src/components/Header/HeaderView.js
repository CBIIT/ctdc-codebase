import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import nihLogo from '../../assets/header/CTDC_Logo.svg';
// import icdcLogo from '../../assets/header/icdc_logo_white.svg';
import cancergraphic2000 from '../../assets/header/easter2000.png';


// import classes from '*.module.sass';

/**
 * Header
 */

const Header = ({ classes }) => (
  <div id="header" className={classes.headerBar}>
    <div className={classes.nihLogoContainer}>
      <Link to="/home">
        <img
          className={classes.nihLogoImg}
          src={nihLogo}
          alt="NCI CTDC Logo - Clinical Trials Data Commons"
        />
      </Link>
      {/* <img
        src={cancergraphic}
        alt="cancer_graphic"
      /> */}
    </div>
    <div className={classes.icdcLogoContainer}>
      <div className={classes.grow} />
      {/* <img
        src={cancergraphic}
        alt="cancer_graphic"
      /> */}
    </div>
  </div>
);

const styles = () => ({
  grow: {
    flexGrow: 3,
  },
  headerBar: {
    color: '#8A95A7',
    width: '100%',
    height: '100px',
    margin: '0 auto',
    display: 'flex',
    position: 'fixed',
    minHeight: '100px',
    justifyContent: 'space-between',
    top: '0px',
    zIndex: '1201',
    background: '#ffffff',
  },
  nihLogoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  icdcLogoContainer: {
    display: 'flex',
    width: '100%',
    paddingLeft: '24px',
    background: `url(${cancergraphic2000})`,
    overflow: 'hidden',
    '@media (min-width: 2400px)': {
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
    },
  },
  nihLogoImg: {
    width: '463px',
    cursor: 'pointer',
  },
  icdcLogoImg: {
    margin: '22px 35px auto',
    height: '39px',
    cursor: 'pointer',
  },
});


Header.defaultProps = {
  classes: {},
};

export default withStyles(styles)(Header);
