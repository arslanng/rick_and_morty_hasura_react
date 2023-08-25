import { Route, Routes } from "react-router-dom";
import { Row, Col } from "antd";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <Row>
      <Col span={20} offset={1}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Col>
    </Row>
  );
}

export default App;
