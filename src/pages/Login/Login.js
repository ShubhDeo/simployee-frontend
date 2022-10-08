import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Alert, Row, Col } from "react-bootstrap";
import LeftSide from "../../Components/LeftSide";
import RightSide from "../../Components/RightSide";

function App() {
  return (
    <div className="login" style={{ overflowStyle: 'none'}}>
      <Row className="landing">
        <Col>
          <LeftSide />
        </Col>

        <Col>
          <RightSide />
        </Col>
      </Row>
    </div>
  );
}

export default App;
