import React from '@/components/pages/Home/Sections/__tests__/node_modules/react';
import { shallow } from '@/components/pages/Home/Sections/__tests__/node_modules/enzyme';
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
