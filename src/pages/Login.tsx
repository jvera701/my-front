
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Login() {
  return <>
      <h1> Welcome to .... </h1>
      <Form >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> Username </Form.Label>
          <Form.Control type="email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
        </>
}

export default Login