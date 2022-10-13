import React from "react";

class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {
        email: "",
        password: "",
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
    } else {
      errors[name] = "";
    }
    this.setState({
      [name]: value,
      errors,
    });
  };

  handleSubmit = (e) => {
    e.peventDefault();
    const { email, password } = this.state;
    const errors = this.state.errors;
  };
  render() {
    const { email, password } = this.state;
    const { email: emailError, password: passwordError } = this.state.errors;
    return (
      <form
        className="bg-white p-4 max-w-xl mx-auto my-4 shadow-sm rounded-lg"
        onSubmit={this.handleSubmit}
      >
        <div className="my-4 text-center">
          <h1 className="text-4xl font-medium">Sign In</h1>
          <p className="text-sm text-indigo-400 cursor-pointer">
            Need an account?
          </p>
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

export default Login;
