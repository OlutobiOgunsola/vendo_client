import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, withTheme } from 'styled-components';
import { fadeIn, slideInDown, slideInUp } from 'react-animations';
import moment from 'moment';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faReply,
  faShare,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';

import Upvote from './Upvote';
import Downvote from './Downvote';
import DefaultImage from '@/assets/images/icons/account/Profile.svg';
import Input from '@/components/widgets/UI/Input';
import PaperPlane from './PaperPlane';

import PropTypes from 'prop-types';
import setAlert from '@/assets/helperFunctions/alerts';
import { sort } from '@/assets/helperFunctions/sort';

const fadeInAnimation = keyframes`${fadeIn}`;
const slideInDownAnimation = keyframes`${slideInDown}`;
const fadeInUpAnimation = keyframes`${fadeIn}`;
const slideInUpAnimation = keyframes`${slideInUp}`;

const ParentContainer = styled.div`
  animation: 1s ${fadeInAnimation};
  width: calc(100% - 20px);
  /* border-bottom: solid 0.5px ${(props) =>
    props.theme.colors.dark_background_20}; */
  background: ${(props) => props.theme.colors.comment_background};
  margin-left: auto;
  border-radius: 8px;
  margin-top: 8px;
  height: auto;
  position: relative;
  z-index: 8;
  padding: 16px;
  box-sizing: border-box;
  &:first-child {
    margin-top: 32px;
  }
`;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const Text = styled.p`
  display: inline-block;
  font-family: 'Josefin Sans Light';
  width: calc(100% - 40px);
  font-size: 12px;
  font-weight: 300;
  box-sizing: border-box;
  color: ${(props) => props.theme.colors.saturated_font_darker};
  margin: 0;
  margin-bottom: 4px;
`;

const TextContainer = styled.span`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
`;

const CommentGroup = styled.span`
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 16px 0px;
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
  margin: 8px 0px;
`;

const VotesDiv = styled.span`
  display: inline-flex;
  flex-flow: row nowrap;
  width: 50px;
  margin-right: 4px;
`;

const Voter = styled.img`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  border: solid 1px ${(props) => props.theme.colors.dark_background};
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
  font-family: 'Noto Sans Regular';
  color: ${(props) => props.theme.colors.saturated_contrast_60};
  font-weight: 300px;
  margin: 0;
  display: inline-block;
  line-height: 12px;
  animation: 0.5s ${fadeInUpAnimation};
  transform: translatey(-5px);
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

const Spacer = styled.span`
  display: inline-block;
  width: 10px;
  margin: 0;
  margin-right: 30px;
`;

const Author = styled.span`
  display: inline-block;
  width: 150px;
  margin-left: auto;
  text-align: right;
`;

const AuthorName = styled.p`
  font-family: 'Noto Sans Regular';
  font-size: 9px;
  color: ${(props) => props.theme.colors.saturated_font_darker};
  margin: 0;
  margin-bottom: 0px;
`;

const DateContainer = styled.p`
  font-family: 'Josefin Sans Medium Italic';
  font-size: 8px;
  color: ${(props) => props.theme.colors.saturated_contrast_60};
  margin: 0;
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

const Reply = styled.span`
  width: 100%;
  background: ${(props) => props.theme.colors.review_background};
  padding: 4px 8px;
  border-radius: 4px;
  border: none;
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  margin-top: 8px;
  &:first-child {
    margin-top: 16px;
  }
`;

const ReplyText = styled.p`
  display: inline-block;
  font-family: 'Josefin Sans Light';
  width: calc(100% - 100px);
  font-size: 10px;
  font-weight: 300;
  box-sizing: border-box;
  color: ${(props) => props.theme.colors.saturated_font_darker};
  margin: 0;
  margin-bottom: 4px;
`;

const ReplyAuthor = styled.span`
  display: inline-block;
  width: 100px;
  margin-left: auto;
  text-align: right;
`;

const ReplyAuthorName = styled.p`
  font-family: 'Noto Sans Regular';
  font-size: 9px;
  color: ${(props) => props.theme.colors.saturated_font_darker};
  margin: 0;
  margin-bottom: 0px;
`;

const ReplyDateContainer = styled.p`
  font-family: 'Josefin Sans Medium Italic';
  font-size: 7px;
  color: ${(props) => props.theme.colors.saturated_contrast_60};
  margin: 0;
  width: 100%;
`;

