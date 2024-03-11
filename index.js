const { getPrice, cryptoBotCmd } = require('./src/controllers/commands');
const app = require('./app.js');
const { Telegraf } = require('telegraf');
const { getRoutes } = require('./src/routes');
require('dotenv').config();

const token = process.env.BOT_TOKEN;
if (token === undefined) {
	throw new Error('BOT_TOKEN must be provided!');
}

let bot;

const port = process.env.PORT || 80;
const now = new Date();

app.use('/api', getRoutes(bot));

app.listen(port, () => {
	console.log(now + ' - Running server on port ' + port);

	const telegramBotIsEnabled = process.env.ENABLE_TELEGRAM_BOT === 'true';
	console.debug('telegramBotIsEnabled:', telegramBotIsEnabled);
	const isPreviewEnv = process.env.RENDER === 'true' && process.env.IS_PULL_REQUEST === 'true';
	console.debug('isPreviewEnv:', isPreviewEnv);

	if (telegramBotIsEnabled && !isPreviewEnv) {
		console.log('Telegram Bot is enabled');
		bot = new Telegraf(token);
		bot.command(['precio'], getPrice);
		bot.command(['cryptobot'], cryptoBotCmd);
		bot.launch();

		// Enable graceful stop
		process.once('SIGINT', () => bot.stop('SIGINT'));
		process.once('SIGTERM', () => bot.stop('SIGTERM'));
	}
});

module.exports = { bot };
