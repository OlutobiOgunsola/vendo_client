import React from 'react';
import { shallow } from 'enzyme';
import VendorHighlights from '../VendorHighlights';

describe('VendorHighlights', () => {
  let VendorHighlightsComponent;
  beforeEach(() => {
    VendorHighlightsComponent = shallow(<VendorHighlights />);
  });
  it('should render correctly', () => {
    expect(VendorHighlightsComponent).toMatchSnapshot();
  });
});
