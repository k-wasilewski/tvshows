import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ErrorBoundary from "../../../src/components/error/ErrorBoundary";

describe("ErrorBoundary functional specification", () => {
    function ErrorComponent() {
        throw new Error('Error thrown from ErrorComponent');
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