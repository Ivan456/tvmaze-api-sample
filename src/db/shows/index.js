const collectionName = 'shows';

const cast = ({ db }) => async ({ size, page }) => {
    const showsCollection = db.collection(collectionName);

    const castList = await showsCollection
        .find()
        .project(projection)
        .limit(size)
        .skip(size * page)
        .toArray();

    return castList;
};

const projection = {
    '_id': 0,
    'id': 1,
    'name': 1,
    'cast.person.id': 1,
    'cast.person.name': 1,
    'cast.person.birthday': 1
};

module.exports = { cast };
