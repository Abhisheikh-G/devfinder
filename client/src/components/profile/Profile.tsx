import { useEffect, Fragment } from "react";
import { getProfileByID } from "src/actions/profile";
import { useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentProfile } from "src/slices/profileSlice";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileRepos from "./ProfileRepos";
const Profile = () => {
  const profile = useSelector(selectCurrentProfile);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { id } = params as { id: string };
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
          {profile.githubusername && (
            <ProfileRepos username={profile.githubusername} />
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
