import React from 'react'
import Main from '../template/Main'

const Home = props =>
    <Main icon="home" title="Inicio" subtitle="CRUD feito em React com Bootstrap">
        <div className="display-4">Bem vindo!</div>
        <hr />
        <p className="mb-0">Esse e um sistema para simplificar um cadastro de usuarios</p>
    </Main>

export default Home    