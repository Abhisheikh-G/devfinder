import { Fragment, ChangeEvent, useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setAlert } from "../../slices/alertSlice";
import { registerUser } from "../../slices/registerSlice";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const defaultState: RegisterForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [formData, setFormData] = useState(defaultState);
  const dispatch = useDispatch();
  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(
        setAlert({
          alertType: "danger",
          id: "",
          msg: "Passwords do not match.",
        })
      );
    } else {
      try {
        const res = await fetch(`http://localhost:5000/api/users`, {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
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
          dispatch(registerUser(token));
          dispatch(
            setAlert({
              alertType: "success",
              id: "",
              msg: "Successfully registered",
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
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            value={name}
            onChange={handleChange}
          />
        </div>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            minLength={6}
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