const Comment = (props) => {
  const author_id = props.comment.author_id;
  const commentProp = props.comment;
  const [comment, setComment] = useState(commentProp);
  const [votes, setVotes] = useState('upvotes');
  const [opacity, setOpacity] = useState(0.6);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [userComment, setUserComment] = useState('');
  const [showCommentGroup, setShowCommentGroup] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // manually trigger rerender with state update
  const [render, setRender] = useState(false);

  // automatically focus comment box when reply button is clicked
  const commentBox = useRef(null);
  useEffect(() => {
    if (comment.upvotes.indexOf(props.user_id) > -1) {
      setUpvoted(true);
    }
  }, [comment]);

  console.log('comments again', comment);

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
      target_type: 'comment',
      target_id: comment._id,
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
          const commentComments = [...comment.comments];
          commentComments.push(res.data.data);
          comment.comments = commentComments;
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
          `${process.env.REACT_APP_API_PREFIX}/api/comments/${comment._id}/upvote`,
          null,
          { headers },
        )
        .then((res) => {
          if (res.status === 200) {
            setComment(res.data.data);
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
          `${process.env.REACT_APP_API_PREFIX}/api/comments/${comment._id}/downvote`,
          null,
          { headers },
        )
        .then((res) => {
          if (res.status === 200) {
            setDownvoted(!downvoted);
            setComment(res.data.data);
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

  // const showVotes = () => {
  //   if (votes === 'upvotes') {
  //     return (
  //       <VotesContainer>
  //         <VotesDiv>
  //           {selectVoters(comment.upvotes).map((upvote, index) => {
  //             return (
  //               <Voter
  //                 src={upvote.photo || DefaultImage}
  //                 key={upvote._id}
  //                 index={index}
  //               />
  //             );
  //           })}
  //         </VotesDiv>
  //         {comment.upvotes.length > 5 && (
  //           <OtherVoters>
  //             <b
  //               style={{
  //                 fontWeight: 700,
  //               }}
  //             >
  //               and {comment.upvotes.length - 5} other users
  //             </b>{' '}
  //             {/* have upvoted this review */}
  //           </OtherVoters>
  //         )}
  //       </VotesContainer>
  //     );
  //   } else if (votes === 'downvotes') {
  //     return (
  //       <VotesContainer>
  //         <VotesDiv>
  //           {selectVoters(comment.downvotes).map((downvote, index) => {
  //             return (
  //               <Voter
  //                 src={downvote.photo || DefaultImage}
  //                 key={downvote._id}
  //                 index={index}
  //               />
  //             );
  //           })}
  //         </VotesDiv>
  //         {comment.downvotes.length > 5 && (
  //           <OtherVoters>
  //             <b
  //               style={{
  //                 fontWeight: 700,
  //               }}
  //             >
  //               and {comment.downvotes.length - 5} other users
  //             </b>{' '}
  //             {/* have downvoted this review */}
  //           </OtherVoters>
  //         )}
  //       </VotesContainer>
  //     );
  //   }
  // };
  const date = new Date();

  return (
    <ParentContainer>
      <Container>
        <TextContainer>
          {expanded && (
            <Votes>
              <Thumb
                onClick={() => {
                  return addVote('upvote');
                }}
              >
                <Upvote fillCol={getThumbfill('upvote')} />
              </Thumb>
              <p>{comment.upvotes.length > 99 ? 99 : comment.upvotes.length}</p>
              <Thumb
                onClick={() => {
                  return addVote('downvote');
                }}
              >
                <Downvote fillCol={getThumbfill('downvote')} />
              </Thumb>
            </Votes>
          )}{' '}
          <Text>{comment.comment}</Text>
        </TextContainer>
        <Details>
          {expanded && <Spacer />}
          <VotesContainer>
            <VotesDiv>
              {selectVoters(comment.upvotes).map((upvote, index) => {
                return (
                  <Voter
                    src={upvote.photo || DefaultImage}
                    key={upvote._id}
                    index={index}
                  />
                );
              })}
            </VotesDiv>
            {comment.upvotes.length > 5 && (
              <OtherVoters>
                <b
                  style={{
                    fontWeight: 700,
                  }}
                >
                  {upvoted && 'You, '} and{' '}
                  {upvoted
                    ? comment.upvotes.length - 5
                    : comment.upvotes.length - 1}{' '}
                  other users
                </b>{' '}
                {/* have upvoted this review */}
              </OtherVoters>
            )}
          </VotesContainer>
          <Author>
            <AuthorName
              onClick={getAuthor}
            >{`- ${comment.author_id.username}`}</AuthorName>
            <DateContainer>
              {`${moment(comment.createdAt).format('ddd DD MMM YYYY')}`}
              {' at '}
              {`${moment(comment.createdAt).format('HH:mm A')}`}
            </DateContainer>
          </Author>
        </Details>
        <ExpandGroup onClick={openComments}>
          <FontAwesomeIcon className="fa-icon" icon={faReply} />
          Reply
        </ExpandGroup>

        <ExpandGroup
          onClick={() => {
            return setExpanded(!expanded);
          }}
        >
          {!expanded && <FontAwesomeIcon className="fa-icon" icon={faPlus} />}
          {expanded && <FontAwesomeIcon className="fa-icon" icon={faMinus} />}
          {!expanded && 'Expand'}
          {expanded && 'Collapse'}{' '}
          <b
            style={{
              fontWeight: 700,
            }}
          >
            {comment.comments.length > 0 ? comment.comments.length : ''}{' '}
            {comment.comments.length <= 1 ? 'comment' : 'comments'}
          </b>
        </ExpandGroup>

        {showCommentGroup && (
          <CommentGroup>
            <Image>
              <CommentImage src={props.user_photo} />
            </Image>
            <InputRow>
              <Input
                width_per={100}
                focus_width_per={100}
                useLabelAnimation={false}
                inputType={'textarea'}
                left={'16px'}
                readOnly={false}
                handleChange={addComment}
                ref={commentBox}
                class={{
                  height: '30',
                  name: 'add_comment',
                  type: 'text',
                  font_family: 'Josefin Sans Regular',
                  fill: `${props.theme.colors.alternate_light_background_10}`,
                  color: `${props.theme.colors.saturated_contrast_60}`,
                  p_color: `${props.theme.colors.saturated_contrast_20}`,
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
      </Container>
      {expanded &&
        comment.comments
          .sort(sort('ownFirst', props.user_id))
          .map((comment) => {
            return (
              <Reply>
                <ReplyText>{comment.comment}</ReplyText>
                <ReplyAuthor>
                  <ReplyAuthorName
                    onClick={getAuthor}
                  >{`- ${comment.author_id.username}`}</ReplyAuthorName>
                  <ReplyDateContainer>
                    {`${moment(comment.createdAt).format('ddd DD MMM YYYY')}`}
                    {' at '}
                    {`${moment(comment.createdAt).format('HH:mm A')}`}
                  </ReplyDateContainer>
                </ReplyAuthor>
              </Reply>
            );
          })}
    </ParentContainer>
  );
};

Comment.propTypes = {};

export default withTheme(Comment);
