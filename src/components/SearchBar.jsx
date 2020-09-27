import React from 'react';
import PropTypes from "prop-types";
import { Paper, InputBase, IconButton } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from "@material-ui/core/styles";
import { APP_WHITE, TRANSPARENT_OPACITY } from "../Colors";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: TRANSPARENT_OPACITY,
    margin: 10,
  },
  input: {
    color: APP_WHITE,
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  searchIcon: {
    fill: APP_WHITE,
  }
}));

export const SearchBar = props => {
  const { placeholder, searchValue, onUpdateSearchValue } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        value={searchValue}
        onChange={event => onUpdateSearchValue(event.target.value)}
      />
      <Hidden smDown implementation="css">
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon className={classes.searchIcon}/>
        </IconButton>
      </Hidden>
    </Paper>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
  onUpdateSearchValue: PropTypes.func.isRequired,
};
