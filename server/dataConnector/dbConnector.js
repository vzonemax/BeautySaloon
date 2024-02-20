async function dbConnector(quryValue) {
    const pool = require('../queryDB');
    const query = quryValue;
    const result = await pool.query(query);
    return result[0]
}

module.exports = dbConnector