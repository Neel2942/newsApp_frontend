import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../graphql/mutation";
import "./Style/RegistrationPage.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userLogin] = useMutation(loginUser);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await userLogin({
      variables: {
        userCred: {
          email: email,
          password: password,
        },
      },
    });
    if (data.loginUser) {
      if(data.loginUser.email === "admin@gmail.com"){
        sessionStorage.setItem("loggedIn",true);
        navigate("/backyard")
      }else{
        sessionStorage.setItem("loggedIn",true);
        navigate("/")
      }
    } else {
      console.log("User already exit or wrong credentials");
    }
  };

  return (
    <>
      <Container>
        <Row className='justify-content-md-center mt-5'>
          <Col md={6}>
            <h2 className='text-center'>Login</h2>
            <Form onSubmit={handleSubmit}>
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

              <Button
                variant='primary'
                type='submit'>
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
