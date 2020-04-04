import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from 'material-table'

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker } from "@material-ui/pickers";

import usLocale from "date-fns/locale/en-US";

import { makeStyles, Theme } from '@material-ui/core/styles';

import { forwardRef } from 'react';

import './index.css';

import Timeline from 'react-visjs-timeline'


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


const known_ports_of_entry = {
    'JFK': {
        'Country': 'USA'
    },
    'LOL': {
        'Country' : 'LOL'
    }
}
class PortOfEntry{
    constructor(code){
        this.code = code
        if (! code in Object.keys(known_ports_of_entry)){
            this.code = 'UNKNOWN'
        }
    }
}

const known_passage_types = ['Departure', 'Arrival']
class PassageType{
    constructor(name){
        this.name = name
        if (! name in Object.keys(known_passage_types)){
            this.name = 'UNKNOWN'
        }
    }
}


function processRawInput(rawInput, processingFunction='i94'){
    switch(processingFunction){
        case 'i94':
            var parsedOutput = rawInput.match(/((\S+){3})/g).slice(3);
            var items = []
            while (parsedOutput.length > 0) {
                items.push({
                    location: parsedOutput.pop(),
                    type: parsedOutput.pop() === 'Departure' ? 'DEP' : 'ARR',
                    date: new Date(parsedOutput.pop())
                });
            }
            return items
        default:
            return []
    }
}

class TravelItem extends React.Component {
    constructor(props){
        super(props);
        const params = JSON.parse(props.params)
    }
    tripDuration(count_arrival_day=true){
        return this.props.dateArrival - this.props.dateDeparture
    }
    render() {return(
    <p>{this.props.dateDeparture.toString()} {this.props.locationDestination.toString()}</p>
    )}
}

function computeTravelDurationDays(date1, date2){
    return Math.abs((new Date(date1) - new Date(date2)) / 1000 / 3600 / 24 ) + 1
}

class TravelsList extends React.PureComponent {
        render() {
        // http://visjs.org/docs/timeline/#Configuration_Options
        const timelineOptions = {
            width: '100%',
            //height: '160px',
            stack: true,
            showMajorLabels: true,
            //showCurrentTime: true,
            zoomMin: 1000000,
            type: 'background',
            format: {
                minorLabels: {
                    minute: 'h:mma',
                    hour: 'ha'
                }
            }
        }
        const timelineGroups = [{id: 1, content: 'Inside the US'}, {id: 2, content: 'Outside the US'}, {id: 3, content: 'Checks'}]

        // this.props.data looks like
        // { location: 'JFK', type: 'DEP' or 'ARR', date: '2020-03-20'
        // Returns something like
        // { id: 1, type: "point", title: "loul", content: "Departure from JFK", start: new Date(2013, 5, 20) }

        // Sort the travel check by date
        let travelChecks = JSON.parse(JSON.stringify(this.props.travelChecks)).sort((a,b) => a.date - b.date).reverse()

        // Set up the time window background
        const timeWindowBackground = new Object({
            id: 0,
            type: "background",
            start: this.props.dateWindowStart,
            end: this.props.dateWindowStop
        })

        // Set up points to display the checks
        const travelChecksPoints = travelChecks.map((check, index) => new Object({
            id: index + 1,
            type: "point",
            title: `${check['type']} ${check['location']} : ${new Intl.DateTimeFormat("en-US").format(new Date(check['date']))}`,
            content: `${check['location']} : ${new Intl.DateTimeFormat("en-US").format(new Date(check['date']))}`,
            start: check.date,
            // group: check['type'] === 'DEP' ? 2 : 1
            group: 3
        }))

        // Browse the list, element by element
        let travels = []
        let newTravel = {}
        let checkA, checkB, travelDuration
        let index = travelChecksPoints.length + 1
        let message = "Done"
        while(travelChecks.length > 1){
            checkA = travelChecks.pop(0)
            checkB = travelChecks[travelChecks.length - 1]

            travelDuration = computeTravelDurationDays(checkA.date, checkB.date)

            newTravel = new Object({
                id: index,
                type: "range",
                title: `From ${checkA['location']} to ${checkB['location']}: ${travelDuration} days`,
                content: `From ${checkA['location']} to ${checkB['location']}: ${travelDuration} days`,
                start: checkA.date,
                end: checkB.date,
                duration: travelDuration
            })

            if (checkA.type === 'DEP' && checkB.type === 'ARR') {
                index++
                newTravel['group'] = 2 // Outside
                travels.push(newTravel)
            }else if(checkA.type === 'ARR' && checkB.type === 'DEP'){
                index++
                newTravel['group'] = 1 // Inside
                travels.push(newTravel)
            }else{
                message = `${message} Error parsing travel checks: travel from ${checkA.location} on ${checkA.date} to ${checkB.location} on ${checkB.date}`
                message = `${message} should be consecutive Departures and Arrivals`
            }
        }
        const result = travels.concat(travelChecksPoints).concat(timeWindowBackground)

        return (
        <div>
            <p>{message}</p>
            <MaterialTable
            icons={tableIcons}
            isEditable={false}
            columns={[
                    { title: 'Departure', field: 'start', type: 'date', render: (a) => new Intl.DateTimeFormat("en-US").format(new Date(a.start))},
                    { title: 'Arrival', field: 'end', type: 'date', render: (a) => new Intl.DateTimeFormat("en-US").format(new Date(a.end))},
                    { title: 'Duration', field: 'duration', type: 'numeric', render: (d) => `${d.duration} days` },
                    { title: 'In the US?', field: 'group', render: (a) => a.group === 1 ? 'Inside the US' : 'Outside the US' }
                ]}
            data={travels}
            title="Travels list" />
            <Timeline options={timelineOptions} groups={timelineGroups} items={result}/>
        </div>
    )}
}


