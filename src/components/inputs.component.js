import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

class CustomInput extends React.Component{

    static propTypes={
        value:PropTypes.string,
        onChange:PropTypes.func,
        type:PropTypes.string,
        placeholder:PropTypes.string,
        icon:PropTypes.element,
        error:PropTypes.bool,
        success:PropTypes.bool,
        disabled:PropTypes.bool,     
    };
    
    constructor(props) {
        super(props);
        this.state={
        };

    }
    
    render(){
        return (
            <div  style={{
                display:"flex",
                alignItems:"center",
                margin:"0px 0px 5px 0px",
                width:"100%",
                position:"relative",
            }}>
                
                {this.props.icon?
                    <div style={{
                        position:"absolute",
                        padding:"0px 11px",
                        color:this.props.error? "#fd5666":(this.props.success ? "#21bf45":"#a2a2a2"),
                    }}>
                        {this.props.icon}
                    </div>:null
                }

                <input type={this.props.type || "text"}
                style={{
                    borderRadius:"10px",
                    border:this.props.error?"2px solid #fd5666":(this.props.success ? "2px solid #21bf45":"2px solid #a2a2a2"),
                    color:this.props.error?"#fd5666":(this.props.success ? "#21bf45":"inherit"),
                    boxShadow:this.props.error?"0px 0px 6px 0px #fd5666":(this.props.success ? "0px 0px 6px 0px #21bf45":"0px 0px 6px 0px rgba(0,0,0,0.75)"),
                    outline:"none",
                    padding:this.props.icon?"3px 14px 3px 35px":"3px 14px 3px 14px",
                    minWidth:"225px",
                    width:"100%",
                    backgroundColor:this.props.disabled?"#dcdcdc":"white",
                }}
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                disabled={this.props.disabled}
                value={this.props.value}
                />
            </div>
        );
    }
}

class CustomTextArea extends React.Component{

    static propTypes={
        value:PropTypes.string,
        onChange:PropTypes.func,
        placeholder:PropTypes.string,
        error:PropTypes.bool,
        success:PropTypes.bool,
        disabled:PropTypes.bool,     
    };
    
    constructor(props) {
        super(props);
        this.state={
        };

    }
    
    render(){
        return (            
            <textarea 
            style={{
                borderRadius:"10px",
                border:this.props.error?"2px solid #fd5666":(this.props.success ? "2px solid #21bf45":"2px solid transparent"),
                color:this.props.error?"#fd5666":(this.props.success ? "#21bf45":"inherit"),
                boxShadow:this.props.error?"4px 4px 12px 0px #fd5666":(this.props.success ? "4px 4px 12px 0px #21bf45":"4px 4px 12px 0px rgba(0,0,0,0.75)"),
                outline:"none",
                padding:this.props.icon?"3px 14px 3px 35px":"3px 14px 3px 14px",
                minWidth:"225px",
                width:"100%",
                backgroundColor:this.props.disabled?"#dcdcdc":"white",
                resize: "none",
            }}
            placeholder={this.props.placeholder}
            onChange={this.props.onChange}
            disabled={this.props.disabled}
            rows={3}
            value={this.props.value}
            >
            </textarea>
        );
    }
}
class EmailInput extends React.Component{
    static propTypes={
        value:PropTypes.string,
        onChange:PropTypes.func,
        error:PropTypes.bool,
        success:PropTypes.bool,
        disabled:PropTypes.bool,     
    };

    render(){               
        return (
            <CustomInput icon={<FontAwesomeIcon icon={faEnvelope} size="1x" />} placeholder="Email" type="email" value={this.props.value} error={this.props.error} success={this.props.success} onChange={this.props.onChange} disabled={this.props.disabled}/>
        );
    }
}

class PasswordInput extends React.Component{
    static propTypes={
        value:PropTypes.string,
        onChange:PropTypes.func,
        error:PropTypes.bool,
        success:PropTypes.bool,
        disabled:PropTypes.bool,     
    };
    render(){
        return (
            <CustomInput icon={<FontAwesomeIcon icon={faLock} size="1x" />} placeholder="Password" type="password" value={this.props.value} error={this.props.error} success={this.props.success} onChange={this.props.onChange} disabled={this.props.disabled}/>
        );
    }
}

class InputErrorMessage extends React.Component{
    static propTypes={
        message:PropTypes.string,
        show:PropTypes.bool,
        center:PropTypes.bool,
    };
    render(){
        return (
            <small style={{
                display:this.props.show?"block":"none",
                color:"#fd5666",
                fontWeight:"bold",
                textAlign:this.props.center?"center":"left",
            }}>
                {this.props.message}
            </small>
        );
    }
}

export {CustomInput, EmailInput, PasswordInput, InputErrorMessage, CustomTextArea};