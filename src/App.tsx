import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import List from "./todo/list";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./header/header";
import CreatePage from "./todo/create";
import {TodoType} from "./models/Todo";
import axios from "axios";

function App() {
    const API = 'http://localhost:8000/todos';
    const [data, setData] = useState<TodoType[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`${API}`);
            setData(result.data);
        };

        fetchData();

    }, [setData, API]);
  return (
      <BrowserRouter>
          <Header />
          <Routes>
              <Route path="/" element={<List todos={data} />} />
              <Route path="/create" element={<CreatePage />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
