
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import '../assets/styles/login.css';
import {useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false)
  const [loginError, setLoginError] = useState(false)

  function updateLogin(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setUsername(e.target.value);
  }

  function updatePassword(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  function login(e: any) {
    e.preventDefault();
    if (username === "") setLoginError(true)
    else setLoginError(false)
    if (password === "") setPasswordError(true)
    else setPasswordError(false)
  }


  return <Container >
      <Form >
          <h1 className="title-login"> Welcome to Educas </h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label column= "lg" className="login-text"> Username </Form.Label>
        <Form.Control className="login-form" onChange={updateLogin} />
        { loginError
            ? <div className="alert alert-danger">Login is a required field.</div>
            : ''
        }
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label column="lg" className="login-text">Password</Form.Label>
        <Form.Control type="password" onChange={updatePassword} />
          { passwordError
            ? <div className="alert alert-danger">Password is a required field.</div>
            : ''
          }
        </Form.Group>
      <Button variant="login-btn" size="lg" type="submit" onClick={(e) => login(e) }>
          Login
      </Button> {' '}
      <Button variant="login-btn" size="lg" type="submit">
          Forgot password
      </Button>
      </Form>
    </Container>
}

export default Login