import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, ticketXUser, uploadProfileImage } from "../redux/action";
import { useEffect, useState } from "react";

const Profile = () => {
  const user = useSelector((state) => state.login.userData);
  const tickets = useSelector((state) => state.tickets.tickets);
  const dispatch = useDispatch();

  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProfileImageUpdate = async () => {
    setLoading(true);
    try {
      await dispatch(
        uploadProfileImage(user.user.user_id, user.authorization, {
          profileImage: profileImageUrl,
        })
      );
      // Dopo aver completato con successo l'aggiornamento dell'immagine nel backend, possiamo resettare il campo di input
      setProfileImageUrl("");
    } catch (error) {
      console.error("Error uploading profile image:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      dispatch(ticketXUser(user.user.user_id, user.authorization));
    }
  }, [dispatch, user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      fluid
      className="profile-container pt-custom d-flex justify-content-center align-items-center"
    >
      <Row className="g-5 ">
        <Col sm="12" md="6">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={user.user.profileImage}
              // className="rounded-circle"
            />
            <Card.Body>
              <Card.Title>{user.user.name}</Card.Title>
              <Card.Text>{user.user.surname}</Card.Text>
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
              onChange={(e) => setProfileImageUrl(e.target.value)}
            />
            <Button onClick={handleProfileImageUpdate} disabled={loading}>
              aaaa
            </Button>
          </Col>
          <Col>
            {tickets.map((ticket) => (
              <p key={ticket.id}>{ticket.title}</p> // Genera un <p> per ogni ticket
            ))}
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
