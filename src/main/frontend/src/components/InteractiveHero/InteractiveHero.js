import React from 'react';
import { withStyles } from '@material-ui/core';
import classnames from 'classnames';
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

const InteractiveHero = ({ classes, statsData }) => {
  const [activeState, setActiveState] = React.useState({
    isActive: 'cases',
    transformedHorseShoe: FacingUp,
  });
  return (
    <div className={classes.animationWrapper}>
      <div className={classes.casesIcon} onMouseEnter={() => { setActiveState({ isActive: 'cases', transformedHorseShoe: FacingUp }); }}>
        <CircularIcon isActive={activeState.isActive === 'cases'} InactiveImage={InActiveCases} activeImage={ActiveCases} />
      </div>
      <div className={classnames({
        [classes.hide]: activeState.isActive !== 'cases',
      })}
      >
        <div className={classes.casesSVG}>
          <svg height="100" width="100">
            <path stroke="white" strokeWidth="1" fill="none" d="M0 50 l 30 -30  l 95 0 " />
            <circle id="pointA" strokeWidth="1" stroke="white" cx="97" cy="20" r="2" />
          </svg>
        </div>
        <div className={classes.casesText}>
Cases
          {statsData.numberOfCases}
        </div>
      </div>
      <HorseShoe transformedHorseShoe={activeState.transformedHorseShoe} />

      <div className={classes.trialsIcon} onMouseEnter={() => { setActiveState({ isActive: 'trails', transformedHorseShoe: FacingRight }); }}>
        <CircularIcon isActive={activeState.isActive === 'trails'} InactiveImage={InActiveTrials} activeImage={ActiveTrials} />
      </div>
      <div className={classnames({
        [classes.hide]: activeState.isActive !== 'trails',
      })}
      >
        <div className={classes.trialsSVG}>
          <svg height="100" width="100">
            <path stroke="white" strokeWidth="1" fill="none" d="M0 0 l 25 25  l 50 0 " />
            <circle id="pointA" strokeWidth="1" stroke="white" cx="75" cy="25" r="2" />
          </svg>
        </div>
        <div className={classes.trialsText}>
      Trials
          {statsData.numberOfTrials}
        </div>
      </div>
      <div className={classes.filesIcon} onMouseEnter={() => { setActiveState({ isActive: 'files', transformedHorseShoe: FacingDown }); }}>
        <CircularIcon isActive={activeState.isActive === 'files'} InactiveImage={InActiveFiles} activeImage={ActiveFiles} />
      </div>
      <div className={classnames({
        [classes.hide]: activeState.isActive !== 'files',
      })}
      >
        <div className={classes.filesSVG}>
          <svg height="100" width="100">
            <path stroke="white" strokeWidth="1" fill="none" d="M0 50 l 30 -30  l 95 0 " />
            <circle id="pointA" strokeWidth="1" stroke="white" cx="97" cy="20" r="2" />
          </svg>
        </div>
        <div className={classes.filesText}>
      Files
          {statsData.numberOfFiles}
        </div>
      </div>
    </div>
  );
};

const styles = () => ({
  animationWrapper: {
    left: '0px',
    position: 'absolute',
    '@media (min-width: 800px)': {
      left: 'calc(50%)',
    },
    '@media (min-width: 1100px)': {
      left: 'calc(70%)',
    },
  },
  casesIcon: {
    position: 'absolute',
    float: 'left',
    marginTop: '35px',
    width: '100px',
    left: '60px',
  },
  casesSVG: {
    position: 'absolute',
    float: 'left',
    marginTop: '15px',
    // width: '100px',
    left: '180px',
    color: '#FFFFFF',
    fontFamily: 'Oswald',
    fontSize: 22,
    fontWeight: 500,
  },
  casesText: {
    position: 'absolute',
    float: 'left',
    marginTop: '55px',
    // width: '100px',
    left: '250px',
    color: '#FFFFFF',
    fontFamily: 'Oswald',
    fontSize: 22,
    fontWeight: 500,
  },
  trialsIcon: {
    left: '300px',
    position: 'absolute',
    float: 'left',
    marginTop: '235px',
  },
  trialsSVG: {
    position: 'absolute',
    float: 'left',
    marginTop: '364px',
    // width: '100px',
    left: '370px',
    color: '#FFFFFF',
    fontFamily: 'Oswald',
    fontSize: 22,
    fontWeight: 500,
  },
  trialsText: {
    position: 'absolute',
    float: 'left',
    marginTop: '400px',
    // width: '100px',
    left: '400px',
    color: '#FFFFFF',
    fontFamily: 'Oswald',
    fontSize: 22,
    fontWeight: 500,
  },
  filesIcon: {
    marginTop: '450px',
    position: 'absolute',
    float: 'left',
    left: '60px',
  },
  filesSVG: {
    position: 'absolute',
    float: 'left',
    marginTop: '430px',
    // width: '100px',
    left: '180px',
    color: '#FFFFFF',
    fontFamily: 'Oswald',
    fontSize: 22,
    fontWeight: 500,
  },
  filesText: {
    position: 'absolute',
    float: 'left',
    marginTop: '430px',
    // width: '100px',
    left: '300px',
    color: '#FFFFFF',
    fontFamily: 'Oswald',
    fontSize: 22,
    fontWeight: 500,
  },
  hide: {
    display: 'none',
  },
});


export default withStyles(styles)(InteractiveHero);
