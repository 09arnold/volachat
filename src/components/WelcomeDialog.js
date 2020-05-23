import React, { useState } from 'react';
import AppDialog from './utils/AppDialog';

import AppStorage from '../utils/app-storage';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';

import VpnLockIcon from '@material-ui/icons/VpnLock';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    // height: 224,
  },
  verticalForm: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: theme.spacing(1.5)
    }
  },
  content: {
    flexGrow: 1,
  },
  step: {
    height: theme.spacing(62.5),
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  stepper: {
    backgroundColor: theme.palette.background.paper,
    // transition: 'visibility 330ms'
  }
}));

export default function WelcomeDialog(props) {

  const classes = useStyles();
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const [peerId] = useState(AppStorage.getItem('peerId') || new Date().getTime());
  const [userName, setUserName] = useState(AppStorage.getItem('userName') || '');


  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  // const saveConfig = event => {
  //   AppStorage.setItem('volachat', {
  //     ...volachat,
  //     name,
  //     peerId
  //   });
  //   props.close();
  // }

  const handleNameChange = event => {
    setUserName(event.target.value);
  }

  const handleWelcomeClose = (event) => {
    // AppStorage.setItem('volachat', {
    //   ...volachat,
    //   name,
    //   peerId
    // });
    AppStorage.setItem('peerId', peerId);
    AppStorage.setItem('userName', userName);
    props.closeModal()
  };

  const steps = [
    (
      <>
        <Typography variant="h4" gutterBottom>
          Welcome to Volachat
            </Typography>
        <div style={{ flexGrow: 1 }}></div>
        <Typography variant="body2" style={{ margin: theme.spacing(3) }}>
          Volachat is a WebRTC powered communications app. This means your messages <em>don't go through any server</em>.
              <br />
              They are transmitted directly to whoever you're messaging!
            </Typography>

      </>
    ),
    (
      <>
        <Typography variant="h4" gutterBottom>
          Everything is Local!
            </Typography>
        {/* <VpnLockIcon style={{ fontSize: 40 }} /> */}
        <div style={{ flexGrow: 1, display: 'flex' }}>
          <img src='/img/local.png' alt='Some image about "local"' style={{ width: theme.spacing(30), height: theme.spacing(30), margin: 'auto' }} />
        </div>
        <Typography variant="body2" style={{ margin: theme.spacing(3) }}>
          Your entire chat experience exists only in the <strong>localStorage</strong> of the browser you're using.
              <br />
        </Typography>
      </>
    ),
    (
      <>
        <Typography variant="h6" gutterBottom>
          ...Local Storage for all the things
            </Typography>
        {/* <VpnLockIcon style={{ fontSize: 40 }} /> */}
        <div style={{ flexGrow: 1, display: 'flex' }}>
          <img src='/img/safe.png' alt='Some image about "local"' style={{ width: theme.spacing(30), height: theme.spacing(30), margin: 'auto' }} />
        </div>
        <small style={{ margin: theme.spacing(3) }}>
          What does this mean?
                <ul style={{ textAlign: 'left', marginTop: 0 }}>
            <li>Every different browser you use Volachat in will have a different <em>"account"</em></li>
            <li>Incognito mode will not save <em>anything at all</em> after you close it</li>
            <li>If your localStorage is cleared , you will have to restart your whole chat experience</li>
          </ul>
        </small>
      </>
    ),
    (
      <>
        <Typography variant="h4" gutterBottom>
          Let's get started
            </Typography>
        <div style={{ flexGrow: 1, display: 'flex' }}>
          <img src='/img/chat.png' alt='It appears this image belongs to Atlassian' style={{ height: theme.spacing(25), margin: 'auto' }} />
        </div>
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <TextField
            id="name"
            label="Name"
            value={userName}
            style={{ alignSelf: 'center', margin: 'auto', minWidth: theme.spacing(56.25) }}
            onChange={handleNameChange}
            helperText="Name that appears in friends' chat list"
          />
          <TextField
            id="peerid"
            label="Peer ID"
            disabled
            defaultValue={peerId}
            helperText="Other users will connect to you using this ID"
          />
        </div>
        <div>
          {/* <div style={{ marginTop: theme.spacing(2) }}>
                <Button variant='contained' color='primary' onClick={handleNext}>Let's Start</Button>
              </div> */}
        </div>
      </>
    )
  ];

  // Stepper handlers and buttons
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const nextButton = (activeStep !== steps.length - 1 ?
    (<Button size="small" onClick={handleNext} disabled={activeStep === steps.length - 1}>
      Next
      {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
    </Button>)
    :
    (<Button size="small" variant='contained' onClick={handleWelcomeClose} color='primary' disabled={userName ? false : true}>
      Let's Start
    </Button>)
  );

  return (
    <AppDialog open={props.open} handleClose={props.close} title='' showFooter={false}>
      <div className={classes.root}>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          className={classes.content}
        >
          {steps.map((step, index) => (
            <div className={classes.step} key={index}>
              {step}
            </div>
          ))}
        </SwipeableViews>
        <MobileStepper
          variant="dots"
          steps={steps.length}
          className={classes.stepper}
          position="static"
          activeStep={activeStep}
          nextButton={nextButton}
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          Back
        </Button>
          }
        />
      </div>
    </AppDialog>
  );
}

