import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { insertUser } from "../../graphql/mutation";
import "./Style/RegistrationPage.css";

function RegistrationFrom() {
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [saveUser] = useMutation(insertUser);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const { data } = await saveUser({
        variables: {
          userDetails: {
            username: username,
            email: email,
            password: password,
            profilePicture: profilePic,
            location: location,
            createdAt: "",
          },
        },
      });
      console.log("User Registered successfully:", data.registerUser);
      navigate("/login");
    } else {
      console.log("Password and confirm password not matching.");
    }
  };

  return (
    <>
      <Container>
        <Row className='justify-content-md-center mt-5'>
          <Col md={6}>
            <h2 className='text-center'>Registration</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Label>Profile Picture</Form.Label>
              {/* Profile Picture Input */}
              <Form.Group className='mb-3'>
                <label
                  htmlFor='profilePic'
                  className='rounded-circle profile-pic-container'>
                  {profilePic ? (
                    <img
                      src={URL.createObjectURL(profilePic)}
                      alt='Profile'
                      className='rounded-circle profile-pic'
                    />
                  ) : (
                    <span className='profile-pic-button'>Upload</span>
                  )}
                  <input
                    type='file'
                    accept='image/*'
                    id='profilePic'
                    className='visually-hidden'
                    onChange={handleProfilePicChange}
                  />
                </label>
              </Form.Group>

              {/* Username Input */}
              <Form.Group className='mb-3'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              {/* Email Input */}
              <Form.Group className='mb-3'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              {/* Password Input */}
              <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              {/* Confirm Password Input */}
              <Form.Group className='mb-3'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              {/* Location Input */}
              <Form.Group className='mb-3'>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter location'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>

              <Button
                variant='primary'
                type='submit'>
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RegistrationFrom;
