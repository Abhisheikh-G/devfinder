import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../slices/authSlice";

function LandingPage() {
  const history = useHistory();
  const authenticated = useSelector(selectIsAuthenticated);
  useEffect(() => {
    if (authenticated) history.push("/dashboard");
  }, [authenticated, history]);

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
