import React from 'react';
import { withStyles } from '@material-ui/core';
import HorseShoe from './HorseShoe';
import ActiveCases from '../../assets/landing/animation/activeCases.svg';
import InActiveCases from '../../assets/landing/animation/InActiveCases.svg';
import ActiveFiles from '../../assets/landing/animation/activeFiles.svg';
import InActiveFiles from '../../assets/landing/animation/InActiveFiles.svg';
import ActiveTrials from '../../assets/landing/animation/activeTrials.svg';
import InActiveTrials from '../../assets/landing/animation/InActiveTrials.svg';
import CircularIcon from './CircularIcon';
import FacingDown from '../../assets/landing/animation/Dial_facing_down.svg';
import FacingUp from '../../assets/landing/animation/Dial_facing_up.svg';
import FacingRight from '../../assets/landing/animation/Dial_facing_right.svg';

const InteractiveHero = ({ classes }) => {
  const [activeState, setActiveState] = React.useState({
    isActive: 'cases',
    transformedHorseShoe: FacingUp,
  });

  return (
    <div className={classes.animationWrapper}>
      <div className={classes.casesIcon} onMouseEnter={() => { setActiveState({ isActive: 'cases', transformedHorseShoe: FacingUp }); }}>
        <CircularIcon isActive={activeState.isActive === 'cases'} InactiveImage={InActiveCases} activeImage={ActiveCases} />
      </div>
      <div className={classes.casesText}>
        <svg viewBox="0 0 1000 1000">
          <path stroke="green" strokeWidth="18" fill="none" d="M100 500 l 300 0  l 100 200 " />
          <circle id="pointA" strokeWidth="18" stroke="green" cx="400" cy="300" r="30" />
          <text x="350" y="200" fontSize="30px" fontFamily="sans-serif" fill="black" stroke="none" textAnchor="middle">Cases 10</text>
        </svg>
        {/* <text x="100" y="350" dx="-30">Cases 10</text> */}
        <text x="100" y="300" dx="-30">Hello</text>
      </div>
      <HorseShoe transformedHorseShoe={activeState.transformedHorseShoe} />

      <div className={classes.trialsIcon} onMouseEnter={() => { setActiveState({ isActive: 'trails', transformedHorseShoe: FacingRight }); }}>
        <CircularIcon isActive={activeState.isActive === 'trails'} InactiveImage={InActiveTrials} activeImage={ActiveTrials} />
      </div>
      <div className={classes.filesIcon} onMouseEnter={() => { setActiveState({ isActive: 'files', transformedHorseShoe: FacingDown }); }}>
        <CircularIcon isActive={activeState.isActive === 'files'} InactiveImage={InActiveFiles} activeImage={ActiveFiles} />
      </div>
    </div>
  );
};

const styles = () => ({
  animationWrapper: {
    left: '0px',
    position: 'absolute',
    '@media (min-width: 800px)': {
      left: 'calc(60%)',
    },
    '@media (min-width: 1100px)': {
      left: 'calc(70%)',
    },
  },
  casesIcon: {
    position: 'absolute',
    float: 'left',
    marginTop: '50px',
    width: '100px',
    left: '40px',
  },
  casesText: {
    position: 'absolute',
    // float: 'left',
    marginTop: '50px',
    // width: '100px',
    left: '160px',
  },
  trialsIcon: {
    left: '220px',
    position: 'absolute',
    float: 'left',
    marginTop: '220px',
    width: '100px',
  },
  filesIcon: {
    marginTop: '400px',
    position: 'absolute',
    float: 'left',
    left: '40px',
  },
});


export default withStyles(styles)(InteractiveHero);
