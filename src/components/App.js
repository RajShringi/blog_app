import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";

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
            <Route>
              <Login />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
