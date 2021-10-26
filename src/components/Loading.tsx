import { Spinner } from "react-bootstrap";
import React from 'react';

function Loading() {
    return <Spinner animation="border" role="status">
        <span>Loading...</span>
    </Spinner>
}

export default Loading;