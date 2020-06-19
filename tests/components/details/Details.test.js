import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import ConnectedDetails, {Details} from "../../../src/components/details/Details";
import {Provider} from "react-redux";
import {configure, mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {ErrorMsg} from "../../../src/components/error/ErrorMsg";
import Button from '@material-ui/core/Button';

describe("Details rendering specification", () => {
    it('Details is rendered', () => {
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

        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <ConnectedDetails detailedResult={testResult} />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

describe("Details functional specification", () => {
    let component;

    beforeEach(() => {
        configure({ adapter: new Adapter() });
    });

    afterEach(() => {
        component.unmount();
    });

    it('renders ErrorMsg when props.detailedResult value is empty', (done) => {
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

        component = mount(
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
            done();
        }, 500);
    });

    it('redirects to \' when goBackBtn is clicked', (done) => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <ConnectedDetails />
                </BrowserRouter>
            </Provider>
        );

        const goBackBtn = component.find(Button).at(0);
        goBackBtn.simulate('click');
        component.update();

        setTimeout(function () {
            expect(mockHistoryPush).toHaveBeenCalledWith('/');
            done();
        }, 500);
    });
});