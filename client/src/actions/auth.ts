import { Dispatch } from "react";
import { loadUser } from "src/slices/authSlice";
import { setAlert } from "src/slices/alertSlice";
interface GetUserProps {
  dispatch: Dispatch<any>;
  history: any;
  redirect?: boolean;
}
export async function getUser({
  dispatch,
  history,
  redirect = true,
}: GetUserProps) {
  if (localStorage.getItem("token")) {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth`, {
      headers: {
        "x-auth-token": localStorage.getItem("token")!,
      },
    });
    const data = await res.json();

    if (res.status > 300) {
      dispatch(setAlert({ alertType: "danger", msg: data.msg }));
      localStorage.removeItem("token");
      redirect && history.push("/login");
    } else {
      dispatch(loadUser(data));
    }
  } else {
    if (redirect) {
      dispatch(
        setAlert({
          alertType: "danger",
          msg: "Unauthorized access. You must be signed in to do that.",
        })
      );
      localStorage.removeItem("token");
      history.push("/login");
    }
  }
}
