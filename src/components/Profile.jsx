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
  uploadComment,
  uploadPost,
  uploadProfile,
  uploadTicket,
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
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [showTickets, setShowTickets] = useState(false);
  const [showPostsTicket, setShowPostsTicket] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    nickname: login.user.nickname || "",
    name: login.user.name || "",
    surname: login.user.surname || "",
    email: login.user.email || "",
    password: "",
    city: login.user.city || "",
    social: login.user.social || "",
    profileImage: login.user.profileImage || null,
  });

  // eslint-disable-next-line no-unused-vars
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [showEditTicketModal, setShowEditTicketModal] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [ticketFormData, setTicketFormData] = useState({
    title: "",
  });
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [currentComment, setCurrentComment] = useState(null);
  const [uploadFormData, setUploadFormData] = useState({
    text: "",
    urlContent: "",
  });
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (login) {
      dispatch(getUserById(login.user.user_id, login.authorization));
      dispatch(ticketXUser(login.user.user_id, login.authorization));
      dispatch(postXUser(login.user.user_id, login.authorization));
      dispatch(commentXUser(login.user.user_id, login.authorization));
    }
  }, [dispatch, login]);

  const handleShowPostModal = (post) => {
    setCurrentPost(post);
    setUploadFormData({ text: post.text, urlContent: post.urlContent });
    setShowPostModal(true);
  };

  const handleShowCommentModal = (comment) => {
    setCurrentComment(comment);
    setUploadFormData({ text: comment.text });
    setShowCommentModal(true);
  };

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
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("nickname", formData.nickname);
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("surname", formData.surname);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("password", formData.password);
      formDataToSubmit.append("city", formData.city);
      formDataToSubmit.append("social", formData.social);
      if (formData.profileImage) {
        formDataToSubmit.append("profileImage", formData.profileImage);
      }

      console.log([...formDataToSubmit.entries()]);

      await dispatch(
        uploadProfile(login.user.user_id, login.authorization, formDataToSubmit)
      );
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
      dispatch(getUserById(login.user.user_id, login.authorization));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profileImage: e.target.files[0],
    }));
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

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "password") {
      validatePassword(value);
    }
  };

  const handleUploadFormDataChange = (e) => {
    const { name, value } = e.target;
    setUploadFormData({ ...uploadFormData, [name]: value });
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
      "Attenzione! Non è possibile eliminare un ticket che contiene post."
    );
    if (confirmation) {
      try {
        await dispatch(deleteTicket(ticketId, login.authorization));
        await dispatch(ticketXUser(login.user.user_id, login.authorization));
      } catch (error) {
        alert("Problema con l'eliminazione del ticket. Riprova più tardi.");
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    await dispatch(deleteComment(commentId, login.authorization));
    dispatch(commentXUser(login.user.user_id, login.authorization));
  };

  const handleShowEditTicketModal = (ticket) => {
    setCurrentTicket(ticket);
    setTicketFormData({ title: ticket.title });
    setShowEditTicketModal(true);
  };

  const handleCloseEditTicketModal = () => {
    setShowEditTicketModal(false);
    setCurrentTicket(null);
  };

  const handleTicketInputChange = (e) => {
    const { name, value } = e.target;
    setTicketFormData({ ...ticketFormData, [name]: value });
  };

  const handleUpdateTicket = async () => {
    const ticketPayload = {
      title: ticketFormData.title,
    };

    try {
      await dispatch(
        uploadTicket(currentTicket.id, login.authorization, ticketPayload)
      );
      dispatch(ticketXUser(login.user.user_id, login.authorization)); // Aggiorna i ticket dell'utente
      handleCloseEditTicketModal();
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  const handleUpdatePost = async () => {
    if (currentPost) {
      await dispatch(
        uploadPost(currentPost.id, login.authorization, uploadFormData)
      );
      dispatch(postXUser(login.user.user_id, login.authorization)); // Refresh the posts
      setShowPostModal(false);
    }
  };

  const handleUpdateComment = async () => {
    if (currentComment) {
      await dispatch(
        uploadComment(currentComment.id, login.authorization, uploadFormData)
      );
      dispatch(commentXUser(login.user.user_id, login.authorization)); // Refresh the comments
      setShowCommentModal(false);
    }
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
                            onChange={handleFormDataChange}
                            className="rounded-5"
                          />
                        </Form.Group>
                        <Form.Group controlId="formName">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleFormDataChange}
                            className="rounded-5"
                          />
                        </Form.Group>
                        <Form.Group controlId="formSurname">
                          <Form.Label>Surname</Form.Label>
                          <Form.Control
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleFormDataChange}
                            className="rounded-5"
                          />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormDataChange}
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
                            onChange={handleFormDataChange}
                            className="rounded-5"
                            required
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
                            onChange={handleFormDataChange}
                            className="rounded-5"
                          />
                        </Form.Group>
                        <Form.Group controlId="formSocial">
                          <Form.Label>Social Info</Form.Label>
                          <Form.Control
                            type="text"
                            name="social"
                            value={formData.social}
                            onChange={handleFormDataChange}
                            className="rounded-5"
                          />
                        </Form.Group>
                        <Form.Group controlId="formProfileImage">
                          <Form.Label>Profile Image</Form.Label>
                          <Form.Control
                            type="file"
                            name="profileImage"
                            onChange={handleFileChange}
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
                      <div className="brake-w">
                        <div>{ticket.title}</div>
                      </div>

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
                      <div>
                        <Button
                          className="border-0 me-2 rounded-5 trash"
                          onClick={() => handleDeleteTicket(ticket.id)}
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </Button>
                        <Button
                          className="border-0 rounded-5"
                          onClick={() => handleShowEditTicketModal(ticket)}
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                      </div>
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

        {/* MODALE EDIT TICKET */}
        <Modal
          show={showEditTicketModal}
          onHide={handleCloseEditTicketModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modifica Ticket</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTicketTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={ticketFormData.title}
                  onChange={handleTicketInputChange}
                  className="rounded-5"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleUpdateTicket} disabled={loading}>
              Update Ticket
            </Button>
            <Button variant="secondary" onClick={handleCloseEditTicketModal}>
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
                  <Col
                    key={post.id}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Card className="my-2 w-100">
                      {post.filePaths && post.filePaths.length > 0
                        ? post.filePaths.map((filePath, index) => (
                            <Card.Img
                              key={index}
                              variant="top"
                              src={`/${filePath.replace(/\\/g, "/")}`}
                            />
                          ))
                        : post.urlContent && (
                            <Card.Img variant="top" src={post.urlContent} />
                          )}
                      {/* {post.urlContent === "" ? (
                        ""
                      ) : (
                        <Card.Img variant="top" src={post.urlContent} />
                      )} */}
                      <Card.Body>
                        <div className="d-flex flex-row ">
                          <Card.Title className="me-2">
                            <img
                              src={post.author.profileImage}
                              alt="author"
                              className="profile_img_comm rounded-circle me-2"
                            />
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
                        <Button
                          className="border-0 rounded-5"
                          onClick={() => handleShowPostModal(post)}
                        >
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
            <Button
              variant="secondary"
              onClick={showPosts ? handleTogglePosts : undefined}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* MODALE EDIT POST */}

        <Modal show={showPostModal} onHide={() => setShowPostModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formText">
                <Form.Label>Text</Form.Label>
                <Form.Control
                  type="text"
                  name="text"
                  value={uploadFormData.text}
                  onChange={handleUploadFormDataChange}
                  className="rounded-5"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowPostModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdatePost}>
              Save Changes
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
              <Col
                key={post.id}
                className="d-flex justify-content-center align-items-center"
              >
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
            <Modal.Title>Commenti</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showComments && (
              <>
                {comments.map((comment) => (
                  <Col
                    key={comment.id}
                    className="d-flex justify-content-center "
                  >
                    <Card className="w-100">
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
                        <Button
                          className="border-0 rounded-5"
                          onClick={() => handleShowCommentModal(comment)}
                        >
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
            <Button
              variant="secondary"
              onClick={
                showComments ? handleToggleComments : handleClosePostsTicket
              }
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* MODALE EDIT COMMENTI */}

        <Modal
          show={showCommentModal}
          onHide={() => setShowCommentModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formText">
                <Form.Label>Text</Form.Label>
                <Form.Control
                  type="text"
                  name="text"
                  value={uploadFormData.text}
                  onChange={handleUploadFormDataChange}
                  className="rounded-5"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowCommentModal(false)}
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdateComment}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Profile;
