import React from 'react';
import {MemoryRouter} from "react-router-dom";
import LandingPage from "../../src/components/landing-page/LandingPage";
import Details from "../../src/components/details/Details";
import store from "../../src/redux/store";
import {Provider} from "react-redux";
import App from "../../src/components/App";
import {mount, configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

describe("Router functional specification", () => {
    let component;
    const root = document.createElement('div');

    beforeEach(() => {
        configure({ adapter: new Adapter() });

        document.body.appendChild(root);
    });

    afterEach(() => {
        component.unmount();
    });

    it('component "LandingPage" is displayed when "/" url is passed', () => {
        component = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(component.find(LandingPage)).toHaveLength(1);
    });

    it('component "Details" is displayed when "/details" url is passed', () => {
        component = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/details']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(component.find(Details)).toHaveLength(1);
    });
});