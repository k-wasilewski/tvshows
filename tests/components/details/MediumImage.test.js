import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import ConnectedMediumImage, {MediumImage} from "../../../src/components/details/MediumImage";
import {Provider} from "react-redux";
import {configure, mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

describe("MediumImage rendering specification", () => {
    it('MediumImage is rendered', () => {
        const name = 'sample name';
        const mediumImgSrc = 'medium src';

        const testResult = {
            show: {
                name: name,
                image: {
                    medium: mediumImgSrc
                }
            }
        };

        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <ConnectedMediumImage result={testResult} />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("MediumImage functional specification", () => {
    it('renders img element with attributes passed in props', () => {
        configure({adapter: new Adapter()});

        const name = 'sample name';
        const mediumImgSrc = 'medium src';

        const testResult = {
            show: {
                name: name,
                image: {
                    medium: mediumImgSrc
                }
            }
        };

        const component = mount(
            <MediumImage result={testResult} />
        );

        const img = component.find('#mediumImage').at(0);

        expect(img.html()).toContain(name);
        expect(img.html()).toContain(mediumImgSrc);
    });

    it('calls props.setOriginalImage when img is clicked', (done) => {
        configure({adapter: new Adapter()});

        const name = 'sample name';
        const mediumImgSrc = 'medium src';
        const originalImgSrc = 'original src';

        const testResult = {
            show: {
                name: name,
                image: {
                    medium: mediumImgSrc,
                    original: originalImgSrc
                }
            }
        };

        const mockSetOriginalImage = jest.fn();

        const component = mount(
            <MediumImage result={testResult} setOriginalImage={mockSetOriginalImage} />
        );

        const img = component.find('#mediumImage').at(0);
        img.simulate('click');
        component.update();

        setTimeout(function () {
            expect(mockSetOriginalImage).toHaveBeenCalledWith(originalImgSrc, name);
            component.unmount();
            done();
        }, 500);
    });
});