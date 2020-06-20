import renderer from "react-test-renderer";
import {ErrorMsg} from "../../../src/components/error/ErrorMsg";
import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

describe("ErrorMsg rendering specification", () => {
    it('ErrorMsg is rendered', () => {
        const component = renderer.create(
            <ErrorMsg/>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("ErrorMsg functional specification", () => {
    it('renders msg passed as props', () => {
        configure({adapter: new Adapter()});

        const testMsg = 'test message';

        const component = mount(
            <ErrorMsg msg={testMsg} />
        );

        expect(component.find('span').text()).toBe(testMsg);
    });
});