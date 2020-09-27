import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DRAWER_WIDTH } from "../drawer/Constants";
import { SearchBar } from "../SearchBar";
import { APP_PRIMARY } from "../../Colors";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: APP_PRIMARY,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
    whiteSpace: 'nowrap',
  }
}));

export const HeaderAppBar = props => {
  const{ title, searchValue, onDrawerToggle, onUpdateSearchValue } = props;

  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} component={'h5'} variant={'h5'}>{title}</Typography>
        <SearchBar
          placeholder={'Search Events'}
          searchValue={searchValue}
          onUpdateSearchValue={onUpdateSearchValue}
        />
      </Toolbar>
    </AppBar>
  )
};

HeaderAppBar.propTypes = {
  title: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
  onUpdateSearchValue: PropTypes.func.isRequired,
};
