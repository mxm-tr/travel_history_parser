import React from 'react';
import { tableIcons } from './icons.js'
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import MaterialTable from 'material-table';
import moment from 'moment';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = () => ({
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

export class TravelChecksList extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const classes = this.props;
        return (
        <Grid item xs={12}>
          <Card>
            <Toolbar MuiAppBar-colorPrimary >
                <Typography variant="h6" className={classes.title}>
                    Travel checks list
                </Typography>
            </Toolbar>
            <MaterialTable
                icons={tableIcons}
                columns={[
                        { title: 'Date', field: 'date', type: 'date',  filtering: false, render: (a) => moment(a.date).format('YYYY-MM-DD') },
                        { title: 'Location', field: 'location', filtering: false },
                        { title: 'Type', field: 'type', lookup:{'DEP': 'Departure', 'ARR': 'Arrival'} }
                    ]}
                data={this.props.travelChecks}
                // localization={{ dateTimePickerLocalization: 'en_US' }}
                // options={{searchFieldAlignment: 'left', filtering: true}}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve) => {
                        setTimeout(() => {
                            {
                                this.props.updateTravelChecks(this.props.travelChecks.concat(newData));
                            }
                            resolve();
                        }, 1000);
                    }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                        setTimeout(() => {
                            {
                                const newTravelChecks = this.props.travelChecks.concat();
                                const index = newTravelChecks.indexOf(oldData);
                                newTravelChecks[index] = newData;              
                                this.props.updateTravelChecks(newTravelChecks);
                            }
                            resolve();
                        }, 1000);
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            {
                                let newTravelChecks = this.props.travelChecks.concat();
                                const index = newTravelChecks.indexOf(oldData);
                                newTravelChecks.splice(index, 1);
                                this.props.updateTravelChecks(newTravelChecks);
                            }
                            resolve();
                        }, 1000);
                    })
            }}/>
            </Card>
        </Grid>
    )}
};

export default withStyles(styles, { withTheme: true })(TravelChecksList);