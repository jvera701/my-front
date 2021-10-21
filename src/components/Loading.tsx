import { Spinner } from "react-bootstrap";

function Loading() {
    return <Spinner animation="border" role="status">
        <span>Loading...</span>
    </Spinner>
}

export default Loading;