import React from "react";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Index from "./components/Index.jsx";
import Create from "./components/Create.jsx";
import Details from "./components/Details.jsx";
import Edit from "./components/Edit.jsx";
function App() {
  return (
    <Sidebar>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/user/index" element={<Index />} />
        <Route path="/user/create" element={<Create />} />
        <Route path="/user/detalis/:id" element={<Details />} />
        <Route path="/user/edit/:id" element={<Edit />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Sidebar>
  );
}

export default App;
