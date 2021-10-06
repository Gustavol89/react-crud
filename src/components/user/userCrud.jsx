import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const Propsheader = {
    icon: 'users',
    title: 'Usúarios',
    subtitle: 'Cadastro de usuario (salvar, atualizar , listar e deletar)'
}

const baseURL = 'http://localhost:3000/users'
const InitialState = {
    user: { name: '', email: '' },
    list: []
}

class UserCrud extends Component {
    state = { ...InitialState }

    componentDidMount() {
        axios(baseURL).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: InitialState.user })
    }

    // SALVANDO USUARIO 
    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseURL}/${user.id}` : baseURL
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdateList(resp.data)
                this.setState({ user: InitialState.user, list })
            })
    }

    getUpdateList(user, ADD = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if (ADD) list.unshift(user)
        return list
    }

    udateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    // RENDERIZANDO FORMULARIO
    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" name="name"
                                value={this.state.user.name}
                                onChange={e => this.udateField(e)}
                                placeholder="Digite o nome" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control" name="email"
                                value={this.state.user.email}
                                onChange={e => this.udateField(e)}
                                placeholder="Digite o E-mail" />
                        </div>

                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>
                            Cancelar
                        </button>

                    </div>
                </div>
            </div>
        )
    }
    //   CARREGANDO USUARIO
    load(user) {
        this.setState({ user })
    }

    // REMOVE UM USUARIO 
    remove(user) {
        axios.delete(`${baseURL}/${user.id}`).then(resp => {
            const list = this.getUpdateList(user, false)
            this.setState({ list })
        })
    }

    // RENDERIZANDO TABELA
    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }


    render() {
        return (
            <Main {...Propsheader}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}

export default UserCrud