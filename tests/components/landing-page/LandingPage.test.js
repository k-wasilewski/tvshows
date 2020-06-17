import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import LandingPage from "../../../src/components/landing-page/LandingPage";
import {Provider} from "react-redux";

describe("LandingPage rendering specification", () => {
    it('LandingPage is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <LandingPage />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});