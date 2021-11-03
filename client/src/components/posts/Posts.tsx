import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "src/actions/post";
import { useHistory } from "react-router";
import withAuth from "src/hooks/withAuth";
import { selectPosts } from "src/slices/postSlice";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const posts = useSelector(selectPosts);

  useEffect(() => {
    getPosts(dispatch, history);
  }, [dispatch, history]);

  return (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>

      <PostForm />
      <div className="posts">
        {posts &&
          posts.map((post, idx) => (
            <PostItem
              key={idx}
              post={post}
              history={history}
              dispatch={dispatch}
            />
          ))}
      </div>
    </>
  );
};

export default withAuth(Posts);
