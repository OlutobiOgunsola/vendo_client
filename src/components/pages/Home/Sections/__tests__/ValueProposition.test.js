import React from '@/components/pages/Home/Sections/__tests__/node_modules/react';
import { shallow } from '@/components/pages/Home/Sections/__tests__/node_modules/enzyme';
import ValueProposition from '../ValueProposition';

describe('ValueProposition', () => {
  let ValueProposition;
  beforeEach(() => {
    ValueProposition = shallow(<ValueProposition />);
  });
  it('should render correctly', () => {
    expect(ValueProposition).toMatchSnapshot();
  });
});
