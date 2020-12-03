import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ThemeContext from './utils/ThemeContext';
import HomeIcon from '@material-ui/icons/Home';
import EventNoteIcon from '@material-ui/icons/EventNote';
import ChatIcon from '@material-ui/icons/Chat';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Crop169Icon from '@material-ui/icons/Crop32';
import TabIcon from '@material-ui/icons/Tab';

const useStyles = makeStyles({
  root: {
    width:"100%",
    bottom:"0px",
    position:"fixed"
  },
});

export default function MobileBottomNav() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const themeContext = useContext(ThemeContext);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
      style={{background: themeContext.themes === "dark" ? "#999999" : "white"}}
    >
      <BottomNavigationAction style={{outline:"none"}} label="secure chat" icon={<ChatIcon />} />
      <BottomNavigationAction  style={{outline:"none"}} label="home" icon={<DashboardIcon />} />
      <BottomNavigationAction  style={{outline:"none"}} label="open tabs" icon={<Crop169Icon />} />
    </BottomNavigation>
  );
}