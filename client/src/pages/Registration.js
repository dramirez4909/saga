import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import BasicPatientAttributes from '../components/BasicPatientAttributes';
import RegistrationBasicInfoForm from '../components/RegistrationBasicInfoForm';
import RegistrationBiometricInfo from '../components/RegistrationBiometricInfo';
import RegistrationContext from '../components/utils/RegistrationContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display:"flex",
    justifyContent:"center",
    maxWidth:"800px"
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Basic Info', 'Biometrics', 'Create New Patient'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Enter the patient's basic information and click NEXT to continue.`;
    case 1:
      return `Enter the patient's biometric details and click NEXT to continue`;
    case 2:
      return `Confirm the accuracy of the information you've entered and click CREATE`;
    default:
      return 'Unknown step';
  }
}

export default function Registration() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [birthday,setBirthday] = useState("")
  const [sex,setSex] = useState("")
  const [homePhone,setHomePhone] = useState("")
  const [mobilePhone,setMobilePhone] =useState("")
  const [workPhone,setWorkPhone] = useState("")
  const [weight,setWeight] =useState("")
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
      <RegistrationContext.Provider value={firstName,setFirstName,setLastName,setBirthday,setSex,setHomePhone,setMobilePhone,setWorkPhone,lastName,sex,mobilePhone,workPhone,homePhone,birthday}>
    <div className={classes.root} style={{overflow:"scroll",maxHeight:"80vh",width:"100%"}}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              {index === 0 ? <RegistrationBasicInfoForm/> : ""}
              {index === 1 ? <RegistrationBiometricInfo/> : ""}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
    </RegistrationContext.Provider>
  );
}