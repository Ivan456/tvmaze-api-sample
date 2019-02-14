require('dotenv').load();
const logger = require('../src/utils').getLogger();

const dbConnect = require('../src/db/connect');
const getShowsByPage = require('./getShowsByPage');
const patchByCast = require('./patchByCast');
const { timeout } = require('./utils');

const reqInterval = Number(process.env.SCRAPING_REQUEST_INTERVAL) || 500;
const collectionName = 'shows-v1';
const succesInsertMsg = ` page number of shows inserted to db collection ${collectionName}`;

const run = async () => {
    const { client, db } = await dbConnect();
    const showsCollection = db.collection(collectionName);

    let shows = [];
    let i = 0;
    while (shows) {
        await timeout();
        shows = await getShowsByPage(i);
        if (!shows) return client.close();

        await patchByCast(reqInterval, shows);

        try {
            await showsCollection.insertMany(shows);
            logger.info(i + succesInsertMsg);
            i++;
        } catch (error) {
            logger.error(error);
            client.close();
        }
    }
};

run();
