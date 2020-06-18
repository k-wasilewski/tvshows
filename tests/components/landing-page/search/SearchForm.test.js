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

    it('displays errorMsg when props.msg value is received', () => {
        configure({adapter: new Adapter()});

        const testMsg = 'sample msg';
        const mockPassInputRefToParent = jest.fn();

        const component = mount(
            <SearchForm passInputRefToParent={mockPassInputRefToParent} msg={testMsg}/>
        );

        expect(component.find('#errorMsg').text()).toBe(testMsg);
        component.unmount();
    });

    it('props.doReset() is called when searchFormResetBtn is clicked', () => {
        configure({adapter: new Adapter()});

        const mockdoReset = jest.fn();
        const mockPassInputRefToParent = jest.fn();

        const component = mount(
            <SearchForm passInputRefToParent={mockPassInputRefToParent}
                        doReset={mockdoReset}/>
        );

        component.find('#searchFormResetBtn').at(0).simulate('click');
        component.update();

        expect(mockdoReset).toHaveBeenCalled();
        component.unmount();
    });
});