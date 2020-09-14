import React from '@/components/pages/Home/Sections/__tests__/node_modules/react';
import { shallow } from '@/components/pages/Home/Sections/__tests__/node_modules/enzyme';
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