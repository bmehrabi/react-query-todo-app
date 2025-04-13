import CreatePage from "./todo/create";
import ListPage from "./todo/list";
import {Col, Container, Row} from "react-bootstrap";
import Progress from "./todo/progress";
import ImportantTodos from "./todo/important-todos";

const HomePage = () => {
    return (
        <Container className="gap-3 p-3">
            <Row>
                <Col>
                    <CreatePage></CreatePage>
                </Col>
                <Col>
                    <Progress />
                    <br/>
                    <ImportantTodos />
                </Col>
            </Row>
            <ListPage></ListPage>
        </Container>
    )
}

export default HomePage;