import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  allTicketAction,
  commentXUser,
  createCommentAction,
  createPostAction,
  createTicketAction,
  deleteComment,
  deletePost,
  postCommentsAction,
  postXUser,
  postsByTicketAction,
  uploadComment,
  uploadPost,
} from "../redux/action";
import "../assets/sass/Ticket.scss";
import { Link } from "react-router-dom";

const Ticket = () => {
  const tickets = useSelector((state) => state.allTickets.tickets.content);
  const login = useSelector((state) => state.login.userData);
  const posts = useSelector((state) => state.postXticket.ticket_posts);
  const loading = useSelector((state) => state.postXticket.loading);
  const allComments = useSelector((state) => state.commentXpost.post_comments);
  const dispatch = useDispatch();

  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [visibleComments, setVisibleComments] = useState({});
  const [commentsData, setCommentsData] = useState({});
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const [newTicket, setNewTicket] = useState({ title: "" });
  const [newPost, setNewPost] = useState({ text: "", urlContent: "" });
  const [newComment, setNewComment] = useState({});
  const [showTickets, setShowTickets] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const handleShowRulesModal = () => setShowRulesModal(true);
  const handleCloseRulesModal = () => setShowRulesModal(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [currentComment, setCurrentComment] = useState(null);
  const [uploadFormData, setUploadFormData] = useState({
    text: "",
    urlContent: "",
  });
  const [clickedPostId, setClickedPostId] = useState(null);

  useEffect(() => {
    if (login) {
      dispatch(allTicketAction(login.authorization));
    }
  }, [dispatch, login]);

  useEffect(() => {
    if (allComments.length > 0) {
      const postId = allComments[0].post.id;
      setCommentsData((prevState) => ({
        ...prevState,
        [postId]: allComments,
      }));
    }
  }, [allComments]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowTickets(true);
      } else {
        setShowTickets(false);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (selectedTicketId) {
      dispatch(postsByTicketAction(selectedTicketId, login.authorization));
    }
  }, [selectedTicketId, dispatch, login.authorization]);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setSelectedTicketId(ticket.id);
    dispatch(postsByTicketAction(ticket.id, login.authorization));
  };

  const handleCommentClick = (postId) => {
    setClickedPostId(clickedPostId === postId ? null : postId);
    setVisibleComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));

    if (!visibleComments[postId] && !commentsData[postId]) {
      dispatch(postCommentsAction(postId, login.authorization));
    }
  };

  const handleCreateTicket = () => {
    if (!newTicket.title) {
      alert("Title is required");
      return;
    }
    const ticketPayload = {
      title: newTicket.title,
      user_id: login.user.user_id,
    };
    dispatch(
      createTicketAction(login.user_user_id, login.authorization, ticketPayload)
    ).then(() => {
      dispatch(allTicketAction(login.authorization));
    });
    setShowTicketForm(false);
    setNewTicket({ title: "" });
  };

  const handleCreatePost = () => {
    if (!newPost.text || newPost.text.length < 3) {
      alert("Text must be at least 3 characters long");
      return;
    }
    if (!selectedTicketId) {
      alert("Ticket ID is required");
      return;
    }
    if (!login.user.user_id) {
      alert("Author ID is required");
      return;
    }

    const postPayload = {
      text: newPost.text,
      urlContent: newPost.urlContent,
      ticketId: selectedTicketId,
      authorId: login.user.user_id,
    };

    dispatch(
      createPostAction(login.user_user_id, login.authorization, postPayload)
    ).then(() => {
      dispatch(postsByTicketAction(selectedTicketId, login.authorization));
    });
    setShowPostForm(false);
    setNewPost({ text: "", urlContent: "" });
  };

  const handleCreateComment = (postId) => {
    const commentText = newComment[postId]?.text;
    if (!commentText || commentText.length < 1) {
      alert("Text must be at least 1 character long");
      return;
    }
    if (!login.user.user_id) {
      alert("Author ID is required");
      return;
    }

    const commentPayload = {
      text: commentText,
      postId: postId,
      authorId: login.user.user_id,
    };

    dispatch(
      createCommentAction(
        login.user.user_id,
        login.authorization,
        commentPayload
      )
    ).then(() => {
      setNewComment((prevState) => ({
        ...prevState,
        [postId]: { text: "" },
      }));
      dispatch(postCommentsAction(postId, login.authorization));
    });
  };

  const handleCommentInputChange = (postId, text) => {
    setNewComment((prevState) => ({
      ...prevState,
      [postId]: { text },
    }));
  };

  const handleDeleteComment = async (commentId, postId) => {
    await dispatch(deleteComment(commentId, login.authorization));
    setCommentsData((prevState) => ({
      ...prevState,
      [postId]: prevState[postId].filter((comment) => comment.id !== commentId),
    }));
    dispatch(postCommentsAction(postId, login.authorization));
  };

  const handleDeletePost = async (postId) => {
    await dispatch(deletePost(postId, login.authorization));
    dispatch(postsByTicketAction(selectedTicketId, login.authorization));
  };

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

  const handleUpdatePost = async () => {
    if (currentPost) {
      await dispatch(
        uploadPost(currentPost.id, login.authorization, uploadFormData)
      );
      setShowPostModal(false);
      dispatch(postsByTicketAction(selectedTicketId, login.authorization)); // Refresh the posts
    }
  };

  const handleUpdateComment = async (commentId, postId) => {
    await dispatch(
      uploadComment(commentId, login.authorization, uploadFormData)
    );
    dispatch(postCommentsAction(postId, login.authorization)); // Refresh the comments
    setCommentsData((prevState) => ({
      ...prevState,
      [postId]: prevState[postId].map((comment) =>
        comment.id === commentId
          ? { ...comment, text: uploadFormData.text }
          : comment
      ),
    }));
    setShowCommentModal(false);
  };

  const handleUploadFormDataChange = (e) => {
    const { name, value } = e.target;
    setUploadFormData({ ...uploadFormData, [name]: value });
  };

  if (!login) {
    return (
      <div className="bk vh-100 d-flex justify-content-center align-items-center flex-column">
        <div className="text-center bk-glass p-5 text-dark g">
          <p>Ci dispiace!</p>
          <p>
            Per accedere alla sezione discussioni hai bisogno di effettuare il
            Login
          </p>
          <Button as={Link} to="/login">
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Container fluid className="ticket-container">
      <Row className="justify-content-center">
        <Col sm={12} className="text-center p-0">
          <Button className="rule fw-bold" onClick={handleShowRulesModal}>
            Leggi queste brevi e semplici regole prima di iniziare!
          </Button>
        </Col>
      </Row>

      <Row className="justify-content-between mt-3">
        <Col md={3} className="mb-5 px-3 scrollable-col ticket-col bk-glass">
          <div className="d-flex justify-content-between align-items-center py-3">
            <h1 className="d-none d-md-block fw-bold ">TICKETS</h1>
            <Button
              className="d-flex flex-row d-md-none "
              onClick={() => setShowTickets(!showTickets)}
            >
              <h1 className="fw-bold">TICKETS</h1>
              <i
                className={`bi ms-2 ${
                  showTickets ? "bi-caret-up-fill" : "bi-caret-down-fill"
                }`}
              ></i>
            </Button>

            <Button
              className="b bg-transparent border-0 p-0"
              onClick={() => setShowTicketForm(!showTicketForm)}
            >
              <i className="bi bi-bookmark-plus-fill fs-4 text-success"></i>
            </Button>
          </div>
          <hr className="m-0" />

          {showTicketForm && (
            <Form className="mb-3">
              <Form.Group controlId="formTicketTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={newTicket.title}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, title: e.target.value })
                  }
                />
              </Form.Group>
              <Button variant="primary" onClick={handleCreateTicket}>
                Create Ticket
              </Button>
            </Form>
          )}

          {showTickets && (
            <>
              {tickets &&
                tickets.map((ticket) => (
                  <Col key={ticket.id} className="bot rounded text-break p-2 ">
                    <Row
                      onClick={() => handleTicketClick(ticket)}
                      style={{ cursor: "pointer" }}
                      className="align-items-center"
                    >
                      <Col>
                        <h1>{ticket.title}</h1>
                      </Col>
                      <Col className="d-flex justify-content-end align-items-center flex-row">
                        <p className="m-0 pe-2 fw-bold ">
                          @{ticket.user_id.nickname}
                        </p>
                        <img
                          src={ticket.user_id.profileImage}
                          alt="author"
                          className="profile_img_comm rounded-circle"
                        />
                      </Col>
                      <p className="p-ticket-date text-end m-0">
                        {ticket.ticketCreationDate}
                      </p>
                    </Row>
                  </Col>
                ))}
            </>
          )}
        </Col>
        <Col lg={6} className="px-3 w-c bk-glass">
          <div className="d-flex justify-content-between align-items-center py-3">
            <h1 className="fw-bold">
              POSTS {selectedTicket && `- ${selectedTicket.title}`}
            </h1>
            <Button
              className="b bg-transparent border-0 p-0"
              onClick={() => setShowPostForm(!showPostForm)}
              disabled={!selectedTicketId}
            >
              <i className="bi bi-plus-circle-fill fs-4 text-success"></i>
            </Button>
          </div>
          <hr className="m-0" />

          {showPostForm && (
            <Form className="mb-3">
              <Form.Group controlId="formPostText">
                <Form.Label>Text</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter text"
                  value={newPost.text}
                  onChange={(e) =>
                    setNewPost({ ...newPost, text: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formPostUrlContent">
                <Form.Label>URL Content</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter URL"
                  value={newPost.urlContent}
                  onChange={(e) =>
                    setNewPost({ ...newPost, urlContent: e.target.value })
                  }
                />
              </Form.Group>
              <Button variant="primary" onClick={handleCreatePost}>
                Create Post
              </Button>
            </Form>
          )}

          {loading ? (
            <Spinner animation="border" variant="light" />
          ) : (
            posts &&
            posts.map((post) => (
              <Col key={post.id} className=" rounded text-break my-3">
                <Card className="bk-glass">
                  <Card.Img variant="top" src={post.urlContent} />
                  <Card.Body className="py-0 mt-2 px-3">
                    <Button
                      className="bg-transparent border-0 rounded-5 bot mb-2 bot-chat"
                      onClick={() => handleCommentClick(post.id)}
                    >
                      {clickedPostId === post.id ? (
                        <i className="bi bi-chat-fill text-info i-info"></i>
                      ) : (
                        <i className="bi bi-chat i-info"></i>
                      )}
                    </Button>
                    <Card.Title className="d-flex flex-row justify-content-between ">
                      <div className="d-flex flex-row justify-content-between align-items-center">
                        <img
                          src={post.author.profileImage}
                          alt="author"
                          className="profile_img_comm rounded-circle "
                        />
                        <p className="pe-3 fw-bold m-0 ms-2">
                          {post.author.nickname}
                        </p>
                        <p className="m-0">{post.text}</p>
                      </div>

                      {post.author.id === login.user.user_id && (
                        <div className="me-3 ">
                          <Button
                            className="border-0 rounded-5 trash me-2 bot"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            <i className="bi bi-trash3-fill"></i>
                          </Button>
                          <Button
                            className="border-0 rounded-5 bot bg-transparent bot-chat"
                            onClick={() => handleShowPostModal(post)}
                          >
                            <i className="bi bi-pencil-fill text-info i-info"></i>
                          </Button>
                        </div>
                      )}
                    </Card.Title>

                    {visibleComments[post.id] && (
                      <>
                        <InputGroup
                          className="mb-3 w-100 pt-2"
                          controlId={`formCommentText_${post.id}`}
                        >
                          <Form.Control
                            className="border-0 bg-light"
                            placeholder="Inserisci commento"
                            type="text"
                            value={newComment[post.id]?.text || ""}
                            onChange={(e) =>
                              handleCommentInputChange(post.id, e.target.value)
                            }
                          />
                          <InputGroup.Text className="p-0">
                            <Button
                              className="rounded-start-0"
                              variant="primary"
                              onClick={() => handleCreateComment(post.id)}
                            >
                              <i className="bi bi-send"></i>
                            </Button>
                          </InputGroup.Text>
                        </InputGroup>

                        {commentsData[post.id] &&
                          commentsData[post.id].length > 0 && (
                            <>
                              {commentsData[post.id].map((comment, j) => (
                                <div
                                  key={comment.id}
                                  className="d-flex justify-content-between align-items-center pb-2"
                                >
                                  <div className="d-flex flex-row align-items-center">
                                    <div>
                                      <img
                                        src={comment.author.profileImage}
                                        alt="author"
                                        className="profile_img_comm rounded-circle ms-3"
                                      />
                                    </div>
                                    <div>
                                      <p className="px-3 mb-0 fw-bold">
                                        {comment.author.nickname}
                                      </p>
                                      <p className="px-3 m-0">{comment.text}</p>
                                    </div>
                                  </div>

                                  {comment.author.id === login.user.user_id && (
                                    <div className="me-3">
                                      <Button
                                        className="border-0 rounded-5 trash me-2 bot"
                                        onClick={() =>
                                          handleDeleteComment(
                                            comment.id,
                                            post.id
                                          )
                                        }
                                      >
                                        <i className="bi bi-trash3-fill"></i>
                                      </Button>
                                      <Button
                                        className="border-0 rounded-5 bot bg-transparent bot-chat"
                                        onClick={() =>
                                          handleShowCommentModal(comment)
                                        }
                                      >
                                        <i className="bi bi-pencil-fill text-info i-info"></i>
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </>
                          )}
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Col>
      </Row>

      {/* MODALE REGOLE */}

      <Modal show={showRulesModal} onHide={handleCloseRulesModal}>
        <Modal.Header closeButton>
          <Modal.Title>Regole del Forum</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="d-flex flex-column align-items-center">
            <li>1. Rispetta gli altri utenti.</li>
            <li>2. Non pubblicare contenuti offensivi.</li>
            <li>3. Non offendere.</li>
            <li>4. Segui le linee guida della community.</li>
            <li>5. Non fare spam.</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseRulesModal}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODALE EDIT COMMENTI */}

      <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)}>
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
          <Button
            variant="primary"
            onClick={() =>
              handleUpdateComment(currentComment.id, currentComment.post.id)
            }
          >
            Save Changes
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
            <Form.Group controlId="formUrlContent">
              <Form.Label>URL Content</Form.Label>
              <Form.Control
                type="text"
                name="urlContent"
                value={uploadFormData.urlContent}
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
          <Button
            variant="primary"
            onClick={() => handleUpdatePost(currentPost.id)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Ticket;
