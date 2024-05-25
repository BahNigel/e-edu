import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import IndexPage from './components/Boddy/Index';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/index" element={<IndexPage />} />
      <Route path="*" element={<Navigate to="/index" replace />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
