import { Fragment } from "react";
import { Experience } from "src/@types";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setAlert } from "src/slices/alertSlice";
import { setCurrentProfile } from "src/slices/profileSlice";
import { deleteExperience } from "src/actions/profile";

function DisplayExperience({ experience }: { experience: Experience }) {
  const dispatch = useDispatch();
  const history = useHistory();

  async function handleDelete() {
    if (window.confirm(`Are you sure you want to delete ${experience.company}`))
      deleteExperience({
        dispatch,
        setAlert,
        setCurrentProfile,
        _id: experience._id,
        history,
      });
  }

  return (
    <Fragment>
      <tr>
        <td>{experience.company}</td>
        <td className="hide-sm">{experience.title}</td>
        <td className="hide-sm">
          <Moment format="MM/DD/YYYY">{experience.from}</Moment> -{" "}
          {experience.current ? (
            "current"
          ) : (
            <Moment format="MM/DD/YYYY">{experience.to}</Moment>
          )}
        </td>
        <td>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </td>
      </tr>
    </Fragment>
  );
}

export default DisplayExperience;
