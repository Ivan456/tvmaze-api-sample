const expect = require('chai').expect;
const db = require('../../src/db');

describe('db/shows', async function () {
    it('should calculate limit and skip', async () => {
        const param = {
            size: 10,
            page: 4
        };
        const connection = { db: {} };
        const limit = (limit) => {
            expect(limit).to.be.equal(param.size);
            return methods;
        };
        const skip = (skip) => {
            expect(skip).to.be.equal(param.size * param.page);
            return methods;
        };
        const methods = {
            find: () => methods,
            project: () => methods,
            limit,
            skip,
            toArray: () => Promise.resolve([])
        };
        connection.db.collection = () => methods;

        await db.shows.cast(connection)(param);
    });
});
