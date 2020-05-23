import React, { useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Tooltip from '@material-ui/core/Tooltip';

import NightsStayIcon from '@material-ui/icons/NightsStay';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import { connect } from 'react-redux';
import { setTheme } from "../../redux/actions";
import AppStorage from '../../utils/app-storage';

function ThemeSelector(props) {
  const themeAtLoad = AppStorage.getItem('appTheme');
  const [themeIcon, setThemeIcon] = React.useState(themeAtLoad === 'light' ? <NightsStayIcon /> : <WbSunnyIcon />);
  const [themeLabel, setThemeLabel] = React.useState(themeAtLoad === 'light' ? 'Dark Mode' : 'Light Mode');

  const toggleTheme = (event) => {
    if (props.appTheme === "light") {
      props.setTheme('dark');
      props.toggleTheme('dark');
    } else {
      props.setTheme('light');
      props.toggleTheme('light');
    }
  }

  useEffect(() => {
    setThemeIcon(props.appTheme === 'light' ? <NightsStayIcon /> : <WbSunnyIcon />);
    setThemeLabel(props.appTheme === 'light' ? 'Dark Mode' : 'Light Mode');
  }, [props.appTheme]);

  return (
    <Tooltip title={'Theme'}>
      < ListItem button style={{ flexGrow: "0" }} onClick={toggleTheme}>
        <ListItemIcon>{themeIcon}</ListItemIcon>
        <ListItemText primary={themeLabel} />
      </ListItem >
    </Tooltip>
  )
}

const mapStateToProps = (state) => {
  return {
    appTheme: state.appTheme
  }
}

export default connect(mapStateToProps, { setTheme })(ThemeSelector)