import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import ConnectedResults, {Results} from "../../../../src/components/landing-page/results/Results";
import {Provider} from "react-redux";
import {configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {mount, shallow} from "enzyme";
import {App} from "../../../../src/components/App";

describe("Results rendering specification", () => {
    it('Results is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <ConnectedResults/>
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("Results functional specification", () => {

    it('clears the state.filteredResults when componentDidUpdate with unchanged ' +
        'state.filteredResults value', () => {
        configure({adapter: new Adapter()});

        const testFilteredResultsValue = {
            show: {
                name: 'sample name',
                genres: ['sample genre']
            },
            score: 2
        };
        const testChangedFilteredResultsValue = {
            show: {
                name: 'changed',
                genres: ['sample genre']
            },
            score: 3
        };

        const component = mount(
            <Provider store={store}>
                <Results results={[testFilteredResultsValue]}/>
            </Provider>
        );

        component.find(Results).prop('results').sort((a, b) => a-b)
        component.find(Results).setState({filteredResults: testFilteredResultsValue});
        console.log(Array.isArray(component.find(Results).prop('results')))
        component.update();
        expect(component.find(Results).state('filteredResults')).toBe(testFilteredResultsValue);
        component.find(Results).setState({filteredResults: testChangedFilteredResultsValue});
        component.setProps({children: <Results results={[testChangedFilteredResultsValue]}/>});
        component.update();
        expect(component.find(Results).state('filteredResults')).toStrictEqual([]);
        component.unmount();
    });

    it('filterByDay() filters results from props to state.filteredResults value ' +
        'by passed day number', (done) => {
        configure({adapter: new Adapter()});

        const resultMonday = {
            show: {
                name: 'sample name',
                genres: ['sample genre'],
                schedule: {
                    days: 'Monday'
                }
            },
            score: 2
        };

        const resultTuesday = {
            show: {
                name: 'sample name',
                genres: ['sample genre'],
                schedule: {
                    days: 'Tuesday'
                }
            },
            score: 2
        };

        const testInitialResults = [resultMonday, resultTuesday];

        const component = shallow(
            <Results results={testInitialResults}/>
        );

        component.instance().filterByDay(1);
        component.update();

        setTimeout(function () {
            expect(JSON.stringify(component.state('filteredResults')))
                .toBe(JSON.stringify([resultMonday]));
            component.unmount();
            done();
        }, 500);
    });
});