import React from '@/components/pages/Home/Sections/__tests__/node_modules/react';
import { shallow } from '@/components/pages/Home/Sections/__tests__/node_modules/enzyme';
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