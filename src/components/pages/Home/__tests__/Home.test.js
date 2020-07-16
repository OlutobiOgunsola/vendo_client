import React from 'react';
import { shallow } from 'enzyme';
import Home from '../Home';
describe('Homepage', () => {
  let home;
  beforeEach(() => {
    home = shallow(<Home debug />);
  });
  it('should render correctly in "debug" mode', () => {
    expect(home).toMatchSnapshot();
  });
  it('should render header in no user state', () => {
      
  });
});
