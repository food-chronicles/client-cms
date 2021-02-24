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
import Footer from "./components/Footer";
import Create from "./pages/Create";
import Scan from "./pages/Scan";
import ProductDetails from "./pages/ProductDetails";
import UpdateUser from "./pages/UpdateUser";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/product/:id">
            <ProductDetails />
          </PrivateRoute>
          <PrivateRoute path="/user/:id">
            <UpdateUser />
          </PrivateRoute>
          <PrivateRoute path="/create">
            <Create />
          </PrivateRoute>
          <PrivateRoute path="/scan">
            <Scan />
          </PrivateRoute>
        </Switch>
        <Footer />
      </Router>
    </ProvideAuth>
  );
}

export default App;
