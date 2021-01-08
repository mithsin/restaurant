import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function TabPanel(props) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      className={classes.TabPanelRoot}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (children)}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  '@media only screen and (max-width: 599px)': {
    TabPanelRoot: {
        width: "calc(100% - 16px)",
        padding: "0 8px",
    }
},
}));

export default function MuiTabs({tabArray}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            {tabArray.map((tab, idx)=> <Tab key={`tab-${idx}`} label={tab.title} {...a11yProps(idx)} />)}
        </Tabs>
      </AppBar>
      {tabArray.map((tab, idx)=> 
        <TabPanel value={value} index={idx} key={`tab-panel-${idx}`}>
            {tab.page}
        </TabPanel>
      )}
    </div>
  );
}