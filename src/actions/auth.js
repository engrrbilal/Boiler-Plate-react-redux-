import * as firebase from 'firebase'
import history from '../history';

// ADD_EXPENSE
export const signUp = (user) => ({
    type: 'CREATE-USER',
    user
  });

export const startSignUp = (userData = {}) =>{
    console.log("creating account ...");
    return dispatch =>{
        const {
            fullName='',
            email='',
            password='',
            gender='',
            createdAt=0
          } = userData;
          const user = {fullName,email,password,gender,createdAt}
        firebase.auth().createUserWithEmailAndPassword(userData.email,userData.password)
         .then( data =>{
           let uid = data.uid
          firebase.database().ref(`Users/${uid}`).set(user)
          dispatch(signUp({
              uid:uid,
              ...user
          }))
          history.push('/dashboard');
        }).catch(console.log("error"))
    }   
  }
  export const signIn = (user) => ({
    type: 'USER-SIGNIN',
    user
  })
  export const startSignIn = (user = {}) =>{
    return dispatch => {
        console.log('user in signin', user);
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((signedinUser) => {
                firebase.database().ref('Users/').once('value')
                    .then((userData) => {
                       let uid = signedinUser.uid;
                        dispatch(signUp({
                            uid:uid,
                            ...user
                        }))
                    })
                    history.push('/dashboard');
            }).catch(console.log("Error While Signing"))
    }
}