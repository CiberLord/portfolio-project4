import './css/App.css';

import TypingSimulator from './components/TypingSimulator';
import Header from './components/Header';
import Info from './components/Info';
import { BrowserRouter, Route, IndexRedirect } from 'react-router-dom'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Route exact path="/home" component={TypingSimulator} />
        <Route exact path="/info" component={Info} />
      </BrowserRouter>
    </div>
  );
}

export default App;
