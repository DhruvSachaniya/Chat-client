import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./componets/Register";
import Login from "./componets/Login";

function RegisterOrLogin() {
  return (
    <>
      <Link to="/register">Register</Link>
      <br />
      <Link to="/login">Login</Link>
    </>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterOrLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
