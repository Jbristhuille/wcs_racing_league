/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-12-22 09:34:00
 * @ Description: Main app component
 */

/* SUMMARY
  * Imports
  * Styles
  * Pages
  * Components
*/

/* Imports */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
/***/

/* Styles */
import './App.scss';
/***/

/* Pages */
import Login from './pages/login/Login';
/***/

/* Components */
/***/

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Hello world</div>} /> {/* Tmp: need to create home page */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
