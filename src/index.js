import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import AddBox from '@material-ui/icons/AddBox';

import './index.css';

import { DateWindow } from './date_window.js'
import { TravelsTimeline } from './timeline.js'
import { TravelChecksList } from './travel_checks.js'
import { InputFormDialog } from './input_form_dialog.js'
import { sortTravelChecks, processRawInput, computeTravelDurationDays, sumTravelDaysInside, travelChecksToTravelsList } from './utils.js';
import { Result, ParsingErrors } from './result.js'
import { HowToUse } from './tooltips.js';

const processingFunctionInfos={
    "i94": <span> Copy and paste data from the table on the
            <a href="https://i94.cbp.dhs.gov/I94/#/history-search" target="_blank" rel="noopener noreferrer"> official i94 website </a>
        </span>,
    "tabular": <span> Copy and paste data from a CSV table you have exported using this tool </span>
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal : false,
            newTravelChecksCount: 0,
            showImportingDataMessage: false,
            showClearAllDialog: false,
            showDataImportedMessage: false,
            showNoDataImportedMessage: false,
            travelChecks: [],
            // travelChecks: [{
            //     "location": "RRA",
            //     "type": "ARR",
            //     "date": "2017-03-30",
            // },
            // {
            //     "location": "BWI",
            //     "type": "DEP",
            //     "date": "2017-03-31",
            // },
            // {
            //     "location": "DLA",
            //     "type": "ARR",
            //     "date": "2017-05-30",
            // },
            // {
            //     "location": "DUL",
            //     "type": "DEP",
            //     "date": "2017-06-30",
            // }],
            newRawInput: 'poop',
            processingFunction: 'i94',
            dateWindowStart: new moment(),
            dateWindowStop: new moment(),
        };
        this.handleNewRawInput = this.handleNewRawInput.bind(this);
        this.handleProcessingFunctionChange = this.handleProcessingFunctionChange.bind(this);
        this.handleProcessNewRawInput = this.handleProcessNewRawInput.bind(this);
        this.updateTravelChecks = this.updateTravelChecks.bind(this);
        this.handleWindowStartChange = this.handleWindowStartChange.bind(this);
        this.handleWindowStopChange = this.handleWindowStopChange.bind(this);
        this.fitDateWindow = this.fitDateWindow.bind(this);
    }

    handleProcessingFunctionChange(event) {
        this.setState({processingFunction: event.target.value});
    }

    handleNewRawInput(event) {
        this.setState({newRawInput: event.target.value});
    }

    handleProcessNewRawInput(event){
        this.setState({showImportingDataMessage:true})
        const newTravelChecks = processRawInput(this.state.newRawInput, this.state.processingFunction)
        if (newTravelChecks.length > 0){
            this.setState({
                newTravelChecksCount: newTravelChecks.length,
                showDataImportedMessage: true
            });
        }else{
            this.setState({showNoDataImportedMessage:true});
        }
        this.updateTravelChecks(this.state.travelChecks.concat(newTravelChecks))
        event.preventDefault();
    }

    fitDateWindow(){
        this.setState({
            dateWindowStart: this.state.travelChecks[0].date,
            dateWindowStop: this.state.travelChecks[this.state.travelChecks.length - 1].date
        })
    }

    handleWindowStartChange(newD){
        this.setState({dateWindowStart: newD === null ? this.state.travelChecks[0].date : newD })
        this.updateTravels()
    }
    handleWindowStopChange(newD){
        this.setState({dateWindowStop: newD === null ? this.state.travelChecks[this.state.travelChecks.length - 1].date : newD })
        this.updateTravels()
    }

    updateTravelChecks(newTravelChecks){
        // Updates the travel checks list, and the date window pickers' defaults values
        if (newTravelChecks.length < 1){
            return
        }
        
        const newTravelChecksSorted = sortTravelChecks(newTravelChecks)
        this.setState(
                {
                    dateWindowStart: newTravelChecksSorted[0].date,
                    dateWindowStop: newTravelChecksSorted[newTravelChecksSorted.length - 1].date,
                    travelChecks: newTravelChecksSorted
                }
            )
        this.updateTravels()
    }
    computeTravelsWithMessage(){
       return travelChecksToTravelsList(this.state.travelChecks, this.state.dateWindowStart, this.state.dateWindowStop)
    }
    computeTravels(){
        return this.computeTravelsWithMessage()['travels']
    }
    updateTravels(){
        const travelsComputeResult = this.computeTravelsWithMessage()
        this.setState(
            {
                travels: travelsComputeResult['travels'],
                travelsParserErrors: travelsComputeResult['errors']
            }
        )
    }

    showModalHandler = () =>{
        this.setState({showModal:true});
    }
    hideModalHandler = () =>{
        this.setState({showModal:false});
    }
    componentDidMount() {
        window.addEventListener('beforeunload', this.handleLeavePage);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleLeavePage);
    }
    handleLeavePage(e) {
        const confirmationMessage = 'Do you want to leave this page? You will lose all current data.';
        e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
        return confirmationMessage;              // Gecko, WebKit, Chrome <34
    }
    render() {
      return (
        <MuiThemeProvider>
        <Grid container justify="center" alignItems="center">
            <Snackbar open={this.state.showImportingDataMessage} onClose={ () => this.setState({showImportingDataMessage:false}) } autoHideDuration={2000} >
                <Alert color='info'>Importing Data</Alert>
            </Snackbar>
            <Snackbar open={this.state.showDataImportedMessage} onClose={ () => this.setState({showDataImportedMessage:false}) } autoHideDuration={2000} >
                <Alert color='success'>{this.state.newTravelChecksCount} new lines imported !</Alert>
            </Snackbar>
            <Snackbar open={this.state.showNoDataImportedMessage} onClose={ () => this.setState({showNoDataImportedMessage:false}) } autoHideDuration={5000} >
                <Alert color='error'>No data imported, check your input and make sure you selected the right processing function.</Alert>
            </Snackbar>

            <Dialog onClose={() => this.setState({showClearAllDialog: false})} aria-labelledby="simple-dialog-title" open={this.state.showClearAllDialog}>
            <DialogTitle id="simple-dialog-title">Clear all data</DialogTitle>
            <DialogActions>
            <Button onClick={() => this.setState({travelChecks: [], showClearAllDialog: false})} color="primary">
                Delete all
            </Button>
            <Button onClick={() => this.setState({showClearAllDialog: false})} color="primary" autoFocus>
                Cancel
            </Button>
            </DialogActions>
            </Dialog>
            <InputFormDialog
                showModal={this.state.showModal}
                hideModalHandler={this.hideModalHandler}
                handleNewRawInput={this.handleNewRawInput}
                handleProcessNewRawInput={this.handleProcessNewRawInput}
                processingFunction={this.state.processingFunction}
                processingFunctionInfo={processingFunctionInfos[this.state.processingFunction]}
                handleProcessingFunctionChange={this.handleProcessingFunctionChange} />
            
            <Grid container item xs={10} spacing={3} direction="row" alignItems="center" justify="center">
            <Grid container item xs={12} spacing={0} direction="row" alignItems="center" justify="space-between">
                <Grid item xs={6}>
                    <Typography  component="h4" variant="h5" color="inherit" noWrap>
                        <span role="img" aria-label="airplane">✈️</span> US Travel History Calculator
                    </Typography>
                </Grid>
                <Grid item>
                <Button
                        onClick={this.showModalHandler}
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<AddBox />}>
                            Import Data
                    </Button>
                </Grid>
                <Grid item>
                    <Button 
                        onClick={() => this.setState({showClearAllDialog: true})}
                        variant="contained"
                        color="secondary"
                        size="large"
                        startIcon={<DeleteOutline />}>
                            Clear All Data
                    </Button>
                </Grid>
            </Grid>
            <Grid container item spacing={3} justify="center" alignItems="flex-start">
                <Grid container item xs={7} direction="column" spacing={2}>
                    <HowToUse />
                    <TravelChecksList travelChecks={ this.state.travelChecks } updateTravelChecks={this.updateTravelChecks} />
                    <ParsingErrors errors={this.state.travelsParserErrors} />
                    <TravelsTimeline travels={this.computeTravels()}
                        travelChecks={this.state.travelChecks}
                        dateWindowStart={this.state.dateWindowStart}
                        dateWindowStop={this.state.dateWindowStop}
                    />                </Grid>
                <Grid container item xs={5} direction="column" spacing={2}>
                    <DateWindow
                        dateWindowStart={this.state.dateWindowStart}
                        dateWindowStop={this.state.dateWindowStop}
                        handleWindowStartChange={ this.handleWindowStartChange }
                        handleWindowStopChange={ this.handleWindowStopChange } 
                        fitDateWindow = { this.fitDateWindow }/>
                    <Result
                        dateWindowStart={this.state.dateWindowStart}
                        dateWindowStop={this.state.dateWindowStop}
                        totalDaysInside={sumTravelDaysInside(this.computeTravels())}
                        totalDaysOutside={computeTravelDurationDays(this.state.dateWindowStart, this.state.dateWindowStop) - sumTravelDaysInside(this.computeTravels())}
                        totalDaysWindow={computeTravelDurationDays(this.state.dateWindowStart, this.state.dateWindowStop)}
                        totalErrors={ this.state.travelsParserErrors === undefined ? 0 : this.state.travelsParserErrors.length  } />
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    </MuiThemeProvider>
    );
    }
  }
  
  
// ========================================

ReactDOM.render(
    <div>
        <App name="Travel checks list"/>
    </div>,
    document.getElementById('root')
  );