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
import { useContext } from 'react';
/***/

/* Styles */
import './App.scss';
/***/

/* Pages */
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Ranking from './pages/ranking/Ranking';
import Profile from './pages/profile/Profile';
/***/

/* Components */
import MessagePopup from './components/message-popup/MessagePopup';
import Navbar from './components/navbar/Navbar';
/***/

/* Context */
import LoggedContext from './contexts/LoggedContext';
/***/

/* Guards */
import LoggedUserGuard from './guards/LoggedUserGuard';
/***/

function App() {
  const logged = useContext(LoggedContext);

  return (
    <div className="App">
      <BrowserRouter>
        {(logged && logged.user) && <Navbar />}

        <Routes>
          <Route path="/" element={
            <LoggedUserGuard>
              <Ranking />
            </LoggedUserGuard>
          }/>

          <Route path="/profile" element={
            <LoggedUserGuard>
              <Profile />
            </LoggedUserGuard>
          }/>


          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<div>Not found</div>} /> {/* Tmp: need to create not found page */}
        </Routes>
      </BrowserRouter>

      <MessagePopup />
    </div>
  );
}

export default App;
