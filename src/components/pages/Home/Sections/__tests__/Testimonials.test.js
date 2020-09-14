import React from '@/components/pages/Home/Sections/__tests__/node_modules/react';
import { shallow } from '@/components/pages/Home/Sections/__tests__/node_modules/enzyme';
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