import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Intro } from "./pages/intro/Intro";
import { HeroesList } from "./pages/heroes-list/Heroes-list";
import { HeroesCard } from "./pages/heroes-card/Heroes-card";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Intro}></Route>
          <Route exact path="/heroes-list" component={HeroesList}></Route>
          <Route exact path="/heroes-card/:id" component={HeroesCard}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
