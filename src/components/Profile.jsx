import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  commentXUser,
  deleteComment,
  deletePost,
  deleteTicket,
  getUserById,
  postXUser,
  postsByTicketAction,
  ticketXUser,
  uploadProfile,
  // uploadProfileImage,
} from "../redux/action";
import { useEffect, useState } from "react";
import "../assets/sass/Profile.scss";
import { Link } from "react-router-dom";

const Profile = () => {
  const login = useSelector((state) => state.login.userData);
  const tickets = useSelector((state) => state.tickets.tickets);
  const posts = useSelector((state) => state.post.posts);
  const comments = useSelector((state) => state.comment.comments);
  const tickets_post = useSelector((state) => state.postXticket.ticket_posts);
  // const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  // const [profileImageUrl, setProfileImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  const [showTickets, setShowTickets] = useState(false);
  const [showPostsTicket, setShowPostsTicket] = useState(false);

  const [showPosts, setShowPosts] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    nickname: login.user.nickname,
    name: login.user.name,
    surname: login.user.surname,
    email: login.user.email,
    password: "",
    city: login.user.city,
    social: login.user.social,
    profileImage: login.user.profileImage,
  });
  // eslint-disable-next-line no-unused-vars
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const handleToggleTickets = () => {
    setShowTickets(!showTickets);
  };

  const handleTogglePosts = () => {
    setShowPosts(!showPosts);
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleProfileUpdate = async () => {
    if (!isFormValid()) return;
    setLoading(true);
    try {
      await dispatch(
        uploadProfile(login.user.user_id, login.authorization, formData)
      );
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
      dispatch(getUserById(login.user.user_id, login.authorization));
    }
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError("La password deve contenere almeno 6 caratteri");
    } else {
      setPasswordError("");
    }
  };

  const isFormValid = () => {
    return (
      formData.password.length >= 6 &&
      formData.nickname &&
      formData.name &&
      formData.surname &&
      formData.email &&
      formData.city
      // formData.social
    );
  };

  useEffect(() => {
    if (login) {
      dispatch(getUserById(login.user.user_id, login.authorization));
      dispatch(ticketXUser(login.user.user_id, login.authorization));
      dispatch(postXUser(login.user.user_id, login.authorization));
      dispatch(commentXUser(login.user.user_id, login.authorization));
    }
  }, [dispatch, login]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "password") {
      validatePassword(value);
    }
  };

  const handleShowPostsTicket = (ticketId) => {
    setSelectedTicketId(ticketId);
    dispatch(postsByTicketAction(ticketId, login.authorization));
    setShowPostsTicket(true);
  };

  const handleClosePostsTicket = () => {
    setShowPostsTicket(false);
  };

  const handleDeletePost = async (postId) => {
    await dispatch(deletePost(postId, login.authorization));
    dispatch(postXUser(login.user.user_id, login.authorization));
  };

  const handleDeleteTicket = async (ticketId) => {
    const confirmation = window.confirm(
      "Cancellando la discussione verranno persi tutti i post associati ad essa. Sei sicuro di voler procedere?"
    );
    if (confirmation) {
      await dispatch(deleteTicket(ticketId, login.authorization));
      dispatch(ticketXUser(login.user.user_id, login.authorization));
    }
  };

  const handleDeleteComment = async (commentId) => {
    await dispatch(deleteComment(commentId, login.authorization));
    dispatch(commentXUser(login.user.user_id, login.authorization));
  };

  if (!login) {
    return (
      <div className="bk vh-100 d-flex justify-content-center align-items-center flex-column">
        <div className="text-center bk-glass p-5 text-dark g">
          <p>Ci dispiace!</p>
          <p>
            Per accedere alla sezione Profilo hai bisogno di effettuare il Login
          </p>
          <Button as={Link} to="/login">
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Container fluid className="container-profile pb-5">
        <Row className="w-100 justify-content-center align-items-center flex-column ">
          <Col xs={12} md={6} lg={6} className="d-flex justify-content-center ">
            <Card className="profile-card">
              <Card.Img
                variant="top"
                src={login.user.profileImage}
                className="card-img"
              />
              <Card.Body className="text-center">
                <Card.Title>{login.user.nickname}</Card.Title>
                <Card.Text>
                  {login.user.name} {login.user.surname}
                </Card.Text>

                <>
                  <Button
                    className="bg-primary border-0 text-uppercase fw-bold bot"
                    onClick={handleShow}
                  >
                    Modifica profilo
                  </Button>
                  <div className="d-flex flex-column mt-4">
                    <div>
                      <h1
                        className="text-uppercase
                      "
                      >
                        le mie pubblicazioni:
                      </h1>
                    </div>
                    <div className="d-flex flex-column flex-sm-row ">
                      <p className="m-3">
                        <Button
                          onClick={handleToggleTickets}
                          className="text-uppercase text-black fw-bold border-0 bot"
                        >
                          Tickets
                          {showTickets ? (
                            <i className="bi bi-caret-up-fill "></i>
                          ) : (
                            <i className="bi bi-caret-down-fill ms-2"></i>
                          )}
                        </Button>
                      </p>
                      <p className="m-3 ">
                        <Button
                          onClick={handleTogglePosts}
                          className="text-uppercase text-black fw-bold border-0 bot"
                        >
                          Posts
                          {showPosts ? (
                            <i className="bi bi-caret-up-fill ms-2"></i>
                          ) : (
                            <i className="bi bi-caret-down-fill ms-2"></i>
                          )}
                        </Button>
                      </p>
                      <p className="m-3 ">
                        <Button
                          onClick={handleToggleComments}
                          className="text-uppercase text-black fw-bold border-0 bot"
                        >
                          Commenti
                          {showComments ? (
                            <i className="bi bi-caret-up-fill ms-2"></i>
                          ) : (
                            <i className="bi bi-caret-down-fill ms-2"></i>
                          )}
                        </Button>
                      </p>
                    </div>
                  </div>

                  {/*MODALE MODIFICA PROFILO */}

                  <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Profilo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group controlId="formNickname">
                          <Form.Label>Nickname</Form.Label>
                          <Form.Control
                            type="text"
                            name="nickname"
                            value={formData.nickname}
                            onChange={handleInputChange}
                            className="rounded-5"
                          />
                        </Form.Group>
                        <Form.Group controlId="formName">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="rounded-5"
                          />
                        </Form.Group>
                        <Form.Group controlId="formSurname">
                          <Form.Label>Surname</Form.Label>
                          <Form.Control
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                            className="rounded-5"
                          />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="rounded-5"
                          />
                        </Form.Group>
                        <Form.Group
                          controlId="formPassword"
                          className="d-flex flex-column "
                        >
                          <Form.Label className="m-0">Password</Form.Label>
                          <Form.Text>
                            Per sicurezza reinserisci la tua password o cambiale
                            se preferisci
                          </Form.Text>
                          <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="rounded-5"
                          />
                          {passwordError && (
                            <Form.Text className="text-danger">
                              {passwordError}
                            </Form.Text>
                          )}
                        </Form.Group>
                        <Form.Group controlId="formCity">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="rounded-5"
                          />
                        </Form.Group>
                        <Form.Group controlId="formSocial">
                          <Form.Label>Social Info</Form.Label>
                          <Form.Control
                            type="text"
                            name="social"
                            value={formData.social}
                            onChange={handleInputChange}
                            className="rounded-5"
                          />
                        </Form.Group>
                        <Form.Group controlId="formProfileImage">
                          <Form.Label>Profile Image URL</Form.Label>
                          <Form.Control
                            type="text"
                            name="profileImage"
                            value={formData.profileImage}
                            onChange={handleInputChange}
                            className="rounded-5"
                          />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={handleProfileUpdate} disabled={loading}>
                        Update Profile
                      </Button>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* <Row className="flex-row g-3 mt-3">
          
        </Row> */}

        {/* MODALE TICKETS */}

        <Modal show={showTickets} onHide={handleToggleTickets}>
          <Modal.Header closeButton>
            <Modal.Title>Tickets</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {tickets.map((ticket) => (
              <Col className="d-flex justify-content-center" key={ticket.id}>
                <Card className="my-2 w-100">
                  <Card.Body>
                    <Card.Title className="d-flex justify-content-between">
                      <div>{ticket.title}</div>
                      <div className="d-flex flex-row align-items-center">
                        <img
                          src={ticket.user_id.profileImage}
                          alt="author"
                          className="profile_img_comm rounded-circle me-2"
                        />
                        <p className="m-0">{ticket.user_id.nickname}</p>
                      </div>
                    </Card.Title>
                    {/* <Card.Subtitle className="mb-2 text-muted">
                        Card Subtitle
                      </Card.Subtitle> */}
                    <Card.Text className="text-end">
                      {ticket.ticketCreationDate}
                    </Card.Text>
                    <Card.Text className="text-end"></Card.Text>
                    <div className="d-flex justify-content-between ">
                      <Button
                        className="bg-transparent border-0 text-secondary"
                        onClick={() => handleShowPostsTicket(ticket.id)}
                      >
                        ...visualiza post
                        <i className="ms-2 bi bi-box-arrow-up-right"></i>
                      </Button>
                      <Button
                        className="border-0 rounded-5 trash"
                        onClick={() => handleDeleteTicket(ticket.id)}
                      >
                        <i className="bi bi-trash3-fill"></i>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleToggleTickets}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* MODALE POSTS */}

        <Modal show={showPosts} onHide={handleTogglePosts}>
          <Modal.Header closeButton>
            <Modal.Title>Posts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showPosts && (
              <>
                {posts.map((post) => (
                  <Col className="d-flex justify-content-center align-items-center">
                    <Card className="my-2 w-100" key={post.id}>
                      {post.urlContent === "" ? (
                        ""
                      ) : (
                        <Card.Img variant="top" src={post.urlContent} />
                      )}
                      {/* <Card.Img variant="top" src={post.urlContent} /> */}
                      <Card.Body>
                        <div className="d-flex flex-row ">
                          <Card.Title className="me-2">
                            <img
                              src={post.author.profileImage}
                              alt="author"
                              className="profile_img_comm rounded-circle me-2"
                            />{" "}
                            {post.author.nickname}
                          </Card.Title>
                          <Card.Text>{post.text}</Card.Text>
                        </div>

                        <Card.Text className="text-end">
                          {post.postCreationDate}
                        </Card.Text>
                        <Button
                          className="border-0 rounded-5 trash me-2"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </Button>
                        <Button className="border-0 rounded-5">
                          <i className="bi bi-pencil"></i>
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={!showPosts}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* MODALE TICKET'S POST */}

        <Modal
          show={showPostsTicket}
          onHide={handleClosePostsTicket}
          centered
          size="lg"
          className="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Posts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {tickets_post.map((post) => (
              <Col className="d-flex justify-content-center align-items-center">
                <Card className="card-post mb-3" key={post.id}>
                  {post.urlContent === "" ? (
                    ""
                  ) : (
                    <Card.Img variant="top" src={post.urlContent} />
                  )}
                  {/* <Card.Img variant="top" src={post.urlContent} /> */}
                  <Card.Body>
                    <Card.Title>{post.text}</Card.Title>

                    <Card.Text>{post.postCreationDate}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosePostsTicket}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* {MODALE COMMENTI} */}
        <Modal show={showComments} onHide={handleToggleComments}>
          <Modal.Header closeButton>
            <Modal.Title>Posts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showComments && (
              <>
                {comments.map((comment) => (
                  <Col className="d-flex justify-content-center ">
                    <Card style={{ width: "18rem" }} key={comment.id}>
                      <Card.Body>
                        <Card.Text>Post: {comment.post.text}</Card.Text>
                        <Card.Title className="d-flex justify-content-between">
                          {comment.text}
                          <div>
                            <img
                              src={comment.author.profileImage}
                              alt="author"
                              className="profile_img_comm rounded-circle me-2"
                            />
                            {comment.author.nickname}
                          </div>
                        </Card.Title>
                        <Card.Text></Card.Text>
                        <Button
                          className="border-0 rounded-5 trash me-2"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </Button>
                        <Button className="border-0 rounded-5">
                          <i className="bi bi-pencil"></i>
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={!showComments}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* <Row className="flex-row g-3 mt-3">
          <h1 className="d-flex justify-content-center align-items-center text-white">
            Comments
            <Button
              onClick={handleToggleComments}
              className="bg-transparent border-0 d-flex align-items-center"
            >
              {showComments ? (
                <i className="bi bi-caret-up-fill"></i>
              ) : (
                <i className="bi bi-caret-down-fill"></i>
              )}
            </Button>
          </h1>
          {showComments && (
            <>
              {comments.map((comment) => (
                <Col className="d-flex justify-content-center ">
                  <Card style={{ width: "18rem" }} key={comment.id}>
                    <Card.Body>
                      <Card.Text>{comment.text}</Card.Text>
                      <Card.Link href="#">Card Link</Card.Link>
                      <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </>
          )}
        </Row> */}
      </Container>
    </>
  );
};

export default Profile;
