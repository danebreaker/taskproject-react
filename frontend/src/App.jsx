import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Layout from './components/Layout';
import Tasks from './components/Tasks';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Tasks />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<Tasks />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
