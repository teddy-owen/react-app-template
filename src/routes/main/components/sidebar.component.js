import React from 'react';
import PropTypes from 'prop-types';
import { 
    withRouter,
} from "react-router-dom";
import Navigation from "services/navigation.service.js";
import JWT from "services/jwt.service.js";
import Theme from "theme/main.theme.js";
import {PrimaryButton, CircleButton} from "components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import "./sidebar.style.css";

class SideBar extends React.Component{
    constructor(props) {
        super(props);
        this.state={
        };
        this.logout = this.logout.bind(this);
    }
    

    static propTypes={
        history: PropTypes.object.isRequired,
        sideBarCloseFunc:PropTypes.func,
    };
    

    logout(){
        JWT.clearToken();
        this.props.history.push(Navigation.paths.login);
    }


  render(){
    return (
        <div 
        className={this.props.open ? "open-animation":"close-animation"}
        style={{
            flexShrink:"0",
            display:"flex",
            flexDirection:"column",
            backgroundColor:Theme.color1,
            width:"255px",
            padding:"0px 20px 0px 20px",
          }}>
            <div style={{
                display:"flex",
                justifyContent:"flex-end",
                marginTop:"8px",
            }}>
                <CircleButton backgroundColor={Theme.color1} color={"white"} onClick={this.props.sideBarCloseFunc}>
                    <FontAwesomeIcon icon={faTimes} size="lg"/> 
                </CircleButton>
            </div>
            <div style={{
                marginTop:"75px",
                marginBottom:"35px"
            }}>
                <PrimaryButton small={true} onClick={()=>this.props.history.push(Navigation.paths.quizzes)}>
                    Home
                </PrimaryButton>
            </div>
            <div style={{
                marginBottom:"35px"
            }}>
                <PrimaryButton small={true} onClick={()=>{
                    let win = window.open("https://assistant.google.com/services/a/uid/00000070c705c816?source=web", '_blank');
                    win.focus();
                }}>
                    Connect Google Assistant
                </PrimaryButton>
            </div>
            <div style={{
                marginBottom:"35px"
            }}>
                <PrimaryButton small={true} onClick={()=>this.props.history.push(Navigation.paths.manageAccount)}>
                    Manage Account
                </PrimaryButton>
            </div>
            <div style={{
                marginBottom:"35px"
            }}>
                <PrimaryButton small={true} onClick={this.logout}>
                    Logout
                </PrimaryButton>
            </div>
        </div>
    );
  }
}


export default withRouter(SideBar);
