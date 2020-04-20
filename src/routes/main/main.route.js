import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";

import JWT from "services/jwt.service";
import Navigation from "services/navigation.service";

import SideBar from"./components/sidebar.component";
import TopBar from"./components/topbar.component";

import Home from "routes/home/home.route";

class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      sideBarOpen:true,
      loggedIn:true,
    };
    // if JWT exists, go to home route
    // else go to register page
    let token = JWT.getTokenFromStorage();
    if(token==="" || token===null){
        this.state.loggedIn=false;
    }

  }


  
  render(){

    // if not logged in, send to register
    if(!this.state.loggedIn){
      return (<Redirect to={Navigation.paths.register} />);
    }

    return (
      <div style={{
        display:"flex",
      }}>
        {/* <ToastContainer /> */}
        <SideBar open={this.state.sideBarOpen} sideBarCloseFunc={()=>this.setState({sideBarOpen:false})}/>
        <div style={{
          display:"flex",
          flexDirection:"column",
          flexGrow:"1",
          height:"100vh",
          overflow:"hidden",
        }}>
            
          <div style={{
            flexShrink:"0",
          }}>
            <TopBar sideBarOpen={this.state.sideBarOpen} sideBarOpenFunc={()=>this.setState({sideBarOpen:true})}/>
          </div>
          <div style={{
            backgroundColor:"white",
            flexGrow:"1",
            overflow:"auto",
            boxShadow:"rgba(0, 0, 0, 0.44) 36px 0px 8px -26px inset",
            
          }}>
            <Switch >              
                <Route>
                  <Home/>
                </Route>
            </Switch>

          </div>
        </div>
      </div>
    );
  }
}


export default withRouter(Main);
