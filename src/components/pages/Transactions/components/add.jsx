import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, withTheme } from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { fadeIn, slideInUp } from 'react-animations';
import AOS from 'aos';
import 'aos/dist/aos.css';
import StarRatings from 'react-star-ratings';
import Lottie from 'react-lottie';

import DefaultImage from '@/assets/images/icons/account/Profile.svg';
import emptyReview from '@/assets/images/lottie/emptyReview.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faStore,
  faLongArrowAltRight,
} from '@fortawesome/free-solid-svg-icons';
import ReviewItem from '@/components/UI/interface/account/Review.jsx';

import { getTransaction } from '@/actions/transaction';
import { connect } from 'react-redux';
import Alert from '@/components/widgets/UI/Alert';
import setAlert from '@/assets/helperFunctions/alerts';
import { debounce } from '@/assets/helperFunctions/debounce';
import InputRow from '@/components/widgets/UI/InputRow';
import { useCallback } from 'react';

const fadeInUpAnimation = keyframes`${fadeIn}`;
const slideInUpAnimation = keyframes`${slideInUp}`;

const ParentContainer = styled.div`
  background: ${(props) => props.theme.colors.page_background};
  width: 100%;
  height: auto;
  position: relative;
  z-index: 9;
  box-sizing: border-box;
  transition: all 0.25s ease-in-out;
  margin: 32px auto 0px auto;
  /* animation: 0.5s ${slideInUpAnimation}; */
  padding: 32px;
  @media (max-width: 500px) {
    padding: 16px;
  }
  @media (max-width: 400px) {
    padding: 16px 8px;
  }
`;

const Container = styled.div`
  width: 100%;
`;

const TextContainer = styled.span`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 16px;
`;

const Text = styled.p`
  display: inline-block;
  font-family: 'Josefin Sans Regular';
  width: calc(100% - 124px);
  font-size: 16px;
  font-weight: 500;
  box-sizing: border-box;
  opacity: 0.8;
  color: ${(props) => props.theme.colors.saturated_contrast};
  margin: 0;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

const ExpandGroup = styled(Link)`
  width: 100%;
  text-align: left;
  color: ${(props) => props.theme.colors.saturated_font_darker};
  font-family: 'Josefin Sans Light';
  font-size: 12px;
  opacity: 0.6;
  transition: all 0.25s ease-in-out;
  &:hover {
    opacity: 1;
    cursor: pointer;
    text-decoration: underline;
  }
  .fa-icon {
    margin-right: 4px;
    opacity: 0.6;
    transition: all 0.25s ease-in-out;
    &:hover {
      opacity: 1;
      cursor: pointer;
    }
  }
`;

const CommentsContainer = styled.div`
  width: 100%;
`;

const ProfileActions = styled.div`
  height: 50px;
  width: 100%;
  margin: 16px auto;
  display: flex;
  justify-content: space-between;
`;

const Action = styled(Link)`
  display: inline-block;
  height: 100%;
  line-height: 50px;
  width: ${(props) => (props.width ? props.width : '48%')};
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
  background: ${(props) => props.theme.colors.light_background};
  color: ${(props) =>
    props.borders
      ? `${props.theme.colors.yellow}`
      : `${props.theme.colors.saturated_contrast}`};
  border: ${(props) =>
    props.borders ? `1px solid ${props.theme.colors.yellow}` : 'none'};
  border-radius: 4px;
  transition: all 0.25s ease-in-out;
  text-decoration: none;
  .fa-icon {
    position: relative;
    left: 0px;
    margin-left: 4px;
    transition: all 0.25s ease-in-out;
    opacity: 0;
    color: ${(props) => props.theme.colors.dark_background};
  }
  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.colors.yellow};
    color: ${(props) => props.theme.colors.dark_background};
    width: ${(props) => (props.hover_width ? props.hover_width : '48.5%')};
    box-shadow: 0px 4px 10px ${(props) => props.theme.colors.yellow_20};
    .fa-icon {
      left: 16px;
      margin-left: 12px;
      opacity: 1;
    }
  }
