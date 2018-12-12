import React, { Component } from 'react';
import './form.scss';
import Message from '../message/message';
import firebase from 'firebase';

export default class Form extends Component{
    constructor(props){
        super(props);

        this.state = {
            userName:'Default User',
            message:'',
            list:[]
        }

        this.messageRef = firebase.database().ref().child('message');
        this.listenMessages();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user){
            this.setState({'userName':nextProps.user.displayName});
        }
    }

    handleChange(e){
        this.setState({message:e.target.value});
    }

    handleSend(){
        if(this.state.message){
            var newItem = {
                userName: this.state.userName,
                message: this.state.message,
            }
            this.messageRef.push(newItem);
            this.setState({message: ''});
        }
    }

   handleKeyPress(e){
       if(e.key !== 'Enter') return;
        this.handleSend();
   }

   listenMessages() {
    this.messageRef
      .limitToLast(10)
      .on('value', message => {
        this.setState({
          list: Object.values(message.val()),
        });
      });
  }


   render(){
       return(
        <div className="form">
            <div className="form__message">
            {this.state.list.map((item, index) =>
                <Message key={index} message={item}/>
            )}
            </div>
            <div className="form__row">
                <input
                    className="form__input"
                    type="text"
                    placeholder="Type a message here"
                    value={this.state.message}
                    onChange={this.handleChange.bind(this)}
                    onKeyPress={this.handleKeyPress.bind(this)}
                />
                <button
                    className="form__button"
                    onClick={this.handleSend.bind(this)}
                >
                Send
                </button>
            </div>
        </div>
       );
   }
}