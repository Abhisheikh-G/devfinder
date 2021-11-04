import { setAlert } from "src/slices/alertSlice";
import { setPosts, updateLikes, setPost } from "src/slices/postSlice";
import { Dispatch } from "redux";

export const getPosts = async (dispatch: Dispatch, history: any) => {
  if (localStorage.getItem("token")) {
    try {
      const res = await fetch(`/posts`, {
        headers: {
          "x-auth-token": localStorage.getItem("token")!,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status > 300) {
        dispatch(
          setAlert({
            msg: data.msg,
            alertType: "danger",
          })
        );
      } else {
        dispatch(setPosts(data));
      }
    } catch (error: any) {
      dispatch(
        setAlert({
          msg: "Unable to get posts at this time.",
          alertType: "danger",
        })
      );
    }
  } else {
    dispatch(
      setAlert({
        msg: "You are unauthorized to do that..",
        alertType: "danger",
      })
    );
    history.push("/login");
  }
};

export const getPost = async (dispatch: Dispatch, history: any, id: string) => {
  if (localStorage.getItem("token")) {
    try {
      const res = await fetch(`/posts/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token")!,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status > 300) {
        dispatch(
          setAlert({
            msg: data.msg,
            alertType: "danger",
          })
        );
      } else {
        dispatch(setPost(data));
      }
    } catch (error: any) {
      dispatch(
        setAlert({
          msg: "Unable to get posts at this time.",
          alertType: "danger",
        })
      );
    }
  } else {
    dispatch(
      setAlert({
        msg: "You are unauthorized to do that..",
        alertType: "danger",
      })
    );
    history.push("/login");
  }
};

export const addLike = async (
  dispatch: Dispatch,
  history: any,
  postID: string
) => {
  if (localStorage.getItem("token")) {
    try {
      const res = await fetch(`/posts/like/${postID}`, {
        method: "PUT",
        headers: {
          "x-auth-token": localStorage.getItem("token")!,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status > 300) {
        dispatch(
          setAlert({
            msg: data.msg,
            alertType: "danger",
          })
        );
      } else {
        dispatch(
          setAlert({
            msg: "You liked this post.",
            alertType: "success",
          })
        );
        dispatch(updateLikes(data));
        getPosts(dispatch, history);
      }
    } catch (error: any) {
      dispatch(
        setAlert({
          msg: "Unable to get posts at this time.",
          alertType: "danger",
        })
      );
    }
  } else {
    dispatch(
      setAlert({
        msg: "You are unauthorized to do that..",
        alertType: "danger",
      })
    );
    history.push("/login");
  }
};

export const removeLike = async (
  dispatch: Dispatch,
  history: any,
  postID: string
) => {
  if (localStorage.getItem("token")) {
    try {
      const res = await fetch(`/posts/unlike/${postID}`, {
        method: "PUT",
        headers: {
          "x-auth-token": localStorage.getItem("token")!,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status > 300) {
        dispatch(
          setAlert({
            msg: data.msg,
            alertType: "danger",
          })
        );
      } else {
        dispatch(
          setAlert({
            msg: "You unliked this post.",
            alertType: "success",
          })
        );
        dispatch(updateLikes(data));
        getPosts(dispatch, history);
      }
    } catch (error: any) {
      dispatch(
        setAlert({
          msg: "Unable to get posts at this time.",
          alertType: "danger",
        })
      );
    }
  } else {
    dispatch(
      setAlert({
        msg: "You are unauthorized to do that..",
        alertType: "danger",
      })
    );
    history.push("/login");
  }
};

export const deletePost = async (
  dispatch: Dispatch,
  history: any,
  postID: string
) => {
  if (localStorage.getItem("token")) {
    try {
      if (window.confirm("Are you sure you want to delete your post?")) {
        const res = await fetch(`/posts/${postID}`, {
          method: "DELETE",
          headers: {
            "x-auth-token": localStorage.getItem("token")!,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (res.status > 300) {
          dispatch(
            setAlert({
              msg: data.msg,
              alertType: "danger",
            })
          );
        } else {
          dispatch(
            setAlert({
              msg: data.msg,
              alertType: "success",
            })
          );
          getPosts(dispatch, history);
        }
      }
    } catch (error: any) {
      console.log(error);
      dispatch(
        setAlert({
          msg: "Unable to get posts at this time.",
          alertType: "danger",
        })
      );
    }
  } else {
    dispatch(
      setAlert({
        msg: "You are unauthorized to do that..",
        alertType: "danger",
      })
    );
    history.push("/login");
  }
};

export const addPost = async (
  dispatch: Dispatch,
  history: any,
  formData: string
) => {
  if (localStorage.getItem("token")) {
    try {
      const res = await fetch(`/posts`, {
        method: "POST",
        headers: {
          "x-auth-token": localStorage.getItem("token")!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: formData }),
      });
      const data = await res.json();
      console.log(data);
      if (res.status > 300) {
        dispatch(
          setAlert({
            msg: data.msg,
            alertType: "danger",
          })
        );
      } else {
        dispatch(
          setAlert({
            msg: "You created a new post.",
            alertType: "success",
          })
        );
        getPosts(dispatch, history);
      }
    } catch (error: any) {
      dispatch(
        setAlert({
          msg: "Unable to get posts at this time.",
          alertType: "danger",
        })
      );
    }
  } else {
    dispatch(
      setAlert({
        msg: "You are unauthorized to do that..",
        alertType: "danger",
      })
    );
    history.push("/login");
  }
};

export const addComment = async (
  dispatch: Dispatch,
  history: any,
  formData: string,
  id: string
) => {
  if (localStorage.getItem("token")) {
    try {
      const res = await fetch(`/posts/comment/${id}`, {
        method: "POST",
        headers: {
          "x-auth-token": localStorage.getItem("token")!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: formData }),
      });
      const data = await res.json();
      console.log(data);
      if (res.status > 300) {
        dispatch(
          setAlert({
            msg: data.msg,
            alertType: "danger",
          })
        );
      } else {
        dispatch(
          setAlert({
            msg: "You created a new post.",
            alertType: "success",
          })
        );
        getPost(dispatch, history, id);
      }
    } catch (error: any) {
      dispatch(
        setAlert({
          msg: "Unable to get posts at this time.",
          alertType: "danger",
        })
      );
    }
  } else {
    dispatch(
      setAlert({
        msg: "You are unauthorized to do that..",
        alertType: "danger",
      })
    );
    history.push("/login");
  }
};

export const deleteComment = async (
  dispatch: Dispatch,
  history: any,
  postID: string,
  commentID: string
) => {
  if (localStorage.getItem("token")) {
    try {
      if (window.confirm("Are you sure you want to delete this comment?")) {
        const res = await fetch(`/posts/comment/${postID}/${commentID}`, {
          method: "DELETE",
          headers: {
            "x-auth-token": localStorage.getItem("token")!,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: postID, comment_id: commentID }),
        });
        const data = await res.json();

        if (res.status > 300) {
          dispatch(
            setAlert({
              msg: data.msg,
              alertType: "danger",
            })
          );
        } else {
          dispatch(
            setAlert({
              msg: "You created a new post.",
              alertType: "success",
            })
          );
          getPost(dispatch, history, postID);
        }
      }
    } catch (error: any) {
      dispatch(
        setAlert({
          msg: "Unable to get posts at this time.",
          alertType: "danger",
        })
      );
    }
  } else {
    dispatch(
      setAlert({
        msg: "You are unauthorized to do that..",
        alertType: "danger",
      })
    );
    history.push("/login");
  }
};
