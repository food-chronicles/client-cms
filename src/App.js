import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";
import { ProvideAuth, AuthButton, useAuth, PrivateRoute } from "./auth";
import Login from "./pages/Login";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/create">
            {/* <ProtectedPage /> */}
          </PrivateRoute>
          <PrivateRoute path="/scan">
            {/* <ProtectedPage /> */}
          </PrivateRoute>
          <PrivateRoute path="/history">
            {/* <ProtectedPage /> */}
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
