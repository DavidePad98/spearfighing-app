import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { allTicketAction } from "../redux/action";
import "../Ticket.css";

const Ticket = () => {
  const tickets = useSelector((state) => state.allTickets.tickets.content);
  const login = useSelector((state) => state.login.userData);

  const dispatch = useDispatch();

  useEffect(() => {
    if (login) {
      dispatch(allTicketAction(login.authorization));
    }
  }, [dispatch, login]);

  if (!login) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            {tickets &&
              tickets.map((ticket, i) => (
                <Col key={i}>
                  <div>
                    <h1>{ticket.title}</h1>
                    <p>{ticket.description}</p>
                  </div>
                </Col>
              ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Ticket;
