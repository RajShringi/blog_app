import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { UserContext } from "../UserContext";
import { localStorageKey, userVerify } from "../utils/constant";
import EditPost from "./EditPost";
import ErrorBoundary from "./ErrorBoundary";
import Header from "./Header";
import Home from "./Home";
import IndividualArticle from "./IndividualArticle";
import Loader from "./Loader";
import Login from "./Login";
import NewPost from "./NewPost";
import NoMatch from "./NoMatch";
import Profile from "./Profile";
import Settings from "./Settings";
import Singup from "./Signup";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
    isVerifying: true,
  };

  componentDidMount = async () => {
    const key = localStorage[localStorageKey];
    if (key) {
      try {
        const res = await fetch(userVerify, {
          method: "GET",
          headers: {
            authorization: `Token ${key}`,
          },
        });
        if (!res.ok) {
          const { errors } = await res.json();
          throw errors;
        }
        const { user } = await res.json();
        this.updateUser(user);
      } catch (errors) {
        console.log(errors);
      }
    } else {
      this.setState({
        isVerifying: false,
      });
    }
  };

  updateUser = (user) => {
    this.setState({
      isLoggedIn: true,
      user,
      isVerifying: false,
    });
    localStorage.setItem(localStorageKey, user.token);
  };

  logout = () => {
    localStorage.clear();
    this.setState({
      isLoggedIn: false,
      user: null,
      isVerifying: false,
    });
    this.props.history.push("/");
  };

  render() {
    const { isLoggedIn, isVerifying } = this.state;
    if (isVerifying) {
      return <Loader />;
    }
    return (
      <div className="h-screen overflow-y-scroll text-gray-700 bg-gray-50">
        <ErrorBoundary>
          <UserContext.Provider
            value={{
              ...this.state,
              logout: this.logout,
              updateUser: this.updateUser,
            }}
          >
            <Header />
            {isLoggedIn ? <AuthenticateApp /> : <UnauthenticateApp />}
          </UserContext.Provider>
        </ErrorBoundary>
      </div>
    );
  }
}

function AuthenticateApp(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="/new_post">
        <NewPost />
      </Route>

      <Route path="/edit_post/:slug">
        <EditPost />
      </Route>

      <Route path="/settings">
        <Settings />
      </Route>

      <Route path="/profile/:username">
        <Profile />
      </Route>

      <Route path="/article/:slug">
        <IndividualArticle />
      </Route>

      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

function UnauthenticateApp(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/signup">
        <Singup />
      </Route>

      <Route path="/article/:slug">
        <IndividualArticle />
      </Route>

      <Route path="/profile/:username">
        <Profile />
      </Route>

      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

export default withRouter(App);
