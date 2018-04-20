/* TODO: Implement the resolvers for Query

Remember the resolver function signature:
fieldName: (obj, args, context, info) => result;

Check models/movie for the data fetching functions you'll need to complete the exercise.
Refer to your schema if you're unsure what to return from the resolvers.
Good luck!
*/

module.exports = {
  Query: {
    movie: () => null,
    movies: (root, { sort, page = 1 }, { models }) => {
      // API restriction
      if (page > 1000)
        throw new Error('Page must be less than or equal to 1000');
      return models.movie.getMovies({ sort, page });
    },
    likes: () => null,
  },
};
