import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import ConnectedOriginalImage, {OriginalImage} from "../../../src/components/details/OriginalImage";
import {Provider} from "react-redux";
import {configure, mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { createShallow, createMount } from '@material-ui/core/test-utils';

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
    let component;

    beforeEach(() => {
        configure({ adapter: new Adapter() });
    });

    afterEach(() => {
        component.unmount();
    });

    it('renders img with src and title passed as props', () => {
        const shallow = createShallow({ dive: true });

        const mockSrc = 'mockSrc';
        const mockTitle = 'mockTitle';

        component = shallow(
            <OriginalImage src={mockSrc} title={mockTitle} />
        );

        const img = component.find('[className*="imageCard"]').at(0);

        expect(img.prop('image')).toBe(mockSrc);
        expect(img.prop('title')).toBe(`${mockTitle}-img`);
    });

    it('is hidden when props.src value is empty', (done) => {
         const mount = createMount();

        const mockSrc = 'mockSrc';
        const mockTitle = 'mockTitle';

        component = mount(
            <OriginalImage src={mockSrc} title={mockTitle} />
        );

        let imgCard = component.find('[id*="originalImageCard"]').at(0);

        expect(imgCard.prop('className')).toContain('imageWrapperCard');

        component.setProps({src: ''});
        component.update();

        setTimeout(function () {
            imgCard = component.find('#originalImageCard').at(0);
            expect(imgCard.prop('className')).toContain('hidden');
            done();
        }, 500);
    });

    it('props.notifyParent() is called and visibility is set to false when close button ' +
        'is clicked', (done) => {
        const mockSrc = 'mockSrc';
        const mockTitle = 'mockTitle';
        const mockNotifyParent = jest.fn();
        const mockUseState = jest.spyOn(React, 'useState');

        component = mount(
            <OriginalImage src={mockSrc} title={mockTitle} notifyParent={mockNotifyParent} />
        );

        let closeBtn = component.find('#originalImageCloseBtn').at(0);
        closeBtn.simulate('click');
        component.update();

        setTimeout(function () {
            expect(mockNotifyParent).toHaveBeenCalledTimes(1);
            expect(mockUseState).toHaveBeenCalledWith(false);
            done();
        }, 500);
    });
});