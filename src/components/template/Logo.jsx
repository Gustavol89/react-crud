import '../../styles/Logo.css'
import logo from '../../assets/img/crud.png'
import React from 'react'

const Logo = props =>
      <aside className="logo">
            <a href="/" className="logo">
                  <img src={logo} alt="logo" />   
            </a>
      </aside>

export default Logo