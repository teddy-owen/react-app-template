import React from 'react';
import PropTypes from 'prop-types';
import Theme from "theme/main.theme.js";

class Card extends React.Component{
  hoverOffset=2;
  shadowOffset=3;
  
  constructor(props) {
      super(props);
      this.state={
        hover:false,
      };
  }
  
  static propTypes={
      children:PropTypes.node,
      style:PropTypes.object,
      onClick:PropTypes.func,
      disableHover:PropTypes.bool,
  };

  render(){
      return (
          <div style={{
            borderRadius:"6px",
            boxShadow:this.state.hover?`${this.shadowOffset+this.hoverOffset}px ${this.shadowOffset+this.hoverOffset}px 12px 0px rgba(0,0,0,0.75)`:`${this.shadowOffset}px ${this.shadowOffset}px 12px 0px rgba(0,0,0,0.75)`,
            padding:"10px 10px",
            backgroundColor:Theme.color1,
            color:"white",
            cursor: this.props.onClick ? "pointer":"inherit",
            transform:this.state.hover?`translate(${this.hoverOffset*-1}px,${this.hoverOffset*-1}px)`:"none",
            transition:"100ms",
            ...this.props.style,
          }}
          onClick={this.props.onClick}
          onMouseEnter={()=>this.setState({hover:this.props.disableHover?false:true})}
          onMouseLeave={()=>this.setState({hover:false})}
          >
            {this.props.children}
          </div>
      );
  }
}



export {
  Card,
};
