import React from 'react';
import renderer from 'react-test-renderer';
import {NotFoundComponent} from "../../../src/components/error/NotFoundComponent";

describe("NotFoundComponent rendering specification", () => {
    it('NotFoundComponent is rendered', () => {
        const component = renderer.create(
            <NotFoundComponent/>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});