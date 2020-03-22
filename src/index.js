import React from 'react';
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
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { makeStyles, Theme } from '@material-ui/core/styles';

import { forwardRef } from 'react';

import './index.css';

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
                    type: parsedOutput.pop(),
                    date: parsedOutput.pop()
                });
            }
            console.log(items)

            return items
        default:
            return []
    }
}

class TravelItem extends React.Component {
    constructor(props){
        super(props);
        const params = JSON.parse(props.params)
        this.state = {
            dateDeparture: new Date(params.dateDeparture),
            dateArrival: new Date(params.dateArrival),
            locationSource: new PortOfEntry(params.locationSourceCode),
            locationDestination: new PortOfEntry(params.locationDestinationCode),
        }
    }

    tripDuration(count_arrival_day=true){
        return this.state.dateArrival - this.state.dateDeparture
    }
    render() {return(
    <p>{this.state.dateDeparture.toString()} {this.state.locationDestination.toString()}</p>
    )}
}


class TravelItemsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal : false,
            newPassagesCount: 0,
            showImportingDataMessage: false,
            showClearAllDialog: false,
            showDataImportedMessage: false,
            showNoDataImportedMessage: false,
            passages: [],
            newRawInput: 'poop',
            processingFunction: 'i94',
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
        const passages = this.state.passages.slice();
        this.setState({showImportingDataMessage:true})
        const newPassages = processRawInput(this.state.newRawInput)
        if (newPassages.length > 0){
            this.setState({
                newPassagesCount: newPassages.length,
                showDataImportedMessage: true
            });
        }else{
            this.setState({showNoDataImportedMessage:true});
        }
        this.setState(
            {
                passages: passages.concat(newPassages)
            }
        );
        event.preventDefault();
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
                <Alert color='success'>{this.state.newPassagesCount} new lines imported !</Alert>
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
          <Button onClick={() => this.setState({passages: [], showClearAllDialog: false})} color="primary">
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
                    { title: 'Date', field: 'date', type: 'date'},
                    { title: 'Location', field: 'location' },
                    { title: 'Type', field: 'type' }
                ]}
            data={this.state.passages}
            title={this.props.name}
            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                    setTimeout(() => {
                        {
                            const data = this.state.passages;
                            data.push(newData);
                            this.setState({ data }, () => resolve());
                        }
                        resolve();
                    }, 1000);
                }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                    setTimeout(() => {
                        {
                            const data = this.state.passages;
                            const index = data.indexOf(oldData);
                            data[index] = newData;                
                            this.setState({ data }, () => resolve());
                        }
                        resolve();
                    }, 1000);
                }),
            onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        {
                            let data = this.state.passages;
                            const index = data.indexOf(oldData);
                            data.splice(index, 1);
                            this.setState({ data }, () => resolve());
                        }
                        resolve();
                    }, 1000);
                })
        }}/>
        </div>
      );
    }
  }
  
  
// ========================================

ReactDOM.render(
    <div>
        <TravelItemsList name="Travel checks list"/>
    </div>,
    document.getElementById('root')
  );