import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProfile } from "src/actions/profile";
import { useHistory } from "react-router";
import {
  selectCurrentProfile,
  setCurrentProfile,
} from "src/slices/profileSlice";
import { getCurrentProfile } from "src/actions/profile";
import { setAlert } from "src/slices/alertSlice";
import withAuth from "src/hooks/withAuth";
// import { createProfile } from "src/actions/profile";
const EditProfile = () => {
  const profile = useSelector(selectCurrentProfile);
  const dispatch = useDispatch();
  const history = useHistory();
  const [displaySocialInputs, setDisplaySocialInputs] = useState(false);
  const [formData, setFormData] = useState({
    company: profile!.company,
    website: profile!.website,
    location: profile!.location,
    status: profile!.status,
    skills: profile!.skills.toString(),
    githubusername: profile!.githubusername,
    bio: profile!.bio,
    twitter: profile!.social!.twitter,
    facebook: profile!.social!.facebook,
    linkedin: profile!.social!.linkedin,
    youtube: profile!.social!.youtube,
    instagram: profile!.social!.instagram,
  });
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const handleFormChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isEdit = true;
    createProfile({ dispatch, setAlert, formData, history, isEdit });
  };

  useEffect(() => {
    getCurrentProfile({ dispatch, setAlert, history, setCurrentProfile });
    if (!profile) history.push("/create-profile");
  }, [profile, history, dispatch]);

  return (
    <>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={handleFormChange}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={handleFormChange}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={handleFormChange}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={handleFormChange}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={handleFormChange}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={handleFormChange}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={handleFormChange}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            onClick={() => setDisplaySocialInputs(!displaySocialInputs)}
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={handleFormChange}
              />
            </div>
          </>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </>
  );
};

export default withAuth(EditProfile);
