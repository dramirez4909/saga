import React, { useContext } from 'react';
import PatientMentalProblems from './PatientMentalProblems'
import PatientPhysicalProblems from './PatientPhysicalProblems'
import ThemeContext from './utils/ThemeContext';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

function AllProblems(props) {
    const classes = useStyles();
    const themeContext = useContext(ThemeContext)
    return (
        <>
            <Grid container spacing={1} style={{backgroundColor: themeContext.themes === "dark" ? "#343434" : "white"}}>
                <Grid item xs={12} sm={4}>
                    <PatientMentalProblems patient={props.patient}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <PatientPhysicalProblems patient={props.patient}/>
                </Grid>
            </Grid>
        </>
    );
}
export default AllProblems;