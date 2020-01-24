import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from "./components/Header";

const Index: React.FC = () => <div>Develop index</div>

const Search: React.FC = () => <div>Search page</div>

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Link to="/search">Test</Link>
      <Route path="/" exact component={Index} />
      <Route path="/search" component={Search} />
    </Router>
  )
}

export default App;