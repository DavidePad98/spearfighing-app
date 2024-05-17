import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  allTicketAction,
  createCommentAction,
  createPostAction,
  createTicketAction,
  postCommentsAction,
  postsByTicketAction,
} from "../redux/action";
import "../Ticket.css";
import { Link } from "react-router-dom";

const Ticket = () => {
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [visibleComments, setVisibleComments] = useState({});
  const [commentsData, setCommentsData] = useState({});
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const [newTicket, setNewTicket] = useState({ title: "" });
  const [newPost, setNewPost] = useState({ text: "", urlContent: "" });
  const [newComment, setNewComment] = useState({ text: "" });

  const tickets = useSelector((state) => state.allTickets.tickets.content);
  const login = useSelector((state) => state.login.userData);
  const posts = useSelector((state) => state.postXticket.ticket_posts);
  const loading = useSelector((state) => state.postXticket.loading);
  const allComments = useSelector((state) => state.commentXpost.post_comments);

  const dispatch = useDispatch();

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

  const handleTicketClick = (ticketId) => {
    setSelectedTicketId(ticketId);
    dispatch(postsByTicketAction(ticketId, login.authorization));
  };

  const handleCommentClick = (postId) => {
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
    if (!newComment.text || newComment.text.length < 1) {
      alert("Text must be at least 1 character long");
      return;
    }
    if (!login.user.user_id) {
      alert("Author ID is required");
      return;
    }

    const commentPayload = {
      text: newComment.text,
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
      setNewComment({ text: "" });
      dispatch(postCommentsAction(postId, login.authorization));
    });
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
      <Row>
        <Col md={3} className="vh-100 scrollable-col">
          <div className="d-flex justify-content-between align-items-center py-3">
            <h1 className=" m-0">TICKETS</h1>
            <Button
              className="b bg-transparent border-0 p-0"
              onClick={() => setShowTicketForm(!showTicketForm)}
            >
              <i className="bi bi-bookmark-plus-fill fs-4 text-success"></i>
            </Button>
          </div>

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

          {tickets &&
            tickets.map((ticket, i) => (
              <Col
                key={i}
                className="border border-2 border-dark rounded text-break p-2"
              >
                <Row
                  onClick={() => handleTicketClick(ticket.id)}
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
        </Col>
        <Col md={5} className="px-5">
          <div className="d-flex justify-content-between align-items-center py-3">
            <h1 className=" m-0">POSTS</h1>
            <Button
              className="b bg-transparent border-0 p-0"
              onClick={() => setShowPostForm(!showPostForm)}
              disabled={!selectedTicketId}
            >
              <i className="bi bi-plus-circle-fill fs-4 text-success"></i>
            </Button>
          </div>

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
            posts.map((post, i) => (
              <Col
                key={i}
                className="border border-2 border-dark rounded text-break mb-3"
              >
                <Card>
                  <Card.Img variant="top" src={post.urlContent} />
                  <Card.Body className="p-0 mt-3 ps-3">
                    {/* <div>
                      <Button onClick={() => handleCommentClick(post.id)}>
                        <i className="bi bi-chat"></i>
                      </Button>
                    </div> */}
                    <Card.Title className="d-flex flex-row">
                      <div className="d-flex flex-row align-items-center">
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
                    </Card.Title>

                    <Form className="mb-3 px-3">
                      <Form.Group controlId={`formCommentText_${post.id}`}>
                        <Form.Control
                          type="text"
                          placeholder="Inserisci commento"
                          value={newComment.text}
                          onChange={(e) =>
                            setNewComment({
                              ...newComment,
                              text: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                      <Button
                        variant="primary"
                        onClick={() => handleCreateComment(post.id)}
                      >
                        Crea Commento
                      </Button>
                    </Form>

                    {commentsData[post.id] &&
                      commentsData[post.id].length > 0 && (
                        <Button
                          onClick={() => handleCommentClick(post.id)}
                          className="mb-3"
                        >
                          {visibleComments[post.id]
                            ? "Mostra meno"
                            : "Mostra commenti"}
                        </Button>
                      )}
                    {visibleComments[post.id] && commentsData[post.id] && (
                      <>
                        {commentsData[post.id].map((comment, j) => (
                          <div key={j} className="d-flex">
                            <div className="d-flex flex-row align-items-center">
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
                              <p className="px-3">{comment.text}</p>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Ticket;
