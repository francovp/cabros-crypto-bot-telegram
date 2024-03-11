const { getPrice, cryptoBotCmd } = require('./src/controllers/commands');
const app = require('./app.js');
const { Telegraf } = require('telegraf');
const { getRoutes } = require('./src/routes');
require('dotenv').config();

const token = process.env.BOT_TOKEN;
if (token === undefined) {
	throw new Error('BOT_TOKEN must be provided!');
}

const bot = new Telegraf(token);

bot.command(['precio'], getPrice);

bot.command(['cryptobot'], cryptoBotCmd);

const port = process.env.PORT || 80;
const now = new Date();

app.listen(port, () => {
	console.log(now + ' - Running server on port ' + port);
	bot.launch();

	// Enable graceful stop
	process.once('SIGINT', () => bot.stop('SIGINT'));
	process.once('SIGTERM', () => bot.stop('SIGTERM'));
});

app.use('/api', getRoutes(bot));

module.exports = { bot };
