import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/action";
import "../assets/sass/Navbar.scss";
import { useState } from "react";

const NavBar = () => {
  const user = useSelector(
    (state) => state.login.userData && state.login.userData.user
  );
  const profileImage = useSelector(
    (state) => state.user.userData?.profileImage
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <Navbar data-bs-theme="dark" expand="lg" fixed="top" className="nav">
        <Container fluid className="mx-md-5 mx-sm-3">
          <Navbar.Brand href="#home" className="m-0 me-md-4 fs-3">
            <img
              src="https://st2.depositphotos.com/3646177/7801/v/950/depositphotos_78010524-stock-illustration-shark-logo-vector.jpg"
              alt="logo"
              className="rounded-circle logo mx-2"
            />
            SaltwaterSpearos
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="ms-auto me-md-4"
            onClick={handleToggle}
          />

          <Navbar.Collapse in={isMenuOpen} id="basic-navbar-nav">
            <Nav className="text-center">
              {user && user !== null ? (
                <>
                  <Nav.Link
                    as={Link}
                    to={"/profile"}
                    className="white-nav_links d-md-none fs-5"
                    onClick={handleLinkClick}
                  >
                    <img
                      src={profileImage || user.profileImage}
                      alt="profile_img"
                      className="profile_img rounded-circle "
                    />
                    {user.nickname}
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to={"/"}
                    className="white-nav_links"
                    onClick={handleLinkClick}
                  >
                    Home
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to={"ticket"}
                    className="white-nav_links"
                    onClick={handleLinkClick}
                  >
                    Discussioni
                  </Nav.Link>
                  <Nav.Link
                    href="#pricing"
                    className="white-nav_links"
                    onClick={handleLinkClick}
                  >
                    Di Più
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    as={Link}
                    to={"/login"}
                    className="white-nav_links fw-bold d-md-none"
                    onClick={handleLinkClick}
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to={"/"}
                    className="white-nav_links"
                    onClick={handleLinkClick}
                  >
                    Home
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to={"ticket"}
                    className="white-nav_links"
                    onClick={handleLinkClick}
                  >
                    Esplora
                  </Nav.Link>
                  <Nav.Link
                    href="#pricing"
                    className="white-nav_links"
                    onClick={handleLinkClick}
                  >
                    Pricing
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          <Nav className="d-flex flex-row align-items-center  d-none d-md-flex">
            {user && user !== null ? (
              <>
                <Nav.Link as={Link} to={"/profile"}>
                  <img
                    src={profileImage || user.profileImage}
                    alt="profile_img"
                    className="profile_img rounded-circle"
                  />
                </Nav.Link>

                <Dropdown className="d-inline mx-2 ">
                  <Dropdown.Toggle
                    id="dropdown-autoclose-true"
                    className="white-nav_links fw-bold text-decoration-none text-white bg-transparent border-0"
                  >
                    {user.nickname}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="position-absolute">
                    <Dropdown.Item as={Link} to={"/profile"}>
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                    <Dropdown.Item
                      onClick={handleLogout}
                      className="text-danger fw-bold fs-5"
                    >
                      {" "}
                      Logout<i class="bi bi-box-arrow-right ms-2 fs-5"></i>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <Nav.Link
                as={Link}
                to={"/login"}
                className="white-nav_links fw-bold"
              >
                Login
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
export default NavBar;
