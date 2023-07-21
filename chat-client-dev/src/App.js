import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./componets/Register";

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/register" element={<About/>}/>
        </Routes>
    </BrowserRouter>
      <h1>hello</h1>
    </>
  );
}

export default App;
