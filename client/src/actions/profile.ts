import { Dispatch } from "react";

interface GetUserProps {
  dispatch: Dispatch<any>;
  setAlert: Function;
  history: any;
  setCurrentProfile: Function;
  redirect?: boolean;
}
export async function getCurrentProfile({
  dispatch,
  setAlert,
  history,
  setCurrentProfile,
  redirect = true,
}: GetUserProps) {
  if (localStorage.getItem("token")) {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/profile/me`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token")!,
      },
    });
    const data = await res.json();
    console.log(data);
    if (res.status > 400) {
      dispatch(setAlert({ alertType: "danger", msg: data.msg }));
      localStorage.removeItem("token");
      redirect && history.push("/login");
    }

    if (res.status === 360) {
      dispatch(
        setAlert({
          alertType: "success",
          msg: "Please set a profile for your account.",
        })
      );
    }

    if (res.status === 200) {
      console.log(data);
      dispatch(setCurrentProfile(data));
    }
  } else {
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
