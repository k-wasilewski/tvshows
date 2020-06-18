import React from 'react';
import renderer from 'react-test-renderer';
import ResultsTable from "../../../../src/components/landing-page/results/ResultsFilter";
import {configure, mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

describe("ResultsTable rendering specification", () => {
    it('ResultsFilter is rendered', () => {
        const component = renderer.create(
            <ResultsTable/>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("ResultsTable functional specification", () => {
    it('useState is called when props.results change', (done) => {
        configure({adapter: new Adapter()});

        const mockUseState = jest.spyOn(React, 'useState');

        const component = mount(
            <ResultsTable />
        );

        component.setProps({results: 'changed'});
        component.update();

        setTimeout(function () {
            expect(mockUseState).toHaveBeenCalledTimes(2);
            component.unmount();
            done();
        }, 500);
    });
});