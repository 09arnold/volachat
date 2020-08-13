import React from 'react';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles({
  paper: {
    top: '7.5%',
    position: 'absolute',
    margin: 'auto',
  },

}, { name: 'MuiDialog' });

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1, 2),
  },
}))(MuiDialogActions);

function PaperComponent(props) {
  return (
    <Draggable handle="#customized-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function AppDialog(props) {
  const dialogStyles = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Dialog
        disableEnforceFocus
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        maxWidth={props.maxWidth}
        PaperComponent={PaperComponent}
        classes={dialogStyles}
        scroll='paper'
        fullScreen={fullScreen}
        fullWidth={true}>
        {props.showTitle ? (
          <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
            {props.title}
          </DialogTitle>
        ) : null}

        <DialogContent id={props.isCallDialog ? 'customized-dialog-title' : ''}>
          {props.children}
        </DialogContent>
        {props.showFooter ?
          (
            <>
              <Divider variant="middle" />
              <DialogActions >
                <Button onClick={props.handleClose} >
                  {props.buttonLabel}
                </Button>
                {props.dialogButtons ? (
                  props.dialogButtons.map((button, index) => (
                    <Button onClick={button.action} variant="contained" key={index} color={button.primary ? 'primary' : ''}>
                      {button.label}
                    </Button>
                  ))
                ) : null}
              </DialogActions>
            </>) : ''
        }
      </Dialog>
    </div>
  );
}

AppDialog.defaultProps = {
  title: 'Dialog',
  buttonLabel: 'Close',
  isCallDialog: false,
  maxWidth: 'md',
  showFooter: true,
  showTitle: true
}