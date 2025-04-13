import CreatePage from "./todo/create";
import ListPage from "./todo/list";
import {Col, Container, Row} from "react-bootstrap";
import Progress from "./todo/progress";

const HomePage = () => {
    return (
        <Container className="gap-3 p-3">
            <Row>
                <Col>
                    <CreatePage></CreatePage>
                </Col>
                <Col>
                    <Progress />
                </Col>
            </Row>
            <ListPage></ListPage>
        </Container>
    )
}

export default HomePage;