import Moment from "react-moment";
import { Post } from "src/@types";
import { Link } from "react-router-dom";
import { selectUser } from "src/slices/authSlice";
import { useSelector } from "react-redux";
const PostItem = ({ post }: { post: Post }) => {
  const authUser = useSelector(selectUser);
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${post.user}`}>
          <img
            className="round-img"
            src={post.avatar}
            alt={`${post.name}'s avatar`}
          />
          <h4>{post.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{post.text}</p>
        <p className="post-date">
          Posted on <Moment format="MM/DD/YYYY">{post.date}</Moment>
        </p>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>
          <span>{post.likes.length}</span>
        </button>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${post._id}`} className="btn btn-primary">
          Discussion{" "}
          <span className="comment-count">{post.comments.length}</span>
        </Link>
        {authUser?._id.toString() === post.user?.toString() && (
          <button type="button" className="btn btn-danger">
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default PostItem;
