import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import moment from 'moment'

import { renderTravelCheck } from './result.js'

export function HowToUse(props) {
    const [open, setOpen] = React.useState(false);
    const [, setScroll] = React.useState('paper');
  
    const handleClickOpen = (scrollType) => () => {
      setOpen(true);
      setScroll(scrollType);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return (
    <Grid item xs={12}>
        <ExpansionPanel>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography variant="h6" color="primary" >How to use ?</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Typography  component="p" color="textPrimary">                
                <span role="img" aria-label="tooltip-pen">🖋️</span> Import some I94 travel history data, or manually create some entries below.<br />
                <span role="img" aria-label="tooltip-calendar">📅</span> Select a counting period<br />
                <span role="img" aria-label="tooltip-graph">📊</span> Check your travel history using the timeline <br />
                <span role="img" aria-label="tooltip-calc">🧮</span> Get the count of days from the results tab<br />
                <br />
                <Button size="small"  color="primary" variant="contained" onClick={handleClickOpen('paper')}>
                    More information
                </Button>
            </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        <InfoDialog handleClickOpen={handleClickOpen} handleClose={handleClose} open={open} />

    </Grid>
)}



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
                    What is this?
                </Typography>
                <Typography variant="p">
                    This tool has been created to help US Non Residents to fill their paperwork:
                    the US administration sometimes require a calculation of the total amount of days spent on US soil.
                    This can be long and difficult to do, especially if you travel a lot.
                    <br />
                    <br />
                    With this tool, you can directly copy and paste your travel history in the "Import data" tool to get a visualization
                    of your travel history, as well as the calculations needed for your paperwork on a selected time period.
                    <br />
                    <br />
                </Typography>
                <Typography variant="h6" color="textPrimary">
                    What about my privacy?
                </Typography>
                <Typography variant="p">
                    Just like a calculator, this tool is a standalone app: it doesn't communicate any information you fill in.
                    <br />
                    <br />
                </Typography>
              <Typography variant="h6" color="textPrimary">
                How are days counted?
              </Typography>
                <Typography variant="p">
                In most cases the US immigration counts the travel days as days <b>inside the US</b>.
                <br />
                <br />
                <b>Example:</b>
                <br />
                Let's say you want to count your travel days in <b>2017</b>. The only trip you had
                was in Mexico on April 1st 2017, and you came back April 5th 2017. <br /> <br />
                This shows up in your I94 with the following travel checks: <br /> {
                  renderTravelCheck({date: moment('2017-04-01'),
                  location: 'MIA', type: 'DEP'})
                }(Departure) and {
                  renderTravelCheck({date: moment('2017-04-05'),
                  location: 'MIA', type: 'ARR'})
                } (Arrival)
                <br /><br />
                The total count of days outside the US in 2017 is 3 days: <b>you were traveling</b> for 2 days <b>and outside</b> the US for 3 days. 
                <br />
                The total count of days inside the US in 2017 is 362 days: <b>you were traveling</b> for 2 days <b>and inside</b> the US during 360 days.
                <br />
                You may check your result with 3 + 362 = 365, there are 365 days in 2017.
                <br />
                <br />
              </Typography>
              <Typography variant="h6" color="textPrimary">
                Something does not work !
              </Typography>
                <Typography variant="p">
                    You are more than welcome to report any issue on the <a href="https://github.com/mxm-tr/travel_history_parser">github account of the app</a>.
                <br />
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