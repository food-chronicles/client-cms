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

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

// function LoginPage() {
//   let history = useHistory();
//   let location = useLocation();
//   let auth = useAuth();

//   // let { from } = location.state || { from: { pathname: "/" } };
//   // let login = () => {
//   //   auth.signin(() => {
//   //     history.replace(from);
//   //   });
//   // };
//   let login = () => {
//     auth.signin();
//   };

//   return (
//     <div>
//       {/* <p>You must log in to view the page at {from.pathname}</p> */}
//       <p>You must log in to view the page </p>
//       <button onClick={login}>Log in</button>
//     </div>
//   );
// }

export default App;
