import { ComponentType, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../actions/auth";

function withAuth(Component: ComponentType<any>) {
  return (hocProps: any) => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
      getUser({ dispatch, history });
    }, [dispatch, history]);

    return <Component {...hocProps} />;
  };
}

export default withAuth;
