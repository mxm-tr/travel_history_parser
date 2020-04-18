import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export class Result extends React.Component {
    render () { 
        const classes = this.props;
    return (
    <Grid item xs={12} >
    <Box>
        <Card className={classes.root}>
            <CardContent>
            <Typography className={classes.title} component="h1">
                Results
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Total days inside the US: { this.props.totalDaysInside }
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Total days outside the US:  { this.props.totalDaysOutside }
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Total days in window: { this.props.totalDaysWindow }
            </Typography>
        </CardContent>
    </Card>
    </Box>
    </Grid>
    )}
}

export default withStyles(styles, { withTheme: true })(Result);