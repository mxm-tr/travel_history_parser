
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export class InputFormDialog extends React.PureComponent {
    render() {
        return (
            <Dialog open={this.props.showModal} onClose={this.props.hideModalHandler} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Import raw data</DialogTitle>
            <DialogContent>
            <Grid container>
                <Grid item xs={12}>
                    <Typography component="p" color="textSecondary">
                        Copy and paste your travel data in the input field, select the corresponding import format and press Import.
                        <br />
                        Nothing about you or any travel history is collected and sent anywhere: privacy is guaranteed.
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="standard-multiline-flexible"
                        label="Paste input data here:"
                        multiline
                        rows={10}
                        fullWidth
                        name='rawInput'
                        size="small"
                        value={this.props.newRawInput}
                        onChange={this.props.handleNewRawInput} />
                </Grid>
                <Grid item container xs={4}>
                    <Grid item xs={12}>
                        <Typography id="discrete-slider-small-steps" gutterBottom>
                            Select the import format:
                        </Typography>
                        <Select value={this.props.processingFunction} onChange={this.props.handleProcessingFunctionChange}>
                            <MenuItem value='i94'>I94 website format</MenuItem>
                            <MenuItem value='tabular'>Tabular copy paste format</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item>
                    <Typography component="p">
                        {this.props.processingFunctionInfo}
                    </Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={ (e) => { this.props.hideModalHandler(); this.props.handleProcessNewRawInput(e); } }
                            variant="contained"
                            color="primary"
                            size="large">Import</Button>
                    </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
        )
    }
}