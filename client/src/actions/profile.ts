import { Dispatch } from "react";
import { Profile } from "src/@types/index";

interface GetUserProps {
  dispatch: Dispatch<any>;
  setAlert: Function;
  history: any;
  setCurrentProfile?: Function;
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
      dispatch(setCurrentProfile!(data));
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

interface CreateProfileProps extends GetUserProps {
  formData: Profile;
  isEdit?: boolean;
}

export async function createProfile({
  dispatch,
  setAlert,
  formData,
  isEdit = false,
  history,
}: CreateProfileProps) {
  if (localStorage.getItem("token")) {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
      method: "POST",
      headers: {
        "x-auth-token": localStorage.getItem("token")!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
      }),
    });
    const data = await res.json();

    const { errors } = data;
    if (res.status > 300) {
      if (errors)
        errors.forEach((error: { msg: string }) => {
          const { msg } = error;
          dispatch(setAlert({ msg: msg, alertType: "danger" }));
        });
    }

    if (res.status === 200) {
      dispatch(
        setAlert({
          msg: isEdit ? "Profile Updated" : "Profile Created.",
          alertType: "success",
        })
      );
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
