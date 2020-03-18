import React from 'react';
import PropTypes from 'prop-types';
import { 
    Link 
} from "react-router-dom";
import Theme from 'theme/main.theme';
import {PrimaryButton,  EmailInput, InputErrorMessage} from "components";
import Navigation from "services/navigation.service.js";
class ForgotPassword extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            forgotPasswordFailed:false,
            forgotPasswordSuccess:false,
            emailInvalid:false,
            email:"",
            loading:false,
        };
        this.submit = this.submit.bind(this);
    }
    

    static propTypes={
        loginClick:PropTypes.func,
        registerClick:PropTypes.func,
        forgotPasswordFunction:PropTypes.func,
    };
    
    _isValidEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    async submit(){
        try {
            this.setState({forgotPasswordFailed:false,forgotPasswordSuccess:false});
            this.setState({emailInvalid:false});
            
            let validEmail=true;
            
            if(this.state.email === null || this.state.email === "" || !this._isValidEmail(this.state.email)){
                this.setState({emailInvalid:true});
                validEmail=false;
            }
            
            if (!validEmail){
                return;
            }

            this.setState({loading:true});
    
            let response = await this.props.forgotPasswordFunction(this.state.email);

            // store token
            
            this.setState({loading:false});
            
            // Show Message
            this.setState({forgotPasswordSuccess:true});

        } catch (error) {
            
            if(error.status>=500){
                // email exists
                this.setState({forgotPasswordFailed:true,forgotPasswordSuccess:false}); 
            }else{
                this.setState({forgotPasswordFailed:false,forgotPasswordSuccess:true}); 
            }

            console.error(error);
            this.setState({loading:false});        
        }

    }

  render(){
    return (
        <div className="fade-in-animation" style={{
            flexGrow:"1",
            display:"flex",
            flexDirection:"column",
            height:"100%",
            }}>
            <h2  style={{
                textAlign:"center",
                color:this.state.forgotPasswordFailed?"#fd5666":"inherit",
                marginBottom:this.state.forgotPasswordFailed || this.state.forgotPasswordSuccess ?"25px":"50px",
            }}>Forgot Password</h2>
            <div className="" style={{
                marginBottom:this.state.forgotPasswordFailed || this.state.forgotPasswordSuccess ?"25px":"0px",
            }}>
                <InputErrorMessage message={"Invalid Submission. Please try again."} show={this.state.forgotPasswordFailed} center={true}/>
                {this.state.forgotPasswordSuccess && <div style={{
                    color:"green",
                    textAlign:"center",
                }}>
                    If you have an account under that email, you should receive an email to reset your password shortly.
                </div>}
            </div>
            <div className="" style={{
                margin:"0px 0px 15px 0px",
            }}>
                <EmailInput value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}  error={this.state.forgotPasswordFailed || this.state.emailInvalid}/>
                <InputErrorMessage message={"Must be a valid Email"} show={this.state.emailInvalid} />
            </div>
            <div style={{
                display:"flex",
                justifyContent:"space-between",
            }}>
                <Link to={Navigation.paths.login}>
                    <small style={{
                        color:Theme.fontColor1,
                    }}>
                       Login
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
                <PrimaryButton loading={this.state.loading} onClick={this.submit}>
                    Submit
                </PrimaryButton>
            </div>
        </div>

    );
  }
}


export default ForgotPassword;
