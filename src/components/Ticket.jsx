import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  allTicketAction,
  postCommentsAction,
  postsByTicketAction,
} from "../redux/action";
import "../Ticket.css";
import { Link } from "react-router-dom";

const Ticket = () => {
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const tickets = useSelector((state) => state.allTickets.tickets.content);
  const login = useSelector((state) => state.login.userData);
  const posts = useSelector((state) => state.postXticket.ticket_posts);
  const loading = useSelector((state) => state.postXticket.loading);
  const comments = useSelector((state) => state.commentXpost.post_comments);

  const dispatch = useDispatch();

  useEffect(() => {
    if (login) {
      dispatch(allTicketAction(login.authorization));
    }
  }, [dispatch, login]);

  const handleTicketClick = (ticketId) => {
    setSelectedTicketId(ticketId);
    dispatch(postsByTicketAction(ticketId, login.authorization));
  };

  const handleCommentClick = (postId) => {
    dispatch(postCommentsAction(postId, login.authorization));
  };

  if (!login) {
    return (
      <>
        {/* <div className="d-flex justify-content-center align-items-center vh-100 bk">
          <Spinner animation="border" variant="light" />
        </div> */}
        <div className="bk vh-100 d-flex justify-content-center align-items-center flex-column ">
          <div className=" text-center bk-glass p-5 text-dark g">
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
      </>
    );
  }

  return (
    <>
      <Container fluid className="ticket-container">
        <Row>
          <Col md={5}>
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
                      <p className="m-0 pe-2">@{ticket.user_id.nickname}</p>
                      <img
                        src={ticket.user_id.profileImage}
                        alt="author"
                        className="profile_img rounded-circle"
                      />
                    </Col>
                  </Row>
                </Col>
              ))}
          </Col>
          <Col md={7}>
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
                    <Card.Body>
                      <Card.Title className="d-flex flex-row">
                        <p className="pe-3 fw-bold ">{post.author.nickname}</p>
                        <p>{post.text}</p>
                        {/* <img
                          src={post.author.profileImage}
                          alt="author"
                          className="profile_img rounded-circle"
                        /> */}
                      </Card.Title>
                      <Card.Text></Card.Text>
                      {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                  </Card>
                  <Button onClick={() => handleCommentClick(post.id)}>
                    mostra commenti
                  </Button>
                  {comments.map((comment, i) => {
                    if (post.id === comment.post.id) {
                      return (
                        <div key={i} className="d-flex flex-column">
                          <p>{comment.text}</p>
                        </div>
                      );
                    }
                  })}
                </Col>
              ))
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Ticket;
