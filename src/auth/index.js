import React, { useContext, createContext, useState, useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import axios from "axios";

const fakeAuth = {
  isAuthenticated: false,
  async signin(payload, cb) {
    try {
      let response = await axios({
        url: "http://localhost:4000/login",
        method: "POST",
        data: {
          username: payload.username,
          password: payload.password,
        },
      });
      if (response) {
        fakeAuth.isAuthenticated = true;
        localStorage.access_token = response.data.access_token;
        console.log(response.data, "ini dari fakeauth signin");
        cb();
      }
    } catch (error) {
      console.log(error);
    }
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    localStorage.clear();
    cb()
    // setTimeout(cb, 100);
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
  const [user, setUser] = useState(false);

  const signin = (payload, cb) => {
    return fakeAuth.signin(payload, () => {
      setUser(true);
      console.log(payload, "ini habis sign in ");
      cb();
    });
  };

  const signout = (cb) => {
    return fakeAuth.signout(() => {
      setUser(false);
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
  // let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.access_token ? (
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
