import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import RedeemComplete from './RedeemComplete';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route exact path="/">
            <Route index element={<Home />} />
            <Route path="complete" element={<RedeemComplete />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
