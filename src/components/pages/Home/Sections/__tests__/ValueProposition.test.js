import React from 'react';
import { shallow } from 'enzyme';
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
