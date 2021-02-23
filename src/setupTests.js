// setting the "enzyme" library and jest-extended to work in project 

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
require('jest-extended'); //ES-5 format

configure({adapter: new Adapter()});

const config = {
    "jest": {
        "setupTestFrameworkScriptFile": "jest-extended"
      }
};

export default config;