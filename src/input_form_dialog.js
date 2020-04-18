
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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
            <form onSubmit={this.props.handleProcessNewRawInput} >
            <Grid container>
                <Grid item xs={8}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="standard-multiline-flexible"
                        label="Paste input data here:"
                        multiline
                        rows={8}
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
                    <Grid>
                        <Button type='submit' onClick={this.props.hideModalHandler}
                            variant="contained"
                            color="primary"
                            size="large"> Process new raw input</Button>
                    </Grid>
                    </Grid>
                </Grid>
                </form>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
        )
    }
}