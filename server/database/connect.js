const MongoClient = require('mongodb').MongoClient;
const config = require('../config');
/*
Fill this module with a db connection logic,
such as connecting, reconnecting (for dev/prod),
replica set or sharded db connections etc.
*/

var _db = null;

module.exports = {
	connect: (cb) => {
		MongoClient.connect(config.uri.admin, (err, client) => {
			if(err) {
				console.log('[MongoDB]', err.message);
			}
			_db = client.db('admin');
			return cb(err); 
		});
	},
	getDb: () => {
		return _db;
	}
}