import Hidden from "@material-ui/core/Hidden";
import {MobileDrawerContainer} from "./drawer/MobileDrawerContainer";
import {DesktopDrawerContainer} from "./drawer/DesktopDrawerContainer";
import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import {DRAWER_WIDTH} from "./drawer/Constants";

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
}));

export const Sidebar = props => {
  const { open, children, onClose, window } = props;

  const classes = useStyles();
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <MobileDrawerContainer
          open={open}
          onClose={onClose}
          container={container}>
          {children}
        </MobileDrawerContainer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <DesktopDrawerContainer>
          {children}
        </DesktopDrawerContainer>
      </Hidden>
    </nav>
  )
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,

  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
