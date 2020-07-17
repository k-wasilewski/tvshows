import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ErrorBoundary from "../../../src/components/error/ErrorBoundary";

describe("ErrorBoundary functional specification", () => {
    function TestErrorComponent() {
        throw new Error('Error thrown from ErrorComponent');
        return (<div>Error</div>);
    }

    it('catches error when it appears', () => {
        configure({adapter: new Adapter()});

        const componentDidCatch = jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch');
        const consoleErrorLog = jest.spyOn(console, 'error').mockImplementation(() => {});

        const component = mount(
            <ErrorBoundary>
                <TestErrorComponent />
            </ErrorBoundary>
        );

        expect(componentDidCatch).toHaveBeenCalled();
        expect(consoleErrorLog).toHaveBeenCalled();
    });
});