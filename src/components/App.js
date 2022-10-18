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
    user: "",
    email: "",
    password: "",
    username: "",
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
          errors: { ...this.state.errors, ...data.errors },
        });
        return;
      }
      localStorage.setItem("user", JSON.stringify(data));
      this.setState({
        user: { ...data.user },
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleLogin = async (e) => {
    e.preventDefault();
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
          errors: { ...this.state.errors, ...data.errors },
        });
        return;
      }
      localStorage.setItem("user", JSON.stringify(data));
      this.setState({
        user: { ...data.user },
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { email, password, username, user } = this.state;
    const {
      email: emailError,
      password: passwordError,
      username: usernameError,
    } = this.state.errors;

    return (
      <div className="h-screen overflow-y-scroll text-gray-700 bg-gray-50">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>

            <Route path="/login">
              {!user ? (
                <Login
                  email={email}
                  password={password}
                  emailError={emailError}
                  passwordError={passwordError}
                  handleChange={this.handleChange}
                  handleLogin={this.handleLogin}
                />
              ) : (
                <Redirect to="/" />
              )}
            </Route>

            <Route path="/signup">
              {!user ? (
                <Singup
                  email={email}
                  password={password}
                  username={username}
                  emailError={emailError}
                  passwordError={passwordError}
                  usernameError={usernameError}
                  handleChange={this.handleChange}
                  handleSignup={this.handleSignup}
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
