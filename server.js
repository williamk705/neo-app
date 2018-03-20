// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const MongoClient = require('mongodb').MongoClient;
const mongo = require('./server/database/connect');
// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Other
app.use(cookieParser());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'landing')));
app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, 'landing/landing-page.html/'));
});
// Set our api routes
app.use('/api', api);

app.get('/dashboard', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/neo-app.html/'));
})

// Catch all other routes and return the index file
app.get('*', (req, res) => {
	res.redirect('/login');
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '4200';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

 // Connect to mongodb on init
mongo.connect((err) => {
	app.locals._db = mongo.getDb();
	console.log('[MongoDB] connection established');
	server.listen(port, () => console.log(`API running on localhost:${port}`));
});