import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import List from "@material-ui/core/List";
import { ListItem } from "@material-ui/core";
import { Event } from "../../models/Event";
import { EventCard } from "./EventCard";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

export const EventContainer = props => {
  const { events, onClickFavorite } = props;

  const classes = useStyles();

  return (
    <List className={classes.root} disablePadding={true}>
      {events.map(event =>
        <ListItem key={event.id}>
          <EventCard
            event={event}
            onClickFavorite={() => onClickFavorite(event.id)}
          />
        </ListItem>
      )}
    </List>
  )
};

EventContainer.propTypes = {
  events: ImmutablePropTypes.listOf(PropTypes.instanceOf(Event)).isRequired,
  onClickFavorite: PropTypes.func.isRequired,
};
