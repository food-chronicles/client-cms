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
import Navbar from "./components/Navbar";
import Create from "./pages/Create";
import History from "./pages/History";
import Scan from "./pages/Scan";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/">
            <Home />
            <History />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/product/:id">
            <ProductDetails />
          </PrivateRoute>
          <PrivateRoute path="/create">
            <Create />
          </PrivateRoute>
          <PrivateRoute path="/scan">
            <Scan />
          </PrivateRoute>
          <PrivateRoute path="/history">
            <History />
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
