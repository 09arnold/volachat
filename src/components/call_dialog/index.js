import React, { useState, useEffect, useRef } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import VideocamIcon from '@material-ui/icons/Videocam';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import CallEndIcon from '@material-ui/icons/CallEnd';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';

import Dialog from '@material-ui/core/Dialog';
import Draggable from 'react-draggable';
import { getLocalPeer, callPeer } from "../../webrtc/index";
import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ColorThief from "colorthief";
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    // background: rgb(2, 0, 36),
    // background: radial-gradient(circle, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(146, 7, 150, 1) 53%, rgba(0, 212, 255, 1) 100%),
    position: 'relative',
    minHeight: theme.spacing(56.25),
    height: '100%',
    '&:hover $controls': {
      opacity: 1,
      background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%)',
      padding: theme.spacing(2, 0),
    }
  },
  controls: {
    opacity: 0.0125,
    position: 'absolute',
    bottom: theme.spacing(0),
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    textAlign: 'center',
    transition: 'all .3s'
  },
  videoDisplay: {
    position: 'absolute',
    top: 0,
    left: '50%',
    height: '100%',
    transform: 'translateX(-50%)',
    width: '100%',
    height: '100%',
  },
  ogCallRoot: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: 1,
    transition: 'background .75s'
  },
  ring: {
    boxShadow: '0px 0px 0px 0px rgba(100, 100, 100, 0.65)',
    transition: ' all 250ms',
    animationName: '$ring',
    animationDuration: '1150ms',
    animationIterationCount: 'infinite',
    animationDelay: '100ms',
    // animationDirection: 'alternate',
  },
  '@keyframes ring': {
    from: { boxShadow: ' 0px 0px 5px 2.5px rgba(100, 100, 100, 0.65)' },
    to: {
      boxShadow: '0px 0px 20px 20px rgba(100, 100, 100, 0.15)',
    }
  },
  grow: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > p': {
      marginTop: theme.spacing(8)
    }
  },
  avatarLarge: {
    width: theme.spacing(16),
    height: theme.spacing(16),
    marginTop: theme.spacing(7.5),
    borderRadius: '50%',
  }
}));

