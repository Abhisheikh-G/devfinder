import { useHistory } from "react-router-dom";

export default function Redirect({
  authenticated,
}: {
  authenticated: boolean;
}) {
  const history = useHistory();
  const redirect = setTimeout(() => {
    history.push("/");
  }, 2000);
  return !authenticated ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <h3>Sorry, you aren't authenticated to do that. </h3>
      <span style={{ display: "none" }}>{redirect}</span>
    </div>
  ) : (
    <span></span>
  );
}
