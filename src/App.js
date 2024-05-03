import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import LoginPage from "./components/LoginPage";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
// import User from "./components/User";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      {/* <User /> */}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
