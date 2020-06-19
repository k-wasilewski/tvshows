import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import ConnectedSearch, {Search} from "../../../../src/components/landing-page/search/Search";
import {Provider} from "react-redux";
import {configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {mount, shallow} from "enzyme";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

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

    it('sets state.input value as SearchForm\'s input', () => {
        configure({adapter: new Adapter()});

        const component = mount(
            <Provider store={store}>
                <ConnectedSearch />
            </Provider>
        );
        const testInput = 'test input value';

        const input = component.find('#searchFormInput');
        input.simulate('change', { target: { value: testInput } });

        setTimeout(function () {
            expect(component.find(Search).instance().state.input).toBe(testInput);
            component.unmount();
        }, 500);
    });

    it('submitQuery() is called when form is submitted', () => {
        const submitQuery = jest.spyOn(Search.prototype, 'submitQuery');

        const mockSetQuery = jest.fn();

        const component = mount(
            <Provider store={store}>
                <Search setQuery={mockSetQuery}/>
            </Provider>
        );

        const searchForm = component.find('#searchForm');
        searchForm.forEach(form => form.simulate('submit'));

        expect(submitQuery).toHaveBeenCalled();
        expect(mockSetQuery).toHaveBeenCalled();
        component.unmount();
    });

    it('submitQuery() submits a query from state.input value', (done) => {
        const mock = new MockAdapter(axios);
        const resp = 'success';
        const testInput = 'testInput';
        mock.onGet().reply(200, resp);

        const mockSetQuery = jest.fn();
        const mockSetResults = jest.fn();

        const component = mount(
            <Provider store={store}>
                <Search setResults={mockSetResults} setQuery={mockSetQuery} />
            </Provider>
        );

        component.find('#searchFormInput').at(0).simulate('change', {target: {value: testInput}});
        component.update();

        const mockedEvent = {preventDefault: () => {}};
        component.find(Search).instance().submitQuery(mockedEvent);

        setTimeout(function () {
            expect(mockSetQuery).toHaveBeenCalledWith(testInput);
            expect(mockSetResults).toHaveBeenCalledWith(resp);
            component.unmount();
            mock.reset();
            done();
        }, 500);
    });

    it('submitQuery() sets state.errorMsg accordingly when input value is empty', (done) => {
        const mock = new MockAdapter(axios);
        const resp = 'success';
        mock.onGet().reply(200, resp);

        const mockSetQuery = jest.fn();

        const component = mount(
            <Provider store={store}>
                <Search setQuery={mockSetQuery}/>
            </Provider>
        );

        const mockedEvent = {preventDefault: () => {}};
        component.find(Search).instance().submitQuery(mockedEvent);

        setTimeout(function () {
            expect(component.find(Search).state().errorMsg).toBe('Pole nie może być puste');
            component.unmount();
            mock.reset();
            done();
        }, 500);
    });

    it('submitQuery() sets state.errorMsg accordingly when response from server equals 0', (done) => {
        const mock = new MockAdapter(axios);
        const resp = [];
        mock.onGet().reply(200, resp);

        const mockSetQuery = jest.fn();

        const component = mount(
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
            expect(component.find(Search).state().errorMsg).toBe('Nic nie znaleziono');
            component.unmount();
            mock.reset();
            done();
        }, 4000);
    });

    it('resetResults() resets the according values', () => {
        const testValue = 'testValue';

        const mockSetResults = jest.fn();
        const mockSetQuery = jest.fn();

        const component = mount(
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

        component.unmount();
    });
});