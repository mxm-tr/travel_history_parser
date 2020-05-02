import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Timeline from 'react-visjs-timeline';
import './timeline.css'

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { renderTravelCheck } from './result';

import { dateToDateString } from './utils.js'


class TravelsTimeline extends React.PureComponent {
    // http://visjs.org/docs/timeline/#Configuration_Options
    constructor(props) {
        super(props);
        this.timelineRef = React.createRef();  
    }
    componentDidUpdate(){
        // Adapt zoom to fit all travels in view
        if (this.timelineRef.current){
            this.timelineRef.current["$el"].fit()
        }
    }
    render(){
        const classes = this.props;
        const timelineOptions = {
            width: '100%',
            //height: '160px',
            stack: true,
            showMajorLabels: true,
            showCurrentTime: false,
            zoomMin: 1000000,
            type: 'background',
            format: {
                minorLabels: {
                    minute: 'h:mma',
                    hour: 'ha'
                }
            },
            template: function (item, element, data) {
                let content = ""
                if(item.travelCheck === undefined){
                    if(item.type === "background"){
                        content = "Selected period"
                    }else{
                        content = `From ${ dateToDateString(data.start) } to ${ dateToDateString(data.end) }`
                    }
                    return content 
                }else{
                    // Should be simply this:
                    // return ReactDOM.render(<div>{renderTravelCheck(item.travelCheck)}</div>, element);
                    // But a bug occurs, workaround from https://github.com/almende/vis/issues/3592#issuecomment-422493078
                    return ReactDOM.createPortal(
                        ReactDOM.render(<div>{renderTravelCheck(item.travelCheck)}</div>, element ),
                        element, () => { window.timeline.redraw()} );
                }
            }
            // locale: 'en_US'
        }
        const timelineGroups = [{id: 2, content: 'Outside the US'}, {id: 1, content: 'Inside the US'}, {id: 3, content: 'Checks'}]

        // Set up the time window background
        const timeWindowBackground = {
            id: this.props.travels.length + 1,
            type: "background",
            // start: new Intl.DateTimeFormat("en-US").format(new Date(this.props.dateWindowStart)),
            start: this.props.dateWindowStart,
            // end: new Intl.DateTimeFormat("en-US").format(new Date(this.props.dateWindowStop))
            end: this.props.dateWindowStop,
            content: ''
        }

        // Set up points to display the checks
        let travelChecksPoints = this.props.travelChecks.map((check, index) => { return {
            id: this.props.travels.length + index + 2,
            type: "point",
            title: `${check['type']} ${check['location']} : ${check['date']}`,
            content: `${check['location']} : ${check['date']}`,
            start: check.date,
            // group: check['type'] === 'DEP' ? 2 : 1
            group: 3,
            travelCheck: check
        }})

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
                <span role="img" aria-label="tooltip-graph-title">📊</span> Timeline
              </Typography>
            </Toolbar>
            </AppBar>
            <Timeline options={timelineOptions}
                ref={this.timelineRef}
                groups={timelineGroups}
                items={this.props.travels.concat(travelChecksPoints).concat(timeWindowBackground)} />
        </Grid>
        )
    }
}

export { TravelsTimeline };