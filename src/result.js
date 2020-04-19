import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

function renderErrorMessages(messages){
  return(
    <List variant="body2" >
      {messages.map((m) => <ListItemText>{m}</ListItemText >)}
    </List >
  )
}

export class ParsingErrors extends React.Component {
  render () { 
    const classes = this.props;
    if (this.props.messages === undefined){
      return ''
    }
    if (this.props.messages.length < 1){
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
          <CardContent>
          <Typography color="textPrimary" gutterBottom>
              { renderErrorMessages(this.props.messages) }
          </Typography>
      </CardContent>
  </Card>
  </Box>
  </Grid>
  )}
}

export class Result extends React.Component {
    render () { 
        const classes = this.props;
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
    </Card>
    </Box>
    </Grid>
    )}
}