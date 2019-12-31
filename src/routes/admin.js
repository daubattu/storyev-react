import React from "react";
import { Switch } from "react-router-dom";
import Login from "pages/admin/Login/Login";
import Dashboard from "pages/admin/Dashboard/Dashboard";
import User from "pages/admin/User/User";
import DetailUser from "pages/admin/User/DetailUser";
import Story, { AddStory } from "pages/admin/Story";

import DetailStory from "pages/admin/Story/DetailStory";
import MainLayout from "layouts/Main";
import RouteLayout from "components/RouteLayout/RouteLayout";
import NewWord from "pages/admin/NewWord/NewWord";

export default (
  <Switch>
    <RouteLayout path="/" layout={MainLayout} component={Dashboard} exact/>
    <RouteLayout path="/login" layout={MainLayout} component={Login} />
    <RouteLayout path="/users" layout={MainLayout} component={User} exact/>
    <RouteLayout path="/users/:id" layout={MainLayout} component={DetailUser} />
    <RouteLayout path="/stories" layout={MainLayout} component={Story} exact />
    <RouteLayout path="/stories/add" layout={MainLayout} component={AddStory} />
    <RouteLayout path="/stories/:id" layout={MainLayout} component={DetailStory} />
    <RouteLayout path="/new-words" layout={MainLayout} component={NewWord} exact/>
  </Switch>
);
