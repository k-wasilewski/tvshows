import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import {App} from "../../src/components/App";
import {Provider} from "react-redux";
import {configure, mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { createShallow, createMount } from '@material-ui/core/test-utils';

describe("App rendering specification", () => {
    it('App is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("App functional specification", () => {

    function getCopyright(component) {
        return component.find('#copyright').at(0).find('h2');
    }

    function getMaterialUIClassName(className) {
        switch (className) {
            case 'copyrightLandingPage':
                return `MuiTypography-root makeStyles-${className}-4 MuiTypography-h6`;
            case 'copyrightDetails':
                return `MuiTypography-root makeStyles-${className}-5 MuiTypography-h6`;
        }
    }

    it('toggles copyrightClassName when props.detailedResult change', (done) => {
        configure({adapter: new Adapter()});
        const mount = createMount();

        const component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );
        let copyright = getCopyright(component);
        const copyrightLandingPageClassName =
            getMaterialUIClassName('copyrightLandingPage');

        expect(copyright.hasClass(copyrightLandingPageClassName)).toBeTruthy();

        component.setProps({children: <BrowserRouter><App detailedResult='changed'/></BrowserRouter>});
        component.update();
        copyright = getCopyright(component);
        const copyrightDetailsClassName = getMaterialUIClassName('copyrightDetails');

        setTimeout(function () {
            expect(copyright.hasClass(copyrightDetailsClassName)).toBeTruthy();
            component.unmount();
            done();
        }, 500)
    });

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