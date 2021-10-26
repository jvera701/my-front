import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import '../assets/styles/login.css';
import {useState, MouseEvent, ChangeEvent  } from "react";
import React from 'react';
import { useDispatch } from "react-redux";
import { loginAxios } from "../store/actionCreators";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [invalidLogin, setInvalidLogin] = useState(false)
  const dispatch = useDispatch();

  function updateLogin(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setUsername(e.target.value);
  }

  function updatePassword(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  async function login(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setInvalidLogin(false)
    username === "" ? setLoginError(true) : setLoginError(false)
    password === "" ? setPasswordError(true) : setPasswordError(false)
    if (username !== "" && password !== "")
      dispatch( loginAxios (username, password, setInvalidLogin));
  }
  


  return <Container >
      <Form >
          <h1 className="title-login"> Welcome to Educas </h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label column= "lg" className="login-text"> Email </Form.Label>
        <Form.Control className="login-form" onChange={updateLogin} />
        { loginError
            ? <div className="alert alert-danger mt-2">Username is a required field.</div>
            : ''
        }
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label column="lg" className="login-text">Password</Form.Label>
        <Form.Control type="password" onChange={updatePassword} />
          { passwordError
            ? <div className="alert alert-danger mt-2">Password is a required field.</div>
            : ''
          }
        </Form.Group>
      <Link to="/home">
        <Button variant="login-btn" size="lg" type="submit" onClick={login}>
            Login
        </Button>
      </Link> {' '}
      <Button variant="login-btn" size="lg" type="submit">
          Forgot password
      </Button>
          { invalidLogin
            ? <div className="alert alert-danger mt-2">Invalid login, please try again</div>
            : ''
          }
      </Form>
    </Container>
}

export default Login