import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {styles} from "../../../styles/styles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SimpleSelect(props) {
    const materialUiClasses = useStyles();
    const classes = styles();
    const [day, setDay] = React.useState('');

    const handleChange = (event) => {
        setDay(event.target.value);
        props.setDay(event.target.value);
    };

    return (
        <div className={classes.dashboard}>
            <span className={classes.filterLabel}>Filtruj:</span>
            <FormControl className={`${materialUiClasses.formControl} ${classes.formControl}`}>
                <InputLabel id='demo-simple-select-label'>Dzień tygodnia</InputLabel>
                <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={day}
                    onChange={handleChange}
                >
                    <MenuItem value={1}>Poniedziałek</MenuItem>
                    <MenuItem value={2}>Wtorek</MenuItem>
                    <MenuItem value={3}>Środa</MenuItem>
                    <MenuItem value={4}>Czwartek</MenuItem>
                    <MenuItem value={5}>Piątek</MenuItem>
                    <MenuItem value={6}>Sobota</MenuItem>
                    <MenuItem value={7}>Niedziela</MenuItem>
                </Select>
            </FormControl>
            <button onClick={props.doReset}>Resetuj filtr</button>
        </div>
    );
}