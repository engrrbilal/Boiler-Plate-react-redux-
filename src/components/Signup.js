import React from 'react';
import * as firebase from 'firebase';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator } from 'react-material-ui-form-validator';
import {iconElementLeft,IconButton,Paper,FlatButton,RaisedButton,AppBar} from 'material-ui';
import {Link} from 'react-router-dom';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Spinner} from './Spinner';
import Login from './Login'
import { connect } from 'react-redux';
import { startSignUp} from '../actions/auth';
import history from '../history';

const styles = {
  style : {
    height: 500,
    width: 400,
    height: 500,
    width: 400,
    marginTop: "10%",
    marginLeft:"40%",
    textAlign: 'center',
    display: 'inline-block',
  },
  styleName:{
    marginTop: 50,
    marginLeft:40,
    marginRight: 40,
    marginBottom: 0
},
  styleOthers:{
    marginTop: 15,
    marginLeft:40,
    marginRight: 40,
    marginBottom: 0
},
  styleButton:{
    marginTop: 20
  },
  block: {
    maxWidth: 50
  },
  radioButton: {
    marginBottom: 16,
    display: 'inline-block',
    width: '120px'
    
  },
};
class Signup extends React.Component {
  constructor(props){
    super(props);
    this.SignupHandler = this.SignupHandler.bind(this);
    this.state ={
      fullName:"",
      email:"",
      password:"", 
      error: '',
      gender:'',
      loading: false,
      loggedIn:null
    }

  }
//   componentWillMount(){
//     firebase.auth().onAuthStateChanged((user) => {
//         if (user) {
//             this.setState({ 
//                 loggedIn: true,
//              });
//         } else {
//             this.setState({ loggedIn: false });
//         }
//     });
// }
// onSubmit = (user) => {
//   this.props.startAddExpense(expense);
//   this.props.history.push('/');
// };
  SignupHandler(){
    
    console.log("creating account ...");
        if(this.state.fullName.trim() && this.state.gender.trim()){
          this.setState({ error: ' ', loading: true});
          this.props.startSignUp({
          fullName:this.state.fullName,
          email:this.state.email,
          password:this.state.password,
          gender:this.state.gender,
          createdAt:Date.now()
          })
          setTimeout(() => {
            this.setState({
            loading: false,
            error:"Auth error"
          })
        }, 3000)
      }
  }
//   onSignupSucess() {
//     this.props.history.push('/dashboard');
//     this.setState({
//         loading: false,
//         error: ''
//     })
//   }
//   onSignupFail() {
//     this.setState(()=>({
//             error: "Auth error!",
//             loading : false 
//         }));
//   }
renderButton(){
  if (this.state.loading) {
      return <Spinner/>;
  }
  return (
    <RaisedButton label="Create Account" primary={true}
      style={styles.styleButton}  type="submit" onClick={this.SignupHandler} />
  );
}
  render(){
    return (
      <div>
        <Paper zDepth={3} style={styles.style}>
        <ValidatorForm onSubmit={(e)=> e.preventDefault()}>
          <Paper style={styles.styleName}>
            <TextValidator hintText="Full Name" 
            value={this.state.fullName}
            name="name"
            underlineShow={false} fullWidth={false}
            onChange={ev => this.setState({fullName: ev.target.value})}
            required
            errorMessages={['this field is required']}
            />
          </Paper>
          <Paper style={styles.styleOthers}>
            <TextValidator hintText="Email Address" 
            value={this.state.email}
            name="email"
            underlineShow={false} fullWidth={false}
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}
            onChange={ev => this.setState({email: ev.target.value})}
            />
          </Paper>
          <Paper style={styles.styleOthers}>
            <TextValidator
            value={this.state.password}
              hintText="Password"
              name="pass"
              underlineShow={false} fullWidth={false}
              type="password"
              validators={['required']}
              errorMessages={['this field is required']}
              onChange={ev => this.setState({password:ev.target.value})}
            />
          </Paper>
          <br />
          <RadioButtonGroup name="shipSpeed" >
            <RadioButton
              value="Male"
              label="Male"
              required
              style={styles.radioButton}
              checked={this.state.gender === 'Male'}
              onClick={changeEvent =>this.setState({
                gender: changeEvent.target.value
              })}
            />
            <RadioButton
              value="Female"
              label="Female"
              required
              style={styles.radioButton}
              checked={this.state.gender === 'Female'}
              onClick={changeEvent =>this.setState({
              gender: changeEvent.target.value
              })}
            />
          </RadioButtonGroup>
          <p style={{color:"red"}}>{this.state.error}</p>
          {this.renderButton()}
       </ValidatorForm>
      </Paper>
    </div>
    );
 }
}
// const mapDispatchToProps = (state) =>({

// })
const mapDispatchToProp = (dispatch) =>({
  startSignUp: (userDetails) => dispatch(startSignUp(userDetails))
})

export default connect(undefined, mapDispatchToProp)(Signup);
