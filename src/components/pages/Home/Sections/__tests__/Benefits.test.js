import React from 'react';
import { shallow } from 'enzyme';
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
