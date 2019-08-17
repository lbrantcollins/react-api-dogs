import React , { Component} from 'react';
import logo from './logo.svg';
import './App.css';
import DogContainer from './DogContainer';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import Register from './Register';
import Header from './Header';

const My404 = () =>{
  return (
    <div>
      You are lost
    </div>
    )
}


class App extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      email: '',
      image: '',
      loading: true,
    }
  }
  logIn = async (loginInfo) => {
    try {

      const loginResponse = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        credentials: 'include',// on every request we have to send the cookie
        body: JSON.stringify(loginInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await loginResponse.json();


      this.setState(() => {
        return {
          ...parsedResponse.data,
          loading: false
        }
      })

      return parsedResponse

    } catch (err) {
      console.log(err)
    }
  }
  register = async (data) => {
     try {

      const registerResponse = await fetch('http://localhost:8000/user/register', {
        method: 'POST',
        credentials: 'include',// on every request we have to send the cookie
        body: data,
        headers: {
          'enctype': 'multipart/form-data'
        }
      })

      const parsedResponse = await registerResponse.json();

      console.log(parsedResponse)

      this.setState({
        ...parsedResponse.data,
        loading: false
      })
      return parsedResponse;

    } catch (err) {
      console.log(err)
    }
  }
  render(){
      return (
        <main>
          <Switch>
            <Route exact path="/" render={(props) => <Login {...props} logIn={this.logIn} />} />
            <Route exact path="/register" render={(props) => <Register {...props} register={this.register} /> } />
            <Route exact path="/profile" render={(props) =>  <Profile {...props} userInfo={this.state}/> } />
            <Route component={My404} />
          </Switch>
        </main>
    );
  }
}

export default App;
