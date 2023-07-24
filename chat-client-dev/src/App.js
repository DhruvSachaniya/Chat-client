import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./componets/Register";
import Login from "./componets/Login";
import CreateServer from "./componets/CreateServer";
import CreateChannel from "./componets/CreateChannel";

function RegisterOrLogin() {
  return (
    <>
      <Link to="/register">Register</Link>
      <br />
      <Link to="/login">Login</Link>
      <br />
      <Link to="/create-server">server</Link>
      <br />
      <Link to="/create-channel">channels</Link>
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
          <Route path="/create-server" element={<CreateServer/>}/>
          <Route path="/create-channel" element={<CreateChannel/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
