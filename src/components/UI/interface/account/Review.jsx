import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';

import Upvote from './Upvote';
import Downvote from './Downvote';
import DefaultImage from '@/assets/images/icons/account/Profile.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faReply,
  faShare,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';

import { fadeIn, slideInUp } from 'react-animations';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Input from '@/components/widgets/UI/Input';

import PaperPlane from './PaperPlane';
import Comment from './Comment';
import { getReview } from '@/actions/review';
import { connect } from 'react-redux';
import Alert from '@/components/widgets/UI/Alert';
import setAlert from '@/assets/helperFunctions/alerts';
import { sort } from '@/assets/helperFunctions/sort';

const fadeInUpAnimation = keyframes`${fadeIn}`;

const ParentContainer = styled.div`
  background: ${(props) => props.theme.colors.review_background};
  width: calc(100% - 10px);
  &:hover {
    width: 100%;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }
  height: auto;
  position: relative;
  z-index: 9;
  border-radius: 2px;
  box-sizing: border-box;
  transition: all 0.25s ease-in-out;
  margin: 16px 0px 16px 0px;
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
`;

const Text = styled.p`
  display: inline-block;
  font-family: 'Josefin Sans Light';
  width: calc(100% - 40px);
  font-size: 16px;
  font-weight: 500;
  box-sizing: border-box;
  color: ${(props) => props.theme.colors.saturated_font_darker};
  margin: 0;
  margin-bottom: 16px;
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 16px;
`;

const Votes = styled.span`
  display: flex;
  height: 60px;
  width: 26px;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin-right: 14px;
  box-sizing: border-box;
  padding: 4px 0px;
  p {
    font-family: 'Noto Sans Regular';
    margin: 2px 0px;
    padding: 0px;
    color: ${(props) => props.theme.colors.saturated_contrast};
  }
  @media (max-width: 500px) {
    width: 26px;
    margin-right: 8px;
  }
`;

const Spacer = styled.span`
  display: inline-block;
  width: 10px;
  margin: 0;
  margin-right: 30px;
  @media (max-width: 500px) {
    width: 10px;
    margin-right: 14px;
  }
`;

const Author = styled.span`
  display: inline-block;
  width: 150px;
  margin-left: auto;
  text-align: right;
`;

const AuthorName = styled.p`
  font-family: 'Noto Sans Regular';
  font-size: 11px;
  color: ${(props) => props.theme.colors.saturated_font_darker};
  margin: 0;
  margin-bottom: 4px;
  @media (max-width: 500px) {
    font-size: 9px;
  }
`;

const DateContainer = styled.p`
  font-family: 'Josefin Sans Medium Italic';
  font-size: 10px;
  color: ${(props) => props.theme.colors.saturated_contrast_60};
  margin: 0;
  @media (max-width: 500px) {
    font-size: 8px;
  }
`;

const Thumb = styled.svg`
  width: 10px;
  height: 10px;
  display: inline-block;
  /* margin: 0px 8px; */
  transition: all 0.25s ease-in-out;
  &:hover {
    width: 14px;
    height: 14px;
  }
`;

const VotesContainer = styled.span`
  width: auto;
  height: 12px;
  display: block;
  margin-top: 8px;
`;

const Voter = styled.img`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  border: solid 1px ${(props) => props.theme.colors.review_background};
  margin: 0;
  display: inline-block;
  transition: all 0.25s ease-in-out;
  transform: ${(props) => {
    const length = props.index * 5;
    return `translateX(-${length}px)`;
  }};
  &:first-child {
    transform: translateX(0px);
  }
  animation: 0.5s ${fadeInUpAnimation};
`;

const OtherVoters = styled.p`
  height: 12px;
  font-size: 10px;
  font-family: 'Josefin Sans Light';
  color: ${(props) => props.theme.colors.saturated_contrast_60};
  font-weight: 300px;
  margin: 0;
  display: inline-block;
  line-height: 12px;
  animation: 0.5s ${fadeInUpAnimation};
  transform: translatey(-5px);
`;

const VotesDiv = styled.span`
  display: inline-flex;
  flex-flow: row nowrap;
  width: 50px;
  margin-right: 4px;
`;

const CommentGroup = styled.span`
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 16px 0px;
  animation: 1s ${fadeInUpAnimation};
`;

const Image = styled.span`
  width: 26px;
  height: 30px;
  margin-right: 14px;
`;

const InputRow = styled.span`
  width: calc(100% - 70px);
  margin: 0 auto;
`;

const CommentImage = styled.img`
  display: inline-block;
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  box-sizing: border-box;
  margin: 6px 4px;
`;

const SendSVG = styled.svg`
  width: 18px;
  height: 18px;
  box-sizing: border-box;
  margin: 6px 0px 6px 12px;
  display: inline-block;
  color: ${(props) => props.theme.colors.saturated_contrast};
`;

