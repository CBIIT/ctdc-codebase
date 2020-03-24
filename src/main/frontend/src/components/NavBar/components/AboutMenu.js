import React from 'react';
import {
  Button, withStyles,
} from '@material-ui/core';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import DropdownMenu from './DropdownMenu';

const AboutMenu = ({ classes }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMoveOut() {
    setAnchorEl(null);
  }

  return (
    <div
      onMouseEnter={handleClick}
      onMouseLeave={handleMoveOut}
      className={classes.aboutMenu}
    >
      <Button
        id="button_navbar_about"
        weight="medium"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onFocus={handleClick}
        className={classes.logotype}
        classes={{ root: classes.buttonRoot }}
        activeStyle={{ borderBottom: '2px solid  #39C0F0' }}
      >
        About
        <ExpandMoreRoundedIcon className={classes.icon} />
      </Button>
      {anchorEl === null ? '' : <DropdownMenu />}
    </div>
  );
};

const styles = (theme) => ({
  logotype: {
    whiteSpace: 'nowrap',
    color: theme.palette.primary.contrastText,
    fontFamily: 'Lato',
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '0.9px',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    '&:hover, &:focus': {
      borderRadius: '0',
    },
  },
  buttonRoot: {
    paddingTop: '9px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  icon: {
    fontSize: '18px',
  },
  paper: {
    background: '#309EC4',
    padding: '6px 16px 16px 16px',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    fontFamily: 'Lato',
    fontSize: '13px',
    fontWeight: '800',
    lineSpacing: '1px',
    display: 'block',
    marginTop: '13px',
    '&:hover': {
      cursor: 'pointer',
      color: 'white',
    },
  },
  aboutItemsWrapper: {
    maxWidth: '150px',
  },
  aboutMenu: {
    float: 'right',
  },
});

export default withStyles(styles)(AboutMenu);
