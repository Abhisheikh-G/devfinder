import { Dispatch } from "react";
import { Education, Experience, Profile, Social } from "src/@types/index";
import { signUserOut } from "src/slices/authSlice";
import { setAlert } from "src/slices/alertSlice";
import {
  setCurrentProfile,
  setProfiles,
  setRepos,
} from "src/slices/profileSlice";

interface GetUserProps {
  dispatch: Dispatch<any>;
  history?: any;
  _id?: string;
  username?: string;
  redirect?: boolean;
}
export async function getCurrentProfile({
  dispatch,
  history,
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

export async function getProfiles({
  dispatch,
  history,
  redirect = true,
}: GetUserProps) {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
    method: "GET",
  });
  const data = await res.json();
  // if (res.status > 400) {
  //   dispatch(setAlert({ alertType: "danger", msg: data.msg }));
  //   localStorage.removeItem("token");
  //   redirect && history.push("/login");
  // }

  if (res.status === 200) {
    dispatch(setProfiles(data));
  }
}

export async function getProfileByID({
  dispatch,
  history,
  _id,
  redirect = true,
}: GetUserProps) {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/profile/user/${_id}`,
    {
      method: "GET",
    }
  );
  const data = await res.json();
  if (res.status > 400) {
    dispatch(setAlert({ alertType: "danger", msg: data.msg }));
  }
  if (res.status === 200) {
    dispatch(setCurrentProfile(data));
  }
}

export async function getGithubRepos({ dispatch, username }: GetUserProps) {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/profile/github/${username}`,
    {
      method: "GET",
    }
  );
  const data = await res.json();
  if (res.status > 400) {
    dispatch(setAlert({ alertType: "danger", msg: data.msg }));
  }

  if (res.status === 200) {
    dispatch(setRepos(data));
  }
}

interface CreateProfileProps extends GetUserProps {
  formData: Profile | Social | Experience | Education;
  isEdit?: boolean;
  _id?: string;
}

export async function createProfile({
  dispatch,
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

export async function deleteProfile({ dispatch, history }: DeleteProfileProps) {
  if (localStorage.getItem("token")) {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/profile/`, {
      method: "DELETE",
      headers: {
        "x-auth-token": localStorage.getItem("token")!,
        "Content-Type": "application/json",
      },
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

    if (res.status === 200 && typeof data !== "undefined") {
      dispatch(
        setAlert({
          msg: "Experience deleted.",
          alertType: "success",
        })
      );

      dispatch(signUserOut());
      history.push("/register");
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
