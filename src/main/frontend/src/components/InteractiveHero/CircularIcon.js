import React from 'react';
import { withStyles } from '@material-ui/core';

const CircularIcon = ({
  classes, isActive, activeImage, regularImage,
}) => (
  <>
    <img className={classes.image} alt="img" src={isActive ? activeImage : regularImage} />
  </>
);

const styles = () => ({
  image: {
    height: '140px',
    width: '140px',
  },
});
export default withStyles(styles)(CircularIcon);