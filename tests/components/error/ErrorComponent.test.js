import React from 'react';
import renderer from 'react-test-renderer';
import {ErrorComponent} from "../../../src/components/error/ErrorComponent";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Button} from "@material-ui/core";
import {Router} from "react-router-dom";

describe("ErrorComponent rendering specification", () => {
    it('ErrorComponent is rendered', () => {
        const component = renderer.create(
            <ErrorComponent/>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("ErrorComponent functional specification", () => {
    it('button onClick redirects to landing page onClick', (done) => {
        configure({adapter: new Adapter()});

        const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

        const component = mount(
            <Router history={historyMock}>
                <ErrorComponent msg='Nie znaleziono strony' />
            </Router>
        );

        const returnBtn = component.find(Button).at(0);
        returnBtn.simulate('click');
        component.update();

        setTimeout(function () {
            expect(historyMock.push).toHaveBeenCalledWith('/');

            done();
        }, 500);
    });
});