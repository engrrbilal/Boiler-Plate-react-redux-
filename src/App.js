import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import {Router, Route, Switch} from 'react-router-dom';
import {iconElementLeft,IconButton,TextField,Paper,FlatButton,RaisedButton,AppBar} from 'material-ui';
import firebase from 'firebase'
import history from './history';
class App extends Component {
  state={loggedIn:null}
  componentWillMount(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.setState({ 
                loggedIn: true,
             });
        } else {
            this.setState({ loggedIn: false });
        }
    });
}
  render() {
    return (
      <div >
          <Router history={history}>
          <div>
          <AppBar
                title={"Campus Recuirement System"}
                iconElementLeft={<IconButton></IconButton>}
                iconElementRight={this.state.loggedIn? <RaisedButton primary={true}
                    label="Sign out" onClick={() => firebase.auth().signOut().then(()=>history.push('/'))} 
                />:<FlatButton label="Login" onClick={() => history.push('/')}/>}
           />
            <switch>
              <Route exact path="/" component={Login}/>
              <Route path="/signup" component={Signup} />
              <Route path="/dashboard" component={Dashboard}/>
            </switch>
        </div>
      </Router>
      </div>
    );
  }
}
export default App;
