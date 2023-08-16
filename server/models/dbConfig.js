import pg from 'pg';
const { Pool } = pg;

const PG_URI =
    'postgres://xmiuhfal:Bi1tZh282IcBBPzFFTdVFCL4XG7K102o@batyr.db.elephantsql.com/xmiuhfal';

// create a new pool here using the connection string above
const dbPool = new Pool({
    connectionString: PG_URI,
});

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
const db = {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return dbPool.query(text, params, callback);
    },
};

export default db;