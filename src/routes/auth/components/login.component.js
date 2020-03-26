import React from 'react';
import PropTypes from 'prop-types';
import { 
    Link,
    withRouter,
} from "react-router-dom";

import {PrimaryButton, EmailInput, PasswordInput, InputErrorMessage} from "components";
import JWT from "services/jwt.service.js";
import Navigation from "services/navigation.service.js";
import Theme from 'theme/main.theme';

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            loginFailed:false,
            email:"",
            password:"",
            loading:false,
            emailInvalid:false,
            passwordInvalid:false,
        };
        this.getToken = this.getToken.bind(this);
    }
    

    static propTypes={
        forgotPasswordClick:PropTypes.func,
        registerClick:PropTypes.func,
        getTokenFunction:PropTypes.func,
        history: PropTypes.object.isRequired,
    };
    
    _isValidEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    async getToken(){
        try {
            this.setState({loginFailed:false});
            this.setState({emailInvalid:false});
            this.setState({passwordInvalid:false});
            
            let validEmail=true;
            let validPassword=true;
            
            if(this.state.email === null || this.state.email === "" || !this._isValidEmail(this.state.email)){
                this.setState({emailInvalid:true});
                validEmail=false;
            }
    
            if(this.state.password === null || this.state.password === "" || this.state.password.length < 6 ){
                this.setState({passwordInvalid:true});
                validPassword=false;
            }
            
            if (!validEmail || !validPassword){
                return;
            }

            this.setState({loading:true});
    
            let tokenResponse = await this.props.getTokenFunction(this.state.email,this.state.password);

            // store token
            JWT.storeToken(tokenResponse["token"]);            
            
            this.setState({loading:false});
            
            // navigate to next screen
            this.props.history.push(Navigation.paths.app);

            
        } catch (error) {
            console.error(error);
            this.setState({loginFailed:true,loading:false});        
        }

    }

  render(){
    return (
        <div className="fade-in-animation" style={{
            flexGrow:"1",
            display:"flex",
            flexDirection:"column",
            }}>
            <h2  style={{
                textAlign:"center",
                color:this.state.loginFailed?"#fd5666":"inherit",
                marginBottom:this.state.loginFailed?"25px":"50px",
            }}>Login</h2>
            <div className="" style={{
                marginBottom:this.state.loginFailed?"25px":"0px",
            }}>
                <InputErrorMessage message={"Email or password incorrect"} show={this.state.loginFailed} center={true}/>
            </div>
            <div className="" style={{
                margin:"0px 0px 15px 0px",
            }}>
                <EmailInput value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}  error={this.state.loginFailed || this.state.emailInvalid}/>
                <InputErrorMessage message={"Must be a valid Email"} show={this.state.emailInvalid} />
            </div>
            <div className="" style={{
                margin:"0px 0px 0px 0px",
            }}>
                <PasswordInput value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})} error={this.state.loginFailed|| this.state.passwordInvalid}/>
                <InputErrorMessage message={"Password must be at least 6 characters long."} show={this.state.passwordInvalid} />             
            </div>
            <div style={{
                display:"flex",
                justifyContent:"space-between",
            }}>
                <Link to={Navigation.paths.forgotPassword}>
                    <small style={{
                        color:Theme.fontColor1,
                    }}>
                        Forgot Password
                    </small>
                </Link>
                <Link to={Navigation.paths.register}>
                    <small style={{
                        color:Theme.fontColor1,
                    }}>
                        Sign Up
                    </small>
                </Link>
            </div>
            <div className="" style={{
                marginTop:"auto",
            }}>
                <PrimaryButton loading={this.state.loading} onClick={this.getToken}>
                    Login
                </PrimaryButton>
            </div>
        </div>

    );
  }
}


export default withRouter(Login);
