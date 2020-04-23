import React from 'react';
import PropTypes from 'prop-types';

class FlexBox extends React.Component{
  constructor(props) {
      super(props);
      this.state={
      };
  }
  
  static propTypes={
      children:PropTypes.node,
      column:PropTypes.bool,
      justify:PropTypes.string,
      align:PropTypes.string,
      style:PropTypes.object,
  };

  render(){
      return (
          <div style={{
            ...this.props.style,
            display:"flex",
            flexDirection:this.props.column ? "column":"row",
            alignItems:this.props.align||"stretch",
            justifyContent:this.props.justify||"flex-start",
          }}>
            {this.props.children}
          </div>
      );
  }
}


//////////////////////////////
// Between
//////////////////////////////

class FlexRowBetweenStretch extends React.Component{
  constructor(props) {
      super(props);
      this.state={
      };
  }
  
  static propTypes={
      children:PropTypes.node,
      style:PropTypes.object,
  };

  render(){
      return (
        <FlexBox 
        column={false} 
        justify={"space-between"} 
        align={"stretch"}
        style={{
          ...this.props.style,
        }}>
          {this.props.children}
        </FlexBox>
      );
  }
}


class FlexColumnBetweenStretch extends React.Component{
  constructor(props) {
      super(props);
      this.state={
      };
  }
  
  static propTypes={
      children:PropTypes.node,
      style:PropTypes.object,
  };

  render(){
      return (
        <FlexBox 
        column={true} 
        justify={"space-between"} 
        align={"stretch"}
        style={{
          ...this.props.style,
        }}>
          {this.props.children}
        </FlexBox>
      );
  }
}

class FlexRowBetweenCenter extends React.Component{
  constructor(props) {
      super(props);
      this.state={
      };
  }
  
  static propTypes={
      children:PropTypes.node,
      style:PropTypes.object,
  };

  render(){
      return (
        <FlexBox 
        column={false} 
        justify={"space-between"} 
        align={"center"}
        style={{
          ...this.props.style,
        }}>
          {this.props.children}
        </FlexBox>
      );
  }
}

class FlexColumnBetweenCenter extends React.Component{
  constructor(props) {
      super(props);
      this.state={
      };
  }
  
  static propTypes={
      children:PropTypes.node,
      style:PropTypes.object,
  };

  render(){
      return (
        <FlexBox 
        column={true} 
        justify={"space-between"} 
        align={"center"}
        style={{
          ...this.props.style,
        }}>
          {this.props.children}
        </FlexBox>
      );
  }
}

//////////////////////////////
// Center
//////////////////////////////

class FlexRowCenterStretch extends React.Component{
  constructor(props) {
      super(props);
      this.state={
      };
  }
  
  static propTypes={
      children:PropTypes.node,
      style:PropTypes.object,
  };

  render(){
      return (
        <FlexBox 
        column={false} 
        justify={"center"} 
        align={"stretch"}
        style={{
          ...this.props.style,
        }}>
          {this.props.children}
        </FlexBox>
      );
  }
}


class FlexColumnCenterStretch extends React.Component{
  constructor(props) {
      super(props);
      this.state={
      };
  }
  
  static propTypes={
      children:PropTypes.node,
      style:PropTypes.object,
  };

  render(){
      return (
        <FlexBox 
        column={true} 
        justify={"center"} 
        align={"stretch"}
        style={{
          ...this.props.style,
        }}>
          {this.props.children}
        </FlexBox>
      );
  }
}

class FlexRowCenterCenter extends React.Component{
  constructor(props) {
      super(props);
      this.state={
      };
  }
  
  static propTypes={
      children:PropTypes.node,
      style:PropTypes.object,
  };

  render(){
      return (
        <FlexBox 
        column={false} 
        justify={"center"} 
        align={"center"}
        style={{
          ...this.props.style,
        }}>
          {this.props.children}
        </FlexBox>
      );
  }
}

class FlexColumnCenterCenter extends React.Component{
  constructor(props) {
      super(props);
      this.state={
      };
  }
  
  static propTypes={
      children:PropTypes.node,
      style:PropTypes.object,
  };

  render(){
      return (
        <FlexBox 
        column={true} 
        justify={"center"} 
        align={"center"}
        style={{
          ...this.props.style,
        }}>
          {this.props.children}
        </FlexBox>
      );
  }
}

//////////////////////////////
// Start
//////////////////////////////
class FlexRowStartStretch extends React.Component{
  constructor(props) {
      super(props);
      this.state={
      };
  }
  
  static propTypes={
      children:PropTypes.node,
      style:PropTypes.object,
  };

  render(){
      return (
        <FlexBox 
        column={false} 
        justify={"flex-start"} 
        align={"stretch"}
        style={{
          ...this.props.style,
        }}>
          {this.props.children}
        </FlexBox>
      );
  }
}


class FlexColumnStartStretch extends React.Component{
  constructor(props) {
      super(props);
      this.state={
      };
  }
  
  static propTypes={
      children:PropTypes.node,
      style:PropTypes.object,
  };

  render(){
      return (
        <FlexBox 
        column={true} 
        justify={"flex-start"} 
        align={"stretch"}
        style={{
          ...this.props.style,
        }}>
          {this.props.children}
        </FlexBox>
      );
  }
}

