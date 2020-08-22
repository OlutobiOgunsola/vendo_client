const initialState = [];

const review = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_REVIEW':
      const id = action.payload._id;
      const review = action.payload;
      const reviewObj = {
        id,
        review,
      };
      return [...state, reviewObj];
    default:
      return state;
  }
};

export default review;
