import React from 'react';
import renderer from 'react-test-renderer';
import {Results} from "../../../../src/components/landing-page/results/Results";
import ResultsFilter from "../../../../src/components/landing-page/results/ResultsFilter";
import {configure, mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import store from "../../../../src/redux/store";
import {Provider} from "react-redux";
import {Button} from "@material-ui/core";

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
    let component;

    beforeEach(() => {
        configure({ adapter: new Adapter() });
    });

    afterEach(() => {
        component.unmount();
    });

    it('is only rendered when redux props.results are not empty', (done) => {
        const testFilteredResultsValue = {
            show: {
                name: 'sample name',
                genres: ['sample genre']
            },
            score: 2
        };

        component = mount(
            <Provider store={store}>
                <Results results={[testFilteredResultsValue]}/>
            </Provider>
        );

        expect(component.find(ResultsFilter).exists()).toBeTruthy();
        component.setProps({children: <Provider store={store}><Results results={[]}/></Provider>});
        component.update();
        setTimeout(function () {
            expect(component.find(ResultsFilter).exists()).toBeFalsy();
            done();
        }, 500);
    });

    it('sets state.day value and calls props.setDay when day input is changed', (done) => {
        const mockSetDayState = jest.spyOn(React, 'useState');
        const mockSetDayProps = jest.fn();

        component = mount(
            <ResultsFilter setDay={mockSetDayProps} />
        );

        expect(mockSetDayProps).toHaveBeenCalledTimes(0);
        expect(mockSetDayState).toHaveBeenCalledTimes(1);

        component.find('input').at(0).simulate('change', {target: { value: 3}});
        component.update();

        setTimeout(function () {
            expect(mockSetDayProps).toHaveBeenCalledTimes(1);
            expect(mockSetDayState).toHaveBeenCalledTimes(2);

            done();
        }, 500);
    });

    it('button calls props doReset() and resets state value day when clicked', (done) => {
        const mockDoReset = jest.fn();

        component = mount(
            <ResultsFilter doReset={mockDoReset} />
        );

        component.find('#resultsFilterSelect').at(0).props().value=3;

        expect(mockDoReset).toHaveBeenCalledTimes(0);
        expect(component.find('#resultsFilterSelect').at(0).props().value).toEqual(3);

        component.find(Button).at(0).simulate('click');
        component.update();

        setTimeout(function () {
            expect(mockDoReset).toHaveBeenCalledTimes(1);
            expect(component.find('#resultsFilterSelect').at(0).props().value).toEqual('');

            done();
        }, 500);
    });
});