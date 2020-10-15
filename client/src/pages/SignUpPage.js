import React, { useEffect } from 'react';
import {useState} from 'react'
import {signup, registerErrors, clearErrors} from '../store/auth'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider';
import '../styles/SignUpPage.css'

const useStylesSignUpTextField = makeStyles((theme) => ({
  root: {
    border: '2px solid #e2e2e1',
    overflow: 'hidden',
    paddingLeft: "10px",
    paddingTop: "4px",
    paddingBottom: "4px",
    marginTop: "14px",
    borderRadius: 4,
    backgroundColor: '#fcfcfb',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&$focused': {
      border: '2px solid rgb(94, 158, 214)',
      backgroundColor: '#fff',
      // boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 1px`,
    },
  },
  focused: {},
}));

function SignUpTextField(props) {
  const classes = useStylesSignUpTextField();
  return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "white",
        height: "100%",
        padding: "30px",
        boxShadow: "rgba(0,0,0,0.1) 0 0 10px"
    },
    TextField: {
        margin: "10px"
    },
    logo: {
      color: "#2196f3",
      textDecoration: "none",
      fontFamily: "Brush Script MT",
      fontSize: "80px",
      padding: "0",
      margin: "0",
  },
    Button: {
        backgroundColor: "#92b2ff",
        color: "white",
        marginTop: "10px",
        textDecoration: "none",
        '&:hover': {
            backgroundColor: "#abc4ff",
        }
    },
    logInButton: {
        background: "transparent",
        color: "grey",
        border: "1px solid grey",
        textTransform: "none",
        fontSize: "13px",
        margin: "5px"
    }
})
//TODO: Validate unique username and email, validate confirm password === password

function SignupPage() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const [email,setEmail] = useState("")
  const [userToCreate,setUserToCreate] = useState({})
  const [errors,setErrors] = useState([])
  const authErrors = useSelector(state=>state.auth.errors)

  useEffect(()=>{
    dispatch(clearErrors())
  },[dispatch])

  useEffect(()=>{
    const validateUser= async ()=>{
        const username = userToCreate.username
        const email = userToCreate.email
        const password = userToCreate.password
        await dispatch(signup(username,email,password))
    }
    if (userToCreate !== {}){
        validateUser()
    }
  },[userToCreate, dispatch])

  useEffect(()=>{
    if (authErrors) setErrors(Object.values(authErrors))
  }, [authErrors])

const handleSubmit = (e) => {
    e.preventDefault()
    if (!username){
      dispatch(registerErrors({"8":"please enter a username"}))
    }
    if (!email){
      dispatch(registerErrors({"10":"please enter an email address"}))
    }
    if (!password || !confirmPassword){
      dispatch(registerErrors({"11":"please enter a password and confirm it"}))
    }
    if (!(password === confirmPassword)){
      dispatch(registerErrors({"9":"password fields do not match"}))
    }
    if ((password === confirmPassword) && username && email){
      setUserToCreate({username,email,password})
    }
}

  const handleUsernameInput = (e) => {
      setUsername(e.target.value)
  }

  const handleEmailInput = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordInput = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordInput = (e) => {
      setConfirmPassword(e.target.value)
  }

  return (
    <>
      <div id="main-content-sign-up">
        <div style={{width:"100%", display:"flex", justifyContent: "center"}}>
        <div style={{width:"100%", color: "#ff6b6b", display:"flex", justifyContent: "center", textDecoration: "none", fontFamily: "Quicksand", justifySelf: "center", fontSize: "80px"}}>Saga</div>
        </div>
      <Container fixed maxWidth="sm" classes={{root: classes.container}}>
        <h1 className="login-and-signup-header">create your new account!</h1>
        <Divider style={{width: "100%", margin: "10px"}}/>
        <div style={{color:"red", display: "flex", flexDirection:"column", alignContent:"center"}}>
          {errors ? errors.map((err,i)=>{
          return(<p style={{marginTop:"3px", marginBottom:"3px"}} key={i}>{errors[i]}</p>)
          }): ""}
        </div>
        <form className='signup-form' method="POST" action="/api/session" onSubmit={handleSubmit}>
          <SignUpTextField InputLabelProps={{style: {color: "grey"}}} type="text" size="medium" placeholder="username" name="username" value={username} onChange={handleUsernameInput} />
          <SignUpTextField InputLabelProps={{style: {color: "grey"}}} type="text" size="medium" placeholder="email" name="email" value={email} onChange={handleEmailInput} />
          <SignUpTextField InputLabelProps={{style: {color: "grey"}}} type="password" size="medium" placeholder="password" name="password" value={password} onChange={handlePasswordInput} />
          <SignUpTextField InputLabelProps={{style: {color: "grey"}}} style={{color:"red"}} type="password" size="medium" placeholder="confirm password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordInput} />
          <Button size="small" classes={{ root: classes.Button }} type="submit">Sign Up and Log In</Button>
        </form>
        <Divider style={{width: "100%", margin: "24px"}}/>
        <NavLink id='login-navlink' to="/login"><p id="signUpText">Already have an account?  Log In</p></NavLink>
      </Container>
      </div>
    </>
  )
}

export default SignupPage;
