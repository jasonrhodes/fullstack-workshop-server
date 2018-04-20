/*
TODO: Refactor getMovies and getMovieById to use DataLoader
Check out models/cast for an example!
*/

const fetch = require('node-fetch');

const PAGE_SIZE = 20;

module.exports = ({ config, utils, store, loaders }) => ({
  async getMovieById(id) {
    const paramString = utils.paramsObjectToURLString(config.params);
    const url = `${config.url}/movie/${id}${paramString}`;

    return fetch(url).then(res => res.json());
  },

  async getMovies({ sort, page }) {
    let sortParam = null;
    if (sort === 'POPULARITY') sortParam = 'popularity.desc';
    else if (sort === 'RELEASE_DATE') sortParam = 'release_date.desc';

    const paramString = utils.paramsObjectToURLString({
      ...config.params,
      ...(page ? { page } : {}),
      ...(sortParam ? { sort_by: sortParam } : {}),
    });
    const url = `${config.url}/discover/movie${paramString}`;

    return fetch(url)
      .then(res => res.json())
      .then(json => json.results || []);
  },

  async getMovieLikes({ user }) {
    return await store.likes.findAll({ where: { user } });
  },

  async toggleMovieLike({ id, user }) {
    const like = await store.likes.find({
      where: {
        user,
        movie: id,
      },
    });

    if (!like) await store.likes.create({ user, movie: id });
    else await store.likes.destroy({ where: { user, movie: id } });
  },

  async isMovieLiked({ id, user }) {
    const like = await store.likes.find({ where: { user, movie: id } });
    return !!like;
  },
});
