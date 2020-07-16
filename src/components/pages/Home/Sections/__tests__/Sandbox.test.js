import React from 'react';
import { shallow } from 'enzyme';
import Sandbox from '../Sandbox';

describe('Sandbox', () => {
  let SandboxComponent;
  beforeEach(() => {
    SandboxComponent = shallow(<Sandbox />);
  });
  it('should render correctly', () => {
    expect(SandboxComponent).toMatchSnapshot();
  });
});