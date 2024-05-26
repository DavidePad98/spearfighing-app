import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registrationUser } from "../redux/action";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../assets/sass/Login.scss";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nicknameOrEmail: "",
    password: "",
  });

  const [registrationData, setRegistrationData] = useState({
    nickname: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    city: "",
  });

  const [isRegistration, setIsRegistration] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isRegistration) {
      setRegistrationData((prevData) => ({
        ...prevData,
        [name]: value !== undefined ? value : "",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value !== undefined ? value : "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await dispatch(loginUser(formData));

    if (response && response.success) {
      navigate("/");
    } else {
      console.error("Login fallito");
    }
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    const response = await dispatch(registrationUser(registrationData));
    console.log(response);
    console.log(registrationData);

    if (response && response.success) {
      const loginResponse = await dispatch(
        loginUser({
          nicknameOrEmail: registrationData.nickname,
          password: registrationData.password,
        })
      );

      if (loginResponse && loginResponse.success) {
        navigate("/");
      } else {
        console.error("Errore durante il login dopo la registrazione");
      }
    } else {
      console.error("Registrazione fallita");
    }
  };

  const toggleForm = () => {
    setIsRegistration(!isRegistration);
    setFormData({
      nicknameOrEmail: "",
      password: "",
    });
    setRegistrationData({
      nickname: "",
      name: "",
      surname: "",
      email: "",
      password: "",
      city: "",
    });
  };

  return (
    <Container
      fluid
      className="login-page d-flex align-items-center justify-content-center "
    >
      <Row>
        <Col className="form-login rounded-5 p-5 ">
          {isRegistration ? (
            <Form
              onSubmit={handleRegistrationSubmit}
              className="d-flex flex-column"
            >
              <Form.Group>
                <Form.Label className="fw-bold">Nickname</Form.Label>
                <Form.Control
                  type="text"
                  name="nickname"
                  value={registrationData.nickname}
                  onChange={handleChange}
                  placeholder="Enter nickname"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={registrationData.name}
                  onChange={handleChange}
                  placeholder="es. Mario"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Surname</Form.Label>
                <Form.Control
                  type="text"
                  name="surname"
                  value={registrationData.surname}
                  onChange={handleChange}
                  placeholder="es.Rossi"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={registrationData.email}
                  onChange={handleChange}
                  placeholder="mario.rossi@email.com"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={registrationData.password}
                  onChange={handleChange}
                  placeholder="password"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="fw-bold">City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={registrationData.city}
                  onChange={handleChange}
                  placeholder="NewYork"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="fw-bold mt-4">
                Sign up
              </Button>
              <Button variant="link" onClick={toggleForm}>
                I have an account
              </Button>
            </Form>
          ) : (
            <Form onSubmit={handleSubmit} className="d-flex flex-column">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
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

              <Button
                type="submit"
                className="fw-bold text-primary text-black bot"
              >
                Login
              </Button>
              <Button
                onClick={toggleForm}
                className="bg-transparent border-0 bot mt-1"
              >
                or Create an Account
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
