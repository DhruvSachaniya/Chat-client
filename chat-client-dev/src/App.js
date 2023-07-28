import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./componets/Register";
import Login from "./componets/Login";
import Server from "./componets/Server";
import Channel from "./componets/Channel";

function RegisterOrLogin() {
  return (
    <>
      <Link to="/register">Register</Link>
      <br />
      <Link to="/login">Login</Link>
      <br />
      <Link to="/servers">server</Link>
      <br />
      {/* <Link to="/channels">channels</Link> */}
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
          <Route path="/servers" element={<Server/>}/>
          <Route path="/channels" element={<Channel/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
