import React, { PropsWithChildren } from "react";
import { IComment } from "src/@types";
import { useSelector } from "react-redux";
import { Dispatch } from "redux";
import { selectUser } from "src/slices/authSlice";
import { deleteComment } from "src/actions/post";
import { Link } from "react-router-dom";
import Moment from "react-moment";

type Props = PropsWithChildren<{
  comments: [IComment];
  dispatch: Dispatch<any>;
  history: any;
  postID: string;
}>;

const Comments: React.FC<Props> = ({ comments, dispatch, history, postID }) => {
  const authUser = useSelector(selectUser);
  return (
    <div className="comments">
      {comments?.map((comment) => (
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${comment.user}`}>
              <img
                className="round-img"
                src={comment.avatar}
                alt={`${comment.name}'s avatar'`}
              />
              <h4>{comment.name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">{comment.text}</p>
            <p className="post-date">
              Posted on <Moment format="MM/DD/YYYY">{comment.date}</Moment>
            </p>
          </div>
          {authUser?._id.toString() === comment.user?.toString() && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                deleteComment(dispatch, history, postID, comment._id!);
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Comments;
