import { Fragment, ChangeEvent, useState, FormEvent } from "react";
import { Link } from "react-router-dom";

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password) {
      console.log("Passwords do not much.");
    } else {
      try {
        console.log("Success");
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
