import {Container, Form, Table} from "react-bootstrap";
import {TodoType} from "../models/Todo";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {API} from "../constants/api";
import React from "react";
import {REACT_QUERY_KEYS} from "../react-query/client";
import LoadingComponent from "./loading";
import ErrorBoxComponent from "./errorBox";

const ListPage = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: [REACT_QUERY_KEYS.TODO_KEY],
        queryFn: () => axios(`${API}`).then((res) => res.data),
    });

    if (isLoading) return <LoadingComponent />;

    if (isError) return <ErrorBoxComponent />;

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
                    {data.map((todo: TodoType) => {
                        return (
                            <tr key={todo.id}>
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