import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import IndividualArticle from "./IndividualArticle";
import Login from "./Login";
import NoMatch from "./NoMatch";
import Singup from "./Signup";

class App extends React.Component {
  render() {
    return (
      <div className="h-screen overflow-y-scroll text-gray-700 bg-gray-50">
        <BrowserRouter>
          <Header />
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

            <Route path="/article/:slug" component={IndividualArticle} />
            <NoMatch />
            <Route path="*"></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
