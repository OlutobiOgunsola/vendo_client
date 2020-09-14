import React from '@/components/pages/Home/Sections/__tests__/node_modules/react';
import { shallow } from '@/components/pages/Home/Sections/__tests__/node_modules/enzyme';
import Categories from '../Categories';

describe('Categories', () => {
  let CategoriesComponent;
  beforeEach(() => {
    CategoriesComponent = shallow(<Categories />);
  });
  it('should render correctly', () => {
    expect(CategoriesComponent).toMatchSnapshot();
  });
});
