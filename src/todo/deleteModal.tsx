import {Button, Modal} from "react-bootstrap";
import {Dispatch, FormEvent, SetStateAction} from "react";
import {TodoType} from "../models/Todo";
import axios from "axios";
import {API} from "../constants/api";
import {useMutation} from "@tanstack/react-query";
import ErrorBoxComponent from "./errorBox";
import {queryClient, REACT_QUERY_KEYS} from "../react-query/client";

type DeleteModalProps = {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    todoForDelete: TodoType;
    setTodoForDelete: Dispatch<SetStateAction<TodoType>>;
}

const DeleteModal = ({show, setShow, todoForDelete, setTodoForDelete}: DeleteModalProps) => {
    const deleteTodoMutation = useMutation({
       mutationFn: () => axios.delete(`${API}/${todoForDelete.id}`),
        onSuccess: async () => {
           setShow(false);
           await queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.TODO_KEY]});
        }
    });

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        deleteTodoMutation.mutate();
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Delete ToDo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this ToDo?
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onSubmit} variant="primary" type="submit" disabled={deleteTodoMutation.isPending}>
                    Confirm Delete
                </Button>
                <Button onClick={() => setShow(false)} variant="secondary" type="submit" disabled={deleteTodoMutation.isPending}>
                    Cancel
                </Button>
                {deleteTodoMutation.isError && (<ErrorBoxComponent />)}
            </Modal.Footer>
        </Modal>
    )
};

export default DeleteModal;