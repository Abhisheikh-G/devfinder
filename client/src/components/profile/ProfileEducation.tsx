import { Education, Profile } from "src/@types";
import Moment from "react-moment";
const ProfileEducation = ({ profile }: { profile: Profile }) => {
  return (
    <div className="profile-edu bg-white p-2">
      <h2 className="text-primary">Education</h2>
      {profile.education?.map((edu: Education, idx: number) => (
        <div>
          <h3>{edu.school}</h3>
          <p>
            <Moment format="MM/DD/YYYY">{edu.from}</Moment> -{" "}
            {edu.current ? (
              "current"
            ) : (
              <Moment format="MM/DD/YYYY">{edu.to}</Moment>
            )}
          </p>
          <p>
            <strong>Degree: </strong>
            {edu.degree}
          </p>
          <p>
            <strong>Field Of Study: </strong>
            {edu.fieldofstudy}
          </p>
          <p>
            <strong>Description: </strong>
            {edu.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProfileEducation;
