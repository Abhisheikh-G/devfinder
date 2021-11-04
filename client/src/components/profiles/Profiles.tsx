import { Fragment, useEffect } from "react";
import { getProfiles } from "src/actions/profile";
import { selectProfiles } from "src/slices/profileSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
const Profiles = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const profiles = useSelector(selectProfiles);
  useEffect(() => {
    getProfiles({ dispatch, history });
  }, [dispatch, history]);
  return (
    <Fragment>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with
        developers
      </p>
      <div className="profiles">
        {profiles && profiles.length === 0 && (
          <div>Looks like we couldn't find any profiles..</div>
        )}
        {profiles &&
          profiles.length > 0 &&
          profiles?.map((profile, index: number) => (
            <div className="profile bg-light" key={index}>
              <img className="round-img" src={profile.user.avatar} alt="" />
              <div>
                <h2>{profile.user!.name}</h2>
                <p>
                  {profile.status}
                  {profile.company && <span>at {profile.company} </span>}
                </p>
                <p>{profile.location && profile.location}</p>
                <Link
                  to={`/profile/${profile.user._id}`}
                  className="btn btn-primary"
                >
                  View Profile
                </Link>
              </div>
              <ul>
                {profile.skills
                  .slice(0, 4)
                  .map((skill: string, index: number) => (
                    <Fragment key={index}>
                      <li className="text-primary">
                        <i className="fas fa-check"></i>
                        {skill}
                      </li>
                    </Fragment>
                  ))}
              </ul>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default Profiles;
