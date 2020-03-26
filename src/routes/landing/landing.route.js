import React from 'react';
import PropTypes from 'prop-types';
import { 
  withRouter,
} from "react-router-dom";

import Logo from "assets/img/logo192.png";

import {PrimaryButton} from "components";
import Navigation from "services/navigation.service.js";
import DeviceDetect from "services/device.service.js";
import Theme from "theme/main.theme.js";

class Landing extends React.Component{
  constructor(props) {
    super(props);
    this.state={
    };

  }

  static propTypes={
    history: PropTypes.object.isRequired,
  };
  
  componentDidMount(){
  }

  componentWillUnmount(){
  }
  
  render(){
    return (
      <div style={{
        display:"flex",
        flexDirection:"column",
      }}>
        <div style={{
          display:"flex",
          justifyContent:DeviceDetect.isMobile() ?"center":"space-between",
          padding:"20px",
          backgroundColor:"#6515e4",
          marginBottom:"30px",
        }}>        
          <div style={{
            width:"150px",
            display:DeviceDetect.isMobile() ?"none":"block",
          }}>     
   
          </div>
          <div style={{
            display:"flex",
            flexDirection:"column",
            margin:"0px 20px",
          }}>
            <img src={Logo} alt={"logo"}
            style={{
                width:"78px",
                height:"78px"
            }}/>
          </div>
          
          <div style={{
            width:"150px",
            alignSelf:"start",
            display:DeviceDetect.isMobile() ?"none":"block",
          }}>
            <PrimaryButton onClick={()=>{
              this.props.history.push(Navigation.paths.app);
            }}
            verticalExpand={true}
            >
              Register / Login
            </PrimaryButton>
          </div>
        </div>
        <div style={{
          alignSelf:"center",
          backgroundColor:"#ffffff9e",
          boxShadow:"0px 0px 18px 26px #ffffff9e",
          display:"flex",
          alignItems:"center",
        }}>
          <div style={{
          textAlign:"center",
          fontFamily:Theme.secondaryFontFamily,
          fontSize:"58px",
          fontWeight:"bold",
          color:"#6515e4",
          }}>
            Uber meets Netflix for Cats...
          </div>
        </div>
        <div style={{
            width:"235px",
            height:"50px",
            alignSelf:"center",
            marginTop:"62px",
          }}>
            <PrimaryButton onClick={()=>{
              this.props.history.push(Navigation.paths.app);
            }}
            verticalExpand={true}
            >
              Get Started
            </PrimaryButton>
          </div>

        <div style={{
          marginTop:"auto",
          backgroundColor:"#6515e4",
          display:"flex",
          justifyContent:"center",
          color:"white",
          fontFamily:Theme.secondaryFontFamily,
          fontSize:"12px",
        }}>
          Copyright ©{new Date().getFullYear()} AISOFT DEVELOPMENT LLC
        </div>
      </div>
    );
  }

}


export default withRouter(Landing);