class FlexRowStartCenter extends React.Component{
  constructor(props) {
      super(props);
      this.state={
      };
  }
  
  static propTypes={
      children:PropTypes.node,
      style:PropTypes.object,
  };

  render(){
      return (
        <FlexBox 
        column={false} 
        justify={"flex-start"} 
        align={"center"}
        style={{
          ...this.props.style,
        }}>
          {this.props.children}
        </FlexBox>
      );
  }
}

class FlexColumnStartCenter extends React.Component{
  constructor(props) {
      super(props);
      this.state={
      };
  }
  
  static propTypes={
      children:PropTypes.node,
      style:PropTypes.object,
  };

  render(){
      return (
        <FlexBox 
        column={true} 
        justify={"flex-start"} 
        align={"center"}
        style={{
          ...this.props.style,
        }}>
          {this.props.children}
        </FlexBox>
      );
  }
}

//////////////////////////////
// End
//////////////////////////////
class FlexRowEndStretch extends React.Component{
  constructor(props) {
      super(props);
      this.state={
      };
  }
  
  static propTypes={
      children:PropTypes.node,
      style:PropTypes.object,
  };

  render(){
      return (
        <FlexBox 
        column={false} 
        justify={"flex-end"} 
        align={"stretch"}
        style={{
          ...this.props.style,
        }}>
          {this.props.children}
        </FlexBox>
      );
  }
}


class FlexColumnEndStretch extends React.Component{
  constructor(props) {
      super(props);
      this.state={
      };
  }
  
  static propTypes={
      children:PropTypes.node,
      style:PropTypes.object,
  };

  render(){
      return (
        <FlexBox 
        column={true} 
        justify={"flex-end"} 
        align={"stretch"}
        style={{
          ...this.props.style,
        }}>
          {this.props.children}
        </FlexBox>
      );
  }
}

class FlexRowEndCenter extends React.Component{
  constructor(props) {
      super(props);
      this.state={
      };
  }
  
  static propTypes={
      children:PropTypes.node,
      style:PropTypes.object,
  };

  render(){
      return (
        <FlexBox 
        column={false} 
        justify={"flex-end"} 
        align={"center"}
        style={{
          ...this.props.style,
        }}>
          {this.props.children}
        </FlexBox>
      );
  }
}

class FlexColumnEndCenter extends React.Component{
  constructor(props) {
      super(props);
      this.state={
      };
  }
  
  static propTypes={
      children:PropTypes.node,
      style:PropTypes.object,
  };

  render(){
      return (
        <FlexBox 
        column={true} 
        justify={"flex-end"} 
        align={"center"}
        style={{
          ...this.props.style,
        }}>
          {this.props.children}
        </FlexBox>
      );
  }
}

//////////////////////////////
// Around
//////////////////////////////
class FlexRowAroundStretch extends React.Component{
  constructor(props) {
      super(props);
      this.state={
      };
  }
  
  static propTypes={
      children:PropTypes.node,
      style:PropTypes.object,
  };

  render(){
      return (
        <FlexBox 
        column={false} 
        justify={"space-around"} 
        align={"stretch"}
        style={{
          ...this.props.style,
        }}>
          {this.props.children}
        </FlexBox>
      );
  }
}


class FlexColumnAroundStretch extends React.Component{
  constructor(props) {
      super(props);
      this.state={
      };
  }
  
  static propTypes={
      children:PropTypes.node,
      style:PropTypes.object,
  };

  render(){
      return (
        <FlexBox 
        column={true} 
        justify={"space-around"} 
        align={"stretch"}
        style={{
          ...this.props.style,
        }}>
          {this.props.children}
        </FlexBox>
      );
  }
}

class FlexRowAroundCenter extends React.Component{
  constructor(props) {
      super(props);
      this.state={
      };
  }
  
  static propTypes={
      children:PropTypes.node,
      style:PropTypes.object,
  };

  render(){
      return (
        <FlexBox 
        column={false} 
        justify={"space-around"} 
        align={"center"}
        style={{
          ...this.props.style,
        }}>
          {this.props.children}
        </FlexBox>
      );
  }
}

class FlexColumnAroundCenter extends React.Component{
  constructor(props) {
      super(props);
      this.state={
      };
  }
  
  static propTypes={
      children:PropTypes.node,
      style:PropTypes.object,
  };

  render(){
      return (
        <FlexBox 
        column={true} 
        justify={"space-around"} 
        align={"center"}
        style={{
          ...this.props.style,
        }}>
          {this.props.children}
        </FlexBox>
      );
  }
}


export {
  FlexBox,
  FlexRowBetweenStretch,
  FlexColumnBetweenStretch,
  FlexRowBetweenCenter,
  FlexColumnBetweenCenter,
  FlexRowStartStretch,
  FlexColumnStartStretch,
  FlexRowStartCenter,
  FlexColumnStartCenter,
  FlexRowEndStretch,
  FlexColumnEndStretch,
  FlexRowEndCenter,
  FlexColumnEndCenter,
  FlexRowAroundStretch,
  FlexColumnAroundStretch,
  FlexRowAroundCenter,
  FlexColumnAroundCenter,
  FlexRowCenterStretch,
  FlexColumnCenterStretch,
  FlexRowCenterCenter,
  FlexColumnCenterCenter,
};
