export const sort = (sortby, user_id) => {
  switch (sortby) {
    case 'ownFirst':
      return (a, b) => {
        if (a.author_id._id === user_id) {
          return -1;
        } else if (a.comment.length < b.comment.length) {
          return -1;
        } else {
          return 0;
        }
      };
  }
};
