import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: {
      [theme.breakpoints.up('sm')]: theme.spacing(3),
      [theme.breakpoints.down('sm')]: theme.spacing(1),
    },
  },
}));

export const ContentContainer = props => {
  const { children } = props;

  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {children}
    </main>
  );
};

ContentContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
