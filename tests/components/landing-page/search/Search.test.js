import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import ConnectedSearch, {Search} from "../../../../src/components/landing-page/search/Search";
import {Provider} from "react-redux";
import {configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {mount} from "enzyme";

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
        }, 4000);
    });
});