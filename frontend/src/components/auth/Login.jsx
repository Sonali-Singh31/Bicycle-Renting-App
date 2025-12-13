import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { login,getUserProfile } from "../../api/index.js";
import Cookies from "js-cookie";
import toast from "react-hot-toast";



const successNotify = (message) => toast.success(message);
const errorNotify = (message) => toast.error(message);

const Login = ({ setIsAuthenticated, setUserType }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    usertype: "user", // default user
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    console.log("Login form submit:", formData);

    const response = await login(formData); // returns response.data
    console.log("Backend response:", response);

    if (response.success || response.message === "Login successful") {
  setIsAuthenticated(true);

  // Store token first
  Cookies.set("token", response.token, { expires: 7, path: "/" });

  // 🔑 Fetch user profile with token
  const profile = await getUserProfile();

  Cookies.set("usertype", profile.data.usertype, { expires: 7, path: "/" });
  Cookies.set("user", profile.data.username, { expires: 7 });

  setUserType(profile.data.usertype);
  successNotify("Login successful");
  navigate("/profile");
}
else {
      errorNotify(response?.message || "Invalid username or password");
    }

  } catch (error) {
    console.error("Login error:", error);
    errorNotify(error?.message || "Login failed");
  }
};


  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="mt-4 shadow">
            <Card.Body>
              <h1 className="text-center mb-4">Login</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>User Type</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="User"
                      name="usertype"
                      id="usertype-user"
                      value="user"
                      checked={formData.usertype === "user"}
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Admin"
                      name="usertype"
                      id="usertype-admin"
                      value="admin"
                      checked={formData.usertype === "admin"}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>

                <Button className="mt-3" variant="primary" type="submit">
                  Login
                </Button>
              </Form>

              <div className="mt-2">
                Don&apos;t have an account? <Link to="/register">Create a new account</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
