import React from "react";
import PropTypes from 'prop-types';
import Drawer from "@material-ui/core/Drawer";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { DRAWER_WIDTH } from "./Constants";
import {DRAWER_COLOR} from "../../Colors";

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: DRAWER_WIDTH,
    backgroundColor: DRAWER_COLOR,
  },
}));

export const MobileDrawerContainer = props => {
  const { open, children, container, onClose } = props;
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Drawer
      container={container}
      variant="temporary"
      anchor={theme.direction === 'rtl' ? 'right' : 'left'}
      open={open}
      onClose={onClose}
      classes={{
        paper: classes.drawerPaper,
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      {children}
    </Drawer>
  )
};

MobileDrawerContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  container: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};
