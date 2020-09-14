import React from '@/components/pages/Home/Sections/__tests__/node_modules/react';
import { shallow } from '@/components/pages/Home/Sections/__tests__/node_modules/enzyme';
import Benefits from '../Benefits';

describe('Benefits', () => {
  let BenefitsComponent;
  beforeEach(() => {
    BenefitsComponent = shallow(<Benefits />);
  });
  it('should render correctly', () => {
    expect(BenefitsComponent).toMatchSnapshot();
  });
});
