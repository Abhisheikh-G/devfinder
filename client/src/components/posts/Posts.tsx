import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "src/actions/post";
import { useHistory } from "react-router";
import withAuth from "src/hooks/withAuth";
import { selectPosts } from "src/slices/postSlice";
import PostItem from "./PostItem";

const Posts = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const posts = useSelector(selectPosts);
  console.log(posts);
  useEffect(() => {
    getPosts(dispatch, history);
  }, [posts, dispatch, history]);

  return (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>

      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1">
          <textarea
            name="text"
            cols={30}
            rows={5}
            placeholder="Create a post"
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
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
