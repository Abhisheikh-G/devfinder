import { ComponentType, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "../slices/alertSlice";
import { loadUser } from "src/slices/authSlice";

function withAuth(Component: ComponentType<any>) {
  return (hocProps: any) => {
    const dispatch = useDispatch();

    useEffect(() => {
      async function loadUserHOC() {
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
          } else {
            loadUser(data);
          }
        } else {
          dispatch(
            setAlert({
              alertType: "danger",
              msg: "Unauthorized access. You must be signed in to do that.",
            })
          );
          localStorage.removeItem("token");
        }
      }
      loadUserHOC();
    }, [dispatch]);

    return <Component {...hocProps} />;
  };
}

export default withAuth;
