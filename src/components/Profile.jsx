import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  commentXUser,
  getUserById,
  postXUser,
  ticketXUser,
  uploadProfileImage,
} from "../redux/action";
import { useEffect, useState } from "react";
import "../Profile.css";

const Profile = () => {
  const login = useSelector((state) => state.login.userData);
  const tickets = useSelector((state) => state.tickets.tickets);
  const posts = useSelector((state) => state.post.posts);
  const comments = useSelector((state) => state.comment.comments);
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showTickets, setShowTickets] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleToggleTickets = () => {
    setShowTickets(!showTickets);
  };

  const handleTogglePosts = () => {
    setShowPosts(!showPosts);
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleProfileImageUpdate = async () => {
    setLoading(true);
    try {
      await dispatch(
        uploadProfileImage(login.user.user_id, login.authorization, {
          profileImage: profileImageUrl,
        })
      );
      setProfileImageUrl("");
    } catch (error) {
      console.error("Error uploading profile image:", error);
    } finally {
      setLoading(false);
      dispatch(getUserById(login.user.user_id, login.authorization));
    }
  };

  const handleImageUrlChange = (e) => {
    const imageUrl = e.target.value;
    if (imageUrl.length <= 255) {
      setProfileImageUrl(imageUrl);
      setErrorMessage("");
    } else {
      setErrorMessage("Errore: l'URL inserito è troppo lungo");
    }
  };

  useEffect(() => {
    if (login) {
      dispatch(getUserById(login.user.user_id, login.authorization));
      dispatch(ticketXUser(login.user.user_id, login.authorization));
      dispatch(postXUser(login.user.user_id, login.authorization));
      dispatch(commentXUser(login.user.user_id, login.authorization));
    }
  }, [dispatch, login]);

  if (!login || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container fluid className="container-profile pb-5">
        <Row className="w-100 justify-content-center align-items-center">
          <Col xs={12} md={6} lg={6} className="d-flex justify-content-center ">
            <Card className="profile-card">
              <Card.Img
                variant="top"
                src={user.profileImage}
                className="card-img"
              />
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>{user.surname}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={6}>
            <Form.Label>Change profile image with image-url:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image URL"
              value={profileImageUrl}
              onChange={handleImageUrlChange}
              isInvalid={errorMessage !== ""}
            />
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <Button onClick={handleProfileImageUpdate} disabled={loading}>
              Upload
            </Button>
          </Col>
        </Row>
        <Row className="flex-row g-3 mt-3">
          <h1 className="d-flex justify-content-center">
            Tickets
            <Button
              onClick={handleToggleTickets}
              className="bg-transparent border-0 d-flex align-items-center"
            >
              {showTickets ? (
                <i className="bi bi-caret-up-fill"></i>
              ) : (
                <i className="bi bi-caret-down-fill"></i>
              )}
            </Button>
          </h1>

          {showTickets && (
            <>
              {tickets.map((ticket) => (
                <Col className="d-flex justify-content-center" key={ticket.id}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>{ticket.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Card Subtitle
                      </Card.Subtitle>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Card.Link href="#">Card Link</Card.Link>
                      <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </>
          )}
        </Row>
        <Row className="flex-row g-3 mt-3">
          <h1 className="d-flex justify-content-center">
            Posts
            <Button
              onClick={handleTogglePosts}
              className="bg-transparent border-0 d-flex align-items-center"
            >
              {showPosts ? (
                <i className="bi bi-caret-up-fill"></i>
              ) : (
                <i className="bi bi-caret-down-fill"></i>
              )}
            </Button>
          </h1>
          {showPosts && (
            <>
              {posts.map((post) => (
                <Col className="d-flex justify-content-center align-items-center">
                  <Card style={{ width: "18rem" }} key={post.id}>
                    {post.urlContent == "" ? (
                      ""
                    ) : (
                      <Card.Img variant="top" src={post.urlContent} />
                    )}
                    {/* <Card.Img variant="top" src={post.urlContent} /> */}
                    <Card.Body>
                      <Card.Title>{post.author.nickname}</Card.Title>
                      <Card.Text>{post.text}</Card.Text>
                      <Card.Text>{post.postCreationDate}</Card.Text>
                      <Card.Link href="#">Card Link</Card.Link>
                      <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </>
          )}
        </Row>
        <Row className="flex-row g-3 mt-3">
          <h1 className="d-flex justify-content-center">
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
        </Row>
      </Container>
    </>
  );
};

export default Profile;
