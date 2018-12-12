import React, { Component } from 'react';
import './App.scss';
import Form from './components/form/form';
import firebase from 'firebase';
import firebaseConfig from './config';

firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({user});
    })
  }

  handleSignIn(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  handleLogOut(){
    firebase.auth().signOut();
  }

  render(){
    return(
      <div className="app">
        <div className="app__header">
          <h2>SIMPLE CHAT APP WITH REACT - FIREBASE</h2>
          {!this.state.user? (
            <button
              className="app__button"
              onClick={this.handleSignIn.bind(this)}
            >
              Signin
            </button>
          ):(
            <button
              className="app__button"
              onClick={this.handleLogOut.bind(this)}
            >
              Logout
            </button>
        )}
        </div>
        <div className="app__list">
            <Form user={this.state.user}/>
        </div>
      </div>
    )
  }
}

export default App;
