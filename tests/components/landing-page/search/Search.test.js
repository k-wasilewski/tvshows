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
            <Search />
        );
        const testInput = 'test input value';

        const input = component.find('#searchFormInput');
        input.simulate('change', { target: { value: testInput } });

        setTimeout(function () {
            expect(component.instance().state.input).toBe(testInput);
            component.unmount();
        }, 500);
    });

    it('submitQuery() is called when form is submitted', () => {
        const submitQuery = jest.spyOn(Search.prototype, 'submitQuery');

        const component = mount(
            <Provider store={store}>
                <Search />
            </Provider>
        );

        const searchForm = component.find('#searchForm');
        searchForm.forEach(form => form.simulate('submit'));

        expect(submitQuery).toHaveBeenCalled()
        component.unmount();
    });

    it('submitQuery() submits a query from state.input value', (done) => {
        const mock = new MockAdapter(axios);
        const resp = 'success';
        const testInput = 'testInput';
        mock.onGet().reply(200, resp);

        const mockSetResults = jest.fn();

        const component = shallow(
            <Search setResults={mockSetResults} />
        );

        component.setState({input: testInput});
        component.update();

        const mockedEvent = {preventDefault: () => {}};
        component.instance().submitQuery(mockedEvent);

        setTimeout(function () {
            expect(mockSetResults).toHaveBeenCalledWith(resp);
            component.unmount();
            done();
        }, 500);
    });

    it('submitQuery() sets state.errorMsg accordingly when input value is empty', (done) => {
        const mock = new MockAdapter(axios);
        const resp = 'success';
        mock.onGet().reply(200, resp);

        const mockSetState = jest.spyOn(Search.prototype, 'setState');

        const component = shallow(
            <Search />
        );

        const mockedEvent = {preventDefault: () => {}};
        component.instance().submitQuery(mockedEvent);

        const testInput = '';
        component.setState({input: testInput});
        component.update();

        setTimeout(function () {
            expect(mockSetState).toHaveBeenCalled();
            expect(component.state().errorMsg).toBe('Pole nie może być puste');
            component.unmount();
            done();
        }, 500);
    });
});