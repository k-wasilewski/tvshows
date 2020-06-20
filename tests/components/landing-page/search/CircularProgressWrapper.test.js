import React from 'react';
import renderer from 'react-test-renderer';
import CircularProgressWrapper from "../../../../src/components/landing-page/search/CircularProgressWrapper";

describe("CircularProgressWrapper rendering specification", () => {
    it('CircularProgressWrapper is rendered', () => {
        const component = renderer.create(
            <CircularProgressWrapper/>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});