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
        <Container fluid className="mx-5">
          <Navbar.Brand href="#home">
            <img
              src="https://st2.depositphotos.com/3646177/7801/v/950/depositphotos_78010524-stock-illustration-shark-logo-vector.jpg"
              alt="logo"
              className="rounded-circle logo mx-2"
            />
            SaltwaterSpearos
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="ms-auto me-4"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/"} className="white-nav_links">
                Home
              </Nav.Link>
              <Nav.Link href="#features" className="white-nav_links">
                Features
              </Nav.Link>
              <Nav.Link href="#pricing" className="white-nav_links">
                Pricing
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Nav className="d-flex flex-row align-items-center ">
            {user && user !== null ? (
              <>
                <Nav.Link as={Link} to={"/profile"}>
                  <img
                    src={user.profileImage}
                    alt="profile_img"
                    className="profile_img rounded-circle"
                  />
                </Nav.Link>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="link"
                    id="dropdown-basic"
                    className="white-nav_links fw-bold text-decoration-none white-nav_links text-white "
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
                className="white-nav_links fw-bold "
              >
                Login
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>

      {/* <Navbar bg="dark" data-bs-theme="dark" expand="lg" fixed="top">
        <Container fluid className="px-0">
          <Navbar.Brand href="#home">
            <img
              src="https://st2.depositphotos.com/3646177/7801/v/950/depositphotos_78010524-stock-illustration-shark-logo-vector.jpg"
              alt="logo"
              className="rounded-circle logo mx-2"
            />
            SaltwaterSpearos
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Row className=" align-items-center px-5">
              <Col xs={6} lg={8}>
                <Nav className="me-auto">
                  <Nav.Link as={Link} to={"/"}>
                    Home
                  </Nav.Link>
                  <Nav.Link href="#features">Features</Nav.Link>
                  <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
              </Col>
              <Col xs={6} lg={4} className="d-flex justify-content-center">
                <Nav className="d-flex flex-row ms-auto">
                  {user && user !== null ? (
                    <>
                      <Nav.Link as={Link} to={"/profile"}>
                        <img
                          src={user.profileImage}
                          alt="profile_img"
                          className="profile_img rounded-circle"
                        />
                      </Nav.Link>

                      <Dropdown className="text-white me-4 d-flex align-items-center">
                        <Dropdown.Toggle
                          id="dropdown-basic"
                          className="bg-transparent border-0"
                        >
                          {user.nickname}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item as={Link} to={"/profile"}>
                            Profile
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-3">
                            My dashboard
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={handleLogout}>
                            Logout
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </>
                  ) : (
                    <Nav.Link as={Link} to={"/login"}>
                      Login
                    </Nav.Link>
                  )}
                </Nav>
              </Col>
            </Row>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
    </>
  );
};
export default NavBar;
