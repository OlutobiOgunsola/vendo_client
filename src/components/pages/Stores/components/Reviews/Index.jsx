import React, { useState, useEffect } from 'react';
import styled, { withTheme } from 'styled-components';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  withRouter,
} from 'react-router-dom';

import withUser from '@/components/higher-order/withUser';
import Loader from '@/components/widgets/UI/Loader';
import Alert from '@/components/widgets/UI/Alert';

import defaultImage from '@/assets/images/icons/account/Profile.svg';

const ParentContainer = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.page_background};
  height: auto;
`;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  background: ${(props) => props.theme.colors.dark_background};
  /* padding: 20px; */

  hr {
    width: 100%;
    height: 0.1px;
    margin: 32px auto;
    border: none;
    opacity: 0.6;
    background: ${(props) => props.theme.colors.alternate_light_background_10};
  }

  @media (max-width: 900px) {
  }
  @media (max-width: 800px) {
  }
  @media (max-width: 700px) {
    flex-flow: column nowrap;
    padding: 40px 50px;
  }
  @media (max-width: 500px) {
    flex-flow: column nowrap;
    padding: 40px 10px;
    box-sizing: border-box;
  }
  @media (max-width: 400px) {
    flex-flow: column nowrap;
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

const ReviewsIndex = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [alerts, addAlert] = useState([]);
  const [mounted, setMounted] = useState(true);
  const [review, setReview] = useState({
    review: '',
    _id: '',
    comments: [],
    author_id: {},
    recipient_id: {},
    transaction_id: {},
    rating: 0,
    upvotes: [],
    downvotes: [],
  });

  const { match } = props;

  const store_id = props.store_id;
  const owner = props.owner;
  const handle = props.handle;

  //   useEffect(() => {
  //     setLoading(true);
  //     const getStoreTransactions = async (store_id) => {
  //       return axios
  //         .get(
  //           `${process.env.REACT_APP_API_PREFIX}/api/reviews/all/${store_id}`,
  //         )
  //         .then((res) => {
  //           if (res.status === 200) {
  //             const result = res.data.data;
  //             setTransactionsArray(result);
  //             return;
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         })
  //         .finally(() => {
  //           setLoading(false);
  //         });
  //     };

  //     if (store_id) {
  //       getStoreTransactions(store_id);
  //     }
  //   }, [store_id]);

  return (
    <ParentContainer>
      {alerts.map((alert) => {
        return (
          <Alert type={alert.type} key={alert.text}>
            {alert.text}
          </Alert>
        );
      })}

      <Container>
        {isLoading && <Loader />}
        {isFetching && <Loader transition={0.2} />}

        <Switch>
          <Route
            path={`${match.url}/:review_id`}
            exact
            component={() => {
              return (
                <ReviewPage
                  updater={addAlert}
                  loggedinUser={props.user.user}
                  transactions={transactionsArray}
                />
              );
            }}
          />
          <Route
            path={`${match.url}/add`}
            exact
            component={() => {
              return (
                <AddReview updater={addAlert} loggedinUser={props.user.user} />
              );
            }}
          />
        </Switch>
      </Container>
    </ParentContainer>
  );
};

export default withTheme(withRouter(ReviewsIndex));
