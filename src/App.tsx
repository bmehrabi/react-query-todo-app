import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import List from "./todo/list";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./header/header";
import CreatePage from "./todo/create";
import {TodoType} from "./models/Todo";

function App() {
    const todos: TodoType[] = [
        {id: 1, title: 'firstTodo', isImportant: true, hasDone: false},
        {id: 2, title: 'secondTodo', isImportant: false, hasDone: false},
    ]
  return (
      <BrowserRouter>
          <Header />
          <Routes>
              <Route path="/" element={<List todos={todos} />} />
              <Route path="/create" element={<CreatePage />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
