import React from "react";
import ErrorComponent from "./ErrorComponent";

export default class ErrorBoundary extends React.Component {
    state = {
        errorMessage: ''
    };

    static getDerivedStateFromError(error) {
        return {errorMessage: error.toString()};
    }

    componentDidCatch(error, info) {
        this.logErrorToServices(error.toString(), info.componentStack);
    }

    logErrorToServices = console.log;   //better logging

    render() {
        if (this.state.errorMessage) {
            return (
                <ErrorComponent msg='Wystąpił błąd w aplikacji' />
            );
        }
        return this.props.children;
    };
};