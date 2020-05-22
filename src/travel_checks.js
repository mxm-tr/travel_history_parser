import React from 'react';
import { tableIcons } from './icons.js'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';
import Card from '@material-ui/core/Card';

import './travel_checks.css'
import { dateToDateString, exportXls } from './utils.js';

import './travel_checks.css'

const useStyles = makeStyles({
    blueBackground: {
        background: 'linear-gradient(45deg, #3f51b5 30%, #3f51b5 90%)',
        border: 0,
        borderRadius: 0,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        alignItems: 'center'
    }
  });

export function TravelChecksList(props) {
        const classes = useStyles(props);
        return (
        <Grid item xs={12}>
          <Card>
            {/* <Toolbar className={classes.blueBackground}>
                <Typography variant="h6" className={classes.title}>
                    Travel checks list
                </Typography>
            </Toolbar> */}
            <MaterialTable
                icons={tableIcons}
                columns={[
                        { title: 'Date', field: 'date', type: 'date',  filtering: false, render: (a) => dateToDateString(a.date) },
                        { title: 'Location', field: 'location', filtering: false },
                        { title: 'Type', field: 'type', lookup:{'DEP': 'Departure', 'ARR': 'Arrival'} }
                    ]}
                data={props.travelChecks}
                title="🖋️ Travel checks list"
                style = {{classes}}
                options={{
                    search: false,
                    exportButton: true,
                    exportAllData: true,
                    exportCsv: exportXls,
                    localization: { exportName: 'Export as Excel File' },
                    searchFieldStyle: {
                      backgroundColor: '#01579b',
                      color: '#FFF'
                    },
                    rowStyle: rowData => ( { backgroundColor: (rowData.tableData.id % 2) ? '#EEE' : '#FFF' } )
                }}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve) => {
                        setTimeout(() => {
                                props.updateTravelChecks(props.travelChecks.concat(newData));
                            resolve();
                        }, 1000);
                    }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                        setTimeout(() => {
                            {
                                const newTravelChecks = props.travelChecks.concat();
                                const index = newTravelChecks.indexOf(oldData);
                                newTravelChecks[index] = newData;              
                                props.updateTravelChecks(newTravelChecks);
                            }
                            resolve();
                        }, 1000);
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            {
                                let newTravelChecks = props.travelChecks.concat();
                                const index = newTravelChecks.indexOf(oldData);
                                newTravelChecks.splice(index, 1);
                                props.updateTravelChecks(newTravelChecks);
                            }
                            resolve();
                        }, 1000);
                    })
            }}/>
            </Card>
        </Grid>
    )
}