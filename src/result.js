import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ReactJoin from 'react-join'
import ErrorIcon from '@material-ui/icons/Error';
import Chip from '@material-ui/core/Chip';

import { makeStyles } from '@material-ui/styles';



const useStyles = makeStyles((theme) => ({
    chip: {
      margin: '0px 5px 0px 5px',
    },
    errorMessage:{
      fontSize: '0.8rem',
    }
}));

function renderTravelCheck(tc, classes){
  return(
    // <span className={ classes.travelChecks }>
    <Chip
      className={ classes.chip }
      label={ `${tc.date} : ${tc.location}` } />
    // </span>
  )
}

function renderParsingError(e, index, classes){
  const separator=
  <Typography className={classes.errorMessage} color="textPrimary" gutterBottom>
        and
  </Typography>

  return(
    <ListItem key={ index }>
        <ListItemIcon>
          <ErrorIcon />
        </ListItemIcon>
        <ReactJoin separator={separator}>
          { e.travelChecks.map((tc) => renderTravelCheck(tc, classes)) }
        </ReactJoin>
        <Typography className={classes.errorMessage} color="textPrimary" gutterBottom>
        { e.message }
        </Typography>
    </ListItem >
  )
}

function renderParsingErrors(errors, classes){
  return(
    <List variant="body2" >
      {errors.map((m, i) => renderParsingError(m, i, classes))}
      <Divider/>
    </List >
  )
}

export function ParsingErrors(props) {
    const classes = useStyles(props);
    if (props.errors === undefined){
      return ''
    }
    if (props.errors.length < 1){
      return ''
    }
    return (
  <Grid item xs={12} >
  <Box>
      <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Errors
            </Typography>
          </Toolbar>
      </AppBar>
      <Card className={classes.root}>
          {/* <CardContent>
            <Typography color="textPrimary" gutterBottom> */}
                { renderParsingErrors(props.errors, classes) }
            {/* </Typography>
          </CardContent> */}
      </Card>
  </Box>
  </Grid>
  )
}

export class Result extends React.Component {
    render () { 
    const classes = this.props;
    let content = 
    <CardContent>
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

    if (this.props.totalErrors > 0){
      content = 
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            Unable to calculate a result, please fix the { this.props.totalErrors } errors and try again.
        </Typography>
      </CardContent>
    }

    return (
    <Grid item xs={12} >
    <Box>
        <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Results
              </Typography>
            </Toolbar>
        </AppBar>
        <Card className={classes.root}>
          {content}
        </Card>
    </Box>
    </Grid>
    )}
}