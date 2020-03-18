import React from 'react';
import PropTypes from 'prop-types';

import {CustomInput} from "components";

class BaseDialog extends React.Component{
    constructor(props) {
        super(props);
        this.state={
        };
    }
    
    static propTypes={
      show:PropTypes.bool,
      onDismiss:PropTypes.func,
      showClose:PropTypes.bool,
      title:PropTypes.string,
      body:PropTypes.node,
      dismissTitle:PropTypes.string,
      actionTitle:PropTypes.string,
      actionColor:PropTypes.string,
      actionFunction:PropTypes.func,
      center:PropTypes.bool,
      showActionButton:PropTypes.bool,
      loading:PropTypes.bool,
    };

    render(){
        return (
          <div style={{
            position:"fixed",
            zIndex:"10",
            backgroundColor:"#00000057",
            width:"100vw",
            height:"100vh",
            left:"0px",
            top:"0px",
            display:this.props.show?"flex":"none",
            justifyContent:"center",
            alignItems:this.props.center?"center":"start",
            paddingTop:this.props.center?"0px":"150px",
          }}
          onClick={this.props.onDismiss} 
          >
            <div style={{
              backgroundColor:"white",
              borderRadius:"10px",
              minHeight:"100px",
              minWidth:"250px",
              display:"flex",
              flexDirection:"column",
              padding:"20px 20px",
              maxWidth:"500px",
              maxHeight:"350px",
              overflow:"hidden",
            }}
            onClick={(e)=>e.stopPropagation()}
            >
              <div style={{
                display:"flex",
                marginBottom:"15px"
              }}>
                <h3 style={{
                  marginRight:"40px"
                }}
                >
                  {this.props.title}
                </h3>
                <button style={{
                  border:"none",
                  backgroundColor:"transparent",
                  marginLeft:"auto",
                  fontWeight:"bold",
                  fontSize:"25px",
                  alignSelf:"start",
                  display:this.props.showClose?"block":"none",
                  outline:"none",
                }}
                onClick={this.props.onDismiss}                
                >
                  &times;
                </button>
              </div>
              <div style={{
                marginBottom:"40px",
                fontSize:"18px",
                overflow:"auto"
              }}>
                {this.props.body}                
              </div>
              <div style={{
                display:"flex",
              }}>
                <button style={{
                  border:"none",
                  borderRadius:"6px",
                  padding:this.props.showActionButton?"5px 30px":"0px",
                  backgroundColor:this.props.showActionButton?"#0095ff":"transparent",
                  marginLeft:"auto",
                  fontSize:"18px",
                  color:this.props.actionColor,
                  outline:"none",
                }}
                onClick={this.props.actionFunction}
                disabled={this.props.loading}
                >
                  {this.props.actionTitle}
                </button>
                <button style={{
                  display:this.props.dismissTitle?"block":"none",
                  border:"none",
                  backgroundColor:"transparent",
                  marginLeft:"25px",
                  fontSize:"18px",
                  color:"#3b89ff",
                  outline:"none",
                }}
                onClick={this.props.onDismiss}
                >
                  {this.props.dismissTitle}
                </button>
              </div>
            </div>
          </div>
        );
    }
}

class ConfirmDialog extends React.Component{
  constructor(props) {
    super(props);
    this.state={
    };
  }

  static propTypes={
    show:PropTypes.bool,
    title:PropTypes.string,
    body:PropTypes.string,
    actionTitle:PropTypes.string,
    actionFunction:PropTypes.func,
    onDismiss:PropTypes.func,
  };

  render(){
    return(<BaseDialog 
      show={this.props.show} 
      onDismiss={this.props.onDismiss}
      showClose={false} 
      title={this.props.title} 
      body={this.props.body} 
      dismissTitle={"Cancel"} 
      actionTitle={this.props.actionTitle}
      actionFunction={this.props.actionFunction} 
      actionColor={"red"}
      center={false}
      />);
  }

}

class InputDialog extends React.Component{
  constructor(props) {
    super(props);
    this.state={
    };
  }

  static propTypes={
    show:PropTypes.bool,
    title:PropTypes.string,
    body:PropTypes.string,
    actionTitle:PropTypes.string,
    actionFunction:PropTypes.func,
    onDismiss:PropTypes.func,
    onChange:PropTypes.func,
    loading:PropTypes.bool,
    value:PropTypes.string,
  };

  render(){
    return(<BaseDialog 
      show={this.props.show} 
      onDismiss={this.props.onDismiss}
      showClose={true} 
      title={this.props.title} 
      body={
        <div style={{
          padding:"7px",
        }}>
          <CustomInput onChange={this.props.onChange} value={this.props.value}/>
        </div>
      }
      showActionButton={true}
      actionTitle={this.props.actionTitle}
      actionFunction={this.props.actionFunction} 
      actionColor={"white"}
      center={false}
      loading={this.props.loading}
      />);
  }
  
}

export {ConfirmDialog, InputDialog};