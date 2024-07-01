import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import SelectProperty from "./pages/SelectProperty";
import Property from "./pages/Property";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/selectProperty/" element={<SelectProperty />} />
        <Route path="/property/:propertyId" element={<Property/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
