import React, {ErrorInfo} from "react";
import {Typography, Container} from "@mui/material";

export type ErrorsProps = {
  children: React.ReactNode,
};

type ErrorsState = {
  error?: Error,
  stack?: ErrorInfo["componentStack"],
};

export default class Errors extends React.Component<ErrorsProps, ErrorsState> {
  constructor(props: ErrorsProps) {
    super(props);
    this.state = {error: undefined};
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({
      error,
      stack: info.componentStack,
    });
  }

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    return (
      <Container maxWidth="md">
        <Typography variant="h1">¡Ups!</Typography>

        <Typography variant="h3" component="h2">Ocurrió un error</Typography>

        <Typography component="pre" sx={{fontFamily: 'monospace', backgroundColor: '#f5f5f5', p: 2}}>
          {this.state.error.toString()}
        </Typography>
        <Typography component="pre" sx={{fontFamily: 'monospace', backgroundColor: '#f5f5f5', p: 2}}>
          {this.state.stack ? this.state.stack.toString() : ""}
        </Typography>
      </Container>
    );
  }
}
