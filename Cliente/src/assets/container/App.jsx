import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import InicioSesion from '../pages/InicioSesion';
import Registro from '../pages/Registro';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InicioSesion/>} />
          <Route path="/registro" element={<Registro/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
