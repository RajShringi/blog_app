import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import IndividualArticle from "./IndividualArticle";
import Login from "./Login";
import NoMatch from "./NoMatch";
import Singup from "./Signup";

import validate from "../utils/validate";
import { ROOT_URL } from "../utils/constant";

class App extends React.Component {
  state = {
    token: "",
    email: "",
    password: "",
    username: "",
    serverError: "",
    isLoading: false,
    errors: {
      email: "",
      password: "",
      username: "",
    },
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    const errors = this.state.errors;
    validate(name, value, errors);
    this.setState({
      [name]: value,
      errors,
    });
  };

  handleSignup = async (e) => {
    e.preventDefault();
    this.setState({
      isLoading: true,
    });
    const { username, email, password } = this.state;
    const userInfo = {
      user: {
        username,
        email,
        password,
      },
    };

    try {
      const url = ROOT_URL + "/users";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const data = await res.json();
      if (data.errors) {
        this.setState({
          serverError: data.errors,
          isLoading: false,
        });
        return;
      }
      localStorage.setItem("token", JSON.stringify(data.user.token));
      this.setState({
        token: data.user.token,
        isLoading: false,
        serverError: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleLogin = async (e) => {
    e.preventDefault();
    this.setState({
      isLoading: true,
    });
    const { email, password } = this.state;
    const userInfo = {
      user: {
        email,
        password,
      },
    };

    try {
      const url = ROOT_URL + "/users/login";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const data = await res.json();
      if (data.errors) {
        this.setState({
          serverError: data.errors,
          isLoading: false,
        });
        return;
      }
      localStorage.setItem("token", JSON.stringify(data.user.token));
      this.setState({
        token: data.user.token,
        isLoading: false,
        serverError: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { email, password, username, token, isLoading, serverError } =
      this.state;
    const {
      email: emailError,
      password: passwordError,
      username: usernameError,
    } = this.state.errors;

    return (
      <div className="h-screen overflow-y-scroll text-gray-700 bg-gray-50">
        <BrowserRouter>
          <Header token={token} />
          <Switch>
            <Route path="/" exact>
              <Home token={token} />
            </Route>

            <Route path="/login">
              {!token ? (
                <Login
                  email={email}
                  password={password}
                  emailError={emailError}
                  passwordError={passwordError}
                  handleChange={this.handleChange}
                  handleLogin={this.handleLogin}
                  isLoading={isLoading}
                  serverError={serverError}
                />
              ) : (
                <Redirect to="/" />
              )}
            </Route>

            <Route path="/signup">
              {!token ? (
                <Singup
                  email={email}
                  password={password}
                  username={username}
                  emailError={emailError}
                  passwordError={passwordError}
                  usernameError={usernameError}
                  handleChange={this.handleChange}
                  handleSignup={this.handleSignup}
                  isLoading={isLoading}
                  serverError={serverError}
                />
              ) : (
                <Redirect to="/" />
              )}
            </Route>

            <Route path="/article/:slug" component={IndividualArticle} />

            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
