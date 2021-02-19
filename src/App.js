import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          <Home />
        </Route>
        <Route path="/scan">
          {/* <Scan /> */}
        </Route>
        <Route exact path='/'>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
