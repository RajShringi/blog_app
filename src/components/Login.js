import React from "react";
import { NavLink } from "react-router-dom";

class Login extends React.Component {
  render() {
    const { email, password, emailError, passwordError, handleChange } =
      this.props;

    return (
      <form
        className="bg-white p-4 max-w-xl mx-auto my-4 shadow-sm rounded-lg"
        onSubmit={this.handleSubmit}
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
            onChange={handleChange}
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
            onChange={handleChange}
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

export default Login;
