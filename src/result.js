import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
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
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import moment from 'moment'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
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
      icon={ tc.type == 'DEP' ? <ArrowUpward/> : <ArrowDownward />}
      className={ classes ? classes.chip : "" }
      label={ `${moment(tc.date).format('YYYY/MM/DD')} : ${tc.location}` } />
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
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
              From { moment(props.dateWindowStart).format('YYYY/MM/DD') }
              </TableCell>
              <TableCell align="left">
              To { moment(props.dateWindowStop).format('YYYY/MM/DD') }
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <CardActions>
      <Button align="center" size="small"  color="primary" variant="contained" onClick={handleClickOpen('paper')}>
        More information
      </Button>
    </CardActions>
    <InfoDialog handleClickOpen={handleClickOpen} handleClose={handleClose} open={open} />
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
              Results
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

export function InfoDialog(props) {
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (props.open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [props.open]);

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        scroll={props.scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Additional Information</DialogTitle>
        <DialogContent dividers={props.scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Typography variant="h6" color="textPrimary">
              How to count the days?
            </Typography>
            <Typography variant="p">
              In most cases, the US immigration calculates travel durations with +1 day:
              what counts is the <b>amount of dates</b> you were inside/outside the US, not the amount of days.
              <br />
              (e.g: a trip from April 1st to April 3rd will be counted as a three days trip)
              <br />
              
              <br />
              <b>Departure and Arrival dates are counted both as Inside and Outside the US</b>:
              Given a trip abroad from April 1st to April 3rd, three days will be counted as Outside the US.
              Also, April 1st and April 3rd will be counted as Inside the US since you were traveling on these dates.
              <br/>
              That's why the sum of days Inside and Outside the US during a year is not equal to 365 (or 366)!
              <br/>
              <br/>

            </Typography>
            <Typography variant="h6" color="textPrimary">
              Simple example with one trip:
            </Typography>
            <Typography variant="p">
              Let's say you want to count your travel days in 2017 and the only trip you had
              was in Mexico on April 1st 2017, and you came back April 5th 2017. <br /> <br />
              This shows up in your I94 with the folowing travel checks: <br /> {
                renderTravelCheck({date: moment('2017/04/01'),
                location: 'MIA', type: 'DEP'})
              } and {
                renderTravelCheck({date: moment('2017/04/05'),
                location: 'MIA', type: 'ARR'})
              }
              <br /><br />
              The total count of days outside the US in 2017 is 5 days: <b>you were traveling</b> (2) <b>or outside</b> (3) the US during 5 days. 
              <br />
              The total count of days inside the US in 2017 is 362 days: <b>you were traveling</b> (2) <b>or inside</b> (360) the US during 362 days.
              <br />
              You may notice that 5 + 362 = 367, even though there are only 365 days in 2017.
              That's because the days you traveled were counted twice, that's expected.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}