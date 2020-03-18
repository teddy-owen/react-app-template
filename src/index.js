import React from 'react';
import ReactDOM from 'react-dom';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import Auth from './routes/auth/auth.route.js';
import Main from './routes/main/main.route.js';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Navigation from "services/navigation.service.js";
import Toast from "services/toast.service.js";

ReactDOM.render(
<App/>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// configure toasts
Toast.configure();

function App(){
    return(
        <Router>
            <Switch >
                <Route path={Navigation.paths.auth}>
                    <Auth/>
                </Route>
                <Route path={Navigation.paths.root}>
                    <Main/> 
                </Route>
                <Route>
                    <Redirect to={Navigation.paths.register} />
                </Route>
            </Switch>
        </Router>        
    );
}