const expect = require('chai').expect; // preference and tested with expect
const models = require('../../src/models');

describe('models/shows', function () {
    it('cast should be formatted ', async function () {
        const db = { connect: () => {}, shows: {} };
        db.shows.cast = () => async function () {
            return clone(notFormattedList);
        };
        const formattedCast = clone(notFormattedList).map(show => {
            show.cast = show.cast.map(({ person }) => person);
            return show;
        });

        const result = await models.shows.cast(db)({});

        expect(result).to.deep.equal(formattedCast);
    });

    it('cast should be sorted by age descending', async function () {
        const db = { connect: () => {}, shows: {} };
        db.shows.cast = () => async function () {
            return clone(notSortedList);
        };

        const sortedCast = clone(notSortedList)[0].cast
            .map(({ person }) => person)
            .sort(({ birthday: a }, { birthday: b }) => (a || '') >= (b || '') ? -1 : 1);

        const result = await models.shows.cast(db)({});

        expect(result[0].cast).to.deep.equal(sortedCast);
    });
});

const clone = v => JSON.parse(JSON.stringify(v));

const notFormattedList = [{
    'id': 270,
    'name': 'The League',
    'cast': [
        {
            'person': {
                'id': 8118,
                'name': 'Nick Kroll',
                'birthday': '1978-06-05'
            }
        }
    ]
}];

const notSortedList = [{
    'id': 270,
    'name': 'The League',
    'cast': [
        {
            'person': {
                'id': 8118,
                'name': 'Nick Kroll',
                'birthday': '1978-06-05'
            }
        },
        {
            'person': {
                'id': 37525,
                'name': 'Stephen Rannazzisi',
                'birthday': null
            }
        },
        {
            'person': {
                'id': 14303,
                'name': 'Paul Scheer',
                'birthday': '1976-01-31'
            }
        }
    ]
}];
