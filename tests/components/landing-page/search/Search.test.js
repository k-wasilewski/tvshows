import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import ConnectedSearch, {Search} from "../../../../src/components/landing-page/search/Search";
import {Provider} from "react-redux";
import {configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {mount} from "enzyme";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {CircularProgress} from "@material-ui/core";

describe("Search rendering specification", () => {
    it('Search is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <ConnectedSearch />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("Search functional specification", () => {
    let component;

    beforeEach(() => {
        configure({ adapter: new Adapter() });
    });

    afterEach(() => {
        component.unmount();
    });

    it('sets state.input value as SearchForm\'s input', (done) => {
        component = mount(
            <Provider store={store}>
                <Search />
            </Provider>
        );
        const testInput = 'test input value';

        const input = component.find('#searchFormInput');
        input.simulate('change', { target: { value: testInput } });

        setTimeout(function () {
            expect(component.find(Search).state('input')).toBe(testInput);
            done();
        }, 500);
    });

    it('submitQuery() is called when form is submitted', () => {
        const submitQuery = jest.spyOn(Search.prototype, 'submitQuery');

        const mockSetQuery = jest.fn();

        component = mount(
            <Provider store={store}>
                <Search setQuery={mockSetQuery}/>
            </Provider>
        );

        const searchForm = component.find('#searchForm').at(0);
        searchForm.simulate('submit');

        expect(submitQuery).toHaveBeenCalled();
        expect(mockSetQuery).toHaveBeenCalled();
    });

    it('submitQuery() submits a query from state.input value', (done) => {
        const mock = new MockAdapter(axios);
        const resp = 'success';
        const testInput = 'testInput';
        mock.onGet().reply(200, resp);

        const mockSetQuery = jest.fn();
        const mockSetResults = jest.fn();

        component = mount(
            <Provider store={store}>
                <Search setResults={mockSetResults} setQuery={mockSetQuery} />
            </Provider>
        );

        component.find(Search).setState({input: testInput});
        component.update();

        const mockedEvent = {preventDefault: () => {}};
        component.find(Search).instance().submitQuery(mockedEvent);

        setTimeout(function () {
            expect(mockSetQuery).toHaveBeenCalledWith(testInput);
            expect(mockSetResults).toHaveBeenCalledWith(resp);
            mock.reset();
            done();
        }, 500);
    });

    it('submitQuery() sets state.errorMsg accordingly when input value is empty', (done) => {
        const mock = new MockAdapter(axios);
        const resp = 'success';
        mock.onGet().reply(200, resp);

        const mockSetQuery = jest.fn();

        component = mount(
            <Provider store={store}>
                <Search setQuery={mockSetQuery}/>
            </Provider>
        );

        const mockedEvent = {preventDefault: () => {}};
        component.find(Search).instance().submitQuery(mockedEvent);

        setTimeout(function () {
            expect(component.find(Search).state().errorMsg).toBe(
                'Pole nie może być puste');
            mock.reset();
            done();
        }, 500);
    });

    it('submitQuery() sets state.errorMsg accordingly when response from server equals 0',
        (done) => {
        const mock = new MockAdapter(axios);
        const resp = [];
        mock.onGet().reply(200, resp);

        const mockSetQuery = jest.fn();

        component = mount(
            <Provider store={store}>
                <Search setQuery={mockSetQuery}/>
            </Provider>
        );
        const testInput = 'test input value';

        component.find('#searchFormInput').at(0).simulate('change',
            {target: {value: testInput}});
        component.update();

        const mockedEvent = {preventDefault: () => {}};
        component.find(Search).instance().submitQuery(mockedEvent);

        setTimeout(function () {
            expect(component.find(Search).state().errorMsg).toBe('Nic nie znaleziono');
            mock.reset();
            done();
        }, 500);
    });

    it('submitQuery() sets state.errorMsg accordingly when there is error',
        (done) => {
            const mockSetQuery = jest.fn();

            component = mount(
                <Provider store={store}>
                    <Search setQuery={mockSetQuery}/>
                </Provider>
            );
            const testInput = 'test input value';

            component.find('#searchFormInput').at(0).simulate('change',
                {target: {value: testInput}});
            component.update();

            const mockedEvent = {preventDefault: () => {}};
            component.find(Search).instance().submitQuery(mockedEvent);

            setTimeout(function () {
                expect(component.find(Search).state().errorMsg).toBe(
                    'Błąd serwera');
                done();
            }, 500);
        });

    it('submitQuery() sets redux props.query value as inputRef.value ' +
        'and clears the inputRef.value and state.input value', (done) => {
        const mock = new MockAdapter(axios);
        const resp = [];
        mock.onGet().reply(200, resp);

        const mockSetQuery = jest.fn();

        component = mount(
            <Provider store={store}>
                <Search setQuery={mockSetQuery}/>
            </Provider>
        );
        const testInput = 'test input value';

        component.find('#searchFormInput').at(0).simulate('change', {target: {value: testInput}});
        component.update();

        const mockedEvent = {preventDefault: () => {}};
        component.find(Search).instance().submitQuery(mockedEvent);

        setTimeout(function () {
            expect(mockSetQuery).toBeCalledWith(testInput);
            expect(component.find(Search).state().input).toBe('');
            expect(component.find(Search).state().inputRef.value).toBe('');
            mock.reset();
            done();
        }, 500);
    });

    it('submitQuery() sets state.loading value to true initially and then to false ' +
        'when response is received', (done) => {
        const mock = new MockAdapter(axios);
        const resp = [];
        mock.onGet().reply(200, resp);

        const mockSetQuery = jest.fn();

        component = mount(
            <Provider store={store}>
                <Search setQuery={mockSetQuery}/>
            </Provider>
        );
        const testInput = 'test input value';

        component.find('#searchFormInput').at(0).simulate('change', {target: {value: testInput}});
        component.update();

        const mockedEvent = {preventDefault: () => {}};
        component.find(Search).instance().submitQuery(mockedEvent);
        component.update();
        expect(component.find(Search).state().loading).toBe(true);

        setTimeout(function () {
            expect(component.find(Search).state().loading).toBe(false);
            mock.reset();
            done();
        }, 500);
    });

    it('resetResults() resets the according values', () => {
        const testValue = 'testValue';

        const mockSetResults = jest.fn();
        const mockSetQuery = jest.fn();

        component = mount(
            <Provider store={store}>
                <Search setResults={mockSetResults} setQuery={mockSetQuery}/>
            </Provider>
        );

        component.find(Search).instance().setState({
            input: testValue,
            inputRef: {
                value: testValue
            }
        });

        expect(component.find(Search).state('input')).toBe(testValue);
        expect(component.find(Search).state('inputRef').value).toBe(testValue);
        expect(mockSetResults).toHaveBeenCalledTimes(0);

        const mockedEvent = {preventDefault: () => {}};
        component.find(Search).instance().resetResults(mockedEvent);

        expect(mockSetQuery).toHaveBeenCalledWith('');
        expect(component.find(Search).state('input')).toBe('');
        expect(component.find(Search).state('inputRef').value).toBe('');
        expect(mockSetResults).toHaveBeenCalledWith([]);
    });

    it('getInputRefFromChild(ref) sets ref as state value', (done) => {
        const ref = 'mock ref'
        const mockRef = {current: ref};

        component = mount(
            <Provider store={store}>
                <Search />
            </Provider>
        );


        component.find(Search).instance().getInputRefFromChild(mockRef);
        component.update();

        setTimeout(function () {
            expect(component.find(Search).state().inputRef).toBe(ref);
            done();
        }, 500);
    });

    it('renders CircularProgress when state.loading value is true', () => {
        component = mount(
            <Provider store={store}>
                <Search />
            </Provider>
        );

        expect(component.find(Search).html().includes('CircularProgress')).toBeFalsy();
        component.find(Search).setState({loading: true});
        component.update();
        expect(component.find(Search).html().includes('CircularProgress')).toBeTruthy();
    });
});