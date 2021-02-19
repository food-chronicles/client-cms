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
import Navbar from './components/Navbar'
import Create from './pages/Create'

function App() {
  return (
    <ProvideAuth>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          {/* <PrivateRoute path="/create">
            <Create />
          </PrivateRoute> */}
          <Route path="/create">
            <Create />
          </Route>
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
