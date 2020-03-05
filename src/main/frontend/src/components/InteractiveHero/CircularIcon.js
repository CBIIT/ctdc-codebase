import React from 'react';
import { withStyles } from '@material-ui/core';

const CircularIcon = ({
  classes, isActive, activeImage, InactiveImage,
}) => (
  <>
    <img className={classes.image} alt="img" src={isActive ? activeImage : InactiveImage} />
  </>
);

const styles = () => ({
  image: {
    height: '132px',
    width: '132px',
  },
});
export default withStyles(styles)(CircularIcon);
