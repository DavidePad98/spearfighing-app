import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
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
import {
  commentXUser,
  createCommentAction,
  getCommentById,
  getPostById,
  getTicketById,
  getUserById,
  postCommentsAction,
  postXUser,
  postsByTicketAction,
  ticketXUser,
} from "../redux/action";
import "../assets/sass/DetailsPage.scss";

const DetailPage = () => {
  const { type, id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.details.data);
  const login = useSelector((state) => state.login.userData);
  const loading = useSelector((state) => state.details.loading);
  const error = useSelector((state) => state.details.error);
  const [showTickets, setShowTickets] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const tickets = useSelector((state) => state.tickets.tickets);
  const posts = useSelector((state) => state.post.posts);
  const comments = useSelector((state) => state.comment.comments);
  const allComments = useSelector((state) => state.commentXpost.post_comments);

  // eslint-disable-next-line no-unused-vars
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [showPostsTicket, setShowPostsTicket] = useState(false);
  const tickets_post = useSelector((state) => state.postXticket.ticket_posts);
  const [clickedPostId, setClickedPostId] = useState(null);
  const [visibleComments, setVisibleComments] = useState({});
  const [commentsData, setCommentsData] = useState({});
  const [newComment, setNewComment] = useState({});

  const handleToggleTickets = () => {
    setShowTickets(!showTickets);
  };

  const handleTogglePosts = () => {
    setShowPosts(!showPosts);
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleClosePostsTicket = () => {
    setShowPostsTicket(false);
  };

  const handleShowPostsTicket = (ticketId) => {
    setSelectedTicketId(ticketId);
    dispatch(postsByTicketAction(ticketId, login.authorization));
    setShowPostsTicket(true);
  };

  //   case post

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

  useEffect(() => {
    if (login && login.authorization) {
      console.log("Login and authorization are present.");
      console.log("Type:", type);
      console.log("ID:", id);
      switch (type) {
        case "user":
          dispatch(getUserById(id, login.authorization));
          dispatch(ticketXUser(id, login.authorization));
          dispatch(postXUser(id, login.authorization));
          dispatch(commentXUser(id, login.authorization));
          break;
        case "post":
          console.log("Fetching post by ID:", id);

          dispatch(getPostById(id, login.authorization));
          break;
        case "ticket":
          dispatch(getTicketById(id, login.authorization));
          break;
        case "comment":
          dispatch(getCommentById(id, login.authorization));
          break;
        default:
          break;
      }
    }
  }, [type, id, login, dispatch]);

  useEffect(() => {
    if (allComments.length > 0) {
      const postId = allComments[0].post.id;
      setCommentsData((prevState) => ({
        ...prevState,
        [postId]: allComments,
      }));
    }
  }, [allComments]);

  const renderDetails = () => {
    if (loading) {
      return <Spinner animation="border" />;
    }
    if (error) {
      return <p>Error: {error}</p>;
    }
    switch (type) {
      case "user":
        return (
          //   <Container fluid className="container pb-5">
          <Row className="w-100 justify-content-center align-items-center flex-column ">
            <Col
              xs={12}
              md={6}
              lg={6}
              className="d-flex justify-content-center "
            >
              <Card className="profile-card">
                <Card.Img
                  variant="top"
                  src={details.profileImage}
                  className="card-img"
                />
                <Card.Body className="text-center">
                  <Card.Title>{details.nickname}</Card.Title>
                  <Card.Text>
                    {details.name} {details.surname}
                  </Card.Text>

                  <>
                    <div className="d-flex flex-column mt-4">
                      <div>
                        <h1
                          className="text-uppercase
                      "
                        >
                          pubblicazioni:
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
                              <i className="bi bi-caret-up-fill ms-2"></i>
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
                  </>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          /* </Container> */
        );
      case "post":
        return (
          <Row className="justify-content-center align-items-center flex-column ">
            <Col sm={4}>
              <Card className="bk-glass">
                <Card.Img variant="top" src={details.urlContent} />
                <Card.Body className="py-0 mt-2 px-3">
                  <Button
                    className="bg-transparent border-0 rounded-5 bot mb-2 bot-chat"
                    onClick={() => handleCommentClick(details.id)}
                  >
                    {clickedPostId === details.id ? (
                      <i className="bi bi-chat-fill text-info i-info"></i>
                    ) : (
                      <i className="bi bi-chat i-info"></i>
                    )}
                  </Button>
                  <Card.Title className="d-flex flex-row justify-content-between ">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <img
                        src={details.author?.profileImage}
                        alt="author"
                        className="profile_img_comm rounded-circle "
                      />
                      <p className="pe-3 fw-bold m-0 ms-2">
                        {details.author?.nickname}
                      </p>
                      <p className="m-0">{details.text}</p>
                    </div>
                  </Card.Title>

                  {visibleComments[details.id] && (
                    <>
                      <InputGroup
                        className="mb-3 w-100 pt-2"
                        // controlId={`formCommentText_${details.id}`}
                      >
                        <Form.Control
                          className="border-0 bg-light"
                          placeholder="Inserisci commento"
                          type="text"
                          value={newComment[details.id]?.text || ""}
                          onChange={(e) =>
                            handleCommentInputChange(details.id, e.target.value)
                          }
                        />
                        <InputGroup.Text className="p-0">
                          <Button
                            className="rounded-start-0"
                            variant="primary"
                            onClick={() => handleCreateComment(details.id)}
                          >
                            <i className="bi bi-send"></i>
                          </Button>
                        </InputGroup.Text>
                      </InputGroup>
                    </>
                  )}
                  {commentsData[details.id] &&
                    commentsData[details.id].length > 0 && (
                      <>
                        {commentsData[details.id].map((comment) => (
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

                            {/* {comment.author.id === login.user.user_id && (
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
                                  )} */}
                          </div>
                        ))}
                      </>
                    )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        );
      case "ticket":
        return (
          <Card>
            <Card.Body>
              <Card.Title>Ticket</Card.Title>
              <Card.Text>{details.title}</Card.Text>
            </Card.Body>
          </Card>
        );
      case "comment":
        return (
          <Card>
            <Card.Body>
              <Card.Title>Comment</Card.Title>
              <Card.Text>{details.text}</Card.Text>
            </Card.Body>
          </Card>
        );
      default:
        return null;
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
    <Container fluid className="container m-0 ">
      <>{renderDetails()}</>

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

                      <Card.Text className="text-end custom-fs-6">
                        {post.postCreationDate}
                      </Card.Text>
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
                  <Card.Text className="text-end custom-fs-6">
                    {ticket.ticketCreationDate}
                  </Card.Text>
                  <Card.Text className="text-end"></Card.Text>
                  <div className="d-flex justify-content-between ">
                    <Button
                      className="bg-transparent border-0 text-secondary custom-fs-5"
                      onClick={() => handleShowPostsTicket(ticket.id)}
                    >
                      ...visualiza post
                      <i className="ms-2 bi bi-box-arrow-up-right"></i>
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
                <Card.Body>
                  <Card.Title>{post.text}</Card.Title>

                  <Card.Text className="custom-fs-6">
                    {post.postCreationDate}
                  </Card.Text>
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
                  className="d-flex justify-content-center pb-3"
                >
                  <Card className="w-100">
                    <Card.Body>
                      <Card.Text className="custom-fs-6">
                        Post: {comment.post.text}
                      </Card.Text>
                      <Card.Title className="d-flex justify-content-between">
                        {comment.text}
                        <div className="custom-fs-5">
                          <img
                            src={comment.author.profileImage}
                            alt="author"
                            className="profile_img_comm rounded-circle me-2"
                          />
                          {comment.author.nickname}
                        </div>
                      </Card.Title>
                      <Card.Text></Card.Text>
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
    </Container>
  );
};

export default DetailPage;