`;
const TransactionProfile = styled.section`
  width: 100%;
  min-height: 200px;
  height: auto;
  background: ${(props) => {
    return props.background_cover_image
      ? `url(${props.background_cover_image})`
      : props.theme.colors.dark_background;
  }};
  /* margin: 40px 0px; */
`;

const StoreImage = styled.img`
  height: 150px;
  width: 150px;
  border-style: solid;
  border-width: 8px;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  top: 20%;
  border-color: ${(props) => {
    switch (props.platform) {
      case 'facebook':
        return '#395185';

      case 'twitter':
        return '#55acee';

      case 'instagram':
        return '#d53f90';

      default:
        return `${props.theme.colors.yellow}`;
    }
  }};
`;
const TransactionDetails = styled.div`
  width: calc(100% - 182px);
  display: inline-block;
  flex-flow: column nowrap;
  margin-left: auto;
  box-sizing: border-box;
  padding: 16px;
  border-bottom: 2px solid ${(props) => props.theme.colors.light_background};
`;
const TransactionDetailsContainer = styled.div`
  max-width: 880px;
  height: auto;
  margin: 0px auto 40px auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;
const NameBar = styled.span`
  display: block;
  width: 100%;
  text-align: left;
  padding: 0px;
  h1 {
    margin: 0;
    display: inline-block;
    font-family: 'Noto Sans Regular';
    font-size: 32px;
    color: ${(props) => props.theme.colors.yellow};
  }
  h2 {
    display: inline-block;
    font-family: 'Noto Sans Regular';
    font-weight: 300;
    font-size: 32px;
    color: ${(props) => props.theme.colors.saturated_contrast};
    margin: 0;
  }
`;

const RequestGroup = styled.div`
  height: 35px;
  padding: 4px 16px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.1);
  display: inline-block;
  margin: 0;
  margin: 8px 0px 4px 0px;
`;

const Requested = styled.h5`
  line-height: 30px;
  margin: 0;
  font-family: 'Noto Sans Regular';
  font-weight: 300;
  font-size: 12px;
  display: inline-block;
  color: ${(props) => props.theme.colors.saturated_contrast};
`;

const RequestedUsername = styled.h6`
  line-height: 30px;
  margin: 0;
  font-family: 'Noto Sans Regular';
  font-weight: 300;
  font-size: 16px;
  color: ${(props) => props.theme.colors.yellow};
  display: inline-block;
  margin-left: 6px;
`;
const Handle_And_Rating = styled.div`
  margin: 8px 0px;
`;
const Handle = styled.span`
  margin: 0;
  font-family: 'Josefin Sans Regular';
  color: ${(props) => props.theme.colors.saturated_contrast};
`;
const Rating = styled.span`
  margin: 0;
`;
const Bio = styled.p`
  margin: 0;
  max-height: 64px;
  padding: 8px 0px;
  font-size: 14px;
  font-family: 'Josefin Sans Light';
  color: ${(props) => props.theme.colors.saturated_contrast};
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const Tags = styled.div`
  margin: 16px 0px;
`;
const TagItem = styled.span`
  padding: 8px;
  background: ${(props) => props.theme.colors.light_background};
  margin-left: 8px;
  box-shadow: 2px 4px 10px ${(props) => props.theme.colors.dark_background_20};
  color: ${(props) => props.theme.colors.saturated_contrast};
  &:first-child {
    margin-left: 0px;
  }
`;
const EmptyStateText = styled.h5`
  text-align: center;
  color: ${(props) => props.theme.colors.saturated_contrast};
  margin: 16px 0px 8px 0px;
  width: 100%;
`;
const EmptyStateSubtext = styled.p`
  font-size: 12px;
  text-align: center;
  width: 100%;
  margin: 0px 0px 40px 0px;
  color: ${(props) => props.theme.colors.saturated_contrast};
