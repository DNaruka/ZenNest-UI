import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
       <Route path="/login" element={<LogIn />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
