import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Singup from "./Signup";

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      username: "",
      errors: {
        email: "",
        password: "",
        username: "",
      },
    };
  }

  validatePassword = (password) => {
    const re = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
    return re.test(password);
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    const errors = this.state.errors;
    if (value === "") {
      errors[name] = `${[name]} can't be empty.`;
    } else if (name === "password" && !this.validatePassword(value)) {
      errors[name] = "Password must contain a letter and a number";
    } else if (name === "password" && value.length < 6) {
      errors[name] = "Password should be at-least 6 characters";
    } else if (name === "email" && !value.includes("@")) {
      errors[name] = "Email should contain @ ";
    } else if (name === "username" && value.length < 6) {
      errors[name] = "Username should be at-least 6 characters long";
    } else {
      errors[name] = "";
    }
    this.setState({
      [name]: value,
      errors,
    });
  };

  render() {
    const { email, password, username } = this.state;
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
              <Login
                email={email}
                password={password}
                emailError={emailError}
                passwordError={passwordError}
                handleChange={this.handleChange}
              />
            </Route>
            <Route path="/signup">
              <Singup
                email={email}
                password={password}
                username={username}
                emailError={emailError}
                passwordError={passwordError}
                usernameError={usernameError}
                handleChange={this.handleChange}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
