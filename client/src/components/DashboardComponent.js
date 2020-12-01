import React, { useContext } from 'react';
import Button from '@material-ui/core/Button'
import ThemeContext from './utils/ThemeContext';
import Brightness4TwoToneIcon from '@material-ui/icons/Brightness4TwoTone';


function DashboardComponent(props) {
    const changeThemes = () =>{
        if (themeContext.themes === "light") {
          themeContext.setThemes("dark")
        } else if (themeContext.themes === "dark") {
          themeContext.setThemes("light")
        }
      }

    const themeContext = useContext(ThemeContext)
    return (
        <>
            <p>{props.activity.name}</p>
            <div>
            {themeContext.themes === "light" ? <Button onClick={changeThemes} size="small" style={{outline:"none",backgroundColor: "#7f53ac",backgroundImage: "linear-gradient(315deg, #7f53ac 0%, #647dee 74%)",marginRight:"30px",color:"white",textTransform:"none",fontWeight:"bolder"}}><Brightness4TwoToneIcon style={{cursor:"pointer",color:"#3badfb"}}/></Button>
            :
            <Button onClick={changeThemes} size="small" style={{outline:"none",background:"linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",marginRight:"30px",color:"white",textTransform:"none",fontWeight:"bolder"}}><Brightness4TwoToneIcon style={{cursor:"pointer",color:"#f7b732"}}/></Button>}
          </div>
        </>
    );
}
export default DashboardComponent;