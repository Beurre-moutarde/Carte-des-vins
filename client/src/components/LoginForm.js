import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

import "../index.css"; // Import the CSS file

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // declaring loginUser with useMutation
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) setShowAlert(true);
    else setShowAlert(false);
  }, [error])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    // use loginUser function
    try {
      const { data } = await loginUser({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="login-form-container">
      <h2 className="login-form-title">Welcome Back!</h2>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
          className="login-form-alert"
        >
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
            className="login-form-input"
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
            className="login-form-input"
          />
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="primary"
          className="login-form-button"
        >
          Login
        </Button>
      </Form>
      <p className="login-form-register">
        Don't have an account? <a href="#SignupForm">Signup</a>
      </p>
    </div>
  );
};

export default LoginForm;