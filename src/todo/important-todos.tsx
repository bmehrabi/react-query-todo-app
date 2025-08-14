import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {API} from "../constants/api";
import React from "react";
import {TodoType} from "../models/Todo";
import {REACT_QUERY_KEYS} from "../react-query/client";
import LoadingComponent from "./loading";
import ErrorBoxComponent from "./errorBox";

const ImportantTodos = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: [REACT_QUERY_KEYS.TODO_KEY],
        queryFn: () => axios(`${API}`).then((res) => res.data),
    });

    if (isLoading) return <LoadingComponent />;

    if (isError) return <ErrorBoxComponent />;

    const importantTodos = data.filter((item: TodoType) => item.isImportant);

    return (
        <>
            You will have {importantTodos.length} to do!!!
        </>
    )
};

export default ImportantTodos;