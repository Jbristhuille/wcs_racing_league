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
  * Context providers
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
import ErrorPopup from './components/error-popup/ErrorPopup';
/***/

/* Context providers */
import { ErrorContextProvider } from './contexts/ErrorContext';
/***/

function App() {
  return (
    <div className="App">
      <ErrorContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<div>Hello world</div>} /> {/* Tmp: need to create home page */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>

        <ErrorPopup />
      </ErrorContextProvider>
    </div>
  );
}

export default App;
