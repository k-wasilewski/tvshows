import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import ConnectedOriginalImage, {OriginalImage} from "../../../src/components/details/OriginalImage";
import {Provider} from "react-redux";
import {configure, mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

describe("OriginalImage rendering specification", () => {
    it('OriginalImage is rendered', () => {
        const mockSrc = 'mockSrc';
        const mockTitle = 'mockTitle';

        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <ConnectedOriginalImage src={mockSrc} title={mockTitle} />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("OriginalImage functional specification", () => {

    const getMaterialUIClassName = (className) => {
        return `makeStyles-${className}-17`;
    }

    it('renders img with src and title passed as props', () => {
        configure({adapter: new Adapter()});

        const mockSrc = 'mockSrc';
        const mockTitle = 'mockTitle';

        const component = mount(
            <OriginalImage src={mockSrc} title={mockTitle} />
        );

        const img = component.find(`.${getMaterialUIClassName('imageCard')}`).at(0);
        
        expect(img.prop('image')).toBe(mockSrc);
        expect(img.prop('title')).toBe(`${mockTitle}-img`);
    });
});