export default function CallDialog(props) {
  const classes = useStyles();
  let RTCPeer = null;

  const [connected, setConnected] = useState(false)
  const [colorThiefColors, setColorThiefColors] = useState(null)
  const [openCallDialog, setOpenCallDialog] = useState(false);
  const [callScreen, setCallScreen] = useState(null);
  // const callingAvatarRef = useRef();
  const ogCallRootRef = useRef();

  let [callSnackbarOpen, setCallSnackbarOpen] = useState(false);
  let [call, setCall] = useState(null);

  const colorThief = new ColorThief();

  const saveConfig = event => {
    props.close();
  }

  const dialogButtons = [
    {
      label: 'Save',
      action: saveConfig,
      primary: true
    }
  ];
  const answerCall = () => {
    setCallSnackbarOpen(false);
    // setOpenCallDialog(true);
    setCallScreen(connectedScreen)
    props.openCallDialog();
    setTimeout(() => {
      let video = document.querySelector('#mediaElement');
      video.srcObject = call.remoteStream;
      call.answer();
    }, 0);
  }

  const endCall = () => {
    if (call && call.close) {
      call.close();
    }
    let video = document.querySelector('#mediaElement');
    if (video) video.srcObject = null;
    setCallSnackbarOpen(false);
    setOpenCallDialog(false);
    props.closeCallDialog();
  }

  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

  const action = (
    <>
      <Button color="primary" size="small" disableElevation variant="contained" onClick={answerCall} style={{ margin: '0 10px' }} className={classes.ring}>
        <CallIcon />
      </Button>
      <Button color="secondary" size="small" disableElevation variant="contained" onClick={endCall}>
        <CallEndIcon />
      </Button>
    </>
  );

  if (!RTCPeer) {
    (async () => {
      RTCPeer = await getLocalPeer();
      if (RTCPeer) {
        RTCPeer.on('call', incomingCall => {
          // props.openDialog(true);
          setCallSnackbarOpen(true);
          setCall(incomingCall);
          console.log('Call ooo....', incomingCall)
        })
      }
    })();
  }

  useEffect(() => {
    if (props.open) {
      setOpenCallDialog(true);
      (async () => {
        var constraints = {
          audio: true,
          video: false
        };
        navigator.mediaDevices.getUserMedia(constraints)
          .then(function (stream) {
            var audioTracks = stream.getAudioTracks();
            console.log('Got stream with constraints:', constraints);
            console.log('Using audio device: ' + audioTracks[0].label);
            stream.onremovetrack = function () {
              console.log('Stream ended');
            };
            call = callPeer(stream, props.user.id)
            setCall(call);
          })
          .catch(function (error) {
            if (error.name === 'ConstraintNotSatisfiedError') {
              console.error('The resolution ' + constraints.audio.width.exact + 'x' +
                constraints.audio.height.exact + ' px is not supported by your device.');
            } else if (error.name === 'PermissionDeniedError') {
              console.error('Permissions have not been granted to use your camera and ' +
                'microphone, you need to allow the page access to your devices in ' +
                'order for the demo to work.');
            }
            console.error('getUserMedia error: ' + error.name, error);
          });
        setTimeout(() => {
          const img = document.querySelector(`#img${props.user.id}`);
          if (img.complete) {
            colorThief.getColor(img);
          } else {
            img.addEventListener('load', function () {
              let colors = colorThief.getPalette(img, 5),
                color = colorThief.getColor(img),
                colorString = 'linear-gradient(45deg'
              const len = Math.min(5, colors.length)
              for (let i = 0; i < len; i++) {
                colorString += ', rgba(' + colors[i].toString() + ',.5) ' + Math.round((100 / (len - 2)) * i) + '%'
              }
              colorString += ', rgba(' + color.toString() + ',.5) 100%)'
              // setColorThiefColors(colorString);
              ogCallRootRef.current.style.background = colorString
              console.log(color);
            });
          }
        }, 0);
      })();
      setCallScreen(outgoingCallScreen);
    }
  }, [props.open, props.user]);

  const CallDialog = withStyles({
    root: {
      pointerEvents: "none"
    },
    paper: {
      pointerEvents: "auto"
    }
  })(props => <Dialog hideBackdrop {...props} />);

  const outgoingCallScreen = (
    <div className={classes.ogCallRoot} ref={ogCallRootRef}>
      <div className={classes.grow}><Typography variant="h4" component='p'>
        {props.user && props.user.userName}
      </Typography>
        <div>Outgoing call</div>
        <img
          crossOrigin="anonymous"
          alt={props.user && props.user.userName}
          src={props.user && props.user.avatar}
          className={`${classes.avatarLarge} ${classes.ring}`}
          id={`img${props.user && props.user.id}`}
        />
      </div>
      <Button variant="contained" color="secondary" style={{ borderRadius: '50%', height: '64px', marginBottom: '20px' }} onClick={endCall} size="small">
        <CallEndIcon />
      </Button>
    </div>
  );
  const connectedScreen = (<>
    {/* <video className={classes.videoDisplay}
      src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
      autoPlay>
    </video> */}
    <video autoPlay id="mediaElement" className={classes.videoDisplay} />
    <div className={classes.controls}>
      <IconButton>
        <VolumeOffIcon />
      </IconButton>
      <Button variant="contained" style={{ borderRadius: '50%', width: '60px', height: '60px' }} color="secondary" onClick={endCall}>
        <CallEndIcon fontSize="large" />
      </Button>
      <IconButton>
        <VideocamIcon />
      </IconButton>
    </div>
  </>);

  return (
    <>
      <Snackbar
        open={callSnackbarOpen}
        key={'bottom' + 'right'}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={TransitionUp}
      >
        <SnackbarContent message={`Incoming Call - ${props.incomingCaller && props.incomingCaller.userName}`} action={action} />
      </Snackbar>
      <Draggable handle="#customized-dialog-title">
        <CallDialog
          id="customized-dialog-title"
          disableEnforceFocus
          onClose={props.closeCallModal}
          aria-labelledby="customized-dialog-title"
          open={openCallDialog}
          maxWidth={props.maxWidth}
          scroll='paper'
          fullWidth={true}>
          <div className={classes.root}>
            {callScreen}
          </div>
        </CallDialog>
      </Draggable>
    </>
  );
}