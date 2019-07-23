import Auth from "@aws-amplify/auth";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form, Nav, Navbar, Button } from "react-bootstrap";
import "./App.css";
import { Routes } from "./Routes";

interface AppProps {
  history: any;
}

interface AppState {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };

    document.title = "Goals"
  }

  async componentDidMount() {
    try {
      if (await Auth.currentSession()) {
        this.userHasAuthenticated(true);
      }
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = (authenticated: boolean) => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async () => {
    await Auth.signOut();

    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }

  showLoggedInBar = () => (
    <Form inline>
      <Button variant="outline-light" onClick={this.handleLogout}>Log out</Button>
    </Form>
  );

  showLoggedOutBar = () => (
    <Form inline>
      <Button variant="outline-light" href="/signup" className="mr-sm-2">Sign up</Button>
      <Button variant="outline-light" href="/login">Login</Button>
    </Form>
  );

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <Navbar navbar-light="true" className="mb-3 navbar">
          <Navbar.Brand href="/">AWS Full-Stack Template</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ml-auto">
              {this.state.isAuthenticated ? this.showLoggedInBar() : this.showLoggedOutBar()}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes isAuthenticated={childProps.isAuthenticated} userHasAuthenticated={childProps.userHasAuthenticated} />
      </div>
    );
  }
}

export default withRouter(App as any);