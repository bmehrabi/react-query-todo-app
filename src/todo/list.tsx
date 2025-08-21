import {Button, Container, Form, Table} from "react-bootstrap";
import {TodoType} from "../models/Todo";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {API} from "../constants/api";
import React from "react";
import {REACT_QUERY_KEYS} from "../react-query/client";
import LoadingComponent from "./loading";
import ErrorBoxComponent from "./errorBox";
import EditModal from "./editModal";

const ListPage = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: [REACT_QUERY_KEYS.TODO_KEY],
        queryFn: () => axios(`${API}`).then((res) => res.data),
    });
    const [show, setShow] = React.useState(false);
    const [todoForEdit, setTodoForEdit] = React.useState<TodoType>({title: '', isImportant: false, hasDone: false});

    if (isLoading) return <LoadingComponent />;

    if (isError) return <ErrorBoxComponent />;

    const handleEditTodo = (todo: TodoType) => {
        setShow(true);
        setTodoForEdit(todo);
    }

    return (
        <Container className="gap-3 p-3">
            <EditModal show={show} setShow={setShow} todoForEdit={todoForEdit} setTodoForEdit={setTodoForEdit} />
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Description</th>
                    <th>Is Important?</th>
                    <th>Has done?</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                    {data.map((todo: TodoType) => {
                        return (
                            <tr key={todo.id}>
                                <td>{todo.id}</td>
                                <td>{todo.title}</td>
                                <td>
                                    <Form.Check type="checkbox" checked={todo.isImportant} />
                                </td>
                                <td>
                                    <Form.Check type="checkbox" checked={todo.hasDone} />
                                </td>
                                <td>
                                    <Button onClick={() => {handleEditTodo(todo)}}>
                                        Edit ToDo
                                    </Button>
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