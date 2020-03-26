import React from 'react';
import { 
    Switch,
    Route ,
    Redirect,
    withRouter
} from "react-router-dom";

import Logo from "assets/img/logo192.png";
import Theme from "theme/main.theme.js";
import DeviceDetect from "services/device.service.js";

import Login from"./components/login.component.js";
import Register from"./components/register.component.js";
import ForgotPassword from "./components/forgot-password.component.js";

import HTTPService from "services/http.service.js";
import Navigation from "services/navigation.service.js";
import JWT from "services/jwt.service.js";

class Auth extends React.Component{
    pages={
        login:"login",
        forgotPassword:"forgot-password",
        register:"register",
    };
    constructor(props) {
        super(props);
        this.state={
            page:this.props.page || this.pages.login,
        };
    }
    
  render(){
    return (
      <div className="" style={{
          backgroundColor:Theme.color1,
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          padding:DeviceDetect.isMobile() ? "20px 10px":"50px 10px",
          }}>
        <img src={Logo} alt={"logo"}
        style={{
            width:"108px",
            margin:"0px 0px 15px 0px",
        }}/>
        <div className="" style={{
            padding:"30px",
            backgroundColor:"white",
            borderRadius:"15px",
            width:"100%",
            maxWidth:"375px",
            minHeight:"365px",
            display:"flex",
            flexDirection:"column",
            }}>
            <Switch >
                <Route path={Navigation.paths.login}>
                    <Login getTokenFunction={HTTPService.login} forgotPasswordClick={()=>this.setState({page:this.pages.forgotPassword})} registerClick={()=>this.setState({page:this.pages.register})}/>
                </Route>
                <Route path={Navigation.paths.forgotPassword}>
                    <ForgotPassword forgotPasswordFunction={HTTPService.forgotPassword} loginClick={()=>this.setState({page:this.pages.login})} registerClick={()=>this.setState({page:this.pages.register})}/>
                </Route>
                <Route path={Navigation.paths.register}>
                    <Register getTokenFunction={HTTPService.register} loginClick={()=>this.setState({page:this.pages.login})} forgotPasswordClick={()=>this.setState({page:this.pages.forgotPassword})}/>
                </Route>
                <Route>
                    <Redirect to={Navigation.paths.register} />
                </Route>
            </Switch>
            </div>

            {process.env.NODE_ENV === 'development' && 
                <div style={{
                    marginTop:"20px",
                    display:"flex",
                    flexDirection:"column",
                    backgroundColor:"red",
                    padding:"20px",
                    border:"2px solid white",
                    width:"350px",
                }}>
                    <button style={{
                    }}
                    onClick={()=>{
                        // store token
                        JWT.storeToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");                                    
                        // navigate to next screen
                        this.props.history.push(Navigation.paths.app);
                    }}>
                        DEVELOPMENT AUTH BYPASS
                    </button>
                    <h6 style={{
                        // backgroundColor:"black",
                        color:"yellow",
                        padding:"3px",
                        marginTop:"12px",
                        textAlign:"center",
                    }}>
                        This will only be visible in the development environment. Clicking this will store a dummy token in
                        local storage and redirect you to the main page. You can clear this token from the developer console.
                    </h6>
                </div>
            }

      </div>
    );
  }
}


export default withRouter(Auth);
