import { Fragment } from "react";
import { Education } from "src/@types";
import Moment from "react-moment";
import { deleteEducation } from "src/actions/profile";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setAlert } from "src/slices/alertSlice";
import { setCurrentProfile } from "src/slices/profileSlice";

const DisplayEducation = ({ education }: { education: Education }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  async function handleDelete() {
    if (window.confirm(`Are you sure you want to delete ${education.school}`))
      deleteEducation({
        dispatch,
        setAlert,
        setCurrentProfile,
        _id: education._id,
        history,
      });
  }

  return (
    <Fragment>
      <tr>
        <td>{education.school}</td>
        <td className="hide-sm">{education.degree}</td>
        <td className="hide-sm">
          <Moment format="MM/DD/YYYY">{education.from}</Moment> -{" "}
          {education.current ? (
            "current"
          ) : (
            <Moment format="MM/DD/YYYY">{education.to}</Moment>
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
};

export default DisplayEducation;
