import {Button, Form, Modal} from "react-bootstrap";
import {Dispatch, FormEvent, SetStateAction} from "react";
import {TodoType} from "../models/Todo";
import axios from "axios";
import {API} from "../constants/api";
import {useMutation} from "@tanstack/react-query";
import ErrorBoxComponent from "./errorBox";
import {queryClient, REACT_QUERY_KEYS} from "../react-query/client";

type EditModalProps = {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    todoForEdit: TodoType;
    setTodoForEdit: Dispatch<SetStateAction<TodoType>>;
}

const EditModal = ({show, setShow, todoForEdit, setTodoForEdit}: EditModalProps) => {
    const setTitle = (title: string) => {
        setTodoForEdit({
            ...todoForEdit,
            title,
        });
    };

    const setIsImportant = (isImportant: boolean) => {
        setTodoForEdit({
            ...todoForEdit,
            isImportant,
        });
    };


    const setHasDone = (hasDone: boolean) => {
        setTodoForEdit({
            ...todoForEdit,
            hasDone,
        });
    };

    const editTodoMutation = useMutation({
       mutationFn: () => axios.put(`${API}/${todoForEdit.id}`, {
           title: todoForEdit.title,
           hasDone: todoForEdit.hasDone,
           isImportant: todoForEdit.isImportant,
       }),
        onSuccess: async () => {
           setShow(false);
            await queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.TODO_KEY]});
        }
    });

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        editTodoMutation.mutate();
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit ToDo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control value={todoForEdit.title} onChange={(event) => setTitle(event.target.value) } type="text" placeholder="Enter title" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="isImportant">
                        <Form.Check checked={todoForEdit.isImportant} onChange={(event) => setIsImportant(event.target.checked)} type="checkbox" label="Is Important?" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="hasDone">
                        <Form.Check checked={todoForEdit.hasDone} onChange={(event) => setHasDone(event.target.checked)} type="checkbox" label="Has done?" />
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={editTodoMutation.isPending}>
                        Edit ToDo
                    </Button>
                    {editTodoMutation.isError && (<ErrorBoxComponent />)}
                </Form>
            </Modal.Body>
        </Modal>
    )
};

export default EditModal;