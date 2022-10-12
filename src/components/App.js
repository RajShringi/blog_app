import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
class App extends React.Component {
  render() {
    return (
      <div className="h-screen overflow-y-scroll">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
