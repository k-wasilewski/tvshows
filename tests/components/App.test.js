import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import {App} from "../../src/components/App";
import {Provider} from "react-redux";
import {configure, mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

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

    describe("App functional specification", () => {

        function getCopyright(component) {
            return component.find('#copyright').at(0).find('h2');
        }

        function getMaterialUIClassName(className) {
            return `MuiTypography-root makeStyles-${className}-4 MuiTypography-h6`;
        }

        it('toggles copyrightClassName when props.detailedResult change', () => {
            configure({adapter: new Adapter()});

            //test App component without props
            const component = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>
            );
            const copyright = getCopyright(component);
            const copyrightLandingPageClassName =
                getMaterialUIClassName('copyrightLandingPage');

            expect(copyright.hasClass(copyrightLandingPageClassName)).toBeTruthy();
            component.unmount();

            //test App component with props.detailedResult changed
            const componentChanged = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <App detailedResult='changed' />
                    </BrowserRouter>
                </Provider>
            );
            const copyrightDetailsClassName = getMaterialUIClassName('copyrightDetails');

            setTimeout(function () {
                expect(copyright.hasClass(copyrightDetailsClassName)).toBeTruthy();
                componentChanged.unmount();
            }, 500)
        });
    });
});