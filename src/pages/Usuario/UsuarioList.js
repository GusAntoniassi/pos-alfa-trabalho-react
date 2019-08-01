import React, { Component } from 'react';
import { Container, Table, Badge } from "reactstrap";

import api from '../../services/api';
import Header from '../../components/Header';

export default class UsuarioList extends Component {
    state = {
        usuarios: [],
    }

    constructor(props) {
        super(props);

        this.refDetalhes = React.createRef();
    }

    componentDidMount() {
        api.get('usuarios')
            .then(response => {
                console.log('response data', response.data);
                this.setState({ usuarios: response.data })
            })
            .catch(err => {
                window.alert('erro');
                console.warn(err);
            })
    }

    renderTasks = () => {
        return this.state.usuarios.map(usuario => (
            <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>{usuario.cpf}</td>
                <td>{usuario.nascimento}</td>
                <td>{usuario.status
                    ? <Badge href="#" color="success">Ativo</Badge>
                    : <Badge href="#" color="secondary">Inativo</Badge>}</td>
            </tr>
        ));
    }

    render() {
        return (
            <>
                <Header />
                <Container>
                    <h1 className="mb-3">Usuários cadastrados</h1>

                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>CPF</th>
                                <th>Data de nascimento</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTasks()}
                        </tbody>
                    </Table>

                    <br />
                </Container>
            </>
        );
    }
}