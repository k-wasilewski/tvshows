import React from 'react';
import renderer from 'react-test-renderer';
import {ErrorComponent} from "../../../src/components/error/ErrorComponent";

describe("ErrorComponent rendering specification", () => {
    it('ErrorComponent is rendered', () => {
        const component = renderer.create(
            <ErrorComponent/>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});