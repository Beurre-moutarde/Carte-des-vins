import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [createUser, { error }] = useMutation(CREATE_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const { data } = await createUser({
          variables: { ...userFormData },
        });
        Auth.login(data.createUser.token);
      } catch (e) {
        console.error(e);
      }

      setUserFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
    }

    setValidated(true);
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
          <Button
            onClick={() => setShowAlert(false)}
            className="ml-2 mr-2"
            variant="outline-danger"
            size="sm"
          >
           X
          </Button>
        </Alert>

        <Form.Group style={{marginBottom: "1rem"}}>
          <Form.Label htmlFor="firstname">First Name</Form.Label>
          <Form.Control
            className="ml-5"
            type="text"
            placeholder="Your first name"
            name="firstname"
            onChange={handleInputChange}
            value={userFormData.firstname}
            required
          />
          <Form.Control.Feedback type="invalid">
            {validated && userFormData.firstname.length === 0 ? "First name is required!" : ""}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group style={{marginBottom: "1rem"}}>
          <Form.Label htmlFor="lastname">Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your last name"
            name="lastname"
            onChange={handleInputChange}
            value={userFormData.lastname}
            required
          />
          <Form.Control.Feedback type="invalid">
            {validated && userFormData.lastname.length === 0 ? "Last name is required!" : ""}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group style={{marginBottom: "1rem"}}>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            {validated && !userFormData.email && "Email is required!"}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group style={{marginBottom: "1rem"}}>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            {validated && !userFormData.password && "Password is required!"}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={
            !(
              userFormData.firstname &&
              userFormData.lastname &&
              userFormData.email &&
              userFormData.password
            )
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
