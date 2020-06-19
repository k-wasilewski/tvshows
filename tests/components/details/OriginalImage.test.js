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
        switch (className) {
            case 'imageCard':
                return `makeStyles-${className}-18`;
            case 'imageWrapperCard':
                return `makeStyles-${className}-17`;
            case 'hidden':
                return `makeStyles-${className}-8`;
        }
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
        component.unmount();
    });

    it('is hidden when props.src value is empty', (done) => {
        configure({adapter: new Adapter()});

        const mockSrc = 'mockSrc';
        const mockTitle = 'mockTitle';

        const component = mount(
            <OriginalImage src={mockSrc} title={mockTitle} />
        );

        let imgCard = component.find('#originalImageCard').at(0);

        expect(imgCard.prop('className')).toBe(getMaterialUIClassName('imageWrapperCard'));

        component.setProps({src: ''});
        component.update();

        setTimeout(function () {
            imgCard = component.find('#originalImageCard').at(0);
            expect(imgCard.prop('className')).toBe(getMaterialUIClassName('hidden'));
            component.unmount();
            done();
        }, 500);
    });

    it('props.notifyParent() is called and visibility is set to false when close button ' +
        'is clicked', (done) => {
        configure({adapter: new Adapter()});

        const mockSrc = 'mockSrc';
        const mockTitle = 'mockTitle';
        const mockNotifyParent = jest.fn();
        const mockUseState = jest.spyOn(React, 'useState');

        const component = mount(
            <OriginalImage src={mockSrc} title={mockTitle} notifyParent={mockNotifyParent} />
        );

        let closeBtn = component.find('#originalImageCloseBtn').at(0);
        closeBtn.simulate('click');
        component.update();

        setTimeout(function () {
            expect(mockNotifyParent).toHaveBeenCalledTimes(1);
            expect(mockUseState).toHaveBeenCalledWith(false);
            component.unmount();
            done();
        }, 500);
    });
});