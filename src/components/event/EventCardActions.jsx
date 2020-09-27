import { CardActions } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import MailOutlineRoundedIcon from "@material-ui/icons/MailOutlineRounded";
import React from "react";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      width: '100%',
      justifyContent: 'flex-end',
    }
  },
}));

export const EventCardActions = props => {
  const { isFavorite, onClickFavorite, onClickEmail } = props;
  const classes = useStyles();

  return (
    <CardActions className={classes.root} disableSpacing={true}>
      <IconButton onClick = {onClickFavorite} color='secondary' aria-label='add to favorites'>
        {isFavorite
          ? <FavoriteIcon/>
          : <FavoriteTwoToneIcon/>}
      </IconButton>
      <IconButton onClick={onClickEmail} aria-label='email'>
        <MailOutlineRoundedIcon />
      </IconButton>
    </CardActions>
  );
};

EventCardActions.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  onClickFavorite: PropTypes.func.isRequired,
  onClickEmail: PropTypes.func.isRequired,
};
