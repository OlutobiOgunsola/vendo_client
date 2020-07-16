import React from 'react';
import { shallow } from 'enzyme';
import Numbers from '../Numbers';

describe('Numbers', () => {
  let NumbersComponent;
  beforeEach(() => {
    NumbersComponent = shallow(<Numbers />);
  });
  it('should render correctly', () => {
    expect(NumbersComponent).toMatchSnapshot();
  });
});