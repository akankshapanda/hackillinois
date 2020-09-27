import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import { CardHeader, CardContent, Typography } from "@material-ui/core";
import { Event } from "../../models/Event";
import { getFormattedTime } from "../../utils/TimeUtils";
import { EventCardActions } from "./EventCardActions";
import { sendEmail } from "../../utils/EmailUtils";

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    borderRadius: 10,
  },
}));

export const EventCard = props => {
  const { event, onClickFavorite } = props;

  const classes = useStyles();

  const onClickEmail = () => {
    sendEmail(
      `Reminder: ${event.name}`,
      event.description,
    )
  };

  return (
    <Card className={classes.root} raised={true}>
      <CardHeader title={event.name} subheader={event.type}/>
      <CardContent>
        <Typography variant={'body2'} component={'h1'}>
          <b>Duration</b>: {getFormattedTime(event.startTime)} - {getFormattedTime(event.endTime)}
        </Typography>
        {event.description && (
          <React.Fragment>
            <br/>
            <Typography variant={'body2'} component={'h1'}>
              {event.description}
            </Typography>
          </React.Fragment>
        )}
      </CardContent>
      <EventCardActions
        isFavorite={event.favorite}
        onClickFavorite={onClickFavorite}
        onClickEmail={onClickEmail}
      />
    </Card>
  )
};

EventCard.propTypes = {
  event: PropTypes.instanceOf(Event).isRequired,
  onClickFavorite: PropTypes.func.isRequired,
};
