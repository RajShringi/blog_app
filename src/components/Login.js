import React from "react";
import { NavLink } from "react-router-dom";
import validate from "../utils/validate";
import { loginURL } from "../utils/constant";
import { withRouter } from "react-router";

class Login extends React.Component {
  state = {
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

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const res = await fetch(loginURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email,
            password,
          },
        }),
      });
      if (!res.ok) {
        const { errors } = await res.json();
        throw errors;
      }
      const { user } = await res.json();
      this.props.updateUser(user);
      this.props.history.push("/");
    } catch (error) {
      this.setState((prevState) => {
        return {
          ...prevState,
          errors: {
            ...prevState.errors,
            email: "Email or Password is incorrect",
          },
        };
      });
    }
  };

  render() {
    const { email, password } = this.state;
    const { email: emailError, password: passwordError } = this.state.errors;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="bg-white p-4 max-w-xl mx-auto my-4 shadow-sm rounded-lg"
      >
        <div className="my-4 text-center">
          <h1 className="text-4xl font-medium mb-2">Sign In</h1>
          <NavLink to="/signup">
            <p className="text-sm text-indigo-400 cursor-pointer">
              Need an account?
            </p>
          </NavLink>
        </div>

        <div className="my-4">
          <label className="text-sm text-gray-600 font-medium">Email</label>
          <input
            className="block w-full border p-2 shadow-inner rounded-lg"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <span className="inline-block text-red-400 font-medium text-sm">
            {emailError}
          </span>
        </div>

        <div className="my-4">
          <label className="text-sm text-gray-600 font-medium">Password</label>
          <input
            className="block w-full border p-2 shadow-inner rounded-lg"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <span className="inline-block text-red-400 font-medium text-sm">
            {passwordError}
          </span>
        </div>

        <div className="flex justify-center my-4">
          <button className="py-2 px-6 bg-indigo-400 text-white rounded-lg hover:bg-indigo-500">
            Sign in
          </button>
        </div>
      </form>
    );
  }
}

export default withRouter(Login);
