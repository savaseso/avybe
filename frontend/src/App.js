import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";
import NavBar from "./components/NavBar";
import DashBoard from "./pages/DashBoard";
import ProtectedRoute from "./components/ProtectedRoute"
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { AuthProvider } from "./authContext";
import Default from "./pages/Default";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <AuthProvider>
        <React.Fragment>
          <BrowserRouter>
            <NavBar />
            <Switch>
              <Route exact path="/">
                <Redirect to="/signup" />
              </Route>
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <ProtectedRoute path="/dashboard" component={DashBoard} />
              <Route component={Default} />
            </Switch>
            <ToastContainer autoClose={2500} />
          </BrowserRouter>
        </React.Fragment>
      </AuthProvider>
    </MuiThemeProvider>
  );
}
export default App;
