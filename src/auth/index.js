import React, { useContext, createContext, useState, useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
export const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  // const signin = (cb) => {
  //   return fakeAuth.signin(() => {
  //     localStorage.setItem("access_token", "token");
  //     setUser(localStorage.getItem("access_token"));
  //     console.log(user, "ini user");
  //     cb();
  //   });
  // };
  const signin = (username, password) => {
    return fakeAuth.signin(() => {
      localStorage.setItem("access_token", "token");
      setUser(localStorage.getItem("access_token"));
      console.log(user, "ini user habis sign in");
    });
  };
  const signout = (cb) => {
    return fakeAuth.signout(() => {
      localStorage.clear();
      setUser(null);
      console.log(user, "ini user habis logout");
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
}

export function AuthButton() {
  let history = useHistory();
  let auth = useAuth();

  return auth.user ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          auth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