`;

const SearchBox = styled.input`
  width: 300px;
  height: 30px;
  background: rgba(0, 0, 0, 0.1);
  /* background: rgba(255, 255, 255, 0.1); */
  border: none;
  border-radius: 4px;
  color: white;
  font-family: 'Noto Sans Regular';
  font-size: 12px;
  padding: 0px 8px;
  &:focus {
    outline: none;
  }
`;

const StoresContainer = styled.div`
  width: 100%;
  height: auto;
  background: ${(props) => props.theme.colors.dark_background};
  padding: 16px 0px;
`;

const Store = styled.div`
  width: 100%;
  height: 100px;
  background: blue;
`;
const AddTransaction = (props) => {
  const StoreId = props.store_id;
  const [store_id, setStore_Id] = useState(StoreId);

  const [searchString, setSearchString] = useState('');
  const [store, setStore] = useState({
    photo: '',
    name: '',
    description: '',
    tags: '',
    categories: '',
    platform: '',
  });
  const [stores, setStores] = useState([]);
  const store_image = props.store_image || store.photo;
  const foundStore = store._id !== '' && store._id !== undefined;
  const getStores = useCallback(
    debounce((string) => {
      return axios
        .post(`${process.env.REACT_APP_API_PREFIX}/api/stores/search`, {
          search_query: `${string}`,
        })
        .then((result) => {
          const stores = result.data.data;
          setStores(stores);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500),
    [],
  );

  const handleStoreID = (e) => {
    e.preventDefault();
    const value = e.target.value;
    return setSearchString(value);
  };

  useEffect(() => {
    if (searchString) {
      getStores(searchString);
    }
  }, [searchString]);

  return (
    <>
      <ParentContainer id="add_transaction">
        <Container>
          <TransactionProfile>
            <TransactionDetailsContainer>
              <StoreImage
                platform={store.platform || 'local'}
                src={store_image || DefaultImage}
              />
              <TransactionDetails>
                <RequestGroup>
                  <Requested>Transaction opened by</Requested>
                  <RequestedUsername>
                    {props.loggedinUser.username}
                  </RequestedUsername>
                </RequestGroup>
                {/* {!foundStore && ( */}
                <InputRow label="Enter store name" htmlFor="search-box">
                  <SearchBox
                    type="search"
                    id="search-box"
                    onChange={handleStoreID}
                    value={searchString}
                    placeholder="Search for a store"
                    readOnly={foundStore}
                  />
                </InputRow>
                {/* )} */}
                {foundStore && (
                  <>
                    <Handle_And_Rating>
                      <Handle>@{store.handle || ''}</Handle>
                    </Handle_And_Rating>
                    <Bio>
                      {store.description
                        ? store.description
                        : 'No store description'}
                    </Bio>
                    <Tags>
                      {store.categories && store.categories === 0 && (
                        <EmptyStateText>No Store Category Tags</EmptyStateText>
                      )}
                      {store.categories &&
                        store.categories.map((category) => {
                          return <TagItem key={category}>{category}</TagItem>;
                        })}
                    </Tags>

                    <ProfileActions>
                      <Action to={'#'}>
                        View Store
                        <FontAwesomeIcon className="fa-icon" icon={faStore} />
                      </Action>
                      <Action to={'#'}>
                        Send Mail
                        <FontAwesomeIcon
                          className="fa-icon"
                          icon={faEnvelope}
                        />
                      </Action>
                    </ProfileActions>
                  </>
                )}
              </TransactionDetails>
            </TransactionDetailsContainer>
          </TransactionProfile>
          <StoresContainer>
            {stores.length > 0 &&
              stores.map((store) => {
                return <Store key={store._id}></Store>;
              })}
          </StoresContainer>
        </Container>
      </ParentContainer>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransaction: (id) => dispatch(getTransaction(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
  };
};

AddTransaction.propTypes = {
  //   user_id: PropTypes.string,
  //   review: PropTypes.object,
  //   user_photo: PropTypes.string,
  //   reviews: PropTypes.array,
  //   getReview: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(withTheme(withRouter(AddTransaction)));
