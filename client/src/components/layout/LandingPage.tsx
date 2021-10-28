import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUser } from "../../slices/authSlice";

function LandingPage() {
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
