import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";
import { Container, Table, Modal, ModalHeader, ModalBody } from "reactstrap";

import api from '../../services/api';
import Header from '../../components/Header';

export default class List extends Component {
    state = {
        tasks: [],
        modal: false
    }

    constructor(props) {
        super(props);

        this.refDetalhes = React.createRef();
    }

    componentDidMount() {
        api.get('tarefas')
            .then(response => {
                console.log('response data', response.data);
                this.setState({ tasks: response.data })
            })
            .catch(err => {
                window.alert('erro');
                console.warn(err);
            })
    }

    renderTasks = () => {
        return this.state.tasks.map(task => (
            <tr>
                <td>{task.id}</td>
                <td>
                    <Link to={`/tarefas/${task.id}`} onClick={this.toggleModal}>
                        {task.titulo}
                    </Link>
                </td>
                <td>{task.usuario.nome}</td>
                <td>{task.concluida
                    ? <span className="btn btn-success" role="img" aria-label="Sim">✅</span>
                    : <span className="btn btn-warning" role="img" aria-label="Não">❌</span>}</td>
            </tr>
        ));
    }

    renderTaskDescription = (routeProps) => {
        const taskId = parseInt(routeProps.match.params.taskId, 10);
        const task = this.state.tasks.find(task => (task.id === taskId));

        if (!task) {
            return (<h3 className="text-danger">Tarefa não encontrada</h3>)
        }

        return (
            <div>
                <h3 className="font-weight-bold">{task.titulo}</h3>
                <p>Descrição: {task.descricao}</p>
                <p>Usuário: {task.usuario.nome}</p>
                <p>Concluída: {task.concluida ? 'Sim' : 'Não'}</p>
            </div>
        )
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <>
                <Header />
                <Container>
                    <h1 className="mb-3">Tarefas cadastradas</h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Título</th>
                                <th>Usuário</th>
                                <th>Concluída</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTasks()}
                        </tbody>
                    </Table>

                    <br />

                    <Modal isOpen={this.state.modal} toggle={this.toggleModal} modalTransition={{
                        timeout: 150
                    }} backdropTransition={{ timeout: 1 }}>
                        <ModalHeader toggle={this.toggleModal}>Detalhes da tarefa</ModalHeader>
                        <ModalBody>
                            <Route path="/tarefas/:taskId" render={this.renderTaskDescription} />
                        </ModalBody>
                    </Modal>
                </Container>
            </>
        );
    }
}