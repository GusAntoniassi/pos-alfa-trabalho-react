import React, { Component } from 'react';
import { Link } from "react-router-dom";

import {
    Row, Col, Card, CardBody, CardFooter, Form, Input, FormGroup, Label, Button
} from "reactstrap";

import api from '../../services/api';
import { login } from '../../services/auth';

export default class Login extends Component {
    state = {
        email: '',
        senha: '',
        error: ''
    };

    handleLogin = async e => {
        e.preventDefault();

        const { email, senha } = this.state;

        if (!email || !senha) {
            this.setState({ error: 'Preencha o e-mail e senha para logar!' });
        } else {
            try {
                const response = await api.post('usuarios/login', { email, senha });
                login(response.data.token);
                this.props.history.push('/');
            } catch (err) {
                let errorMsg = 'Houve um problema com o login, verifique suas credenciais';

                if (err.response.status) {
                    errorMsg = 'Usuário e/ou senha inválidos!';
                }
                
                this.setState({
                    error: errorMsg
                });

                console.error(err);
            }
        }
    }

    render() {
        return (
            <Row className="login-wrapper">
                <Col xs="12" className="text-center mb-3">
                    <span class="brand-name">
                        <span class="web">Web</span>Dev
                    </span>
                </Col>
                <Col xs="12" sm={{ size: 6, offset: 3 }}>
                    <Card>
                        <CardBody>
                            <Form onSubmit={this.handleLogin}>
                                <FormGroup>
                                    <Label>E-mail</Label>
                                    <Input 
                                        type="email" 
                                        name="email" 
                                        onChange={e => this.setState({ email: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Senha</Label>
                                    <Input 
                                        type="password" 
                                        name="senha" 
                                        onChange={e => this.setState({ senha: e.target.value })}
                                    />
                                </FormGroup>

                                {this.state.error && <p className="text-danger">{this.state.error}</p>}

                                <Button>Entrar</Button>
                            </Form>
                        </CardBody>
                        <CardFooter>
                            Não tem uma conta? Cadastre-se <Link to="/cadastro">aqui</Link>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        );
    }
}