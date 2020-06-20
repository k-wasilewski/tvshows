import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import store from "../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import ErrorBoundary from "../../../src/components/error/ErrorBoundary";

describe("ErrorBoundary functional specification", () => {
    function ErrorComponent() {
        throw new Error('Error thrown from App component');
        return (<div>Error</div>);
    }

    it('ErrorComponent is rendered when error appears', () => {
        configure({adapter: new Adapter()});

        const componentDidCatch = jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch');

        const component = mount(
            <ErrorBoundary>
                <ErrorComponent />
            </ErrorBoundary>
        );

        expect(componentDidCatch).toHaveBeenCalled();
    });
});