const SendButton = styled.span`
  overflow: hidden;
  line-height: 30px;
  width: 30px;
  height: 30px;
  border: none;
  margin-left: auto;
  display: inline-block;
  transition: all 0.25s ease-in-out;
`;

const ExpandGroup = styled.span`
  width: 100%;
  text-align: left;
  color: ${(props) => props.theme.colors.saturated_font_darker};
  font-family: 'Josefin Sans Light';
  font-size: 12px;
  opacity: 0.6;
  margin: 8px 8px;
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

const ReviewItem = (props) => {
  const _id = props.id;
  const [review, setReview] = useState({
    review: '',
    upvotes: [],
    downvotes: [],
    comments: [],
    author_id: {
      username: '',
      photo: '',
      _id: '',
    },
  });
  const author_id = review.author_id._id;


  // manually trigger rerender with state update
  const [render, setRender] = useState(false);

  // automatically focus comment box when reply button is clicked
  const commentBox = useRef(null);

  const [mounted, setMounted] = useState(true);
  const [votes, setVotes] = useState('upvotes');
  const [opacity, setOpacity] = useState(0.6);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [userComment, setUserComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [showCommentGroup, setShowCommentGroup] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      const foundReview = await props.getReview(_id);
      if (mounted) {
        setReview(foundReview);
      }
    };
    if (_id) {
      if (props.review) {
        setReview(props.review);
      } else {
        fetchReview(_id);
      }
    }

    return () => {
      setMounted(false);
    };
  }, [_id]);

  useEffect(() => {
    const upvotefilter = review.upvotes.filter((upvote) => {
      return upvote._id === props.user_id;
    });
    const downvotefilter = review.downvotes.filter((downvote) => {
      return downvote._id === props.user_id;
    });
    if (upvotefilter.length > 0) {
      setUpvoted(true);
    } else if (downvotefilter.length > 0) {
      setDownvoted(true);
    }
  }, [review]);

  useEffect(() => {
    // initialize aos library
    AOS.init({ duration: 1000 });
    AOS.refresh();
  }, []);

  const getAuthor = (e) => {
    // logic to navigate to author page here
  };
  const selectVoters = (arr) => {
    if (arr.length > 5) {
      return [arr[0], arr[1], arr[2], arr[3], arr[4]];
    } else {
      return arr;
    }
  };

  const getThumbfill = (arg) => {
    if (arg === 'upvote') {
      if (upvoted) {
        return `${props.theme.colors.yellow}`;
      } else {
        return `${props.theme.colors.upvote_highlight}`;
      }
    } else if (arg === 'downvote') {
      if (downvoted) {
        return `${props.theme.colors.yellow}`;
      } else {
        return `${props.theme.colors.upvote_highlight}`;
      }
    }
  };

  const addComment = (comment) => {
    return setUserComment(comment);
  };

  const openComments = () => {
    setShowCommentGroup(!showCommentGroup);
    if (!showCommentGroup) {
      setTimeout(() => {
        commentBox.current.focus();
      }, 500);
    }
    return null;
  };

  const submitComment = () => {
    const commentObj = {
      comment: userComment,
      target_type: 'review',
      target_id: review._id,
    };

    const headers = {
      'Content-Type': 'application/json',
      Accept: '*/*',
      Authorization: `Bearer ${props.user_token}`,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_PREFIX}/api/comments/add`,
        commentObj,
        { headers },
      )
      .then((res) => {
        if (res.status === 200) {
          setAlert(props.updater, 'success', 'Comment successfully added!');
          const reviewComments = [...review.comments];
          reviewComments.push(res.data.data);
          review.comments = reviewComments;
          setSubmitted(true);
          setSubmitted(false);
          setShowCommentGroup(false);
        } else if (res.status === 400) {
          setAlert(
            props.updater,
            'error',
            'Error adding comment! Please try again.',
          );
        }
      })
      .catch((err) => {
        setAlert(
          props.updater,
          'error',
          'Error adding comment! Please try again.',
        );
      })
      .finally((_) => {
        setRender(!render);
      });
  };

  const addVote = (type = 'upvote') => {
    const headers = {
      Authorization: `Bearer ${props.user_token}`,
    };
    if (type === 'upvote') {
      return axios
        .put(
          `${process.env.REACT_APP_API_PREFIX}/api/reviews/${review._id}/upvote`,
          null,
          { headers },
        )
        .then((res) => {
          if (res.status === 200) {
            setReview(res.data.data);
            setUpvoted(!upvoted);
            return setRender(!render);
          } else {
            return null;
          }
        })
        .catch((err) => {
          return setAlert(
            props.updater,
            'error',
            'Error while upvoting review!',
          );
        });
    } else {
      return axios
        .put(
          `${process.env.REACT_APP_API_PREFIX}/api/reviews/${review._id}/downvote`,
          null,
          { headers },
        )
        .then((res) => {
          if (res.status === 200) {
            setDownvoted(!downvoted);
            setReview(res.data.data);
            return setRender(!render);
          } else {
            return null;
          }
        })
        .catch((err) => {
          return setAlert(
            props.updater,
            'error',
            'Error while downvoting review!',
          );
        });
    }
  };

  const date = new Date();
  return (
    <>
      <ParentContainer data-aos="fade-in" id={`review-${review._id}`}>
        <Container>
          <TextContainer>
            <Votes>
              <Thumb
                onClick={() => {
                  return addVote('upvote');
                }}
              >
                <Upvote fillCol={getThumbfill('upvote')} />
              </Thumb>
              <p>{review.upvotes.length > 99 ? 99 : review.upvotes.length}</p>
              <Thumb
                onClick={() => {
                  return addVote('downvote');
                }}
              >
                <Downvote fillCol={getThumbfill('downvote')} />
              </Thumb>
            </Votes>
            <Text>{review.review}</Text>
          </TextContainer>
          <Details>
            <Spacer />
            <VotesContainer>
              <VotesDiv>
                {selectVoters(review.upvotes).map((upvote, index) => {
                  return (
                    <Voter
                      src={upvote.photo || DefaultImage}
                      key={upvote._id}
                      index={index}
                    />
                  );
                })}
              </VotesDiv>
              {review.upvotes.length > 5 && (
                <OtherVoters>
                  <b
                    style={{
                      fontWeight: 700,
                    }}
                  >
                    and {review.upvotes.length - 5} other users
                  </b>{' '}
                  {/* have upvoted this review */}
                </OtherVoters>
              )}
            </VotesContainer>
            <Author>
              <AuthorName
                onClick={getAuthor}
              >{`- ${review.author_id.username}`}</AuthorName>
              <DateContainer>
                {`${moment(review.createdAt).format('ddd DD MMM YYYY')}`}
                {' at '}
                {`${moment(review.createdAt).format('HH:mm A')}`}
              </DateContainer>
            </Author>
          </Details>

          {props.user_id && (
            <ExpandGroup onClick={openComments}>
              <FontAwesomeIcon className="fa-icon" icon={faReply} />
              Reply
            </ExpandGroup>
          )}

          <ExpandGroup
            onClick={() => {
              return null;
            }}
          >
            <FontAwesomeIcon className="fa-icon" icon={faShare} />
            Share
          </ExpandGroup>

          {showCommentGroup && props.user_id && (
            <CommentGroup>
              <Image>
                <CommentImage src={props.user_photo} />
              </Image>
              <InputRow>
                <Input
                  submitted={submitted}
                  width_per={100}
                  focus_width_per={100}
                  useLabelAnimation={false}
                  inputType={'textarea'}
                  left={'16px'}
                  readOnly={false}
                  handleChange={addComment}
                  value={userComment}
                  ref={commentBox}
                  class={{
                    height: '30',
                    name: 'add_comment',
                    type: 'text',
                    font_family: 'Josefin Sans Regular',
                    fill: `${props.theme.colors.alternate_light_background_10}`,
                    color: `${props.theme.colors.dark_background_60}`,
                    p_color: `${props.theme.colors.dark_background_20}`,
                    padding: '8px',
                    grp_margin: '0px',
                    grp_padding: '0px',
                    placeholder: 'Add a comment',
                    label: { display: 'none' },
                  }}
                />
              </InputRow>
              <SendButton onClick={submitComment}>
                <SendSVG>
                  <PaperPlane />
                </SendSVG>
              </SendButton>
            </CommentGroup>
          )}
          {review.comments.length > 0 && (
            <ExpandGroup
              onClick={() => {
                return setShowComments(!showComments);
              }}
            >
              {!showComments && (
                <FontAwesomeIcon className="fa-icon" icon={faPlus} />
              )}
              {showComments && (
                <FontAwesomeIcon className="fa-icon" icon={faMinus} />
              )}
              {!showComments && 'Expand'}
              {showComments && 'Collapse'}{' '}
              <b
                style={{
                  fontWeight: 700,
                }}
              >
                {review.comments.length} comments
              </b>
            </ExpandGroup>
          )}
        </Container>
        {showComments && (
          <CommentsContainer>
            {review.comments
              .sort(sort('ownFirst', { user_id: props.user_id }))
              .map((comment) => {
                return (
                  <Comment
                    updater={props.updater}
                    comment={comment}
                    key={comment._id}
                    user_id={props.user_id}
                    user_photo={props.user_photo}
                    user_token={props.user_token}
                  />
                );
              })}
          </CommentsContainer>
        )}
      </ParentContainer>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReview: (id) => dispatch(getReview(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    reviews: state.review,
  };
};

ReviewItem.propTypes = {
  user_id: PropTypes.string,
  review: PropTypes.object,
  user_photo: PropTypes.string,
  reviews: PropTypes.array,
  getReview: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(ReviewItem));
