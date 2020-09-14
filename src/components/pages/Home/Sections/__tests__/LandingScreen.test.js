import React from '@/components/pages/Home/Sections/__tests__/node_modules/react';
import { shallow } from '@/components/pages/Home/Sections/__tests__/node_modules/enzyme';
import LandingScreen from '../LandingScreen';

describe('LandingScreen', () => {
  let LandingScreenComponent;
  beforeEach(() => {
    LandingScreenComponent = shallow(<LandingScreen />);
  });
  it('should render correctly', () => {
    expect(LandingScreenComponent).toMatchSnapshot();
  });
});
