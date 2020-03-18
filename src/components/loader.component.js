import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

import Theme from "theme/main.theme.js";


class Loader extends React.Component{
    constructor(props) {
        super(props);
        this.state={
        };
    }
    
    static propTypes={
    };

    render(){
        return (
        <div style={{
          width:"100%",
          height:"100%",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
        }}>
          <div style={{
            color:Theme.color1,
          }}>
            <FontAwesomeIcon icon={faCog} size="5x" spin/> 
          </div>
        </div>
        );
    }
}


export {Loader};