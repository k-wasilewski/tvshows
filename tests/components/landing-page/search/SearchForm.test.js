import React from 'react';
import renderer from 'react-test-renderer';
import {SearchForm} from "../../../../src/components/landing-page/search/SearchForm";
import {configure, mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

describe("SearchForm rendering specification", () => {
    it('SearchForm is rendered', () => {
        const component = renderer.create(
            <SearchForm/>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("SearchForm functional specification", () => {
    it('passInputRefToParent() is called when componentDidMount', () => {
        configure({adapter: new Adapter()});

        const mockPassInputRefToParent = jest.fn();

        const component = mount(
            <SearchForm passInputRefToParent={mockPassInputRefToParent}/>
        );

        expect(mockPassInputRefToParent).toHaveBeenCalled();
        component.unmount();
    });
});