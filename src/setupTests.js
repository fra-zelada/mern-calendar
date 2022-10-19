import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {createSerializer} from 'enzyme-to-json';
//import "jest-enzyme";
Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({mode: 'deep', noKey: true}));

HTMLCanvasElement.prototype.getContext = () => {}

//const noScroll = () => {};

//Object.defineProperty(window, 'scrollTo', {value: noScroll, writable: true})

//import '@testing-library/jest-dom/extend-expect';
