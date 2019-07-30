import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from './services/auth';

import Login from './pages/Usuario/Login';
import { default as TarefasList } from './pages/Tarefas/List';
import NotFound from './pages/NotFound';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' render={() => {
                const redirectUrl = isAuthenticated() ? '/tarefas' : '/login';

                return (
                    <Redirect to={redirectUrl} />
                )
            }}/>
            <Route path="/login" component={Login} />
            <Route path="/cadastro" component={() => <h1>SignUp</h1>} />
            <PrivateRoute path="/tarefas" component={TarefasList} />
            <Route path="*" component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Routes;