import React from 'react';
import {Header} from "./components/index";
import {Route} from "react-router-dom";
import {Cart, Home} from './pages/index'

const App = () => {

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Route path='/' render={ () => <Home /> } exact />
                <Route path='/cart' render={ () => <Cart /> } exact />
            </div>
        </div>
    );
}

export default App;
