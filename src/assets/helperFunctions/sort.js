export const sort = (sortby, options) => {
  switch (sortby) {
    case 'ownFirst':
      return (a, b) => {
        if (a.author_id._id === options.user_id) {
          return -1;
        } else if (a.comment.length < b.comment.length) {
          return -1;
        } else {
          return 0;
        }
      };
    case 'latestFirst':
      return (a, b) => {
        if (a.createdAt > b.createdAt) {
          return -1;
        } else {
          return 0;
        }
      };
  }
};
