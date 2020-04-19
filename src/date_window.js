import React from 'react';
import { DatePicker } from "@material-ui/pickers";
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}


export class DateWindow extends React.Component {
  constructor(props){
    super(props);
    this.state = { tabValue: 0 }
    this.handleTabChange = this.handleTabChange.bind(this)
    this.selectYear = this.selectYear.bind(this)
  };
  handleTabChange(event, newValue){
    this.setState({ tabValue: newValue })
  }
  selectYear(newDate){
    this.props.handleWindowStartChange(moment(new Date("01/01/" + newDate.getFullYear())));
    this.props.handleWindowStopChange(moment(new Date("12/31/" + newDate.getFullYear())));
  }
  render () { 
    const classes = this.props;
    return (
    <Grid item xs={12} >
        {/* <MuiPickersUtilsProvider utils={DateFnsUtilsUS} locale='us'> */}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Select counting period
              </Typography>
            </Toolbar>
              <Tabs value={this.state.tabValue} onChange={this.handleTabChange} aria-label="Counting period">
                  <Tab label="Custom dates" {...a11yProps(0)} />
                  <Tab label="One Year" {...a11yProps(1)} />
                  <Tab label="Whole travel history" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
          <Card className={classes.root}>
          <CardContent>
            <TabPanel value={this.state.tabValue} index={0}>
              <Typography className={classes.title} component="h1">
                Count travel days on a specific period
              </Typography>
              <DatePicker
                  variant="dialog"
                  id="dateWindowStart"
                  label="From"
                  format='yyyy-MM-dd'
                  value={this.props.dateWindowStart}
                  onChange={ (newD) => this.props.handleWindowStartChange(moment(newD)) }
              />
              <DatePicker
                      variant="dialog"
                      id="dateWindowStop"
                      label="To"
                      format='yyyy-MM-dd'
                      value={this.props.dateWindowStop}
                      onChange={ (newD) => this.props.handleWindowStopChange(moment(newD)) }
              />
              <Typography component="p" color="textSecondary">
                  The total of days will be counted between the given dates.
              </Typography>
            </TabPanel>
            <TabPanel value={this.state.tabValue} index={1}>
              <Typography className={classes.title} component="h1">
                Count travel days in a full year
              </Typography>
              <DatePicker
                views={["year"]}
                label="Year long period"
                value={this.props.dateWindowStart}
                onChange={ this.selectYear }
                />
              <Typography component="p" color="textSecondary">
                  The total of days will be counted for the given year.
              </Typography>
            </TabPanel>
            <TabPanel value={this.state.tabValue} index={2}>
              <Box>
                <Button
                  onClick={ this.props.fitDateWindow }
                  variant="contained"
                  color="primary"
                  size="medium">
                      Select whole travel history
                </Button>
              </Box>
              <Typography component="p" color="textSecondary">
                  The total of days will be counted for the whole travel history list.
              </Typography>
            </TabPanel>
          </CardContent>
        </Card>
      </MuiPickersUtilsProvider>
    </Grid>
  )}
}
