const rpn = require('request-promise-native');
const logger = require('../src/utils').getLogger();

module.exports = async (id) => {
    try {
        let cast = await rpn(`http://api.tvmaze.com/shows/${id}/cast`);
        cast = JSON.parse(cast);

        return cast;
    } catch (error) {
        logger.error(error);
        return null;
    }
};
