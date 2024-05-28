import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/scss/bootstrap.scss";
import "./App.scss";
import "./assets/sass/custom.scss";
import LoginPage from "./components/LoginPage";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Ticket from "./components/Ticket";
import DetailPage from "./components/DetailPage";
import Scopri from "./components/Scopri";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route
          path="/login"
          element={
            <>
              <LoginPage />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Profile />
            </>
          }
        />
        <Route
          path="/ticket"
          element={
            <>
              <Ticket />
            </>
          }
        />
        <Route path="/details/:type/:id" element={<DetailPage />} />
        <Route
          path="/scopri"
          element={
            <>
              <Scopri />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
