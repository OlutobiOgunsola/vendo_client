import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

const ParentContainer = styled.div`
  width: 100%;
  height: 50px;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Label = styled.label`
  display: none;
`;

const Searchbar = styled.input`
  width: 250px;
  height: 40px;
  margin: 5px;
  /* border: solid 0px ${(props) =>
    props.theme.colors.saturated_contrast_20}; */
  border: none;
  border-radius: 4px;
  background: ${(props) => props.theme.colors.review_background};
  color: ${(props) => props.theme.colors.saturated_contrast_60};
  padding: 0px 8px;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;

const SortBy = styled.select`
  width: 150px;
  height: 40px;
  border: none;
  border-radius: 4px;
  padding: 8px;
  box-sizing: border-box;
  background: ${(props) => props.theme.colors.review_background};
  color: ${(props) => props.theme.colors.saturated_contrast_60};
  &:focus {
    outline: none;
  }
`;

const Option = styled.option`
  padding: 4px;
  background: ${(props) => props.theme.colors.light_background};
  color: ${(props) => props.theme.colors.saturated_contrast};
  border: none;
  &:hover {
    background: ${(props) => props.theme.colors.yellow};
    color: ${(props) => props.theme.colors.saturated_font_darker};
  }
`;

const FilterComponent = (props) => {
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    const value = e.target.value;
    setValue((prev) => {
      return value;
    });
    props.handleChange(value);
  };
  return (
    <ParentContainer>
      <Container>
        <Label htmlFor="searchbar">Search</Label>
        <Searchbar type="search" id="searchbar" placeholder="Search" />
        <Label htmlFor="sortby">Sort by</Label>
        <SortBy id="sortby" onChange={handleChange}>
          <Option value="newest">Date</Option>
          <Option value="rating">Rating - Highest</Option>
        </SortBy>
      </Container>
    </ParentContainer>
  );
};

FilterComponent.propTypes = {};
export default withTheme(FilterComponent);
