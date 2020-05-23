import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import TextField from '@material-ui/core/TextField';
import AppDialog from './utils/AppDialog';

import AppStorage from '../utils/app-storage';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    // height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  verticalForm: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: theme.spacing(1.5)
    }
  }
}));

export default function AppSettings(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [peerId] = useState(AppStorage.getItem('peerId') || new Date().getTime());
  const [userName, setUserName] = useState(AppStorage.getItem('userName') || '');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const saveConfig = event => {
    AppStorage.setItem('peerId', peerId);
    AppStorage.setItem('userName', userName);
    props.close();
  }

  const dialogButtons = [
    {
      label: 'Save',
      action: saveConfig,
      primary: true
    }
  ]

  const handleNameChange = event => {
    setUserName(event.target.value);
  }

  return (
    <AppDialog open={props.open} handleClose={props.close} title='Settings' dialogButtons={dialogButtons}>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          {/* <Tab label="Profile" {...a11yProps(0)} /> */}
          {/* <Tab label="Chat" {...a11yProps(1)} /> */}
          {/* <Tab label="Notifications" {...a11yProps(2)} /> */}
          <Tab label="Connection" {...a11yProps(0)} />
          <Tab label="Storage" {...a11yProps(1)} />
          <Tab label="Help" {...a11yProps(2)} />
        </Tabs>
        {/* <TabPanel value={value} index={0}>
        Profile
      </TabPanel>
      <TabPanel value={value} index={1}>
        Chat
      </TabPanel>
      <TabPanel value={value} index={2}>
        Notifications
      </TabPanel> */}
        <TabPanel value={value} index={0}>
          <form className={classes.verticalForm} noValidate autoComplete="off">
            <TextField
              id="name"
              label="Name"
              value={userName}
              autoFocus
              onChange={handleNameChange}
              helperText="Name that appears in friends' chat list"
            />
            <TextField
              id="peerid"
              label="Peer ID"
              disabled
              defaultValue={peerId}
              helperText="ID that other users' app will use to connect to you"
            />
          </form>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Storage
      </TabPanel>
        <TabPanel value={value} index={2}>
          Help
      </TabPanel>
      </div>
    </AppDialog>
  );
}


// const tabs = [
//   { label: 'Profile' },
//   { label: 'Chat' },
//   { label: 'Notifications' },
//   { label: 'Connection' },
//   { label: 'Storage' },
//   { label: 'Help' }
// ];
// {
//   tabs.map((tab, index) => (
//     <Tab label={tab.label} {...a11yProps(index)} key={index} />
//   ))
// }
// {
//   tabs.map((tab, index) => (
//     <TabPanel value={value} index={index} key={index}>
//       {tab.label}
//     </TabPanel>
//   ))
// }