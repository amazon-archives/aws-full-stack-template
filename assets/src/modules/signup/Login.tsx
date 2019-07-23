import React from "react";
import { Redirect } from 'react-router';
import { Form, FormGroup, FormControl, FormLabel, Button, Spinner, FormControlProps } from "react-bootstrap";
import Auth from "@aws-amplify/auth";
import "./login.css";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface LoginProps {
  isAuthenticated: boolean;
  userHasAuthenticated: (authenticated: boolean) => void;
}

interface LoginState {
  loading: boolean;
  redirect: boolean;
  email: string;
  password: string;
  isValid: boolean;
}

export default class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);

    this.state = {
      loading: false,
      redirect: false,
      email: "",
      password: "",
      isValid: false,
    };
  }

  onChange = (event: React.FormEvent<FormControlProps>) => {
    const target = event.target as HTMLInputElement;
    this.setState({ ...this.state, [target.name]: target.value });
  }

  validateForm = () => {
    return emailRegex.test(this.state.email.toLowerCase()) && this.state.password;
  }

  onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    if (event.currentTarget.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ isValid: true, loading: true });

      try {
        await Auth.signIn(this.state.email, this.state.password);
        this.props.userHasAuthenticated(true);
        this.setState({ redirect: true })
      } catch (e) {
        alert(e.message);
        this.setState({ loading: false });
      }
    }
  }

  render() {
    if (this.state.redirect) return <Redirect to='/' />
    const { email, password, isValid } = this.state;

    return (
      <div className="Login">
        <Form noValidate validated={isValid} onSubmit={this.onLogin}>
          <FormGroup controlId="email">
            <FormLabel>Email</FormLabel>
            <FormControl
              name="email"
              type="email"
              value={email}
              onChange={this.onChange}
              isValid={emailRegex.test(email.toLowerCase())}
              required />
            <FormControl.Feedback type="invalid">Must be a valid email address</FormControl.Feedback>
          </FormGroup>
          <FormGroup controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl
              name="password"
              type="password"
              value={password}
              onChange={this.onChange}
              minLength={8}
              isValid={password.length >= 8}
              required />
            <FormControl.Feedback type="invalid">Required field</FormControl.Feedback>
          </FormGroup>
          <Button
            block
            type="submit"
            disabled={!this.validateForm()}>
            {this.state.loading ?
              <span><Spinner size="sm" animation="border" className="mr-2" />Logging in</span> :
              <span>Log in</span>}
          </Button>
        </Form >
      </div>
    );
  }
}