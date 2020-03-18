import React from 'react';
import PropTypes from 'prop-types';
import { 
    withRouter
} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, } from '@fortawesome/free-solid-svg-icons'

import { CircleButton} from "components";

import "./sidebar.style.css";
import Theme from '../../../theme/main.theme';
import Logo from "assets/img/logo192.png";

class TopBar extends React.Component{
    constructor(props) {
        super(props);
        this.state={
        };
    }
    

    static propTypes={
      sideBarOpenFunc:PropTypes.func,
      sideBarOpen:PropTypes.bool,
      history: PropTypes.object.isRequired,
    };
    

  render(){
    return (
      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:"rgb(255, 105, 120)",
        height:"56px",
        padding:"0px 20px 0px 20px",
        boxShadow:"rgba(0, 0, 0, 0.44) 36px 0px 8px -26px inset",
      }}>

        <div style={{
            visibility: this.props.sideBarOpen ? "hidden":"inherit",
          }}>
          <CircleButton backgroundColor={Theme.color1} color={"white"} onClick={this.props.sideBarOpenFunc}>
              <FontAwesomeIcon icon={faBars} size="lg"/>
          </CircleButton>
        </div>

        <img src={Logo} style={{
          width:"59px",
          justifySelf:"center",
        }} alt="logo"/>

          <div style={{
            visibility: "hidden",
          }}>
          <CircleButton backgroundColor={Theme.color1} color={"white"} >
              <FontAwesomeIcon icon={faBars} size="lg"/>
          </CircleButton>
        </div>

      </div>
    );
  }
}


export default withRouter(TopBar);
