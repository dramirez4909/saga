import React, { useEffect } from 'react';
import {useState} from 'react'
import {login, registerErrors, clearErrors} from '../store/auth'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {withStyles,makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button'
import '../styles/LoginPage.css'

const useStylesLoginTextField = makeStyles((theme) => ({
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

  function LoginTextField(props) {
    const classes = useStylesLoginTextField();
    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
  }

const useStyles = makeStyles((theme)=> ({
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
        margin: "10px",
        backgroundColor: "#EDEFF0",
        '&:hover': {
            backgroundColor: '#fff',
          },
    },
    margin: {
        margin: theme.spacing(1),
    },
    Button: {
        marginTop: "10px",
        backgroundColor: "#92b2ff",
        color: "white",
        '&:hover': {
            backgroundColor: "#abc4ff",
        }
    },
    signUpButton: {
        background: "transparent",
        color: "grey",
        border: "1px solid grey",
        textTransform: "none",
        textDecoration: "none",
        fontSize: "13px",
        margin: "5px"
    }
}))

const ColorButton = withStyles((theme) => ({
    root: {
        color: "white",
        paddingRight: "10px",
        paddingLeft: "10px",
        margin: "4px",
        backgroundColor:"grey",
        '&:hover': {
            backgroundColor: "#b1f3b1 !important",
        },
    },
}))(Button);

function LoginPage() {
    const classes = useStyles()
    const dispatch = useDispatch()
    // const currentUser = useSelector(state => state.auth.user)
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [errors,setErrors] = useState("")
    const authErrors = useSelector(state=>state.auth.errors)

    useEffect(()=>{
        dispatch(clearErrors())
    },[dispatch])

    useEffect(()=>{
        if (authErrors) setErrors(Object.values(authErrors))
    },[authErrors])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!username || !password) {
            await dispatch(registerErrors({"1":"Please enter a username and password"}));
        } else {
            const res = await dispatch(login(username, password));
            // console.log(res.errors);

            if (res.errors){
                await dispatch(registerErrors({"1":"Incorrect username or password!"}));
            }
            else{
                document.location.reload();
            }
        }
    }

    const demoProviderLogin = async (e) => {
        e.preventDefault();
        await dispatch(login('DemoUser', 'password'));
        document.location.reload();
    }
    const demoSchedulerLogin = async (e) => {
        e.preventDefault();
        await dispatch(login('DemoScheduler', 'password'));
        document.location.reload();
    }

    return (
        <>
            <div id="main-content-login">
                <div style={{width:"100%", display:"flex", justifyContent: "center"}}>
                    <div style={{width:"100%", color: "#ff6b6b", display:"flex", justifyContent: "center", textDecoration: "none", fontFamily: "Quicksand", justifySelf: "center", fontSize: "80px"}}>Saga</div>
                </div>
                <Container fixed maxWidth="sm"
                classes={{root: classes.container}}>
                    <h1 className="login-and-signup-header">welcome back!</h1>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <ColorButton size="small" onClick={demoProviderLogin}>Login As a Provider</ColorButton>
                        <ColorButton size="small" onClick={demoSchedulerLogin}>Login As a Scheduler</ColorButton>
                    </div>
                    <Divider style={{width: "100%", margin: "10px"}}/>
                    <div style={{color:"red", display: "flex", flexDirection:"column"}}>
                        {errors ? errors.map((err,i)=>{
                        return(<p style={{marginTop:"3px", marginBottom:"3px"}} key={i}>{errors[i]}</p>)
                        }): ""}
                    </div>
                    <form className='login-form' method="PUT" action="/api/session" onSubmit={handleSubmit}>
                        <div id='login-form-fields' style={{width:"100%", display:"flex", flexDirection: "column"}}>
                            <LoginTextField InputLabelProps={{style: {color: "grey"}}} type="text" placeholder="username" size="medium" name="password" value={username} onChange={e => setUsername(e.target.value)}/>
                            <LoginTextField InputLabelProps={{style: {color: "grey"}}} type="password" placeholder="password" size="medium" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <Button size="small" classes={{ root: classes.Button }} type="submit">Log in</Button>
                    </form>
                    <Divider style={{width: "100%", margin: "24px"}}/>
                    <NavLink id='signup-navlink' to="/signup"><p className="is-white" id="signUpText">Don't have an account?  Sign Up</p></NavLink>
                </Container>
            </div>
        </>

    )

}

export default LoginPage;
