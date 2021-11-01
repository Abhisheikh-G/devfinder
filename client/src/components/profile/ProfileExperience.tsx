import { Experience, Profile } from "src/@types";
import Moment from "react-moment";

const ProfileExperience = ({ profile }: { profile: Profile }) => {
  return (
    <>
      {/* <!-- Experience --> */}
      <div className="profile-exp bg-white p-2">
        <h2 className="text-primary">Experience</h2>
        {profile.experience?.map((exp: Experience, idx: number) => (
          <div>
            <h3 className="text-dark">{exp.company}</h3>
            <p>
              <Moment format="MM/DD/YYYY">{exp.from}</Moment> -{" "}
              {exp.current ? (
                "Current"
              ) : (
                <Moment format="MM/DD/YYYY">{exp.to}</Moment>
              )}
            </p>
            <p>
              <strong>Position: </strong>
              {exp.title}
            </p>
            <p>
              <strong>Description: </strong>
              {exp.description}
            </p>
          </div>
        ))}

        <div>
          <h3 className="text-dark">Sun Microsystems</h3>
          <p>Nov 2004 - Nov 2011</p>
          <p>
            <strong>Position: </strong>Systems Admin
          </p>
          <p>
            <strong>Description: </strong>Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Dignissimos placeat, dolorum ullam ipsam, sapiente
            suscipit dicta eius velit amet aspernatur asperiores modi quidem
            expedita fugit.
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileExperience;
