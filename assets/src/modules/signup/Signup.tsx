import Auth from "@aws-amplify/auth";
import React from "react";
import { Redirect } from 'react-router';
import { Form, FormGroup, FormControl, FormLabel, Button, Spinner, FormControlProps } from "react-bootstrap";
import "./signup.css";
import "./home.css";
import { ISignUpResult } from "amazon-cognito-identity-js";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface SignupProps {
  isAuthenticated: boolean;
  userHasAuthenticated: (authenticated: boolean) => void;
}

interface SignupState {
  loading: boolean;
  email: string;
  password: string;
  confirmPassword: string;
  confirmationCode: string;
  user: any;
  redirect: boolean;
  validated: boolean;
}

export default class Signup extends React.Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props);

    this.state = {
      loading: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      user: undefined,
      redirect: false,
      validated: false,
    };
  }

  onChange = (event: React.FormEvent<FormControlProps>) => {
    const target = event.target as HTMLInputElement;
    this.setState({ ...this.state, [target.name]: target.value });
  }

  onSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
    } else {
      this.setState({ loading: true, validated: true });

      Auth.signUp({
        username: this.state.email,
        password: this.state.password
      }).then((value: ISignUpResult) => {
        this.setState({ user: value.user, loading: false });
      }).catch((e: any) => {
        alert(e.message);
        this.setState({ loading: false });
      });
    }
    this.setState({ validated: true });

  }

  onConfirm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ loading: true });

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
      this.setState({ redirect: true })
    } catch (e) {
      alert(e.message);
      this.setState({ loading: false });
    }
  }

  validateSignupForm = () => {
    return emailRegex.test(this.state.email.toLowerCase()) && 
      this.state.confirmPassword.length >= 8 && 
      this.state.password === this.state.confirmPassword
  }

  validateConfirmForm = () => {
    return this.state.confirmationCode;
  }

  showConfirmationForm = () => {
    if (this.state.redirect) return <Redirect to='/' />
    const { confirmationCode } = this.state;

    return (
      <Form noValidate onSubmit={this.onConfirm}>
        <FormGroup controlId="confirmationCode">
          <FormLabel>Confirmation code</FormLabel>
          <FormControl
            name="confirmationCode"
            type="tel"
            value={confirmationCode}
            onChange={this.onChange}
            minLength={1}
            required />
          <FormControl.Feedback />
          <Form.Text className="text-muted">
            A confirmation code will be sent to the email address provided
          </Form.Text>
        </FormGroup>
        <Button block type="submit" disabled={!this.validateConfirmForm()}>
          {this.state.loading ?
            <span><Spinner size="sm" animation="border" className="mr-2" />Confirming</span> :
            <span>Confirm</span>}
        </Button>
      </Form>
    );
  }

  showSignupForm = () => {
    const { email, password, confirmPassword, validated } = this.state;
    return (
      <Form noValidate validated={validated} onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.onSignup(e)}>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            name="email"
            type="email"
            onChange={this.onChange}
            value={email}
            minLength={5}
            isValid={emailRegex.test(email.toLowerCase())}
            required />
          <FormControl.Feedback type="invalid">Must be a valid email address</FormControl.Feedback>
        </FormGroup>
        <FormGroup controlId="password" >
          <FormLabel>Password</FormLabel>
          <FormControl
            name="password"
            type="password"
            onChange={this.onChange}
            value={password}
            minLength={8}
            isValid={password.length >= 8}
            required />
          <FormControl.Feedback type="invalid">Must be at least 8 characters</FormControl.Feedback>
          <Form.Text className="text-muted">
            Must be at least 8 characters
          </Form.Text>
        </FormGroup>
        <FormGroup>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            name="confirmPassword"
            type="password"
            onChange={this.onChange}
            value={confirmPassword}
            minLength={8}
            isValid={confirmPassword.length >= 8 && password === confirmPassword}
            required />
          <FormControl.Feedback type="invalid">Passwords must be identical</FormControl.Feedback>
        </FormGroup>
        <Button block type="submit" disabled={!this.validateSignupForm()}>
          {this.state.loading ?
            <span><Spinner size="sm" animation="border" className="mr-2" />Signing up</span> :
            <span>Sign up</span>}
        </Button>
      </Form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.state.user === undefined ? this.showSignupForm() : this.showConfirmationForm()}
      </div>
    );
  }
}