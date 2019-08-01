import React, { Component } from 'react';

import { Container, Row, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import InputMask from "react-input-mask";
import api from '../../services/api';


export default class UsuarioForm extends Component {
    state = {
        nome: '',
        email: '',
        nascimento: '',
        cpf: '',
        senha: '',
        error: ''
    }

    handleGravarUsuario = async e => {
        e.preventDefault();

        const { nome, email, nascimento, cpf, senha } = this.state;

        let camposValidar = [nome, email, nascimento, cpf, senha]
        for (let i in camposValidar) {
            if (!camposValidar[i]) {
                this.setState({ error: 'Preencha o formulário corretamente!' });
                return;
            }
        }

        try {
            await api.post('usuarios', { nome, email, nascimento, cpf, senha });
            this.props.history.push('/usuarios');
        } catch (err) {
            let errorMsg = 'Houve um problema ao gravar o usuário';
            
            this.setState({
                error: errorMsg
            });

            console.error(err);
        }
    }

    render() {
        return (
            <Container>
                <h1 className="mt-5 mb-3">Cadastrar um novo usuário</h1>

                {this.state.error && <Alert color="danger">{this.state.error}</Alert>}

                <Form onSubmit={this.handleGravarUsuario}>
                    <Row>
                        <FormGroup className="col-12 col-sm-4">
                            <Label for="nome">Nome</Label>
                            <Input
                                type="text"
                                name="nome"
                                id="nome"
                                placeholder="João da Silva" 
                                onChange={e => this.setState({ nome: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup className="col-12 col-sm-4">
                            <Label for="email">Endereço de e-mail</Label>
                            <Input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="joao@silva.com"
                                onChange={e => this.setState({ email: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup className="col-12 col-sm-4">
                            <Label for="nascimento">Data de nascimento</Label>
                            <Input 
                                type="text" 
                                name="nascimento" 
                                id="nascimento" 
                                mask="99/99/9999"
                                maskChar={null}
                                tag={InputMask} 
                                placeholder="01/01/1991" 
                                onChange={e => this.setState({ nascimento: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup className="col-12 col-sm-4">
                            <Label for="cpf">CPF</Label>
                            <Input
                                type="text"
                                name="cpf"
                                id="cpf"
                                mask="999.999.999-99"
                                maskChar={null}
                                tag={InputMask}
                                placeholder="123.456.789-00"
                                onChange={e => this.setState({ cpf: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup className="col-12 col-sm-4">
                            <Label for="senha">Senha</Label>
                            <Input
                                type="password"
                                name="senha"
                                id="senha"
                                placeholder="**********"
                                onChange={e => this.setState({ senha: e.target.value })}
                            />
                        </FormGroup>
                    </Row>
                    <Button>Submit</Button>
                </Form>
            </Container>
        );
    }
}
