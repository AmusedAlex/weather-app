import { Col, Container, Row } from "react-bootstrap";
import "./App.css";

import Home from "./components/Home";

function App() {
  return (
    <div className="App bg-dark text-white">
      <Container>
        <Row className="">
          <Col className="contentCol d-flex justify-content-center align-items-center">
            <Home />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
