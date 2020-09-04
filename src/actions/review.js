import axios from 'axios';

const setReview = (review) => {
  return {
    type: 'ADD_REVIEW',
    payload: review,
  };
};

const beginGetReview = () => {
  return {
    type: 'BEGIN_GET_REVIEW',
  };
};

const getReviewSuccess = () => {
  return {
    type: 'GET_REVIEW_SUCCESS',
  };
};

export const getReview = (id) => {
  return (dispatch) => {
    dispatch(beginGetReview());
    // const vendo_cached_reviews =
    //   JSON.parse(localStorage.getItem('vendo_cached_reviews')) || [];
    // const cachedReview = vendo_cached_reviews.filter((review) => {
    //   return review._id === id;
    // });
    // if (cachedReview.length === 1) {
    //   console.log('cached review found', id, cachedReview);
    //   return cachedReview[0];
    // } else if (cachedReview.length < 1) {
    return axios
      .get(
        `${process.env.REACT_APP_API_PREFIX}/api/reviews/vendor/review/${id}`,
      )
      .then((res) => {
        const review = res.data.data;

        dispatch(setReview(review));

        const emptyCache = [];
        const cachedReviews =
          JSON.parse(localStorage.getItem('vendo_cached_reviews')) ||
          emptyCache;

        // cachedReviews.push(review);

        localStorage.setItem(
          'vendo_cached_reviews',
          JSON.stringify(cachedReviews),
        );

        return review;
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
// };
