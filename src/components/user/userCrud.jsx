import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const Propsheader = {
    icon: 'users',
    title: 'Usúarios',
    subtitle: 'Cadastro de usuario (salvar, atualizar , listar e deletar)'
}

const baseURL = 'http://localhost:3001/users'
const InitialState = {
    user: { name: '', email: '' },
    list: []
}

class UserCrud extends Component {
    state = { ...InitialState }

    clear() {
        this.setState({ user: InitialState.user })
    }

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

    getUpdateList(user) {
        const list = this.state.list.filter(u => u.id !== user.id)
        list.unshift(user)
        return list    
    }

    udateField(event) {
        const user = {...this.state.user}
        user[event.target.name] = event.target.value
        this.setState({user})
    }

    renderForm() {
        return(
            <div className="form">
              <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Nome</label>
                        <input type="text" className="form-control" name="name"
                        value={this.state.user.name}
                        onChange={e => this.udateField(e)}
                        placeholder="Digite o nome"/>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label>E-mail</label>
                        <input type="text" className="form-control" name="email"
                        value={this.state.user.email}
                        onChange={e => this.udateField(e)}
                        placeholder="Digite o E-mail"/>
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


    render() {
        return (
            <Main {...Propsheader}>
                 {this.renderForm()}
            </Main>
        )
    }
}

export default UserCrud