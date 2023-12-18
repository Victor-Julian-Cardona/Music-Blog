import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import './index.css';
import About from './pages/About';
import Home from './pages/Home';
import Next from './pages/Next';
import Previous from './pages/Previous';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/next" component={Next} />
        <Route path="/previous" component={Previous} />
    </Switch>
    </Router>
  </React.StrictMode>,
)
