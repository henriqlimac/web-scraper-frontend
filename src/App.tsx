import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Shareable from "./pages/shareable/Shareable";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shared/:id" element={<Shareable />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
