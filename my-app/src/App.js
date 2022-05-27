import './App.css';
import {Food} from "./components/Food";
import Clock from "./components/Clock";
import React from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
         <Clock/>
      </header>
        <main className="App-main">
            <h2>Образ жизни</h2>
            <Food/>
        </main>
    </div>
  );
}

export default App;
