import "@testing-library/jest-dom/extend-expect"
import React from 'react';
import store from "../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import {App} from "../../src/components/App";
import {Provider} from "react-redux";
import {configure, mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

describe("styles functional specification", () => {

    it('App styling changes correctly', (done) => {
        configure({adapter: new Adapter()});

        const component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <App img=''/>
                </BrowserRouter>
            </Provider>
        );

        expect(component.find('#App').getDOMNode().className).toContain('-App-');

        component.setProps({children: <BrowserRouter><App img='changed'/></BrowserRouter>});
        component.update();

        setTimeout(function () {
            expect(component.find('#App').getDOMNode().className).toContain('-blurApp-');
            component.unmount();
            done();
        }, 500);
    });
});