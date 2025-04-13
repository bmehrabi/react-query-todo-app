import {Button, Container, Form} from "react-bootstrap";
import {FormEvent, useState} from "react";
import {TodoType} from "../models/Todo";
import axios from "axios";
import {API} from "../constants/api";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "../react-query/client";

const CreatePage = () => {
    const [todo, setTodo] = useState<TodoType>({
        title: '',
        isImportant: false,
        hasDone: false,
    });

    const setTitle = (title: string) => {
        setTodo({
            ...todo,
            title,
        });
    };

    const setIsImportant = (isImportant: boolean) => {
        setTodo({
            ...todo,
            isImportant,
        });
    };


    const setHasDone = (hasDone: boolean) => {
        setTodo({
            ...todo,
            hasDone,
        });
    };

    const createTodoMutation = useMutation({
       mutationFn: (todo: TodoType) => axios.post(`${API}`, {
           title: todo.title,
           hasDone: todo.hasDone,
           isImportant: todo.isImportant,
       }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['todos']});
        }
    });

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        createTodoMutation.mutate(todo);
    }

    return (
        <Container className="gap-3 p-3">
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control onChange={(event) => setTitle(event.target.value) } type="text" placeholder="Enter title" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="isImportant">
                    <Form.Check onChange={(event) => setIsImportant(event.target.checked)} type="checkbox" label="Is Important?" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="hasDone">
                    <Form.Check onChange={(event) => setHasDone(event.target.checked)} type="checkbox" label="Has done?" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create Todo
                </Button>
            </Form>
        </Container>
    )
};

export default CreatePage;