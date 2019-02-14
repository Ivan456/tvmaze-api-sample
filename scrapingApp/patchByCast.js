const getCastByShowId = require('./getCastByShowId');
const logger = require('../src/utils').getLogger();
const { timeout } = require('./utils');

const successPatchMsg = `Show was patched with cast. Queue length for patch: `;

module.exports = async (reqInterval, shows) => {
    let castPatches = await shows.map((show) => async () => {
        show.cast = await getCastByShowId(show.id);
    });

    let castPatch = castPatches.pop();
    while (castPatches.length) {
        await timeout(reqInterval);
        try {
            await castPatch();
            logger.info(successPatchMsg + castPatches.length);
            castPatch = castPatches.pop();
        } catch (error) {
            logger.error(error);
        }
    }
    return shows;
};
