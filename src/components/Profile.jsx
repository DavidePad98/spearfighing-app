import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector(
    (state) => state.login.userData && state.login.userData.user
  );
  if (!user) {
    return <div>Loading...</div>; // Oppure puoi restituire un altro componente di caricamento
  }

  return (
    <Container fluid className="profile-container">
      <Row>
        <Col></Col>
      </Row>
    </Container>
    // <Card style={{ width: "18rem" }}>
    //   <Card.Img variant="top" src={user.profileImage} />
    //   <Card.Body>
    //     <Card.Title>{user.name}</Card.Title>
    //     <Card.Text>{user.surname}</Card.Text>
    //     <Button variant="primary">Go somewhere</Button>
    //   </Card.Body>
    // </Card>
  );
};
export default Profile;
