import { Link, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPost } from "src/actions/post";
import withAuth from "src/hooks/withAuth";
import { selectPost } from "src/slices/postSlice";
import CommentForm from "./CommentForm";
import Comments from "./Comments";

const Post = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params: { id: string } = useParams();
  const { id } = params;
  const post = useSelector(selectPost);
  console.log(post);
  useEffect(() => {
    getPost(dispatch, history, id);
  }, [dispatch, history, id]);

  return (
    <>
      {post && (
        <>
          <Link to="/posts" className="btn">
            Back To Posts
          </Link>
          <div className="post bg-white p-1 my-1">
            <div>
              <Link to={`/profile/${post.user}`}>
                <img
                  className="round-img"
                  src={post.avatar}
                  alt={`${post.name}'s avatar'`}
                />
                <h4>{post.name}</h4>
              </Link>
            </div>
            <div>
              <p className="my-1">{post.text}</p>
            </div>
          </div>

          <CommentForm history={history} dispatch={dispatch} id={id} />
          <Comments
            comments={post.comments}
            dispatch={dispatch}
            history={history}
            postID={id}
          />
        </>
      )}
    </>
  );
};

export default withAuth(Post);
