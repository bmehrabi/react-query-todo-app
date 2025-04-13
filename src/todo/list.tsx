import {Container, Form, Table} from "react-bootstrap";
import {TodoType} from "../models/Todo";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {API} from "../constants/api";
import React from "react";

const ListPage = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['todos'],
        queryFn: () => axios(`${API}`).then((res) => res.data),
    });

    if (isLoading) return <p>Loading ...</p>;

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