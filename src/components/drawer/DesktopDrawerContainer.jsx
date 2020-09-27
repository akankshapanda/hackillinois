import React from "react";
import PropTypes from 'prop-types';
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import { DRAWER_WIDTH } from "./Constants";
import { DRAWER_COLOR } from "../../Colors";

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: DRAWER_WIDTH,
    backgroundColor: DRAWER_COLOR,
  },
}));

export const DesktopDrawerContainer = props => {
  const { children } = props;
  const classes = useStyles();

  return (
    <Drawer
      classes={{
        paper: classes.drawerPaper,
      }}
      variant="permanent"
      open
    >
      {children}
    </Drawer>
  )
};

DesktopDrawerContainer.propTypes = {
  children: PropTypes.element.isRequired,
};
