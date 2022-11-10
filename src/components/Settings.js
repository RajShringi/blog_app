import React from "react";
import { userVerify } from "../utils/constant";
import { withRouter } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import { UserContext } from "../UserContext";

class Settings extends React.Component {
  state = {
    image: this.context.user.image || "",
    username: this.context.user.username || "",
    bio: this.context.user.bio || "",
    email: this.context.user.email || "",
    isLoading: false,
    password: "",
    errors: {
      email: "",
    },
  };

  static contextType = UserContext;

  handleChagne = ({ target }) => {
    const { name, value } = target;
    const errors = this.state.errors;

    switch (name) {
      case "email":
        errors[name] = value.includes("@") ? "" : "email should contain @";
        break;
      default:
        break;
    }

    this.setState({
      [name]: value,
      errors,
    });
  };

  notify = () => {
    toast.success("Update Successful");
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      isLoading: true,
    });
    try {
      const { image, username, bio, email, password } = this.state;
      let data;
      if (password) {
        data = {
          user: {
            image,
            username,
            bio,
            email,
            password,
          },
        };
      }
      if (!password) {
        data = {
          user: {
            image,
            username,
            bio,
            email,
          },
        };
      }

      const res = await fetch(userVerify, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${this.context.user.token}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const { errors } = await res.json();
        throw errors;
      }
      const { user } = await res.json();
      this.context.updateUser(user);
      this.setState({
        isLoading: false,
      });
      this.notify();
    } catch (errors) {
      this.setState({
        isLoading: false,
      });
      console.log(errors);
    }
  };

  render() {
    const { image, username, bio, email, password, isLoading } = this.state;
    const { email: emailError } = this.state.errors;

    if (isLoading) {
      return <Loader />;
    }

    return (
      <>
        <form
          onSubmit={this.handleSubmit}
          className="bg-white p-4 max-w-xl mx-auto my-4 shadow-sm rounded-lg"
        >
          <div className="my-4 text-center">
            <h1 className="text-4xl font-medium mb-2">Settings</h1>
          </div>

          <div className="my-4">
            <label className="text-sm text-gray-600 font-medium">
              Profile Picture
            </label>
            <input
              className="block w-full border p-2 shadow-inner rounded-lg"
              type="text"
              placeholder="URL of profile picture"
              name="image"
              value={image}
              onChange={this.handleChagne}
            />
          </div>

          <div className="my-4">
            <label className="text-sm text-gray-600 font-medium">
              username
            </label>
            <input
              className="block w-full border p-2 shadow-inner rounded-lg"
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={this.handleChagne}
            />
          </div>

          <div className="my-4">
            <label className="text-sm text-gray-600 font-medium">bio</label>
            <textarea
              className="block w-full border p-2 shadow-inner rounded-lg"
              placeholder="bio"
              rows="5"
              name="bio"
              value={bio}
              onChange={this.handleChagne}
            ></textarea>
          </div>

          <div className="my-4">
            <label className="text-sm text-gray-600 font-medium">Email</label>
            <input
              className="block w-full border p-2 shadow-inner rounded-lg"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={this.handleChagne}
            />
            <span className="inline-block text-red-400 font-medium text-sm">
              {emailError}
            </span>
          </div>

          <div className="my-4">
            <label className="text-sm text-gray-600 font-medium">
              New Password
            </label>
            <input
              className="block w-full border p-2 shadow-inner rounded-lg"
              type="text"
              placeholder="New Password"
              name="password"
              value={password}
              onChange={this.handleChagne}
            />
          </div>

          <div className="flex justify-center my-4">
            <button className="py-2 px-6 bg-indigo-400 text-white rounded-lg hover:bg-indigo-500">
              Update Settings
            </button>
          </div>
        </form>
        <ToastContainer />
      </>
    );
  }
}
export default withRouter(Settings);
