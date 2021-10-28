import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { signUserOut } from "src/slices/authSlice";
import { useEffect } from "react";

function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

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
            {user !== null && (
              <li>
                <Link to="/dashboard">{user.name}'s Profile</Link>
              </li>
            )}

            <li>
              <Link to="" onClick={() => dispatch(signUserOut())}>
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
