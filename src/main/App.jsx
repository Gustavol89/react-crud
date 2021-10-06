import '../styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import React from 'react'

import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
import Home from '../components/home/Home'
import Footer from '../components/template/Footer'

const App = props =>
    <div className="app">
        <Logo />
        <Nav />
       <Home />
        <Footer />
    </div>

export default App