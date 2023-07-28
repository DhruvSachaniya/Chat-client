import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  function logoutUser() {
    localStorage.clear();
    navigate("/");
  }
  return (
    <>
      <button onClick={logoutUser}>Logout</button>
    </>
  );
}
