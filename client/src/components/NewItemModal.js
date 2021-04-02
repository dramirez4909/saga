import React, { useContext, useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import ThemeContext from './utils/ThemeContext';
import Slide from '@material-ui/core/Slide';
import PatientChartContext from './utils/PatientChartContext';
import AddIcon from '@material-ui/icons/Add';
import NewMedicationForm from './NewMedicationForm';
import NewMentalProblemForm from './newMentalProblemForm';
import NewPhysicalProblemForm from './NewPhysicalProblemForm';
import NewOrderForm from './NewOrderForm';

const NewItemColorButton = withStyles((theme) => ({
    root: {
        color: "white",
        paddingRight: "10px",
        paddingLeft: "10px",
        margin: "4px",
        height:"30px",
        color:"dodgerblue",
        outline:"none",
        width:"fit-content",
        textTransform:"none",
        fontSize:"14px",
        backgroundColor:"transparent",
        '&:hover': {
            backgroundColor: "rgb(0,0,0,.1)",
        },
    },
    }))(Button);


    const useStyles = makeStyles((theme) => ({
        paper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            outline: "none",
            padding: theme.spacing(2, 4, 3),
            boxSizing: "auto"
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        modalPaper: {
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
          },
    }));

function NewItemModal(props) { 
    const classes = useStyles()
    console.log("prs!!",props.patient)
    console.log("ptheseasdfadfddd",{...props.patient})

    const themeContext = useContext(ThemeContext)
    const [formModalOpen, setFormModalOpen] = useState(false);
    const [modalForm, setModalForm] = useState(props.modalForm)

    const handleFormModalOpen = (modalForm) => {
        setFormModalOpen(true);
    };
  
    const handleFormModalClose = () => {
        setFormModalOpen(false);
    };

    let form; 
    let buttonTitle;

    if (modalForm === "NewMedicationForm") {
        form = <NewMedicationForm patient={props.patient}></NewMedicationForm>
        buttonTitle = "Add a medication"
    } else if (modalForm === "NewOrderForm") {
        form = <NewOrderForm patient={props.patient}></NewOrderForm>
        buttonTitle = "Place a new order"
    } else if (modalForm === "NewMentalProblemForm") {
        form = <NewMentalProblemForm patient={props.patient}></NewMentalProblemForm>
        buttonTitle = "New mental health issue"
    } else if (modalForm === "NewPhysicalProblemForm") {
        form = <NewPhysicalProblemForm patient={props.patient}></NewPhysicalProblemForm>
        buttonTitle = "New health issue"
    }


    return (
        <>  
            <NewItemColorButton fullWidth={"false"} onClick={(e)=>handleFormModalOpen("NewMedicationForm")} style={{outline:"none"}}>
                 {buttonTitle}
            </NewItemColorButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={formModalOpen}
        onClose={handleFormModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 200
        }}
      >
        <Slide direction="up" in={formModalOpen}>
          <div className={classes.modalPaper} style={{autooverflow:"hidden",display:"flex",outline:"none",backgroundColor: themeContext.themes === "dark" ? "#444444" : "white",color: themeContext.themes === "dark" ? "white" : "#444444",padding:"0",overflow:"hidden"}}>
            {form}
          </div>
        </Slide>
      </Modal>
        </>
    );
}

export default NewItemModal;

