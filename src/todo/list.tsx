import {Container, Form, Table} from "react-bootstrap";
import {TodoType} from "../models/Todo";

type ListPagePropsType = {
    todos: TodoType[];
}

const ListPage = ({todos}: ListPagePropsType) => {
    return (
        <Container className="gap-3 p-3">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Description</th>
                    <th>Has done?</th>
                </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => {
                        return (
                            <tr>
                                <td>{todo.id}</td>
                                <td>{todo.title}</td>
                                <td>
                                    <Form.Check type="checkbox" checked={todo.hasDone}>
                                    </Form.Check>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    )
};

export default ListPage;