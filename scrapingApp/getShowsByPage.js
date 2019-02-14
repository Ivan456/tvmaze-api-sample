const rpn = require('request-promise-native');
const logger = require('../src/utils').getLogger();
const getShowsMsg = ` page number of shows is gotten with quantity: `;

module.exports = async (page) => {
    try {
        let shows = await rpn(`http://api.tvmaze.com/shows?page=${page}`);
        shows = JSON.parse(shows);
        logger.info(page + getShowsMsg + shows.length);
        return shows;
    } catch (error) {
        logger.error(error);
        return null;
    }
};
