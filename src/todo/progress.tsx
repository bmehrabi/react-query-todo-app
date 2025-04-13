import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {API} from "../constants/api";
import React from "react";
import {TodoType} from "../models/Todo";

const Progress = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['todos'],
        queryFn: () => axios(`${API}`).then((res) => res.data),
    });

    if (isLoading) return <p>Loading ...</p>;

    const finishedTodos = data.filter((item: TodoType) => item.hasDone);

    return (
        <>
            {finishedTodos.length} / {data.length}
        </>
    )
};

export default Progress;