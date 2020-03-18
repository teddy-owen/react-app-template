import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

import Theme from "theme/main.theme.js";


class CustomButton extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hover:false,
        };
    }
    
    static propTypes={
        onClick:PropTypes.func,
        children:PropTypes.node,
        loading:PropTypes.bool,
        disabled:PropTypes.bool,
        style:PropTypes.object,
    };

    render(){
        return (
            <button style={this.props.style}
                onMouseEnter={()=>this.setState({hover:true})}
                onMouseLeave={()=>this.setState({hover:false})}
                onClick={this.props.onClick}
                disabled={this.props.loading || this.props.disabled}
                >
                {this.props.loading ? <FontAwesomeIcon icon={faCog} size="lg" spin/>:this.props.children}
            </button>
        );
    }
}



class TransparentButton extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hover:false,
        };
    }

    static propTypes={
        onClick:PropTypes.func,
        children:PropTypes.node,
        loading:PropTypes.bool,
        disabled:PropTypes.bool,
        expand:PropTypes.bool,
    };
    
    render(){
        return (
            <CustomButton style={{
                padding:"0px",
                border:"none",
                backgroundColor:"transparent",
                outline:"none",
                width:this.props.expand?"100%":"",
            }} onClick={this.props.onClick} loading={this.props.loading} disabled={this.props.disabled}>
                {this.props.children}
            </CustomButton>
        );
    }
}

class PrimaryButton extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hover:false,
        };
    }

    static propTypes={
        onClick:PropTypes.func,
        children:PropTypes.node,
        loading:PropTypes.bool,
        disabled:PropTypes.bool,
        small:PropTypes.bool,
    };
    
    render(){
        return (
            <CustomButton style={{
                fontFamily:Theme.buttonFontFamily,
                backgroundColor:Theme.primaryButtonColor,
                opacity:this.state.hover || this.props.disabled ? "0.8" : "1",
                borderRadius:"8px",
                border:"1px solid transparent",
                padding:this.props.small? "0px":"7px",
                minWidth:this.props.small?"0px":"100px",
                width:"100%",
                height:this.props.small? "30px":"40px",
                fontSize:"1rem",
                color:"white",
                outline:"none",
                overflow:"hidden",
            }} onClick={this.props.onClick} loading={this.props.loading} disabled={this.props.disabled}>
                {this.props.children}
            </CustomButton>
        );
    }
}

class CircleButton extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hover:false,
        };
    }

    static propTypes={
        onClick:PropTypes.func,
        children:PropTypes.node,
        loading:PropTypes.bool,
        disabled:PropTypes.bool,
        backgroundColor:PropTypes.string,
        color:PropTypes.string,
    };
    
    render(){
        return (
            <CustomButton style={{
                fontFamily:Theme.buttonFontFamily,
                backgroundColor:this.props.backgroundColor,
                color:this.props.color,
                opacity:this.state.hover || this.props.disabled ? "0.8" : "1",
                border:"1px solid transparent",
                outline:"none",
                borderRadius:"200px",
                width:"40px",
                height:"40px",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                boxShadow: "3px 3px 7px 0px rgba(0,0,0,0.75)",

            }} onClick={this.props.onClick} loading={this.props.loading} disabled={this.props.disabled}>
                {this.props.children}
            </CustomButton>
        );
    }
}

export {CustomButton, TransparentButton, PrimaryButton, CircleButton};