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
  * Guards
*/

/* Imports */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
/***/

/* Styles */
import './App.scss';
/***/

/* Pages */
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
/***/

/* Components */
import ErrorPopup from './components/error-popup/ErrorPopup';
/***/

/* Context providers */
import { ErrorContextProvider } from './contexts/ErrorContext';
import { LoggedContextProvider } from './contexts/LoggedContext';
/***/

/* Guards */
import LoggedUserGuard from './guards/LoggedUserGuard';
/***/

function App() {
  return (
    <div className="App">
      <LoggedContextProvider>
        <ErrorContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <LoggedUserGuard>
                  <div>Hello world</div>  {/* Tmp: need to create home page*/}
                </LoggedUserGuard>
              }/>

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<div>Not found</div>} /> {/* Tmp: need to create not found page */}
            </Routes>
          </BrowserRouter>

          <ErrorPopup />
        </ErrorContextProvider>
      </LoggedContextProvider>
    </div>
  );
}

export default App;
