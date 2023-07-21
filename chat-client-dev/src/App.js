import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./componets/Register";
import Login from "./componets/Login";

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/register" element={<About/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
    </BrowserRouter>
      <h1>hello</h1>
    </>
  );
}

export default App;
