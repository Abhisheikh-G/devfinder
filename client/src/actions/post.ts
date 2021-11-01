import { setAlert } from "src/slices/alertSlice";
import { setPosts } from "src/slices/postSlice";
import { Dispatch } from "redux";

export const getPosts = async (dispatch: Dispatch, history: any) => {
  if (localStorage.getItem("token")) {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        headers: {
          "x-auth-token": localStorage.getItem("token")!,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      const { error } = data;
      if (res.status > 300) {
        dispatch(
          setAlert({
            msg: error.msg,
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
