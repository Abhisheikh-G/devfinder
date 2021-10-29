import "./App.css";
import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import LandingPage from "./components/layout/LandingPage";
import Register from "./components/auth/Register";
import CreateProfile from "./components/profile-form/CreateProfile";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import { loadUser } from "./slices/authSlice";
import { useHistory } from "react-router-dom";
import { setAlert } from "./slices/alertSlice";
// import { setAlert } from "./slices/alertSlice";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/auth";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    let redirect = false;
    getUser({ dispatch, setAlert, history, loadUser, redirect });
  }, [dispatch, history]);

  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={LandingPage} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/create-profile" component={CreateProfile} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
