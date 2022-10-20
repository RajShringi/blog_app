import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import IndividualArticle from "./IndividualArticle";
import Login from "./Login";
import NoMatch from "./NoMatch";
import Singup from "./Signup";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
  };

  updateUser = (user) => {
    this.setState({
      isLoggedIn: true,
      user,
    });
  };

  render() {
    const { isLoggedIn, user } = this.state;
    return (
      <div className="h-screen overflow-y-scroll text-gray-700 bg-gray-50">
        <Header isLoggedIn={isLoggedIn} user={user} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/login">
            <Login updateUser={this.updateUser} />
          </Route>

          <Route path="/signup">
            <Singup updateUser={this.updateUser} />
          </Route>

          <Route path="/article/:slug" component={IndividualArticle} />

          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>
    );
  }
}
export default App;
