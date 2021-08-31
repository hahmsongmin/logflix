import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
// components
import NavBar from "./views/components/NavBar";
// users
import Join from "./views/users/Join";
import Login from "./views/users/Login";
// Routes
import Search from "./views/Routes/Search";
import Home from "./views/Routes/Home";
import TV from "./views/Routes/TV";
import Movies from "./views/Routes/Movies";
import Detail from "./views/Routes/Detail";
import MyLog from "./views/Routes/MyLog";
import Edit from "./views/users/Edit";

const Router = ({ user, isLogin }) => (
  <BrowserRouter>
    <NavBar user={user} />
    <Switch>
      <Route exact path="/" render={() => <Home user={user} />} />
      {/* <Route exact path="/tv" component={TV} /> */}
      <Route
        exact
        path="/tv"
        render={() => (isLogin ? <TV /> : <Redirect to="/login" />)}
      />
      <Route
        exact
        path="/movies"
        render={() => (isLogin ? <Movies /> : <Redirect to="/login" />)}
      />
      <Route
        exact
        path={`${isLogin ? "/movie/:id([0-9]+)" : "/"}`}
        component={Detail}
      />
      <Route
        exact
        path={`${isLogin ? "/tv/:id([0-9]+)" : "/"}`}
        component={Detail}
      />
      <Route
        exact
        path="/search"
        render={() => (isLogin ? <Search /> : <Redirect to="/login" />)}
      />
      <Route
        exact
        path="/join"
        render={() => (isLogin ? <Redirect to="/" /> : <Join />)}
      />
      <Route
        exact
        path="/login"
        render={() => (isLogin ? <Redirect to="/" /> : <Login />)}
      />
      <Route
        exact
        path={"/user/edit"}
        render={() => (isLogin ? <Edit user={user} /> : <Login />)}
      />
      <Route
        exact
        path="/mylog"
        render={() => (isLogin ? <MyLog user={user} /> : <Login />)}
      />
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>
);

export default Router;

// default Router => all Route들에게 props 전달
