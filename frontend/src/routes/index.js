import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Route from "./Route";
import Users from "../pages/Users";
import Login from "../pages/Login/";
import Queues from "../pages/Queues/";
import Signup from "../pages/Signup/";
import LoggedInLayout from "../layout";
import Tickets from "../pages/Tickets/";
import Contacts from "../pages/Contacts/";
import Dashboard from "../pages/Dashboard/";
import Connections from "../pages/Connections/";
import QuickAnswers from "../pages/QuickAnswers/";
import { AuthProvider } from "../context/Auth/AuthContext";
import { WhatsAppsProvider } from "../context/WhatsApp/WhatsAppsContext";

const Routes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <WhatsAppsProvider>
            <LoggedInLayout>
              <Route exact path="/" component={Dashboard} isPrivate />
              <Route
                exact
                path="/tickets/:ticketId?"
                component={Tickets}
                isPrivate
              />
              <Route exact path="/contacts" component={Contacts} isPrivate />
              <Route exact path="/users" component={Users} isPrivate />
              <Route
                exact
                path="/quickAnswers"
                component={QuickAnswers}
                isPrivate
              />
              <Route
                exact
                path="/connections"
                component={Connections}
                isPrivate
              />
              <Route exact path="/Queues" component={Queues} isPrivate />
            </LoggedInLayout>
          </WhatsAppsProvider>
        </Switch>
        <ToastContainer autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routes;
