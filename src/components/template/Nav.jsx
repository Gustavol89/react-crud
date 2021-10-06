import '../../styles/Nav.css'
import React from 'react'

const Nav =  props =>
    <aside className="menu-area">
        <nav className="menu">
            <a href="#/">
                <i className="fa fa-home"></i> Inicio
            </a>
            <a href="#/users">
                <i className="fa fa-users"></i> Usuarios
            </a>
        </nav>
    </aside>

export default Nav    