import './App.css';
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: ""
    }
  }

  loginUser = () => {
    axios.post('http://localhost:5000/login', {
      username: this.state.username,
      password: this.state.password
    })
    .then(function(res) {
      console.log("res:" + res);
    })
    .catch(function(error) {
      console.log('Failed:' + error)
    })
  }

  handleChangeUser = (event) => {
  this.setState({ username : event.target.value})
  }

  handleChangePass = (event) => {
    this.setState({ password : event.target.value})
    }
  render() {
  return (
      <body>
        <div>
        <form>
          <input onChange={this.handleChangeUser} value={this.state.username} placeholder="username" name="username" type="text"></input>
          <input onChange={this.handleChangePass} value={this.state.password} placeholder="password" name="password" type="text"></input>
          <input type="submit"></input>
        </form>
        </div>
      </body>
  );
  }
}

export default App;
