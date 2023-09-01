import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StockListPage, StockDetailPage } from './pages';

const App: React.FC = () => {
   return (
      <Router>
         <Routes>
            <Route path='/' element={<StockListPage />} />

            <Route path='/stock/:symbol/:exchange' element={<StockDetailPage />} />
         </Routes>
      </Router>
   );
};

export default App;
