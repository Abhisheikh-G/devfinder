import { Profile } from "src/@types";

const ProfileAbout = ({ profile }: { profile: Profile }) => {
  return (
    <>
      {/* <!-- About --> */}
      <div className="profile-about bg-light p-2">
        <h2 className="text-primary">{profile.user.name}'s Bio</h2>
        <p>{profile.bio}</p>
        <div className="line"></div>
        <h2 className="text-primary">Skill Set</h2>
        <div className="skills">
          {profile.skills.map((skill, idx: number) => (
            <div className="p-1" key={idx}>
              <i className="fa fa-check"></i> {skill}
            </div>
          ))}
          {/* <div className="p-1">
            <i className="fa fa-check"></i> HTML
          </div>
          <div className="p-1">
            <i className="fa fa-check"></i> CSS
          </div>
          <div className="p-1">
            <i className="fa fa-check"></i> JavaScript
          </div> */}
          <div className="p-1">
            <i className="fa fa-check"></i> Python
          </div>
          <div className="p-1">
            <i className="fa fa-check"></i> C#
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileAbout;
