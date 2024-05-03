import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/action";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nicknameOrEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await dispatch(loginUser(formData));
    console.log(response);
    console.log(formData);

    if (response && response.success) {
      navigate("/");
    } else {
      console.error("Login fallito");
    }
  };

  return (
    <Container
      fluid
      className="page-height d-flex align-items-center justify-content-center "
    >
      <Row>
        <Col className="form-login rounded-5 p-5 ">
          {/* <Form onSubmit={handleSubmit} className="d-flex flex-column">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-bold">Nickname or Email</Form.Label>
              <Form.Control
                required
                type="text"
                name="nicknameOrEmail"
                value={formData.nicknameOrEmail}
                onChange={handleChange}
                placeholder="Nickname o Email"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </Form.Group>
            <Button type="submit" className="fw-bold">
              Login
            </Button>
            <Link>or Create an Account</Link>
          </Form> */}
          <Form className="d-flex flex-column">
            <Form.Group>
              <Form.Label className="fw-bold">Nickname</Form.Label>
              <Form.Control type="nickname" placeholder="Enter nickname" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Name</Form.Label>
              <Form.Control placeholder="1234 Main St" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Surname</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Email</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Form.Group>
              <Form.Label className="fw-bold">City</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" className="fw-bold mt-4">
              Sign up
            </Button>
          </Form>
          {}
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
