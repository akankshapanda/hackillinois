import PropTypes from "prop-types";
import ImmutablePropTypes from 'react-immutable-proptypes';
import {Tab} from "../models/Tab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {DRAWER_WIDTH} from "./drawer/Constants";
import {APP_PRIMARY, APP_WHITE} from "../Colors";

const useStyles = makeStyles(() => ({
  root: {
    color: APP_WHITE,
  },
}));


export const TabList = props => {
  const { tabs, selectedTab, onClickTab } = props;

  const classes = useStyles();

  return (
    <List disablePadding={true}>
      {tabs.map(tab => (
        <ListItem
          button
          className={classes.root}
          key={tab.name}
          onClick={() => onClickTab(tab)}
          selected={selectedTab.name === tab.name}
        >
          <ListItemText primary={tab.name} />
        </ListItem>
      ))}
    </List>
  );
};

TabList.propTypes = {
  tabs: ImmutablePropTypes.listOf(PropTypes.instanceOf(Tab)).isRequired,
  selectedTab: PropTypes.instanceOf(Tab),
  onClickTab: PropTypes.func.isRequired,
};