class TravelChecksList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal : false,
            newTravelChecksCount: 0,
            showImportingDataMessage: false,
            showClearAllDialog: false,
            showDataImportedMessage: false,
            showNoDataImportedMessage: false,
            // travelChecks: [],
            travelChecks: [{
                "location": "RRA",
                "type": "ARR",
                "date": new Date("2017-03-30"),
            },
            {
                "location": "BWI",
                "type": "DEP",
                "date": new Date("2017-03-31"),
            },
            {
                "location": "DLA",
                "type": "ARR",
                "date": new Date("2017-05-30"),
            },
            {
                "location": "DUL",
                "type": "DEP",
                "date": new Date("2017-06-30"),
            }],
            newRawInput: 'poop',
            processingFunction: 'i94',
            dateWindowStart: new Date(),
            dateWindowStop: new Date(),
        };
        this.handleNewRawInput = this.handleNewRawInput.bind(this);
        this.handleProcessingFunctionChange = this.handleProcessingFunctionChange.bind(this);
        this.handleProcessNewRawInput = this.handleProcessNewRawInput.bind(this);
    }

    handleProcessingFunctionChange(event) {
        this.setState({processingFunction: event.target.value});
    }

    handleNewRawInput(event) {
        this.setState({newRawInput: event.target.value});
    }

    handleProcessNewRawInput(event){
        this.setState({showImportingDataMessage:true})
        const newTravelChecks = processRawInput(this.state.newRawInput)
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

    updateTravelChecks(newTravelChecks){
        // Updates the travel checks list, and the date window pickers' defaults values
        const newTravelChecksSorted = JSON.parse(JSON.stringify(newTravelChecks)).sort((a,b) => a.date - b.date)
        console.log(newTravelChecksSorted[0])
        this.setState(
            {
                dateWindowStart: newTravelChecksSorted[0].date,
                dateWindowStop: newTravelChecksSorted[newTravelChecksSorted.length - 1].date,
                travelChecks: newTravelChecks
            }
        )
    }

    showModalHandler = (event) =>{
        this.setState({showModal:true});
    }
    hideModalHandler = (event) =>{
        this.setState({showModal:false});
    }

    render() {
      return (
        <div>
            <Snackbar open={this.state.showImportingDataMessage} onClose={ () => this.setState({showImportingDataMessage:false}) } autoHideDuration={2000} >
                <Alert color='info'>Importing Data</Alert>
            </Snackbar>
            <Snackbar open={this.state.showDataImportedMessage} onClose={ () => this.setState({showDataImportedMessage:false}) } autoHideDuration={2000} >
                <Alert color='success'>{this.state.newTravelChecksCount} new lines imported !</Alert>
            </Snackbar>
            <Snackbar open={this.state.showNoDataImportedMessage} onClose={ () => this.setState({showNoDataImportedMessage:false}) } autoHideDuration={2000} >
                <Alert color='error'>No data imported</Alert>
            </Snackbar>
        <Button 
            onClick={() => this.setState({showClearAllDialog: true})}
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<DeleteOutline />}>
                Clear All Data
        </Button>
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
        <Button 
            onClick={this.showModalHandler}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddBox />}>
                Import Data
        </Button>
        <Dialog open={this.state.showModal} onClose={this.hideModalHandler} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Import raw data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Copy and paste raw data
          </DialogContentText>
            <form onSubmit={this.handleProcessNewRawInput} >
                <TextField
                    autoFocus
                    margin="dense"
                    id="standard-multiline-flexible"
                    label="Multiline"
                    multiline
                    rowsMax="4"
                    name='rawInput'
                    value={this.state.newRawInput}
                    onChange={this.handleNewRawInput} />
                <Select value={this.state.processingFunction} onChange={this.handleProcessingFunctionChange}>
                    <MenuItem value='i94'>Official I94 processing function</MenuItem>
                    <MenuItem value='shit'>Other random shit</MenuItem>
                </Select>
                <Button type='submit' onClick={this.hideModalHandler}
                variant="contained"
                color="primary"
                size="large"> Process new raw input</Button>
                </form>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
        <MaterialTable
            icons={tableIcons}
            columns={[
                    { title: 'Date', field: 'date', type: 'date', render: (a) => new Intl.DateTimeFormat("en-US").format(new Date(a.date))},
                    { title: 'Location', field: 'location' },
                    { title: 'Type', field: 'type', lookup:{'DEP': 'Departure', 'ARR': 'Arrival'} }
                ]}
            data={this.state.travelChecks}
            title={this.props.name}
            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                    setTimeout(() => {
                        {
                            this.updateTravelChecks(this.state.travelChecks.concat(newData));
                        }
                        resolve();
                    }, 1000);
                }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                    setTimeout(() => {
                        {
                            const newTravelChecks = this.state.travelChecks.concat();
                            const index = newTravelChecks.indexOf(oldData);
                            newTravelChecks[index] = newData;                
                            this.updateTravelChecks(newTravelChecks);
                        }
                        resolve();
                    }, 1000);
                }),
            onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        {
                            let newTravelChecks = this.state.travelChecks.concat();
                            const index = newTravelChecks.indexOf(oldData);
                            newTravelChecks.splice(index, 1);
                            this.updateTravelChecks(newTravelChecks);
                        }
                        resolve();
                    }, 1000);
                })
        }}/>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Fragment>
                <KeyboardDatePicker
                    variant="dialog"
                    id="dateWindowStart"
                    format="MM/dd/yyyy"
                    value={this.state.dateWindowStart}
                    onChange={(newD) => this.setState({dateWindowStart: newD}) }
                />
                <KeyboardDatePicker
                    variant="dialog"
                    id="dateWindowStop"
                    format="MM/dd/yyyy"
                    value={this.state.dateWindowStop}
                    onChange={(newD) => this.setState({dateWindowStop: newD}) }
                />
            </Fragment>
        </MuiPickersUtilsProvider>
        <TravelsList travelChecks={this.state.travelChecks} dateWindowStart={this.state.dateWindowStart} dateWindowStop={this.state.dateWindowStop}/>
        </div>
      );
    }
  }
  
  
// ========================================

ReactDOM.render(
    <div>
        <TravelChecksList name="Travel checks list"/>
    </div>,
    document.getElementById('root')
  );