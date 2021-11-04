import { Fragment, ChangeEvent, useState, FormEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../slices/alertSlice";
import { signUserIn } from "../../slices/authSlice";
import { getUser } from "src/actions/auth";
import { useHistory } from "react-router-dom";
import { RootState } from "src/store/store";

interface LogInForm {
  email: string;
  password: string;
}

const defaultState: LogInForm = {
  email: "",
  password: "",
};

const LogIn = () => {
  const [formData, setFormData] = useState(defaultState);
  const { email, password } = formData;
  const dispatch = useDispatch();
  const history = useHistory();
  const authenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (authenticated) history.push("/dashboard");
  }, [authenticated, history]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password || !email) {
      dispatch(
        setAlert({
          alertType: "danger",
          id: "",
          msg: "Fields cannot be empty.",
        })
      );
    } else {
      try {
        const res = await fetch(`/api/auth`, {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": `${process.env.REACT_APP_API_URL}`,
          },
          mode: "cors",
        });

        const { errors, token } = await res.json();

        if (res.status > 300) {
          if (errors)
            errors.forEach((error: { msg: string }) => {
              const { msg } = error;
              dispatch(setAlert({ msg: msg, alertType: "danger" }));
            });
        }
        if (res.status === 200) {
          dispatch(signUserIn(token));
          getUser({ dispatch, history });
          dispatch(
            setAlert({
              alertType: "success",
              id: "",
              msg: "Successfully signed in",
            })
          );
        }
      } catch (error: any) {
        console.log(error.response);
      }
    }
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength={6}
            value={password}
            onChange={handleChange}
            required
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Log In" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign In</Link>
      </p>
    </Fragment>
  );
};

export default LogIn;
