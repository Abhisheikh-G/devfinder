import "./App.css";
import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import LandingPage from "./components/layout/LandingPage";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import { loadUser } from "./slices/authSlice";
// import { setAlert } from "./slices/alertSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function getUser() {
      if (localStorage.getItem("token")) {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/auth`, {
          headers: {
            "x-auth-token": localStorage.getItem("token")!,
          },
        });
        const data = await res.json();
        if (res.status > 300) {
          localStorage.removeItem("token");
        } else {
          dispatch(loadUser(data));
        }
      } else {
        localStorage.removeItem("token");
      }
    }
    getUser();
  }, [dispatch]);

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
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
