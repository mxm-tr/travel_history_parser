import React from 'react';
import { tableIcons } from './icons.js'
import MaterialTable from 'material-table'
import Grid from '@material-ui/core/Grid';

class TravelsList extends React.PureComponent {
    render() {
        return (
        <Grid item xs={5}>
            <MaterialTable
                icons={tableIcons}
                isEditable={false}
                options={
                    {
                        search: false
                    }
                }
                columns={[
                        { title: 'Departure', field: 'start', type: 'date', render: (a) => /*new Intl.DateTimeFormat("en-US").format(*/new Date(a.start)/*)*/},
                        { title: 'Arrival', field: 'end', type: 'date', render: (a) => /*new Intl.DateTimeFormat("en-US").format(*/new Date(a.end)/*)*/},
                        { title: 'Duration', field: 'duration', type: 'numeric', render: (d) => `${d.duration} days` },
                        //{ title: 'Duration (date window)', field: 'durationDateWindow', type: 'numeric', render: (d) => `${d.durationDateWindow} days` },
                        { title: 'In the US?', field: 'group', render: (a) => a.group === 1 ? 'Inside the US' : 'Outside the US' }
                    ]}
                data={this.props.travels}
                title="Travels list" />
        </Grid>
    )}
}

export { TravelsList };