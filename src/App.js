import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Score from './pages/Score';
import './firebase'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/play" component={Game} />
        <Route exact path="/score" component={Score} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
