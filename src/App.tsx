import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import List from "./todo/list";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./header/header";
import CreatePage from "./todo/create";
import {QueryClientProvider} from "@tanstack/react-query";
import HomePage from "./HomePage";
import {queryClient} from "./react-query/client";

function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <BrowserRouter>
              <Header />
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/list" element={<List />} />
                  <Route path="/create" element={<CreatePage />} />
              </Routes>
          </BrowserRouter>
      </QueryClientProvider>
  );
}

export default App;
