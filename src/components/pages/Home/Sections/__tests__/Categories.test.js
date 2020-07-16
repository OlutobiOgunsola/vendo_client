import React from 'react';
import { shallow } from 'enzyme';
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
