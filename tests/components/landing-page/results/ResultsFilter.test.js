import React from 'react';
import renderer from 'react-test-renderer';
import {Results} from "../../../../src/components/landing-page/results/Results";
import ResultsFilter from "../../../../src/components/landing-page/results/ResultsFilter";
import {configure, mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import store from "../../../../src/redux/store";
import {Provider} from "react-redux";

describe("ResultsFilter rendering specification", () => {
    it('ResultsFilter is rendered', () => {
        const component = renderer.create(
            <ResultsFilter/>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("ResultsFilter functional specification", () => {
    it('is only rendered when redux props.results are not empty', (done) => {
        configure({adapter: new Adapter()});

        const testFilteredResultsValue = {
            show: {
                name: 'sample name',
                genres: ['sample genre']
            },
            score: 2
        };

        const component = mount(
            <Provider store={store}>
                <Results results={[testFilteredResultsValue]}/>
            </Provider>
        );

        expect(component.find(ResultsFilter).exists()).toBeTruthy();
        component.setProps({children: <Provider store={store}><Results results={[]}/></Provider>});
        component.update();
        setTimeout(function () {
            expect(component.find(ResultsFilter).exists()).toBeFalsy();
            component.unmount();
            done();
        }, 500);
    });

    it('sets state.day value and calls props.setDay when day input is changed', () => {
        configure({adapter: new Adapter()});

        const mockSetDayState = jest.spyOn(React, 'useState');
        const mockSetDayProps = jest.fn();

        const component = mount(
            <ResultsFilter setDay={mockSetDayProps} />
        );

        expect(mockSetDayProps).toHaveBeenCalledTimes(0);
        expect(mockSetDayState).toHaveBeenCalledTimes(1);

        component.find('#resultsFilterSelect').at(0).simulate('change', {target: { value: 3}});
        component.update();

        setTimeout(function () {
            expect(mockSetDayProps).toHaveBeenCalledTimes(1);
            expect(mockSetDayState).toHaveBeenCalledTimes(2);
            component.unmount();
        }, 500);
    });
});