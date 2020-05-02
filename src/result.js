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
import ReactJoin from 'react-join'
import ErrorIcon from '@material-ui/icons/Error';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Chip from '@material-ui/core/Chip';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import { makeStyles } from '@material-ui/styles';
import { dateToDateString } from './utils';

const useStyles = makeStyles(() => ({
    chip: {
      margin: '0px 5px 0px 5px',
    },
    errorMessage:{
      fontSize: '0.8rem',
    }
}));

export function renderTravelCheck(tc, classes){
  return(
    <Chip
      icon={ tc.type === 'DEP' ? <ArrowUpward/> : <ArrowDownward />}
      className={ classes ? classes.chip : "" }
      label={ `${ dateToDateString(tc.date) } : ${tc.location}` } />
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
                { renderParsingErrors(props.errors, classes) }
      </Card>
  </Box>
  </Grid>
  )
}

export function Result(props) {
  const classes = useStyles(props);
  let content = 
  <CardContent>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
            <TableRow key="inside-count">
              <TableCell component="th" scope="row">
                Total days inside the US:
              </TableCell>
              <TableCell/>
              <TableCell align="right">{props.totalDaysInside}</TableCell>
            </TableRow>
            <TableRow key="outside-count">
              <TableCell component="th" scope="row">
                Total days outside the US:
              </TableCell>
              <TableCell/>
              <TableCell align="right">{props.totalDaysOutside}</TableCell>
            </TableRow>
            <TableRow key="window-count">
              <TableCell component="th" scope="row">
                Total days in window:
              </TableCell>
              <TableCell/>
              <TableCell align="right">{props.totalDaysWindow}</TableCell>
            </TableRow>
            <TableRow key="window-period">
              <TableCell component="th" scope="row">
                Selected period
              </TableCell>
              <TableCell align="left">
              From { dateToDateString(props.dateWindowStart) }
              </TableCell>
              <TableCell align="left">
              To { dateToDateString(props.dateWindowStop) }
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </CardContent>

  if (props.totalErrors > 0){
    content = 
    <CardContent>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
          Unable to calculate a result, please fix the { props.totalErrors } errors and try again.
      </Typography>
    </CardContent>
  }

  return (
  <Grid item xs={12} >
  <Box>
      <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <span role="img" aria-label="tooltip-calc-title">🧮</span> Results
            </Typography>
          </Toolbar>
      </AppBar>
      <Card className={classes.root}>
        {content}
      </Card>
  </Box>
  </Grid>
  )
}
