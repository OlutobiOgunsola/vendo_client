import React, { useEffect } from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import { useState } from 'react';

import Loader from '@/components/widgets/UI/Loader';
import defaultPhoto from '@/assets/images/icons/account/Profile.svg';
import TransactionItem from '@/components/UI/interface/account/Transaction';
import emptyReview from '@/assets/images/lottie/emptyReview.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import InputRow from '@/components/widgets/UI/InputRow';
import Button from '@/components/UI/buttons/Button';
import { sort } from '@/assets/helperFunctions/sort';

const ParentContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Collections = styled.span`
  display: block;
`;

const Collection = styled.span`
  display: inline-block;
  font-size: 12px;
  width: 80px;
  text-align: center;
  line-height: 30px;
  box-sizing: border-box;
  padding: 4px;
  opacity: ${(props) => props.opacity};
  color: ${(props) => props.theme.colors.saturated_font_darker};
  transition: all 0.25s ease-in-out;
  &:first-child {
    padding-left: 0px;
  }
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
  .fa-icon {
    height: 12px;
    width: 12px;
    color: ${(props) => props.theme.colors.saturated_contrast};
  }
  .received {
    transform: rotate(90deg);
  }
  .given {
    transform: rotate(270deg);
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
  margin: 2px 0px;
  color: ${(props) => props.theme.colors.saturated_contrast};
`;

const Transactions = (props) => {
  const [collection, setCollection] = useState('received');
  const [r_transactions, setR_Transactions] = useState([]);
  const [i_transactions, setI_Transactions] = useState([]);
  const [mounted, setMounted] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [g_opacity, setG_Opacity] = useState(0.4);
  const [r_opacity, setR_Opacity] = useState(0.4);

  const getOpacity = (field = 'received') => {
    if (collection === 'received') {
      setG_Opacity(0.4);
      return setR_Opacity(1);
    } else if (collection === 'given') {
      setR_Opacity(0.4);
      return setG_Opacity(1);
    }
  };

  const user = props.user;
  console.log('user', user);
  useEffect(() => {
    if (mounted) {
      setR_Transactions(props.user.user.r_transactions);
      setI_Transactions(props.user.user.i_transactions);
    }
    return () => {
      setMounted(false);
    };
  }, [user]);
  useEffect(() => {
    getOpacity();
  }, [collection]);

  const addTransaction = () => {
    return null;
  };

  const LottieOptions = {
    loop: false,
    autoplay: true,
    animationData: emptyReview,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <ParentContainer>
      <Container>
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            <Collections>
              <Collection
                opacity={r_opacity}
                onClick={() => {
                  return setCollection('received');
                }}
              >
                <FontAwesomeIcon
                  className="fa-icon received"
                  icon={faSignInAlt}
                />
                Received
              </Collection>
              <Collection
                opacity={g_opacity}
                onClick={() => {
                  return setCollection('given');
                }}
              >
                <FontAwesomeIcon
                  className="fa-icon given"
                  icon={faSignOutAlt}
                />{' '}
                Initiated
              </Collection>
            </Collections>
            {collection === 'received' && r_transactions && (
              <>
                {r_transactions.sort(sort('latestFirst')).map((transaction) => {
                  console.log('transaction from space', transaction);
                  return (
                    <TransactionItem
                      domain="owner"
                      type="received"
                      user_id={props.user.user._id}
                      key={transaction}
                      id={transaction}
                      updater={props.updater}
                      user_token={props.user.user.jwt}
                    />
                  );
                })}
                {r_transactions.length === 0 && (
                  <>
                    <Lottie options={LottieOptions} height={300} width={300} />
                    <EmptyStateText>No transactions yet</EmptyStateText>
                    <EmptyStateSubtext>
                      Share your profile to get more transactions
                    </EmptyStateSubtext>
                  </>
                )}
              </>
            )}
            {collection === 'given' && i_transactions && (
              <>
                <InputRow>
                  <Button
                    to={'#'}
                    height="30"
                    width="80"
                    fill={props.theme.colors.dark_background}
                    transition_color={'white'}
                    margin="16px 0 0 auto"
                    onClick={addTransaction}
                  >
                    Add
                  </Button>
                </InputRow>
                {i_transactions.sort(sort('latestFirst')).map((transaction) => {
                  console.log('transaction from space', transaction);
                  return (
                    <TransactionItem
                      type="given"
                      user_id={props.user.user._id}
                      key={transaction}
                      id={transaction}
                      domain="owner"
                      updater={props.updater}
                      user_token={props.user.user.jwt}
                    />
                  );
                })}
                {i_transactions.length === 0 && (
                  <>
                    <Lottie options={LottieOptions} height={300} width={300} />
                    <EmptyStateText>No transactions yet</EmptyStateText>
                    <EmptyStateSubtext>Add a new transaction</EmptyStateSubtext>
                  </>
                )}
              </>
            )}
          </>
        )}
      </Container>
    </ParentContainer>
  );
};

Transactions.propTypes = {};

export default withTheme(Transactions);
