import React from 'react'
import './App.css';
import Collect from './pages/Collect';
import Navbar from './components/Navbar/Navbar'


function App() {
  return (
    <div className="App">
      <Navbar />
      <Collect />
    </div>
  );
}

export default App;
