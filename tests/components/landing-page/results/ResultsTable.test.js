import React from 'react';
import renderer from 'react-test-renderer';
import ConnectedResultsTable, {ResultsTable} from "../../../../src/components/landing-page/results/ResultsTable";
import {configure, mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import store from "../../../../src/redux/store";
import {Provider} from "react-redux";

describe("ResultsTable rendering specification", () => {
    it('ResultsTable is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <ConnectedResultsTable />
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("ResultsTable functional specification", () => {
    it('useState is called when props.results change', (done) => {
        configure({adapter: new Adapter()});

        const testResultsValue = {
            show: {
                name: 'sample name',
                genres: ['sample genre']
            },
            score: 2
        };

        const testResultsValueChanged = {
            show: {
                name: 'changed name',
                genres: ['changed genre']
            },
            score: 2
        };

        const mockUseState = jest.spyOn(React, 'useState');

        const component = mount(
            <Provider store={store}>
                <ResultsTable results={[testResultsValue]}/>
            </Provider>
        );
        const CALLS_PER_CHANGE = 2;
        expect(mockUseState).toHaveBeenCalledTimes(CALLS_PER_CHANGE);

        component.setProps({children:
                <Provider store={store}>
                    <ResultsTable results={[testResultsValueChanged]} />
                </Provider>
        });
        component.update();

        setTimeout(function () {
            expect(mockUseState).toHaveBeenCalledTimes(CALLS_PER_CHANGE*2);
            component.unmount();
            done();
        }, 500);
    });

    it('maps results to results split by commas', (done) => {
        configure({adapter: new Adapter()});

        const rawResult = {
            show: {
                name: 'sample name',
                genres: ['first', 'second', 'third']
            },
            score: 2
        };

        const component = mount(
            <Provider store={store}>
                <ResultsTable results={[rawResult]} />
            </Provider>
        );

        const genresCell = component.find('#genresCell').at(0);

        setTimeout(function () {
            expect(genresCell.text()).toBe('first, second, third');
            component.unmount();
            done();
        }, 500);
    });
});