import React from 'react';
import { shallow } from 'enzyme';
import Testimonials from '../Testimonials';

describe('Testimonials', () => {
  let TestimonialComponent;
  beforeEach(() => {
    TestimonialComponent = shallow(<Testimonials />);
  });
  it('should render correctly', () => {
    expect(TestimonialComponent).toMatchSnapshot();
  });
});