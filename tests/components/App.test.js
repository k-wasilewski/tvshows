import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import ConnectedApp, {App} from "../../src/components/App";
import {Provider} from "react-redux";
import {configure, mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import OriginalImage from "../../src/components/details/OriginalImage";

describe("App rendering specification", () => {
    it('App is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <ConnectedApp/>
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("App functional specification", () => {
    let component;

    beforeEach(() => {
        configure({ adapter: new Adapter() });
    });

    afterEach(() => {
        component.unmount();
    });

    it('toggles copyrightClassName when props.detailedResult change', (done) => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );
        let copyright = component.find('#copyright').at(0).find('h2');

        expect(copyright.prop('className')).toContain('copyrightLandingPage');

        component.setProps({children: <BrowserRouter><App detailedResult='changed'/></BrowserRouter>});
        component.update();
        copyright = component.find('#copyright').at(0).find('h2');

        setTimeout(function () {
            expect(copyright.prop('className')).toContain('copyrightDetails');
            done();
        }, 500)
    });

    it('className changes when redux props.img value is empty', (done) => {
        component = mount(
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
            done();
        }, 500);
    });

    it('resets redux props.originalImage value when notified by OriginalImage', (done) => {
        const mockSetOriginalImage = jest.fn();

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <App setOriginalImage={mockSetOriginalImage} />
                </BrowserRouter>
            </Provider>
        );

        component.find(OriginalImage).prop('notifyParent')();
        component.update();

        setTimeout(function () {
            expect(mockSetOriginalImage).toHaveBeenCalledWith('', '');
            done();
        }, 500);
    });
});