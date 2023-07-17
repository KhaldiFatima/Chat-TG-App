import './App.css';
import ChatPage from './Component/ChatPage';
import LoginPage from './Component/LoginPage';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact>
            <LoginPage />
          </Route>
          <Route path='/chatpage' exact>
            <ChatPage />
          </Route>
        </Switch>
        <footer className='footer-container'>
          Fifth project with :<strong>TG Academy</strong>
        </footer>
      </Router>
    </>
  );
}

export default App;
