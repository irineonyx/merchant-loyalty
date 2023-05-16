import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import RedeemComplete from './RedeemComplete';
import RedeemExpired from './RedeemExpired';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route exact path="/">
            <Route index element={<Home />} />
            <Route path="complete" element={<RedeemComplete />} />
            <Route path="expired" element={<RedeemExpired />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
