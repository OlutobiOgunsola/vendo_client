import React from 'react';
import { shallow } from 'enzyme';
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
