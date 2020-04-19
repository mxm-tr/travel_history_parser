import React from 'react';
import Grid from '@material-ui/core/Grid';
import Timeline from 'react-visjs-timeline';
import './timeline.css'

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

class TravelsTimeline extends React.PureComponent {
    // http://visjs.org/docs/timeline/#Configuration_Options
    render(){
        const classes = this.props;
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
            },
            // locale: 'en_US'
        }
        const timelineGroups = [{id: 1, content: 'Inside the US'}, {id: 2, content: 'Outside the US'}, {id: 3, content: 'Checks'}]

        // Set up the time window background
        const timeWindowBackground = new Object({
            id: this.props.travels.length + 1,
            type: "background",
            // start: new Intl.DateTimeFormat("en-US").format(new Date(this.props.dateWindowStart)),
            start: this.props.dateWindowStart,
            // end: new Intl.DateTimeFormat("en-US").format(new Date(this.props.dateWindowStop))
            end: this.props.dateWindowStop
        })

        // Set up points to display the checks
        let travelChecksPoints = this.props.travelChecks.map((check, index) => new Object({
            id: this.props.travels.length + index + 2,
            type: "point",
            title: `${check['type']} ${check['location']} : ${/*new Intl.DateTimeFormat("en-US").format(*/check['date']/*)*/}`,
            content: `${check['location']} : ${/*new Intl.DateTimeFormat("en-US").format(*/check['date']/*)*/}`,
            start: /*new Intl.DateTimeFormat("en-US").format(*/check.date/*)*/,
            // group: check['type'] === 'DEP' ? 2 : 1
            group: 3
        }))

        //  Display the travel window limits
        // travelChecksPoints = travelChecksPoints.concat(
        //     [
        //         new Object({
        //             id: this.props.travels.length + travelChecksPoints.length + 2,
        //             type: "point",
        //             // start: new Intl.DateTimeFormat("en-US").format(new Date(this.props.dateWindowStart)),
        //             start: this.props.dateWindowStart,
        //             group: 3
        //         }),
        //         new Object({
        //             id: this.props.travels.length + travelChecksPoints.length + 3,
        //             type: "point",
        //             // start: new Intl.DateTimeFormat("en-US").format(new Date(this.props.dateWindowStart)),
        //             start: this.props.dateWindowStop,
        //             group: 3
        //         })
        //     ]        
        // )
        return (
        <Grid item xs={12}>
            <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Timeline
              </Typography>
            </Toolbar>
            </AppBar>
            <Timeline options={timelineOptions} groups={timelineGroups} items={this.props.travels.concat(travelChecksPoints).concat(timeWindowBackground)}/>
        </Grid>
        )
    }
}

export { TravelsTimeline };