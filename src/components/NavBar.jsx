import {
  Col,
  Container,
  Dropdown,
  Form,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getUserById,
  logoutUser,
  searchComment,
  searchPost,
  searchTicket,
  searchUser,
} from "../redux/action";
import "../assets/sass/Navbar.scss";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

const NavBar = () => {
  // const user = useSelector(
  //   (state) => state.login.userData && state.login.userData.user
  // );
  const login = useSelector((state) => state.login.userData);
  // const details = useSelector((state) => state.details.data);
  const users = useSelector((state) => state.search.users);
  const posts = useSelector((state) => state.search.posts);
  const tickets = useSelector((state) => state.search.tickets);
  const comments = useSelector((state) => state.search.comments);

  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(
    () => {
      if (login && login.user) {
        dispatch(getUserById(login.user.user_id, login.authorization));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [login, dispatch]
  );

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query && login && login.authorization) {
        const lowerCaseQuery = query.toLowerCase();
        dispatch(searchUser(login.authorization, lowerCaseQuery));
        dispatch(searchComment(login.authorization, lowerCaseQuery));
        dispatch(searchPost(login.authorization, lowerCaseQuery));
        dispatch(searchTicket(login.authorization, lowerCaseQuery));
      }
    }, 500),
    [dispatch, login]
  );

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    debouncedSearch(value);
  };

  const hasResults =
    users.length > 0 ||
    posts.length > 0 ||
    tickets.length > 0 ||
    comments.length > 0;

  const handleItemClick = (type, id) => {
    navigate(`/details/${type}/${id}`);
    setQuery("");
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
              {login && login !== null ? (
                <>
                  <Nav.Link
                    as={Link}
                    to={"/profile"}
                    className="white-nav_links d-md-none fs-5"
                    onClick={handleLinkClick}
                  >
                    <img
                      src={
                        login.user.profileImage == null
                          ? "https://picsum.photos/id/912/200"
                          : login.user.profileImage
                      }
                      alt="profile_img"
                      className="profile_img rounded-circle "
                    />
                    {login.user.nickname}
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
                    Scopri di Più
                  </Nav.Link>
                  {login && (
                    <Form
                      onSubmit={(e) => e.preventDefault()}
                      className="text-center"
                    >
                      <Form.Control
                        type="text"
                        value={query}
                        onChange={handleSearchChange}
                        placeholder="cerca..."
                        className="rounded-5 mx-2"
                      />

                      {query && hasResults && (
                        <div className="search-results position-absolute bg-white rounded-3 mt-1 p-2">
                          {users.length > 0 && (
                            <Row className="search-section flex-column mb-2">
                              <h6 className="fw-bold mb-3">UTENTI</h6>

                              {users.map((user) => (
                                <Col
                                  key={user.id}
                                  className="bot p-0 d-flex justify-content-center "
                                  onClick={() =>
                                    handleItemClick("user", user.id)
                                  }
                                >
                                  <div className="d-flex flex-row">
                                    <img
                                      src={
                                        user.profileImage == null
                                          ? "https://picsum.photos/id/912/200"
                                          : user.profileImage
                                      }
                                      alt="profile-img"
                                      className="img-src me-2 border border-primary"
                                    />
                                    <div>
                                      <p className="fw-bold">{user.nickname}</p>
                                      <div>
                                        <p className="custom-fs-6">
                                          {user.name} {user.surname}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                              ))}
                            </Row>
                          )}
                          <hr />
                          {posts.length > 0 && (
                            <Row className="search-section flex-column mb-2">
                              <h6 className="fw-bold">POSTS</h6>
                              {posts.map((post) => (
                                <Col
                                  key={post.id}
                                  className="bot p-0"
                                  onClick={() =>
                                    handleItemClick("post", post.id)
                                  }
                                >
                                  <p className="custom-fs-5">{post.text}</p>
                                  <hr className="p-0 m-0 mb-1" />
                                </Col>
                              ))}
                            </Row>
                          )}

                          {tickets.length > 0 && (
                            <Row className="search-section flex-column mb-2 mt-3">
                              <h6 className="fw-bold">TICKETS</h6>

                              {tickets.map((ticket) => (
                                <Col
                                  key={ticket.id}
                                  className="bot"
                                  onClick={() =>
                                    handleItemClick("ticket", ticket.id)
                                  }
                                >
                                  <div className="custom-fs-5">
                                    {ticket.title}
                                  </div>
                                  <hr className="p-0 m-0 mb-1" />
                                </Col>
                              ))}
                            </Row>
                          )}

                          {comments.length > 0 && (
                            <Row className="search-section flex-column mb-2">
                              <h6 className="fw-bold">COMMENTI</h6>

                              {comments.map((comment) => (
                                <Col
                                  key={comment.id}
                                  className="bot ps-2"
                                  onClick={() =>
                                    handleItemClick("comment", comment.id)
                                  }
                                >
                                  <div className=" custom-fs-5">
                                    {comment.text}
                                  </div>
                                  <hr className="p-0 m-0 mb-1" />
                                </Col>
                              ))}
                            </Row>
                          )}
                        </div>
                      )}
                    </Form>
                  )}
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
                    Discussioni
                  </Nav.Link>
                  <Nav.Link
                    href="#pricing"
                    className="white-nav_links"
                    onClick={handleLinkClick}
                  >
                    Scopri di Più
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          <Nav className="d-flex flex-row align-items-center  d-none d-md-flex">
            {login && login.user ? (
              <>
                <Nav.Link as={Link} to={"/profile"}>
                  <img
                    src={
                      login.user.profileImage == null
                        ? "https://picsum.photos/id/912/200"
                        : login.user.profileImage
                    }
                    alt="profile_img"
                    className="profile_img rounded-circle"
                  />
                </Nav.Link>

                <Dropdown className="d-inline mx-2 ">
                  <Dropdown.Toggle
                    id="dropdown-autoclose-true"
                    className="white-nav_links fw-bold text-decoration-none text-white bg-transparent border-0"
                  >
                    {login.user.nickname}
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
