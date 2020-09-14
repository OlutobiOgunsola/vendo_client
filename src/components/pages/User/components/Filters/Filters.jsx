import React from 'react';
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
  border: solid 1px ${(props) => props.theme.colors.saturated_contrast_20};
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  color: ${(props) => props.theme.colors.saturated_contrast};
  padding: 0px 8px;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;

const SortBy = styled.select`
  width: 150px;
  height: 40px;
  border: solid 1px ${(props) => props.theme.colors.saturated_contrast_20};
  border-radius: 4px;
  padding: 8px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.05);
  color: ${(props) => props.theme.colors.saturated_contrast};
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
  return (
    <ParentContainer>
      <Container>
        <Label for="searchbar">Search</Label>
        <Searchbar type="search" id="searchbar" placeholder="Search" />
        <Label for="sortby">Sort by</Label>
        <SortBy id="sortby">
          <Option>Date</Option>
          <Option>Rating - Highest</Option>
          <Option>Rating - Lowest</Option>
        </SortBy>
      </Container>
    </ParentContainer>
  );
};

FilterComponent.propTypes = {};
export default withTheme(FilterComponent);
