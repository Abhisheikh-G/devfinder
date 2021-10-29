import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { signUserOut } from "src/slices/authSlice";
import { removeCurrentProfile } from "src/slices/profileSlice";
import { useEffect } from "react";

function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSignOut = () => {
    dispatch(signUserOut());
    dispatch(removeCurrentProfile());
  };
  useEffect(() => {}, [dispatch, user]);
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevFinder
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/profiles">Developers</Link>
        </li>
        {!isAuthenticated ? (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="" onClick={handleSignOut}>
                <i className="fas fa-sign-out-alt" />
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
