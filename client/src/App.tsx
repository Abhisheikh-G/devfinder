import "./App.css";
import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import LandingPage from "./components/layout/LandingPage";
import Register from "./components/auth/Register";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/auth";
import AddExperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    let redirect = false;
    getUser({ dispatch, history, redirect });
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
            <Route exact path="/edit-profile" component={EditProfile} />
            <Route exact path="/add-experience" component={AddExperience} />
            <Route exact path="/add-education" component={AddEducation} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:id?" component={Profile} />
            <Route exact path="/posts" component={Posts} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
