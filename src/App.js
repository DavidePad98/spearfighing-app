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
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { validateTokenAndFetchUser } from "./redux/action";

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   console.log("Token from storage:", token);
  //   if (token) {
  //     validateTokenAndFetchUser(token, dispatch);
  //   }
  // }, [dispatch]);

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
