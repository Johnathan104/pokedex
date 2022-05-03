// main app
import React from 'react';
import Main from './components/Main.js'
import { BrowserRouter as Router,Link, Routes,Route } from 'react-router-dom';
import './index.css'; 
import Entry from './components/Entry.js'

function App(){
    return(
        <Router>
            <div className='app'>
            <Link style={{ textDecoration: 'none', color:'black'}} to='/'>
                <h1 className='header'>PokeDex</h1>
            </Link>
                <Routes>
                        <Route exact path='/pokedex'  element={<Main/>}/>
                        <Route path='pokedex/:pokemon' element={<Entry/>}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App;