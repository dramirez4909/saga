import React, { useContext, useEffect, useState } from 'react';
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
import Cookies from 'js-cookie'

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
  const [height,setHeight]=useState("")
  const [occupation,setOccupation]=useState("")
  const [bmi,setBmi] = useState("")
  const [heartRate,setHeartRate]=useState("")
  const [smoker,setSmoker] =useState("")
  const [addressLineOne,setAddressLineOne]=useState("")
  const [addressLineTwo,setAddressLineTwo]=useState("")
  const [addressLineThree,setAddressLineThree]=useState("")
  const [addressCity,setAddressCity]=useState("")
  const [addressState,setAddressState]=useState("")
  const [addressZip,setAddressZip]=useState("")
  const [picture,setPicture]=useState("")
  const [creatingPatient,setCreatingPatient]=useState(false)
  const [patientToCreate,setPatientToCreate]=useState({})

  useEffect(()=>{
    const createPatient = async (patient) => {
        const csrfToken = Cookies.get("XSRF-TOKEN")
        const jsonPatient = JSON.stringify(patient)
        const res = await fetch('/api/patients/create',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
            body: jsonPatient
        })
        const data = await res.json()
        setPatientToCreate({})
        handleNext()
    }
    if (patientToCreate.firstName && patientToCreate.lastName) {
        createPatient(patientToCreate)
    }

  },[creatingPatient])


  const steps = getSteps();

  const handleCreateNewPatient = () => {
      setPatientToCreate({
        firstName,
        lastName,
        sex,
        mobilePhone,
        workPhone,
        homePhone,
        birthday,
        weight,
        bmi,
        height,
        smoker,
        heartRate,
        occupation,
        addressCity,
        addressZip,
        addressLineOne,
        addressLineThree,
        addressLineTwo,
        addressState,
        picture,
      })
      setCreatingPatient(!creatingPatient)
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const contextObject = {
        firstName,
        setFirstName,
        setLastName,
        setBirthday,
        setSex,
        setHomePhone,
        setMobilePhone,
        setWorkPhone,
        lastName,
        sex,
        mobilePhone,
        workPhone,
        homePhone,
        birthday,
        weight,
        setWeight,
        bmi,
        setBmi,
        height,
        setHeight,
        occupation,
        setOccupation,
        smoker,
        setSmoker,
        addressCity,
        setAddressCity,
        addressZip,
        setAddressZip,
        addressLineOne,
        setAddressLineOne,
        setAddressLineTwo,
        setAddressLineThree,
        addressLineThree,
        addressLineTwo,
        setAddressState,
        addressState,
        picture,
        setPicture
  }

  return (
      <RegistrationContext.Provider value={contextObject}>
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
                  
                    {activeStep === steps.length - 1 ? <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateNewPatient}
                    className={classes.button}
                  >Create New Patient</Button> : <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >Next</Button>}
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>New Patient successfully created - you&apos;re finished!</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
    </RegistrationContext.Provider>
  );
}