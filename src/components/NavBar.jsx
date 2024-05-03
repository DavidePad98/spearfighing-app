import { Container, Dropdown, Nav, Navbar, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/action";
// import setUserReducer from "../redux/reducers/setUserAfterLogin";

const NavBar = () => {
  const user = useSelector(
    (state) => state.login.userData && state.login.userData.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Effettua il logout dell'utente rimuovendo le informazioni di autenticazione
    // ad esempio rimuovendo il token dall'archivio locale
    // e resettando lo stato dell'utente nel tuo negozio Redux
    dispatch(logoutUser());
    // dispatch(unSetUserAction());
    // Reindirizza l'utente alla pagina di login dopo il logout
    navigate("/");
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
          />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {user && user !== null ? (
                <>
                  <Nav.Link
                    as={Link}
                    to={"/profile"}
                    className="white-nav_links d-md-none fs-5"
                  >
                    <img
                      src={user.profileImage}
                      alt="profile_img"
                      className="profile_img rounded-circle "
                    />
                    {user.nickname}
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/"} className="white-nav_links">
                    Home
                  </Nav.Link>
                  <Nav.Link href="#features" className="white-nav_links">
                    Features
                  </Nav.Link>
                  <Nav.Link href="#pricing" className="white-nav_links">
                    Pricing
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    as={Link}
                    to={"/login"}
                    className="white-nav_links fw-bold d-md-none"
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/"} className="white-nav_links">
                    Home
                  </Nav.Link>
                  <Nav.Link href="#features" className="white-nav_links">
                    Features
                  </Nav.Link>
                  <Nav.Link href="#pricing" className="white-nav_links">
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
                    src={user.profileImage}
                    alt="profile_img"
                    className="profile_img rounded-circle"
                  />
                </Nav.Link>
                <Dropdown autoClose="inside">
                  <Dropdown.Toggle
                    variant="link"
                    id="dropdown-autoclose-inside"
                    className="white-nav_links fw-bold text-decoration-none text-white"
                  >
                    {user.nickname}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="position-absolute border-0 nav">
                    <Dropdown.Item as={Link} to={"/profile"}>
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item href="#dashboard">
                      My Dashboard
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={handleLogout}
                      className="text-danger fw-bold fs-5"
                    >
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
