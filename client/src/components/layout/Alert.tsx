import { Fragment, FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAlerts, removeAlert } from "src/slices/alertSlice";

const Alert: FC = () => {
  const dispatch = useDispatch();
  const alerts = useSelector(selectAlerts);
  const isAlert = alerts !== null && alerts.length > 0;

  useEffect(() => {
    alerts.forEach((alert) => {
      setTimeout(() => {
        if (alert?.id) dispatch(removeAlert(alert.id));
      }, 5000);
    });
  }, [alerts, dispatch]);

  return (
    <Fragment>
      {isAlert &&
        alerts.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
          </div>
        ))}
    </Fragment>
  );
};

export default Alert;
