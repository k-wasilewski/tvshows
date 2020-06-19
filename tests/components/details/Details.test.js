import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import ConnectedDetails, {Details} from "../../../src/components/details/Details";
import {Provider} from "react-redux";
import {configure, mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {ErrorMsg} from "../../../src/components/misc/ErrorMsg";

describe("Details rendering specification", () => {
    it('Details is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <ConnectedDetails />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("Details functional specification", () => {
    it('renders ErrorMsg when props.detailedResult value is empty', (done) => {
        configure({adapter: new Adapter()});

        const testResult = {
            show: {
                name: 'sample name',
                image: {
                    medium: 'mediumSrc',
                    original: 'originalSrc'
                }
            },
            score: 2
        };

        const errorMsg = 'Należy wybrać element z listy';

        const component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <ConnectedDetails />
                </BrowserRouter>
            </Provider>
        );

        expect(component.find(ErrorMsg).html()).toContain(errorMsg);
        component.setProps({children: <BrowserRouter>
                <Details detailedResult={testResult}/>
            </BrowserRouter>});
        component.update();

        setTimeout(function () {
            expect(component.find(ErrorMsg).debug()).toBe('');
            component.unmount();
            done();
        }, 500);
    });
});