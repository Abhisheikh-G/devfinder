import { ComponentType, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAlert } from "../slices/alertSlice";
import { loadUser } from "src/slices/authSlice";
import { getUser } from "../actions/auth";

function withAuth(Component: ComponentType<any>) {
  return (hocProps: any) => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
      getUser({ dispatch, setAlert, history, loadUser });
    }, [dispatch, history]);

    return <Component {...hocProps} />;
  };
}

export default withAuth;
