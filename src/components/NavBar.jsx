import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
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
      <Navbar bg="dark" data-bs-theme="dark">
        <Container fluid className="mx-4 ">
          <img
            src="https://st2.depositphotos.com/3646177/7801/v/950/depositphotos_78010524-stock-illustration-shark-logo-vector.jpg"
            alt="logo"
            className="rounded-circle logo mx-2"
          />
          <Navbar.Brand href="#home">SaltwaterSpearos</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Nav className="d-flex justify-content-end ">
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
                    <br />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <Nav.Link as={Link} to={"/login"}>
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
