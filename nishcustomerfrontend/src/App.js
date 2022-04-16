import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MainPanel from './components/MainPanel';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableFooterPanel from './components/TableFooterPanel';
import * as service from './service/FetchCustomerService';
import React, { useEffect, useState } from 'react';
import './style/CustomStyle.css';
import CustomerPage from './Pages/CustomerPage';
import { Route, Routes } from 'react-router-dom';
import FilePage from './Pages/FilePage';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CustomerPage />} />
        <Route path="/file" element={<FilePage />} />
        
      </Routes>
    </div>
  );
}

export default App;
