const express = require('express');

function getRoutes() {
	const router = express.Router();
	return router;
}

module.exports = { getRoutes };
