import { Dispatch } from "react";
import { Education, Experience, Profile, Social } from "src/@types/index";

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
  formData: Profile | Social | Experience | Education;
  isEdit?: boolean;
  _id?: string;
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
          msg: isEdit ? "Profile updated" : "Profile created.",
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

export async function createExperience({
  dispatch,
  setAlert,
  setCurrentProfile,
  formData,
  history,
}: CreateProfileProps) {
  if (localStorage.getItem("token")) {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/profile/experience`,
      {
        method: "PUT",
        headers: {
          "x-auth-token": localStorage.getItem("token")!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      }
    );
    const data = await res.json();

    const { errors } = data;

    console.log(data);
    if (res.status > 300) {
      if (errors)
        errors.forEach((error: { msg: string }) => {
          const { msg } = error;
          dispatch(setAlert({ msg: msg, alertType: "danger" }));
        });
    }

    if (res.status === 200 && typeof data !== "undefined") {
      dispatch(
        setAlert({
          msg: "Experience added.",
          alertType: "success",
        })
      );
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

export async function createEducation({
  dispatch,
  setAlert,
  setCurrentProfile,
  formData,
  history,
}: CreateProfileProps) {
  if (localStorage.getItem("token")) {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/profile/education`,
      {
        method: "PUT",
        headers: {
          "x-auth-token": localStorage.getItem("token")!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      }
    );
    const data = await res.json();

    const { errors } = data;
    if (res.status > 300) {
      if (errors)
        errors.forEach((error: { msg: string }) => {
          const { msg } = error;
          dispatch(setAlert({ msg: msg, alertType: "danger" }));
        });
    }

    if (res.status === 200 && typeof data !== "undefined") {
      dispatch(
        setAlert({
          msg: "Education added.",
          alertType: "success",
        })
      );

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

interface DeleteProfileProps extends GetUserProps {
  _id?: string;
}

export async function deleteEducation({
  dispatch,
  setAlert,
  setCurrentProfile,
  _id,
  history,
}: DeleteProfileProps) {
  if (localStorage.getItem("token")) {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/profile/education/${_id}`,
      {
        method: "DELETE",
        headers: {
          "x-auth-token": localStorage.getItem("token")!,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    const { errors } = data;
    if (res.status > 300) {
      if (errors)
        errors.forEach((error: { msg: string }) => {
          const { msg } = error;
          dispatch(setAlert({ msg: msg, alertType: "danger" }));
        });
    }

    if (res.status === 200 && typeof data !== "undefined") {
      dispatch(
        setAlert({
          msg: "Education deleted.",
          alertType: "success",
        })
      );

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

export async function deleteExperience({
  dispatch,
  setAlert,
  setCurrentProfile,
  _id,
  history,
}: DeleteProfileProps) {
  if (localStorage.getItem("token")) {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/profile/experience/${_id}`,
      {
        method: "DELETE",
        headers: {
          "x-auth-token": localStorage.getItem("token")!,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    const { errors } = data;
    if (res.status > 300) {
      if (errors)
        errors.forEach((error: { msg: string }) => {
          const { msg } = error;
          dispatch(setAlert({ msg: msg, alertType: "danger" }));
        });
    }

    if (res.status === 200 && typeof data !== "undefined") {
      dispatch(
        setAlert({
          msg: "Experience deleted.",
          alertType: "success",
        })
      );

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
