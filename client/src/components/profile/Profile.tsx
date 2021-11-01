import { useEffect, Fragment } from "react";
import { getProfileByID } from "src/actions/profile";
import { useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentProfile } from "src/slices/profileSlice";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
const Profile = () => {
  const profile = useSelector(selectCurrentProfile);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { id } = params as { id: string };
  console.log(id);
  useEffect(() => {
    getProfileByID({ dispatch, history, _id: id });
  }, [dispatch, history, id]);

  return (
    <>
      {profile && (
        <div className="profile-grid my-1">
          <ProfileTop profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileExperience profile={profile} />
          <ProfileEducation profile={profile} />

          {/* <!-- Github --> */}
          <div className="profile-github">
            <h2 className="text-primary my-1">
              <i className="fab fa-github"></i> Github Repos
            </h2>
            <div className="repo bg-white p-1 my-1">
              <div>
                <h4>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Repo One
                  </a>
                </h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat, laborum!
                </p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">Stars: 44</li>
                  <li className="badge badge-dark">Watchers: 21</li>
                  <li className="badge badge-light">Forks: 25</li>
                </ul>
              </div>
            </div>
            <div className="repo bg-white p-1 my-1">
              <div>
                <h4>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Repo Two
                  </a>
                </h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat, laborum!
                </p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">Stars: 44</li>
                  <li className="badge badge-dark">Watchers: 21</li>
                  <li className="badge badge-light">Forks: 25</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
