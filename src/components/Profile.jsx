import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserById,
  ticketXUser,
  updateUserProperty,
  uploadProfileImage,
} from "../redux/action";
import { useEffect, useState } from "react";

const Profile = () => {
  const login = useSelector((state) => state.login.userData);
  const tickets = useSelector((state) => state.tickets.tickets);
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    }
  }, [dispatch, login]);

  if (!login || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      fluid
      className="profile-container pt-custom d-flex justify-content-center align-items-center"
    >
      <Row className="g-5 ">
        {/* <Col sm="12" md="6">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={user.profileImage}
              // className="rounded-circle"
            />
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>{user.surname}</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col sm="12" md="6" className="bg-white">
          <Col>
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
        </Col> */}
        <Row className="flex-row">
          {" "}
          {tickets.map((ticket) => (
            <Col>
              <Card style={{ width: "18rem" }} key={ticket.id}>
                <Card.Body>
                  <Card.Title>Card Title{ticket.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Card Subtitle
                  </Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Card.Link href="#">Card Link</Card.Link>
                  <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Row>
    </Container>
  );
};

export default Profile;
